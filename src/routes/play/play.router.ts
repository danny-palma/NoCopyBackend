import { Router } from "express";
import controller from "./play.controller";
const router  = Router();

router.route("/play/:trackID").all(controller);

export default router;
