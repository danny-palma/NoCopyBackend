import express, { Application, json, urlencoded } from "express";
import { resolve } from "path";
import cookie_parser from "cookie-parser";
import { Server } from "http";
import Routes from "./routes/index";
import { join } from "path";

export default class App {
    public app: Application;
    public port?: number;
    public constructor(_port?: number) {
        this.port = _port;
        this.app = express();
        this.config();
        this.midlewares();
        this.routes();
    }
    private config(): void {
        this.app.set("port", process.env.PORT || this.port || 3000);
        this.app.set("view engine", "ejs");
        this.app.set("views", join(__dirname, "../sources/views"));
        this.app.disable('x-powered-by');
    }
    private midlewares(): void {
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(express.query({}));
        this.app.use(cookie_parser("super"));
    }
    private routes(): void {
        this.app.use("/static", express.static(resolve("../sources/public")));
        new Routes(this.app);
    }
    /**
     * listen on the port
     * 
     */
    public listen(callback?: () => void): Server {
        return this.app.listen(this.app.get("port"), () => {
            console.log(`Server on port ${this.app.get("port")}`);
            callback ? callback() : null;
        });
    }
}
