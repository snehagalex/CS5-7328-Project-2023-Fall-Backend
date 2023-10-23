import { TAApplication } from '@prisma/client';
import { TAApplicationData } from './taApplication.types';
// custom path issue, need to fix, for now use this import
import { prisma } from '../../../prisma';

//TODO: Add Comments to all functions

// Save application with associated courses and tajob
export const saveApplication =
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async (data: TAApplicationData, file: Express.Multer.File) => {
    const filePath = file.path;
    return await prisma.tAApplication.create({
      data: {
        course: { connect: { id: data.courseId } },
        student: { connect: { userId: data.studentId } },
        taJob: { connect: { id: data.taJobId } },
        hoursCanWorkPerWeek: data.hoursCanWorkPerWeek,
        coursesTaken: data.coursesTaken,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        GPA: data.gpa,
        requiredCourses: data.requiredCourses,
        requiredSkills: data.requiredSkills,
        resumeFile: filePath,
      },
    });
  };

export const getApplication = async (
  id: number
): Promise<TAApplication | null> => {
  const application = await prisma.tAApplication.findUnique({ where: { id } });

  if (!application) {
    return null;
  }

  return application;
};

export const getTaApplications = async () => {
  console.log('getUsers');
  //return await prisma.user.findMany();
  return await prisma.tAApplication.findMany();
};
