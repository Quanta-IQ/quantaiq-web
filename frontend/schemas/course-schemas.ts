import { z } from 'zod';

export const CourseSchema = z.object({
  _id: z.string(),
  CourseName: z.string(),
  CourseDescription: z.string(),
  CreatorID: z.string(),
});

export type Course = z.infer<typeof CourseSchema>;
export const CoursesArraySchema = z.array(CourseSchema);
export type CoursesArray = z.infer<typeof CoursesArraySchema>;
