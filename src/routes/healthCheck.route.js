import { Router } from "express";
import {
  heartBeatService,
  cronHealthBeat,
} from "../controllers/healthCheck.js";
import { CronJob } from "cron";

const heartbeatRouter = Router();

heartbeatRouter.route("/").get(heartBeatService);

const heartBeatJob = new CronJob("*/15 * * * *", cronHealthBeat);
heartBeatJob.start();

export default heartbeatRouter;
