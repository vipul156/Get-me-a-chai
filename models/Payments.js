import { Schema, model, models } from "mongoose";
const PaymentsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    toUser : {
        type: String,
        required: true,
    },
    oid : {
        type: String,
        required: true,
    },
    message : {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

export default models.Payments || model('Payments', PaymentsSchema)