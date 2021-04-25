import { Request, Response } from "express";
import { GridFSBucket, ObjectID } from "mongodb";
import { MongoClient } from "../../database";

export default async function stream_audio(req: Request, res: Response) {
    try {
        var trackID = new ObjectID(req.params.trackID);
    } catch (err) {
        return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" });
    }
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    let bucket = new GridFSBucket(MongoClient.db("tracks"), {
        bucketName: 'tracks'
    });

    let downloadStream = bucket.openDownloadStream(trackID);

    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    downloadStream.on('error', (err) => {
        console.log(err);
        res.sendStatus(500);
    });

    downloadStream.on('end', () => {
        res.end();
    });
}
