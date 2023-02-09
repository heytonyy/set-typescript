// import mongoose
import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb"

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
    _id?: ObjectId,
    number: number,
    shape: string,
    color: string,
    fill: string,
    createdAt?: Date,
    updatedAt?: Date
}

const CardModel = model<Card>("Card", CardSchema)

export { Card, CardModel }