import { Router } from "express";
import { heartBeatService } from "../controllers/healthCheck.js";

const heartbeatRouter = Router();

heartbeatRouter.route("/").get(heartBeatService);
export default heartbeatRouter;
