import { CardModel, Card } from "../models/card.model"
import { Router, Request, Response } from "express"
import allCards from './allCards'

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

// add one
router.post("/addone", async (req: Request, res: Response) => {
    try {
        const card = await CardModel.create(req.body);
        res.status(201).send(card);
    } catch (err) {
        res.status(500).send(err);
    }
});

// add many
router.post("/addall", async (req: Request, res: Response) => {
    try {
        const cards = await CardModel.create(allCards, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully added all cards to database");
            }
        });
        res.status(201).send(cards);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;