import { Router } from "express";
import controller from "./delete.controller";
const router  = Router();

router.route("/delete").delete(controller);

export default router;
