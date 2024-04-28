/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.11.2.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ai_anyscale from "../ai/anyscale.js";
import type * as functions_classes from "../functions/classes.js";
import type * as functions_courses from "../functions/courses.js";
import type * as functions_ingest from "../functions/ingest.js";
import type * as functions_lessons from "../functions/lessons.js";
import type * as functions_users from "../functions/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "ai/anyscale": typeof ai_anyscale;
  "functions/classes": typeof functions_classes;
  "functions/courses": typeof functions_courses;
  "functions/ingest": typeof functions_ingest;
  "functions/lessons": typeof functions_lessons;
  "functions/users": typeof functions_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
