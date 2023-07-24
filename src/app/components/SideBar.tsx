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
            <Link href="/dasbboard/">
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
            <Link href="/dasbboard/create">
                <li className={` ${pathname === "/dashboard/create" ? "bg-gray-300 text-black" : ""} p-3 hover:bg-gray-300 transition-all ease-in-out duration-300 hover:text-black cursor-pointer`}>
                    <BiSolidBookAdd className='inline mr-2' size={20} />
                    <span>Create New</span>

                </li>
            </Link>
            <Link href="/dasbboard/listview">
                <li className={` ${pathname === "/dashboard/listview" ? "bg-gray-300 text-black" : ""} p-3 hover:bg-gray-300 transition-all ease-in-out duration-300 hover:text-black cursor-pointer`}>
                    <BsListCheck className="inline mr-2" size={20} />
                    list View

                </li>

            </Link>
            <Link href="/dasbboard/boardview">
                <li className={` ${pathname === "/dashboard/boardview" ? "bg-gray-300 text-black" : ""} p-3 hover:bg-gray-300 transition-all ease-in-out duration-300 hover:text-black cursor-pointer`}>
                    <BsClipboardCheckFill className="inline mr-2" size={20} />
                    Board View</li>
            </Link>
        </ul>
    )
}

export default SideBar
