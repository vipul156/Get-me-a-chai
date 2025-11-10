import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payments from "@/models/Payments";
import connectDB from "@/db/ConnectDb";

export async function POST(request) {
    await connectDB()
    let body = await request.formData();
    body = Object.fromEntries(body)
    let payment = await Payments.findOne({ oid: body.razorpay_order_id })    
    if (!payment) {
        return NextResponse.json({ message: "Payment not found" });
    }
    const response = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature,process.env.RAZORPAY_SECRET);
    if(response){
        const updatedPayment = await Payments.findOneAndUpdate({ oid: body.razorpay_order_id }, { status: "true" },{new: true});
        return NextResponse.redirect(`http://localhost:3000/${updatedPayment.toUser}?paymentdone=true`);
    }

    else{
        return NextResponse.json({success: false, message:"Payment Verification Failed"})
    }
}