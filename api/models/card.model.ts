// import mongoose
import { Schema, model } from "mongoose";

const CardSchema = new Schema<Card>({
    number: {
        type: Number
    },
    shape: {
        type: String
    },
    color: {
        type: String
    },
    fill: {
        type: String
    }
}, { timestamps: true })

interface Card {
    number: number,
    shape: string,
    color: string,
    fill: string,
}

const CardModel = model<Card>("Card", CardSchema)

export { Card, CardModel }