// DEPENDANCIES
import express, { Express, Request, Response } from "express"
import cors from "cors"
import mongoose from "mongoose"
import cardRoutes from "./routes/card.routes"
import { CardModel, Card } from "./models/card.model"
import leaderboardRoutes from "./routes/leaderboard.routes"
import dotenv from 'dotenv';

dotenv.config();

// INSTANTIATE APP
const app: Express = express()
const PORT = process.env.PORT || 3000

// DB CONNECTION
const db = process.env.MONGO_URI as string || 'mongodb://localhost/set_db'
mongoose.connect(db)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err: any) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// ROUTES
// app.use('/api/cards', cardRoutes)
app.get("/api/cards", async (req: Request, res: Response) => {
    try {
        const cards = await CardModel.find() as Card[];
        res.status(200).send(cards);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.use('/api/leaderboard', leaderboardRoutes)

//START APP
app.listen(PORT, () => console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`))