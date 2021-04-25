import { config as StartEnvConfig } from "dotenv";
import { join } from "path";

StartEnvConfig({
    path: join(__dirname, "../.env"),
});

import { MongoClient } from "./database";
import App from "./app";

var app = new App();

MongoClient.connect().then(() => app.listen());
