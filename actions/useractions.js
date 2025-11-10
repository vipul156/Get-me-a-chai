"use server"

import Razorpay from "razorpay";
import Payments from "@/models/Payments";
import Users from "@/models/User";
import connectDB from "@/db/ConnectDb";
import { get } from "mongoose";

export const initiate = async (amount, currUser, name, message) => {
    await connectDB()
    var instance = new Razorpay({ key_id: currUser.razorpayId, key_secret: currUser.razorpaySecret });

    let pending = await instance.orders.create({
        amount: Number.parseInt(amount) * 100,
        currency: "INR",
    })

    await Payments.create({
        name: name,
        toUser: currUser.username,
        oid: pending.id,
        message: message,
        amount: Number.parseInt(amount)
    })
    return pending
}

export const getPayments = async (user) => {
    await connectDB()
    let payments = await Payments.find({ toUser: user, status: true }).sort({ createdAt: -1 }).limit(10).lean()
    return JSON.parse(JSON.stringify(payments))
}

export const getUser = async (user) => {
    await connectDB()
    let u = await Users.findOne({ username : user })
    return JSON.parse(JSON.stringify(u))
}

export const updateProfile = async (user, data) => {
    await connectDB()
    let u = await Users.findOneAndUpdate({ username: user }, data)
    return JSON.parse(JSON.stringify(u))
}