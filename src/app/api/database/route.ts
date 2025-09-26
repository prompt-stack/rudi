import { NextResponse } from 'next/server';

export async function GET() {
  // Disable this broad database inspection endpoint in production.
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    const [
      users,
      organizations,
      memberships,
      programs,
      courses,
      lessons,
      components,
      componentVideos,
      assets,
      enrollments,
      userProgress,
      videoProgress,
      certificates,
      activityEvents,
      importRuns,
      accounts,
      sessions
    ] = await Promise.all([
      prisma.user.findMany({
        include: {
          memberships: true,
          enrollments: true,
        },
        take: 100
      }),
      prisma.organization.findMany({
        include: {
          programs: true,
          members: true,
        }
      }),
      prisma.membership.findMany({
        include: {
          org: true,
          user: true,
        },
        take: 100
      }),
      prisma.program.findMany({
        include: {
          organization: true,
          courses: true,
        }
      }),
      prisma.course.findMany({
        include: {
          program: true,
          lessons: {
            take: 5
          },
          enrollments: {
            take: 5
          },
        }
      }),
      prisma.lesson.findMany({
        include: {
          course: true,
          components: true,
          assets: {
            take: 5
          },
        },
        take: 50
      }),
      prisma.component.findMany({
        include: {
          lesson: true,
          videoDetail: true,
          assets: {
            take: 3
          },
        },
        take: 100
      }),
      prisma.componentVideo.findMany({
        include: {
          component: true,
        },
        take: 50
      }),
      prisma.asset.findMany({
        include: {
          component: true,
          lesson: true,
        },
        take: 100
      }),
      prisma.enrollment.findMany({
        include: {
          user: true,
          course: true,
        },
        take: 100
      }),
      prisma.userProgress.findMany({
        include: {
          user: true,
          course: true,
          lesson: true,
          component: true,
        },
        take: 100
      }),
      prisma.videoProgress.findMany({
        include: {
          user: true,
          component: true,
        },
        take: 100
      }),
      prisma.certificate.findMany({
        include: {
          user: true,
          course: true,
        },
        take: 50
      }),
      prisma.activityEvent.findMany({
        include: {
          user: true,
          course: true,
          lesson: true,
          component: true,
        },
        take: 100,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.importRun.findMany({
        include: {
          assets: {
            take: 5
          },
          comps: {
            take: 5
          },
        },
        take: 20,
        orderBy: {
          startedAt: 'desc'
        }
      }),
      prisma.account.findMany({
        include: {
          user: true,
        },
        take: 50
      }),
      prisma.session.findMany({
        include: {
          user: true,
        },
        take: 50
      }),
    ]);

    const enums = {
      Role: ['OWNER', 'ADMIN', 'INSTRUCTOR', 'EDITOR', 'LEARNER'],
      DifficultyLevel: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
      ComponentType: ['LEARNING_VIDEO', 'LEARNING_SLIDES', 'LAB_VIDEO', 'LAB_DATA', 'LAB_EXERCISE', 'QUIZ', 'RESOURCE', 'TRANSCRIPT'],
      AssetRole: ['INSTRUCTION', 'STARTER', 'SOLUTION', 'DATA', 'RUBRIC', 'CONFIG', 'OTHER'],
      EnrollmentStatus: ['ACTIVE', 'PAUSED', 'COMPLETED', 'DROPPED'],
      ProgressStatus: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'],
      VideoProvider: ['CLOUDFLARE', 'MUX', 'YOUTUBE', 'VIMEO']
    };

    const stats = {
      totalUsers: await prisma.user.count(),
      totalOrganizations: await prisma.organization.count(),
      totalPrograms: await prisma.program.count(),
      totalCourses: await prisma.course.count(),
      totalLessons: await prisma.lesson.count(),
      totalComponents: await prisma.component.count(),
      totalAssets: await prisma.asset.count(),
      totalEnrollments: await prisma.enrollment.count(),
      totalCertificates: await prisma.certificate.count(),
      totalActivityEvents: await prisma.activityEvent.count(),
    };

    return NextResponse.json({
      data: {
        users,
        organizations,
        memberships,
        programs,
        courses,
        lessons,
        components,
        componentVideos,
        assets,
        enrollments,
        userProgress,
        videoProgress,
        certificates,
        activityEvents,
        importRuns,
        accounts,
        sessions
      },
      enums,
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch database contents', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
