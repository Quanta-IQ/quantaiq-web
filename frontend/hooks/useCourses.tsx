import { useQuery } from "convex/react";
import { AuthContext } from "../providers/AuthProvider";
import useUserConvexData from "./useUserConvexData";
import { api } from "../convex/_generated/api";
import { CoursesArray, CoursesArraySchema } from "@/schemas/course-schemas";

export function useCourses(): CoursesArray | undefined {
    
  const {user}: any = AuthContext();
    const userConvex = useUserConvexData();

  const result = useQuery(api.functions.courses.getCoursesCreatedByUser, {
    UserID: userConvex?._id,
  });

  if (result) {
    return CoursesArraySchema.parse(result); 
  }
  // TODO: deal with if there are no courses
}
