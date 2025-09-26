
// Minimal ETL scaffold (Node/TS) to import filesystem → DB deterministically
// Assumes: prisma generate; run with ts-node or compile.
// Focuses on idempotent upserts using stable keys.

import { PrismaClient, ComponentType, AssetRole } from '@prisma/client';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function sha1Hex(data: string | Buffer) {
  return createHash('sha1').update(data).digest('hex');
}

function naturalOrder(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

type Paths = {
  programSlug: string;
  courseSlug: string;     // e.g. "course_01"
  lessonNumber: string;   // e.g. "03.1"
  lessonRelPath: string;  // relative folder path from course root
};

async function upsertProgramAndCourse(programSlug: string, courseSlug: string, courseTitle: string) {
  const program = await prisma.program.upsert({
    where: { slug: programSlug },
    update: {},
    create: { slug: programSlug, name: programSlug.replace(/_/g,' ').toUpperCase() },
  });
  const course = await prisma.course.upsert({
    where: { slug: courseSlug },
    update: { title: courseTitle },
    create: { slug: courseSlug, title: courseTitle, programId: program.id },
  });
  return { program, course };
}

function splitLessonNumber(n: string) {
  const [a, b] = n.split('.');
  return { seq: parseInt(a, 10), sub: b ? parseInt(b, 10) : 0 };
}

async function upsertLesson(courseId: string, lessonNumber: string, title: string, folderPath: string) {
  const { seq, sub } = splitLessonNumber(lessonNumber);
  const lesson = await prisma.lesson.upsert({
    where: { courseId_lessonNumber: { courseId, lessonNumber } },
    update: { title, lessonSeq: seq, subSeq: sub, folderPath },
    create: { courseId, lessonNumber, title, lessonSeq: seq, subSeq: sub, folderPath },
  });
  return lesson;
}

async function upsertComponent(lessonId: string, type: ComponentType, name: string, groupKey: string, orderIndex: number) {
  const comp = await prisma.component.upsert({
    where: { lessonId_type_groupKey: { lessonId, type, groupKey } },
    update: { name, orderIndex },
    create: { lessonId, type, name, groupKey, orderIndex },
  });
  return comp;
}

async function upsertAsset(lessonId: string, componentId: string | null, relativePath: string, sizeBytes: number, checksumSha1: string, orderIndex: number, role?: AssetRole) {
  const asset = await prisma.asset.upsert({
    where: { lessonId_relativePath: { lessonId, relativePath } },
    update: { componentId: componentId ?? undefined, sizeBytes, checksumSha1, orderIndex, role },
    create: { lessonId, componentId: componentId ?? undefined, relativePath, sizeBytes, checksumSha1, orderIndex, role },
  });
  return asset;
}

// Walk a slides directory and import all PNGs as assets under a single SLIDES component
async function importSlides(lessonId: string, lessonAbsPath: string) {
  const slidesDir = path.join(lessonAbsPath, 'learning', 'slides');
  try {
    const files = (await fs.readdir(slidesDir)).filter(f => f.toLowerCase().endsWith('.png')).sort(naturalOrder);
    if (!files.length) return;
    const comp = await upsertComponent(lessonId, 'LEARNING_SLIDES' as ComponentType, 'Slide Deck', 'learning/slides', 0);
    let idx = 1;
    for (const f of files) {
      const rel = path.join('learning', 'slides', f).replaceAll('\\','/');
      const buf = await fs.readFile(path.join(slidesDir, f));
      await upsertAsset(lessonId, comp.id, rel, buf.length, sha1Hex(buf), idx++);
    }
  } catch {}
}

// Import each video file in learning/ as its own VIDEO component (+ transcript if exists)
async function importVideos(lessonId: string, lessonAbsPath: string) {
  const learningDir = path.join(lessonAbsPath, 'learning');
  try {
    const files = await fs.readdir(learningDir);
    const videos = files.filter(f => /\.mp4$/i.test(f)).sort(naturalOrder);
    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      const groupKey = `learning/${v}`;
      const comp = await upsertComponent(lessonId, 'LEARNING_VIDEO' as ComponentType, v.replace(/\.mp4$/i,''), groupKey, i);
      const vbuf = await fs.readFile(path.join(learningDir, v));
      await upsertAsset(lessonId, comp.id, groupKey, vbuf.length, sha1Hex(vbuf), 0);
      const transcript = v.replace(/\.mp4$/i, '.txt');
      if (files.includes(transcript)) {
        const tbuf = await fs.readFile(path.join(learningDir, transcript));
        await upsertAsset(lessonId, comp.id, `learning/${transcript}`, tbuf.length, sha1Hex(tbuf), 1, 'RUBRIC' as AssetRole); // role reused if needed
      }
    }
  } catch {}
}

// Import labs/resources generically
async function importFolderAsAssets(lessonId: string, lessonAbsPath: string, sub: 'lab'|'resources') {
  const base = path.join(lessonAbsPath, sub);
  try {
    const entries = await fs.readdir(base, { withFileTypes: true });
    if (!entries.length) return;
    const comp = await upsertComponent(lessonId, (sub === 'lab' ? 'LAB_EXERCISE' : 'RESOURCE') as ComponentType, sub.toUpperCase(), `${sub}/`, 10);
    let idx = 0;
    for (const e of entries) {
      if (e.isDirectory()) continue; // keep simple; recurse if needed
      const rel = path.join(sub, e.name).replaceAll('\\','/');
      const buf = await fs.readFile(path.join(base, e.name));
      await upsertAsset(lessonId, comp.id, rel, buf.length, sha1Hex(buf), idx++);
    }
  } catch {}
}

async function main(root: string) {
  const programSlug = path.basename(root).toLowerCase();
  const courseDirs = (await fs.readdir(root)).filter(d => d.startsWith('Course_'));
  for (const courseDir of courseDirs) {
    const courseSlug = courseDir.split('/').pop()!.split('_').slice(0,2).join('_').toLowerCase(); // Course_01 → course_01
    const { course } = await upsertProgramAndCourse(programSlug, courseSlug, courseDir.replace(/^Course_\d+_/, '').replace(/_/g,' '));

    const lessonsAbs = (await fs.readdir(path.join(root, courseDir))).filter(d => d.startsWith('Lesson_'));
    lessonsAbs.sort(naturalOrder);

    for (const lessonFolder of lessonsAbs) {
      const abs = path.join(root, courseDir, lessonFolder);
      const lessonNumber = lessonFolder.replace(/^Lesson_/, '').split('_', 2)[0].replace('-', '.');
      const title = lessonFolder.replace(/^Lesson_\d+(_\d+)?:?/, '').replace(/_/g,' ').trim() || lessonFolder;
      const lesson = await upsertLesson(course.id, lessonNumber, title, path.join(courseDir, lessonFolder));

      await importSlides(lesson.id, abs);
      await importVideos(lesson.id, abs);
      await importFolderAsAssets(lesson.id, abs, 'lab');
      await importFolderAsAssets(lesson.id, abs, 'resources');
    }
  }
}

if (require.main === module) {
  const root = process.argv[2];
  if (!root) {
    console.error('Usage: ts-node importer.ts <path-to-program-root>');
    process.exit(1);
  }
  main(root).then(() => {
    console.log('Import complete');
  }).catch(err => {
    console.error(err);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });
}
