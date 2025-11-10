'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import DashboardForm from '@/components/DashboardForm'
import { getUser } from '@/actions/useractions'


function Dashboard() {

  const { data: session } = useSession()
  const [currUser, setCurrUser] = useState()
  const router = useRouter()

  const getData = async () => {
    let u = await getUser(session?.user?.email.split('@')[0])
    setCurrUser(u)
  }

  useEffect(() => {
    document.title = `Dashboard - Get me a chai`
    if (!session) {
      router.push("/login")
    }
    else {
      getData()
    }
  }, [])



  return (
    <div className='flex justify-center items-center min-h-[83.9vh] py-10'>
      <div className='flex bg-linear-to-r from-[#2dd4bf]  to-[#1f2937] min-w-[60vw] rounded-2xl'>
        <div className='flex flex-col gap-10 basis-4/10 items-center justify-center p-10'>
          <img src={currUser?.profilePicture} alt="logo" className='size-[200px] rounded-full' />
          <div className='flex flex-col gap-2 items-center'>
            Lets Get Started
            <div>It takes just Couple of minutes</div>
          </div>
        </div>
        <div className='basis-6/10 bg-linear-to-br from-[#9d174d] via-[#d946ef] to-[#f0abfc] p-10 rounded-2xl'>
          <DashboardForm currUser={currUser} setCurrUser={ setCurrUser}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
