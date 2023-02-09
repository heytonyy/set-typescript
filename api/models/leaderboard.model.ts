import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb"

const LeaderboardSchema = new Schema<Leaderboard>({
    initials: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 3
    },
    score: {
        type: Number,
        required: true,
        minLength: 2,
        maxLength: 3

    },
}, { timestamps: true })

interface Leaderboard {
    _id?: ObjectId,
    initials: string,
    score: number,
    createdAt?: Date,
    updatedAt?: Date
}

const LeaderboardModel = model<Leaderboard>("Leaderboard", LeaderboardSchema)

export { Leaderboard, LeaderboardModel }
