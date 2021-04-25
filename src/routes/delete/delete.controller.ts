import { Request, Response } from "express";
import { GridFSBucket, ObjectID } from "mongodb";
import { MongoClient } from "../../database";

// todo: finish the controller :D
export default async function delete_audio(req: Request, res: Response) {
    var ObjID = req.body.ID;
    if (ObjID) {

    }
    var bucket = new GridFSBucket(MongoClient.db("tracks"), {
        bucketName: "tracks"
    });
    bucket.delete()
}
