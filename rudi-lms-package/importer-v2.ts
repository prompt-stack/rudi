/**
 * Curriculum Importer V2 - Grammar Ops
 * 
 * Improved importer with clear component type distinctions:
 * - LEARNING_VIDEO: Videos in learning/ folder
 * - LEARNING_SLIDES: Slides in learning/ folder  
 * - LAB_VIDEO: Videos in lab/ folder
 * - LAB_DATA: Data files in lab/data/ folder
 * - TRANSCRIPT: Transcript files in both folders
 * - RESOURCE: Additional resources
 */

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

// Import learning folder contents
async function importLearningContent(lessonId: string, lessonAbsPath: string) {
  const learningDir = path.join(lessonAbsPath, 'learning');
  
  try {
    const entries = await fs.readdir(learningDir, { withFileTypes: true });
    
    // 1. Learning Video
    const videoFile = entries.find(e => e.name.endsWith('.mp4'));
    if (videoFile) {
      const comp = await upsertComponent(lessonId, 'LEARNING_VIDEO', 'Learning Video', 'learning/video', 0);
      const buf = await fs.readFile(path.join(learningDir, videoFile.name));
      await upsertAsset(lessonId, comp.id, `learning/${videoFile.name}`, buf.length, sha1Hex(buf), 0);
      console.log('    ✓ Learning video');
    }
    
    // 2. Learning Transcript
    const transcriptFile = entries.find(e => e.name === 'transcript.txt');
    if (transcriptFile) {
      const comp = await upsertComponent(lessonId, 'TRANSCRIPT', 'Learning Transcript', 'learning/transcript', 1);
      const buf = await fs.readFile(path.join(learningDir, transcriptFile.name));
      await upsertAsset(lessonId, comp.id, `learning/${transcriptFile.name}`, buf.length, sha1Hex(buf), 0);
      console.log('    ✓ Learning transcript');
    }
    
    // 3. Slides
    const slidesDir = path.join(learningDir, 'slides');
    try {
      const slides = (await fs.readdir(slidesDir)).filter(f => f.endsWith('.png')).sort(naturalOrder);
      if (slides.length > 0) {
        const comp = await upsertComponent(lessonId, 'LEARNING_SLIDES', 'Slide Deck', 'learning/slides', 2);
        for (let i = 0; i < slides.length; i++) {
          const buf = await fs.readFile(path.join(slidesDir, slides[i]));
          await upsertAsset(lessonId, comp.id, `learning/slides/${slides[i]}`, buf.length, sha1Hex(buf), i);
        }
        console.log(`    ✓ ${slides.length} slides`);
      }
    } catch {}
    
  } catch (error) {
    // No learning folder
  }
}

// Import lab folder contents
async function importLabContent(lessonId: string, lessonAbsPath: string) {
  const labDir = path.join(lessonAbsPath, 'lab');
  
  try {
    const entries = await fs.readdir(labDir, { withFileTypes: true });
    
    // 1. Lab Video
    const videoFile = entries.find(e => e.name.endsWith('.mp4'));
    if (videoFile) {
      const comp = await upsertComponent(lessonId, 'LAB_VIDEO', 'Lab Video', 'lab/video', 10);
      const buf = await fs.readFile(path.join(labDir, videoFile.name));
      await upsertAsset(lessonId, comp.id, `lab/${videoFile.name}`, buf.length, sha1Hex(buf), 0);
      console.log('    ✓ Lab video');
    }
    
    // 2. Lab Transcript
    const transcriptFile = entries.find(e => e.name === 'transcript.txt');
    if (transcriptFile) {
      const comp = await upsertComponent(lessonId, 'TRANSCRIPT', 'Lab Transcript', 'lab/transcript', 11);
      const buf = await fs.readFile(path.join(labDir, transcriptFile.name));
      await upsertAsset(lessonId, comp.id, `lab/${transcriptFile.name}`, buf.length, sha1Hex(buf), 0);
      console.log('    ✓ Lab transcript');
    }
    
    // 3. Lab Data folder
    const dataDir = path.join(labDir, 'data');
    try {
      const dataFiles = await fs.readdir(dataDir);
      if (dataFiles.length > 0) {
        const comp = await upsertComponent(lessonId, 'LAB_DATA', 'Lab Data', 'lab/data', 12);
        for (let i = 0; i < dataFiles.length; i++) {
          const filePath = path.join(dataDir, dataFiles[i]);
          const stats = await fs.stat(filePath);
          if (stats.isFile()) {
            const buf = await fs.readFile(filePath);
            const role = dataFiles[i].includes('solution') ? 'SOLUTION' : 
                        dataFiles[i].includes('starter') ? 'STARTER' : 'DATA';
            await upsertAsset(lessonId, comp.id, `lab/data/${dataFiles[i]}`, buf.length, sha1Hex(buf), i, role as AssetRole);
          }
        }
        console.log(`    ✓ ${dataFiles.length} lab data files`);
      }
    } catch {}
    
  } catch (error) {
    // No lab folder
  }
}

// Import resources folder
async function importResources(lessonId: string, lessonAbsPath: string) {
  const resourcesDir = path.join(lessonAbsPath, 'resources');
  
  try {
    const entries = await fs.readdir(resourcesDir, { withFileTypes: true });
    const files = entries.filter(e => e.isFile());
    
    if (files.length > 0) {
      const comp = await upsertComponent(lessonId, 'RESOURCE', 'Resources', 'resources/', 20);
      for (let i = 0; i < files.length; i++) {
        const buf = await fs.readFile(path.join(resourcesDir, files[i].name));
        await upsertAsset(lessonId, comp.id, `resources/${files[i].name}`, buf.length, sha1Hex(buf), i);
      }
      console.log(`    ✓ ${files.length} resource files`);
    }
  } catch {
    // No resources folder
  }
}

async function main(root: string) {
  console.log('🎬 Curriculum Importer V2 - Grammar Ops\n');
  console.log('Using improved component types:\n');
  console.log('  LEARNING_VIDEO  - Videos in learning/ folder');
  console.log('  LEARNING_SLIDES - Slides in learning/ folder');
  console.log('  LAB_VIDEO       - Videos in lab/ folder');
  console.log('  LAB_DATA        - Data files in lab/data/ folder');
  console.log('  TRANSCRIPT      - Transcript files\n');
  
  const programSlug = path.basename(root).toLowerCase();
  const courseDirs = (await fs.readdir(root)).filter(d => d.startsWith('Course_'));
  
  for (const courseDir of courseDirs) {
    const courseSlug = courseDir.split('/').pop()!.split('_').slice(0,2).join('_').toLowerCase();
    const courseTitle = courseDir.replace(/^Course_\d+_/, '').replace(/_/g,' ');
    
    console.log(`\n[${courseSlug}] ${courseTitle}`);
    const { course } = await upsertProgramAndCourse(programSlug, courseSlug, courseTitle);

    const lessonDirs = (await fs.readdir(path.join(root, courseDir))).filter(d => d.startsWith('Lesson_'));
    lessonDirs.sort(naturalOrder);

    for (const lessonFolder of lessonDirs) {
      const abs = path.join(root, courseDir, lessonFolder);
      const lessonNumber = lessonFolder.replace(/^Lesson_/, '').split(/[_:]/)[0].replace('-', '.');
      const title = lessonFolder.replace(/^Lesson_\d+(_\d+)?:?/, '').replace(/_/g,' ').trim() || lessonFolder;
      
      console.log(`  Lesson ${lessonNumber}: ${title}`);
      const lesson = await upsertLesson(course.id, lessonNumber, title, path.join(courseDir, lessonFolder));

      await importLearningContent(lesson.id, abs);
      await importLabContent(lesson.id, abs);
      await importResources(lesson.id, abs);
    }
  }
  
  // Summary
  const stats = {
    programs: await prisma.program.count(),
    courses: await prisma.course.count(),
    lessons: await prisma.lesson.count(),
    learningVideos: await prisma.component.count({ where: { type: 'LEARNING_VIDEO' } }),
    labVideos: await prisma.component.count({ where: { type: 'LAB_VIDEO' } }),
    slides: await prisma.component.count({ where: { type: 'LEARNING_SLIDES' } }),
    labData: await prisma.component.count({ where: { type: 'LAB_DATA' } }),
    transcripts: await prisma.component.count({ where: { type: 'TRANSCRIPT' } }),
    assets: await prisma.asset.count()
  };
  
  console.log('\n=== Import Summary ===');
  console.log(`Programs: ${stats.programs}`);
  console.log(`Courses: ${stats.courses}`);
  console.log(`Lessons: ${stats.lessons}`);
  console.log(`Learning Videos: ${stats.learningVideos}`);
  console.log(`Lab Videos: ${stats.labVideos}`);
  console.log(`Slide Decks: ${stats.slides}`);
  console.log(`Lab Data Sets: ${stats.labData}`);
  console.log(`Transcripts: ${stats.transcripts}`);
  console.log(`Total Assets: ${stats.assets}`);
}

if (require.main === module) {
  const root = process.argv[2];
  if (!root) {
    console.error('Usage: ts-node importer-v2.ts <path-to-program-root>');
    process.exit(1);
  }
  main(root).then(() => {
    console.log('\n✓ Import complete');
  }).catch(err => {
    console.error(err);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });
}