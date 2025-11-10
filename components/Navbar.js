'use client'
import React, { useState } from 'react'
import Button from './Button'
import Image from 'next/image'
import logo from '../public/tea.gif'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"

function Navbar() {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)
    return (
        <div className='flex justify-between items-center p-1 px-3 sm:px-10 bg-linear-to-r from-indigo-600 to-blue-700'>
            <Link href={'/'} ><div className='flex items-center min-[360px]:text-2xl font-bold gap-2 pb-3'>
                <Image src={logo} alt="logo" width={30} height={30} />
                <span className='pt-4'>GetMeAChai</span>
            </div></Link>
            {session ? (
                <>
                    <Button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
                        setTimeout(() => {
                            setShowdropdown(false)
                        }, 100);
                    }} ><div id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-2  font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center" type="button">Account<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                        </div></Button>

                    <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute right-[48px] top-15 rounded-lg shadow w-40 dark:bg-gray-700`}>
                        <span className='relative h-full w-full inline-block overflow-hidden rounded-lg p-px'>
                            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                            <div className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gray-950 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl'>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                    <Link href={`/${session.user.email.split("@")[0]}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                                    <div onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</div>
                                </ul>
                            </div>
                        </span>
                    </div>
                </>
            ) :
                (<Link href={"/login"}><Button>Login</Button></Link>)}
        </div>
    )
}

export default Navbar
