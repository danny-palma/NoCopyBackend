import { Router } from "express";
import controller from "./upload.controller";

const router  = Router();

router.route("/upload/").all(controller);

export default router;
