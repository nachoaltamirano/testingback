import mongoose from "mongoose";

const ticketCollection = "tickets"

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required:true
    },
    purchase_datatime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required:true
    },
    purchaser: {
        type: String,
        required:true
    }
})

export const ticketsModel = mongoose.model(ticketCollection,ticketSchema)