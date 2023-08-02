"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { BiLogOutCircle } from 'react-icons/bi'
import { signOut } from "next-auth/react"
import Image from 'next/image'
import { BsMoonFill, BsSun } from 'react-icons/bs'
import { ThemeContext } from '../layout'


type propType = {
    user: any
}

const NavBar = ({ user }: propType) => {

    const {isDarkMode, setIsDarkMode} = useContext(ThemeContext)
    return (
        <div className={`${isDarkMode?"bg-black text-[#ffffffdc]":"bg-white text-black"}  p-3 flex justify-between items-center sm:px-10 px-4`}>
            <p className='uppercase font-bold whitespace-nowrap'>To-Do list</p>
            {user ?
                <div className='flex items-center gap-x-4'>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className=''>
                        {isDarkMode ? <BsMoonFill color="white" /> : <BsSun color="red"/>}
                    </button>
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
                <div>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={` ${isDarkMode?"":"border-black"} border mr-4 px-4 py-2 rounded-md`}>
                        {!isDarkMode ? <BsMoonFill color="black" /> : <BsSun />}
                    </button>
                    <Link href="/login">
                        <button className={` ${isDarkMode?"":"border-black"} border  rounded-md p-1 px-4`}>Sign In</button>
                    </Link>
                </div>
            }

        </div>
    )
}

export default NavBar
