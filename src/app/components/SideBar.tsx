"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiSolidBookAdd } from 'react-icons/bi'
import { BsListCheck, BsClipboardCheckFill } from 'react-icons/bs'
import { FcTodoList } from 'react-icons/fc'
import { BiSolidInbox } from 'react-icons/bi'

type propType = {
    show?: boolean,
    setShow?: (value: boolean) => void
}

const SideBar = ({ show, setShow }: propType) => {
    const pathname = usePathname()
    return (
        <ul className={` w-full  transition-all ease-in-out duration-300 bg-gray-800 h-full text-white`}>
            <Link href="/dashboard/">
                <li className={` ${pathname === "/dashboard" ? "bg-gray-300 text-black" : ""} p-3 hover:bg-gray-300 transition-all ease-in-out duration-300 hover:text-black cursor-pointer`}
                >
                    <BiSolidInbox className='inline mr-2' size={20} />
                    Inbox</li>
            </Link>
            <Link href="/dashboard/today">
                <li className={` ${pathname === "/dashboard/today" ? "bg-gray-300 text-black" : ""} p-3 hover:bg-gray-300 transition-all ease-in-out duration-300 hover:text-black cursor-pointer`}>
                    <span className='text-[green] border border-[green] mr-2 p-[2px] text-xs rounded-sm font-bold'>{new Date().getDate()}</span>
                    Today
                </li>
            </Link>
            <Link href="/dashboard/todo">
                <li className={` ${pathname === "/dashboard/todo" ? "bg-gray-300 text-black" : ""} p-3 hover:bg-gray-300 transition-all ease-in-out duration-300 hover:text-black cursor-pointer`}>
                    <FcTodoList className='inline mr-2' size={20} />
                    To do(s)
                </li>
            </Link>

        </ul>
    )
}

export default SideBar
