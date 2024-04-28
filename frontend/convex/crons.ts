//Really stupid fix on embedding problem
  //TODO: fix the async functions so it run once and embedd all
import { cronJobs } from "convex/server";
import { api, internal } from "./_generated/api";

const crons = cronJobs();
//crons.interval("clear presence data", { seconds: 1 }, internal.ingest.embed.embedAll);


export default crons;