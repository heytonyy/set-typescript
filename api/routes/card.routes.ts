import { CardModel, Card } from "../models/card.model"
import { Router, Request, Response } from "express"

const router = Router();

// read all
router.get("/", async (req: Request, res: Response) => {
    try {
        const cards = await CardModel.find() as Card[];
        res.status(200).send(cards);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;