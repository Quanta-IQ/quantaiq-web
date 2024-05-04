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
import type * as ai_together from "../ai/together.js";
import type * as crons from "../crons.js";
import type * as functions_classes from "../functions/classes.js";
import type * as functions_courses from "../functions/courses.js";
import type * as functions_lessons from "../functions/lessons.js";
import type * as functions_students from "../functions/students.js";
import type * as functions_tests from "../functions/tests.js";
import type * as functions_users from "../functions/users.js";
import type * as helpers from "../helpers.js";
import type * as ingest_document from "../ingest/document.js";
import type * as ingest_embed from "../ingest/embed.js";
import type * as ingest_load from "../ingest/load.js";
import type * as messages_interviewer from "../messages/interviewer.js";
import type * as messages_lessonbot from "../messages/lessonbot.js";
import type * as messages_testcreator from "../messages/testcreator.js";
import type * as serve_interviewer from "../serve/interviewer.js";
import type * as serve_lessonbot from "../serve/lessonbot.js";
import type * as serve_testcreator from "../serve/testcreator.js";

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
  "ai/together": typeof ai_together;
  crons: typeof crons;
  "functions/classes": typeof functions_classes;
  "functions/courses": typeof functions_courses;
  "functions/lessons": typeof functions_lessons;
  "functions/students": typeof functions_students;
  "functions/tests": typeof functions_tests;
  "functions/users": typeof functions_users;
  helpers: typeof helpers;
  "ingest/document": typeof ingest_document;
  "ingest/embed": typeof ingest_embed;
  "ingest/load": typeof ingest_load;
  "messages/interviewer": typeof messages_interviewer;
  "messages/lessonbot": typeof messages_lessonbot;
  "messages/testcreator": typeof messages_testcreator;
  "serve/interviewer": typeof serve_interviewer;
  "serve/lessonbot": typeof serve_lessonbot;
  "serve/testcreator": typeof serve_testcreator;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
