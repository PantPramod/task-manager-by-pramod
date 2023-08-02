"use client"

import React, { useContext, useEffect, useState } from 'react'
import CreateButton from '../../components/CreateButton'
import TaskPopUp from '../../components/TaskPopUp'
import { FaPaperPlane } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'
import { TbFlag3Filled } from 'react-icons/tb'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { Reorder } from "framer-motion"
import { BsFillMenuButtonWideFill } from 'react-icons/bs'
import NavBar from '../../components/NavBar'
import { useSession } from 'next-auth/react'
import SideBar from '../../components/SideBar'
import { ThemeContext } from '@/app/layout'

const Dashboard = () => {
    const { data: session } = useSession()
    const [show, setShow] = useState(false)
    const today = new Date();
    today.setHours(0);
    const [mode, setMode] = useState('create')
    const [id, setId] = useState(0)
    const [showDelete, setShowDelete] = useState(false)
    const [data, setData] = useState({
        id: Math.random(),
        title: '',
        description: '',
        priority: 5,
        dueDate: today.toString()
    })

    const [allTasks, setAllTasks] = useState<any>([])
    const [showMenu, setShowMenu] = useState(false)
    const {isDarkMode } = useContext(ThemeContext)
    useEffect(() => {
        setAllTasks(JSON.parse(localStorage.getItem('tasks') || "[]"))
    }, [])

    const submitHandler = () => {
        const { title } = data

        if (title) {
            const alreadyStoredData = localStorage.getItem('tasks')
            if (mode === "create") {
                if (alreadyStoredData) {
                    let tasksArray = JSON.parse(alreadyStoredData);
                    const newArr = [...tasksArray, { ...data, id: Math.random() }]
                    localStorage.setItem('tasks', JSON.stringify(newArr))
                    setAllTasks(newArr)
                } else {
                    localStorage.setItem('tasks', JSON.stringify([{ ...data, id: Math.random() }]))
                    setAllTasks([{ ...data, id: Math.random() }])
                }
            } else if (mode === "update") {
                allTasks[id] = { ...data }
                localStorage.setItem("tasks", JSON.stringify([...allTasks]));
                setAllTasks([...allTasks])
            }

            setShow(false)
        }

    }

    const deleteHandler = () => {
        allTasks.splice(id, 1);
        setAllTasks([...allTasks]);
        localStorage.setItem("tasks", JSON.stringify([...allTasks]));
        setShowDelete(false)

    }

    const editHandler = (title: string, description: string, priority: number, dueDate: Date, index: number) => {
        setId(index)
        setMode('update')
        setShow(true)
        setData({ ...data, title, description, priority, dueDate: dueDate.toString(), id: Math.random() })
    }

    // console.log(allTasks)

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify([...allTasks]))
    }, [allTasks])

    return (
        <div className={`${isDarkMode?"bg-black":"bg-white "} min-h-screen`}>
            <div className='sm:hidden bg-gray-800 p-4'>
                <BsFillMenuButtonWideFill
                    size={25}
                    color="white"
                    cursor="pointer"
                    onClick={() => setShowMenu(!showMenu)}
                />

            </div>
            {
                <div className={`${showMenu ? "translate-x-0" : "-translate-x-[100%]"} sm:translate-x-0 absolute sm:hidden'} w-full transition-all duration-300 ease-in-out block sm:hidden`}>
                    <SideBar show={showMenu} setShow={setShowMenu} />
                </div>
            }
            <CreateButton OnClick={() => {
                setShow(true);
                setMode("create")
                setData({
                    ...data,
                    id: Math.random(),
                    title: '',
                    description: '',
                    priority: 5,
                    dueDate: today.toString()
                })
            }} />


            <div className=' px-10  p-10 pt-3'>
                <Reorder.Group axis="y" values={allTasks} onReorder={setAllTasks}>
                    {allTasks.map((task: any, index: number) => <Reorder.Item
                        key={task?.id}
                        value={task}

                        className={` cursor-pointer ${isDarkMode?"bg-[#250808d2] text-white":"bg-gray-200"}    mt-5  rounded-xl  p-4 w-full max-w-[400px]`}>
                        <div className="flex justify-between">
                            <p className=" font-semibold">{task?.title}</p>
                            <div>
                                <AiOutlineEdit
                                    size={25}
                                    color="blue"
                                    className='mr-4 inline'
                                    onClick={() => editHandler(task?.title, task?.description, +task?.priority, new Date(task?.dueDate), index)}
                                />
                                <AiOutlineDelete
                                    size={25}
                                    color="red"
                                    className='mr-4 inline'
                                    onClick={(e) => { e.stopPropagation(); setId(index); setShowDelete(true) }}
                                />
                                <TbFlag3Filled size={25} color={pToColor[task?.priority]} className='inline' />
                            </div>
                        </div>
                        <p className='text-red-600 text-xs'>{task?.dueDate}</p>
                        <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
                            {task?.description}
                        </div>
                    </Reorder.Item>)}
                </Reorder.Group>
            </div>
            <TaskPopUp
                setShow={setShow} show={show} className={`${isDarkMode?"bg-[#061325] text-white":"bg-white "}  w-[500px] p-4  shadow-lg shadow-black`}>
                <label>Task</label>
                <div className='border border-gray-500 flex items-center px-2 py-2 rounded-md'>
                    <input
                        type='text'
                        className=' bg-transparent  w-full  mt-1 outline-none flex-1'
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                    <select
                        value={data.priority}
                        onChange={(e) => setData({ ...data, priority: +e.target.value })}
                        className=' my-anchor-element mx-2 bg-transparent block border hover:border-gray-500 border-gray-200 px-2 py-2 text-xs outline-none'>
                        <option className='bg-red-500' value={1}>P 1</option>
                        <option className='bg-orange-500' value={2}>P 2</option>
                        <option className='bg-blue-500' value={3}>P 3</option>
                        <option className='bg-green-500' value={4}>P 4</option>
                        <option className='bg-yellow-500' value={5}>P 5</option>
                    </select>
                    <Tooltip anchorSelect=".my-anchor-element" place="top">
                        Set Priority
                    </Tooltip>
                    <FaPaperPlane
                        cursor="pointer"
                        className='flex-0 rotate-[20deg]'
                        size={25}
                        color="blue"
                        onClick={submitHandler}
                    />
                </div>

                <label className='mt-4 inline-block'>Description</label>

                <textarea
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    className='mt-1 outline-none rounded-md border border-gray-500 px-2 py-2 bg-transparent w-full min-h-[100px]'></textarea>

                <label className='mt-4 inline-block'>Due Date</label>

                <input
                    type='date'
                    onChange={(e) => setData({ ...data, dueDate: new Date(e.target.value).toString() })}
                    className='mt-1 rounded-md border border-gray-500 px-2 py-2 bg-transparent w-full outline-none'
                />


            </TaskPopUp>

            <TaskPopUp show={showDelete} setShow={setShowDelete} background='black' className={`p-4 min-w-[90%] sm:min-w-[500px]  relative ${isDarkMode?"bg-black text-white":"bg-white text-black"}`}>
                <p className=''>Are you sure to delete this item</p>
                <div className=' flex justify-between w-full gap-x-8 mt-20'>
                    <button
                        onClick={deleteHandler}
                        className='bg-red-600 text-white px-4 py-2 rounded-md w-1/2'>Delete</button>
                    <button
                        onClick={() => setShowDelete(false)}
                        className='bg-blue-600 text-white px-4 py-2 rounded-md w-1/2'>Cancel</button>
                </div>
            </TaskPopUp>
        </div>
    )
}

export default Dashboard

const pToColor = ["", "red", "orange", "blue", "green", "yellow"]