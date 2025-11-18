'use client'
import React, { use, useEffect, useState } from 'react'
import cover from '@/public/cover.jpg'
import Image from 'next/image'
import logo from '@/public/tea.gif'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Button from '@/components/Button'
import { initiate, getPayments, getUser } from '@/actions/useractions'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast, Bounce } from 'react-toastify';

function User() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { user } = useParams()
    const [counts, setCounts] = useState(1)
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const def_cups = [1, 3, 5]
    const [payments, setPayments] = useState([])
    const [currUser, setCurrUser] = useState()

    useEffect(() => {
        document.title = `Support ${user} - Get me a chai`
        if(searchParams.get("paymentdone") == "true"){
        toast('Thanks for your donation!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
        router.push(`/${user}`)
     
    }, [])

    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        let payments = await getPayments(user)
        setPayments(payments)
        let u = await getUser(user)
        setCurrUser(u)
    }

    const pay = async (amount) => {
        let a = await initiate(amount, currUser, name, message)
        let orderId = a.id
        var options = {
            "key": currUser.razorpayId, // Enter the Key ID generated from the Dashboard
            "amount": amount * 100, // Amount is in currency subunits.
            "currency": "INR",
            "name": "Get me a chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210"  //Provide the customer's phone number for better conversion rates 
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();

    }

    return (
        <div>
             <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            <ToastContainer />
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className='relative w-full h-100 pb-15'>
                <img src={currUser?.coverPicture} alt="cover" className='object-cover w-full h-full' />
                <img src={currUser?.profilePicture} alt="cover" className='absolute size-[100px] left-1/2 -translate-x-1/2 rounded-full bottom-3' />
            </div>
            <div className='flex flex-col gap-1'>
                <div className='text-center font-bold'>
                    @{user}
                </div>
                <div className='text-center opacity-70 text-xs'>
                    Creating Animated art of for VTT's
                </div>
                <div className='text-center opacity-70 text-xs'>
                    9718 members
                </div>
            </div>
            <div className='flex w-[80vw] m-auto gap-10 py-10'>
                <div className='rounded-2xl basis-1/2 flex flex-col gap-5 p-10 bg-linear-to-b from-[#db2777] via-[#ef4444] to-[#f97316]'>
                    <div className='text-2xl text-center pb-5 font-bold'>Recent supporters</div>
                    {payments.map((payment, i) => (
                        <div key={i} className='flex items-center gap-2'>
                            <Image src={cover} alt="cover" className='rounded-full size-10' />
                            <div>
                                <div className='text-sm'><span className='font-bold text-base'>{payment.name}</span> bought {(payment.amount) / 10} cups of chai</div>
                                <div className='p-2 text-sm bg-purple-600 rounded-md'>{payment.message}</div>
                            </div>
                        </div>))}
                </div>
                <div className='rounded-2xl basis-1/2 p-10 bg-linear-to-r from-[#fef08a] via-[#84cc16] to-[#16a34a]'>
                    <div className='text-2xl text-center pb-5 font-bold'>Buy Me a Chai!</div>
                    <div className='flex justify-center items-center gap-10 bg-yellow-400/80 p-5 rounded-2xl'>
                        <Image src={logo} alt='chai' className='size-[70px]' />
                        <span className='text-3xl pt-5 text-gray-500'>X</span>
                        <div className='pt-5 flex gap-5'>
                            {def_cups.map((i) => (
                                <div key={i} onClick={() => setCounts(i)} className={`size-[50px] rounded-full ${i === counts ? 'bg-red-400' : 'bg-gray-900'} bg-black flex justify-center items-center border-amber-50 border hover:border-red-400 hover:cursor-pointer`}>{i}</div>))}
                            <div className='size-[50px] rounded-xl bg-gray-900 flex justify-center items-center border-amber-50 border'><input onChange={(e) => setCounts(e.target.value)} className='size-full text-center text-green-700 outline-none focus:placeholder:opacity-0' value={counts} /></div>
                        </div>
                    </div>
                    <div onChange={(e) => setName(e.target.value)} className='h-15 p-5 rounded-2xl my-5 bg-black'><input className='size-full outline-none' placeholder='Enter Your Name' /></div>
                    <div onChange={(e) => setMessage(e.target.value)} className='h-30 p-5 rounded-2xl my-5 bg-black'><textarea className='size-full outline-none resize-none' placeholder='Message For the Creator' /></div>
                    <div onClick={() => pay(counts * 10)} className='flex justify-center'><Button>Support &#8377;{counts * 10}</Button></div>
                </div>
            </div>
        </div>
    )
}

export default User
