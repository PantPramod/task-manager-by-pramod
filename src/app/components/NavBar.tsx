"use client"
import Link from 'next/link'
import React from 'react'
import { Tooltip } from 'react-tooltip'
import { BiLogOutCircle } from 'react-icons/bi'
import { signOut } from "next-auth/react"
import Image from 'next/image'

type propType = {
    user: any
}

const NavBar = ({ user }: propType) => {
    // console.log("user==>", user)
    return (
        <div className='bg-black text-[#ffffffdc] p-3 flex justify-between items-center sm:px-10 px-4'>
            <p className='uppercase font-bold whitespace-nowrap'>To-Do list</p>
            {user ?
                <div className='flex items-center gap-x-4'>
                    <p className='whitespace-nowrap'>
                        <span className='hidden sm:inline'>
                        Welcome
                        </span>
                        <span className='inline sm:hidden'>Hi, </span>
                        {" "}{user?.name.split(' ')[0]}</p>
                    <Image 
                    className="object-contain w-8 h-8 rounded-full"
                    width={50}
                    height={50}
                    src={user?.image}
                    alt={user?.name}
                    />
                    <BiLogOutCircle
                        color="white"
                        className="my-anchor-element"
                        cursor="pointer"
                        onClick={() => signOut()}
                        size={25}
                    />
                    <Tooltip anchorSelect=".my-anchor-element" place="top">
                        Logout
                    </Tooltip>
                </div>

                :

                <Link href="/login">
                    <button className='border  rounded-md p-1 px-4'>Sign In</button>
                </Link>
            }

        </div>
    )
}

export default NavBar
