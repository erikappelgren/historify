import express, { Request, Response } from "express";

export const userRouter = express.Router();

userRouter.get("/", (req: Request, res: Response) => {

    const { displayName } = req.session

    console.log("hello " + displayName)
    if (displayName) {
        console.log(`user "${displayName}" already has session`);
        return res.status(200).send(displayName)
    }
    else {
        console.log("not yet logged in");
        return res.status(200).send("no user")
    }


})