// DEPENDANCIES
import express, { Express } from "express"
import cors from "cors"
import cardRoutes from "./routes/card.routes"
import leaderboardRoutes from "./routes/leaderboard.routes"
import "./config/mongoose.config"
import dotenv from 'dotenv';

dotenv.config();

// INSTANTIATE APP
const app: Express = express()
const PORT = process.env.PORT || 3000

//MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//ROUTES
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/cards', cardRoutes)

//START APP
app.listen(PORT, () => console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`))