import { Request, Response } from "express";
import { connect, GridFSBucket } from "mongodb";
import { MongoClient } from "../../database";
import multer from "multer";
import { Readable } from "stream";
import { gzip, deflate } from "zlib";

export default async function recive_audio(req: Request, res: Response) {

    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 } });
    upload.single('track')(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ message: "Upload Request Validation Failed" });
        } else if (!req.body.name) {
            return res.status(400).json({ message: "No track name in request body" });
        }

        let trackName = req.body.name;

        // Covert buffer to Readable Stream
        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);

        let bucket = new GridFSBucket(MongoClient.db("tracks"), {
            bucketName: 'tracks'
        });

        let uploadStream = bucket.openUploadStream(trackName);
        let id = uploadStream.id;
        readableTrackStream.pipe(uploadStream);

        uploadStream.on('error', () => {
            return res.status(500).json({ message: "Error uploading file" });
        });

        uploadStream.on('finish', () => {
            return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
        });
    });
}
