import { Application } from "express";
import play from "./play/play.router";
import upload from "./upload/upload.router";

export default class Router {
    public app: Application;
    constructor(_app: Application) {
        this.app = _app;
        this.app.use("/stream", play, upload);
    }

}
