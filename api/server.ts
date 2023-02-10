// DEPENDANCIES
import express, { Express } from "express"
import cors from "cors"
import mongoose from "mongoose"
import cardRoutes from "./routes/card.routes"
import leaderboardRoutes from "./routes/leaderboard.routes"
import dotenv from 'dotenv';

dotenv.config();

// INSTANTIATE APP
const app: Express = express()
const PORT = process.env.PORT || 3000

// DB CONNECTION
mongoose.connect(process.env.MONGO_URI as string)
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
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/cards', cardRoutes)

//START APP
app.listen(PORT, () => console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`))