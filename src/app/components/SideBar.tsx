"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import { BiSolidBookAdd } from 'react-icons/bi'
import { BsListCheck, BsClipboardCheckFill } from 'react-icons/bs'
import { FcTodoList } from 'react-icons/fc'
import { BiSolidInbox } from 'react-icons/bi'
import { ThemeContext } from '../layout'

type propType = {
    show?: boolean,
    setShow?: (value: boolean) => void
}

const SideBar = ({ show, setShow }: propType) => {
    const pathname = usePathname()
    const {isDarkMode } = useContext(ThemeContext)
    return (
        <ul className={` w-full  transition-all ease-in-out duration-300 ${isDarkMode?"bg-gray-800 text-white":"bg-gray-200 text-black"}  h-full `}>
            <Link href="/dashboard/">
                <li className={` ${pathname === "/dashboard" ? "bg-gray-300 text-black" : ""} p-3 hover:bg-gray-300 transition-all ease-in-out duration-300 hover:text-black cursor-pointer`}
                >
                    <BiSolidInbox className='inline mr-2' size={20} />
                    Inbox</li>
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
