import { Router, Request, Response } from "express"
import { Leaderboard, LeaderboardModel } from "../models/leaderboard.model"

const router = Router();

// read all
router.get("/", async (req: Request, res: Response) => {
    try {
        const allScores = await LeaderboardModel.find().limit(8).sort({score: -1}).sort({createdAt: -1}) as Leaderboard[];
        res.status(200).send(allScores);
    } catch (err) {
        res.status(500).send(err);
    }
});

// create
router.post("/new", async (req: Request, res: Response) => {
    try {
        const newScore = await LeaderboardModel.create(req.body) as Leaderboard;
        res.status(200).send(newScore);
    } catch(err) {
        res.status(500).send(err);
    }
});

export default router;