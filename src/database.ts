import { MongoClient as Mongoclient } from "mongodb";

const { DATABASE_URI, DATABASE_USER, DATABASE_PASSWORD } = process.env;

var uri = DATABASE_URI
    ?.replace("<user>", DATABASE_USER || '')
    .replace("<password>", DATABASE_PASSWORD || '') || "";

console.log(DATABASE_URI, DATABASE_USER, DATABASE_PASSWORD);

if (!uri) {
    console.trace("The uri is undefined please see .env-example");
    process.exit(1);
}

export var MongoClient: Mongoclient = new Mongoclient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
