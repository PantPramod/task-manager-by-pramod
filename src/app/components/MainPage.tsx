"use client"
import React, { useContext } from 'react'
import { ThemeContext } from '../layout'
import Link from 'next/link'
import { TbFlag3Filled } from 'react-icons/tb'

const MainPage = () => {
    const {isDarkMode } = useContext(ThemeContext)
    return (
        <div className={`flex flex-col md:flex-row  ${isDarkMode?"bg-black":"bg-white"}`}>
        <div className="w-full md:w-1/2 h-[50vh] sm:h-[calc(100vh-58px)] flex items-center justify-center flex-col ">
          <h1 className="text-[#7933b3] text-2xl sm:text-4xl uppercase  text-center leading-[150%] py-10 px-10  font-bold tracking-[5px]">
            <span className="text-white">Create</span>
            <br />
            <span className="text-blue-700">your daily tasks</span>
            <br />
            <span className="text-pink-500">and goals and manage </span>
            <br />
            <span>them easily</span>
          </h1>

          <Link href={"/dashboard"}>
            <button className="hover:scale-105 transition-all ease-in-out duration-300 px-4 py-2 border border-red-500 rounded-ms rounded-md text-red-500 ">Go To Dashboard</button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 flex gap-x-10 p-4">
          <div className="w-full sm:w-1/2 flex items-center justify-center flex-col gap-y-2">

            <div className={`max-w-[250px] ${isDarkMode?"bg-[#0a0606] text-white":"bg-gray-50 text-black"} min-h-[100px] rounded-xl  p-4 `}>
              <div className="flex justify-between">
                <p className=" font-semibold">Task 1</p>

                <TbFlag3Filled size={25} color={"blue"} />
              </div>
              <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, impedit aliquid
              </div>
            </div>

            <div className={`max-w-[250px] ${isDarkMode?"bg-[#0a0606] text-white":"bg-gray-50 text-black"} min-h-[100px] rounded-xl  p-4 `}>
              <div className="flex justify-between">
                <p className=" font-semibold">Task 2</p>

                <TbFlag3Filled size={25} color={"green"} />
              </div>
              <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, impedit aliquid
              </div>
            </div>

            <div className={`max-w-[250px] ${isDarkMode?"bg-[#0a0606] text-white":"bg-gray-50 text-black"} min-h-[100px] rounded-xl  p-4 `}>
              <div className="flex justify-between">
                <p className=" font-semibold">Task 3</p>

                <TbFlag3Filled size={25} color={"red"} />
              </div>
              <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, impedit aliquid
              </div>
            </div>

            <div className={`max-w-[250px] ${isDarkMode?"bg-[#0a0606] text-white":"bg-gray-50 text-black"} min-h-[100px] rounded-xl  p-4 `}>
              <div className="flex justify-between">
                <p className=" font-semibold">Task 4</p>

                <TbFlag3Filled size={25} color={"yellow"} />
              </div>
              <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, impedit aliquid
              </div>
            </div>


          </div>

          <div className="hidden sm:w-1/2 sm:flex items-center justify-center flex-col gap-y-2">

          <div className={`max-w-[250px] ${isDarkMode?"bg-[#0a0606] text-white":"bg-gray-50 text-black"} min-h-[100px] rounded-xl  p-4 `}>
              <div className="flex justify-between">
                <p className=" font-semibold">Task 1</p>

                <TbFlag3Filled size={25} color={"blue"} />
              </div>
              <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, impedit aliquid
              </div>
            </div>

            <div className={`max-w-[250px] ${isDarkMode?"bg-[#0a0606] text-white":"bg-gray-50 text-black"} min-h-[100px] rounded-xl  p-4 `}>
              <div className="flex justify-between">
                <p className=" font-semibold">Task 2</p>

                <TbFlag3Filled size={25} color={"green"} />
              </div>
              <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, impedit aliquid
              </div>
            </div>

            <div className={`max-w-[250px] ${isDarkMode?"bg-[#0a0606] text-white":"bg-gray-50 text-black"} min-h-[100px] rounded-xl  p-4 `}>
              <div className="flex justify-between">
                <p className=" font-semibold">Task 3</p>

                <TbFlag3Filled size={25} color={"red"} />
              </div>
              <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, impedit aliquid
              </div>
            </div>

            <div className={`max-w-[250px] ${isDarkMode?"bg-[#0a0606] text-white":"bg-gray-50 text-black"} min-h-[100px] rounded-xl  p-4 `}>
              <div className="flex justify-between">
                <p className=" font-semibold">Task 4</p>

                <TbFlag3Filled size={25} color={"yellow"} />
              </div>
              <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, impedit aliquid
              </div>
            </div>


          </div>
        </div>

      </div>
  )
}

export default MainPage
