"use client"

import React, { useEffect, useRef, useState } from 'react'
import CreateButton from '../components/CreateButton'
import TaskPopUp from '../components/TaskPopUp'
import { FaPaperPlane } from 'react-icons/fa'
import { Tooltip } from 'react-tooltip'
import { TbFlag3Filled } from 'react-icons/tb'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { Reorder } from "framer-motion"
import { BsFillMenuButtonWideFill } from 'react-icons/bs'
import NavBar from '../components/NavBar'
import { useSession } from 'next-auth/react'
import SideBar from '../components/SideBar'
import { IoMdAdd } from 'react-icons/io'
import Button from '../components/Button'

const Dashboard = () => {
  const { data: session } = useSession()
  const [show, setShow] = useState(false)
  const today = new Date();
  today.setHours(0);

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

  const [showAddTaskBox, setShowAddTaskBox] = useState(false)

  const [value, setValue] = React.useState("");
  const rows = value.split("\n").length;

  const dateRef = useRef<any>();
  const selectRef = useRef<any>();



  useEffect(() => {
    setAllTasks(JSON.parse(localStorage.getItem('tasks') || "[]"))
  }, [])

  const submitHandler = () => {
    const { title } = data

    if (title) {
      const alreadyStoredData = localStorage.getItem('tasks')

      if (alreadyStoredData) {
        let tasksArray = JSON.parse(alreadyStoredData);
        const newArr = [...tasksArray, { ...data, id: Math.random() }]
        localStorage.setItem('tasks', JSON.stringify(newArr))
        setAllTasks(newArr)
      } else {
        localStorage.setItem('tasks', JSON.stringify([{ ...data, id: Math.random() }]))
        setAllTasks([{ ...data, id: Math.random() }])
      }
      setShowAddTaskBox(false)
    }

  }


  const updateHandler = () => {
    const { title } = data

    if (title) {
      allTasks[id] = { ...data }
      localStorage.setItem("tasks", JSON.stringify([...allTasks]));
      setAllTasks([...allTasks])
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
    setShow(true)
    setData({ ...data, title, description, priority, dueDate: dueDate.toString(), id: Math.random() })
  }

  // console.log(allTasks)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify([...allTasks]))
  }, [allTasks])

  const addTaskHandler = () => {
    setShowAddTaskBox(true)
    setData({
      ...data,
      id: Math.random(),
      title: '',
      description: '',
      priority: 5,
      dueDate: today.toString()
    })
  }

  return (
    <>
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
      <div className='p-10'>
        <style>
          {`
          .addtask:hover .text{
            color:forestgreen;
          }
          .addtask:hover .circle{
            background:forestgreen;
          }

          .select:hover button{
            background:forestgreen;
          } 
        `}
        </style>
        <h2 className='text-white font-bold text-xl'>Inbox</h2>

        <Reorder.Group axis="y" values={allTasks} onReorder={setAllTasks}>
          {allTasks.map((task: any, index: number) => <Reorder.Item
            key={task?.id}
            value={task}

            className=" cursor-pointer  bg-[#131010] text-white  mt-5  rounded-xl  p-4 w-full ">
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
            <p className={`${new Date(task?.dueDate) < new Date() ? "text-red-600" : "text-green-600"}  text-xs`}>{task?.dueDate}</p>
            <div className="p-2  border border-gray-500 line-clamp-3 text-xs mt-2 rounded-md overflow-hidden text-[#b9acac]">
              {task?.description}
            </div>
          </Reorder.Item>)}
        </Reorder.Group>

        {
          !showAddTaskBox ?
            <p
              onClick={addTaskHandler}
              className='addtask flex gap-x-4 items-center cursor-pointer mt-4 text-white'>
              <span className=' transition-all ease-in-out duration-300 circle w-4 h-4 rounded-full  flex justify-center leading-[100%] items-center'>
                <IoMdAdd />
              </span>
              <span className='transition-all ease-in-out duration-300 text '>Add Task</span>
            </p>
            :
            <div className='border rounded-md p-2 mt-4 relative'>
              <input
                type='text'
                placeholder='Task name'
                className='bg-transparent text-white block outline-none w-full text-[14px]'
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              <textarea
                value={data.description}
                onChange={(e) => { setValue(e.target.value); setData({ ...data, description: e.target.value }) }}
                className='bg-transparent text-white block outline-none w-full text-xs my-4'
                rows={rows}
                placeholder='description'>

              </textarea>

              <div className='mb-4 flex gap-x-4'>
                <Button
                  className=' hover:bg-gray-800'
                  background='gray-500'
                  fontSize='xs'
                  px={2}
                  py={1}
                  color="white"
                  isTailwind
                  onClick={() => dateRef.current.showPicker()}>
                  Due Date
                </Button>
                <input
                  onChange={(e) => setData({ ...data, dueDate: new Date(e.target.value).toString() })}
                  id="input-id"
                  type="date"
                  ref={dateRef}
                  className='z-[-1] left-0 absolute'
                />
                <div className='relative select'>
                  <Button
                    background='green-500'
                    hoverBackground='green-800'
                    fontSize='xs'
                    px={2}
                    py={1}
                    mr={4}
                    color="white"
                    isTailwind
                    onClick={() => selectRef.current.focus()}>
                    Priority
                  </Button>
                  <select
                    value={data.priority}
                    onChange={(e) => setData({ ...data, priority: +e.target.value })}
                    ref={selectRef}
                    className='cursor-pointer opacity-0 absolute left-0 p-1 rounded-md bottom-0 w-[50px] text-xs'>
                    <option value={1}>Priority 1</option>
                    <option value={2}>Priority 2</option>
                    <option value={3}>Priority 3</option>
                    <option value={4}>Priority 4</option>
                    <option value={5}>Priority 5</option>
                  </select>
                </div>
              </div>
              <hr />

              <div className=' flex justify-end w-full mt-5'>
                <button
                  onClick={() => setShowAddTaskBox(false)}
                  className='bg-gray-500 hover:bg-gray-700 text-white rounded-md px-2 py-1 mr-4 text-[14px] w-[77.58px]'>Cancel</button>
                <button
                  onClick={submitHandler}
                  className='bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1 text-[14px]'>Add Task</button>
              </div>
            </div>
        }




     

        <TaskPopUp
          setShow={setShow} show={show} className='bg-[#061325] w-[500px] p-4 text-white shadow-lg shadow-black'>
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
              onClick={updateHandler}
            />
          </div>

          <label className='mt-4 inline-block'>Description</label>

          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className='outline-none mt-1 rounded-md border border-gray-500 px-2 py-2 bg-transparent w-full min-h-[100px]'></textarea>

          <label className='mt-4 inline-block'>Due Date</label>

          <input
            type='date'
            onChange={(e) => setData({ ...data, dueDate: new Date(e.target.value).toString() })}
            className='mt-1 rounded-md border border-gray-500 px-2 py-2 bg-transparent w-full outline-none'
          />


        </TaskPopUp>

        <TaskPopUp show={showDelete} setShow={setShowDelete} background='black' className='p-4 min-w-[90%] sm:min-w-[500px]   relative'>
          <p className='text-white'>Are you sure to delete this item</p>
          <div className=' flex justify-between w-full gap-x-8 mt-20'>
            <button
              onClick={deleteHandler}
              className='bg-red-600 text-white px-4 py-2 rounded-md w-1/2'>Delete</button>
            <button
              onClick={() => setShowDelete(false)}
              className='bg-blue-600 text-white px-4 py-2 rounded-md w-1/2'>Cancel</button>
          </div>
        </TaskPopUp>


        {/* <div className=''>
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

            className=" cursor-pointer  bg-black text-white  mt-5  rounded-xl  p-4 w-full max-w-[400px]">
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
        setShow={setShow} show={show} className='bg-[#061325] w-[500px] p-4 text-white shadow-lg shadow-black'>
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
          className='mt-1 rounded-md border border-gray-500 px-2 py-2 bg-transparent w-full h-[100px]'></textarea>

        <label className='mt-4 inline-block'>Due Date</label>

        <input
          type='date'
          onChange={(e) => setData({ ...data, dueDate: new Date(e.target.value).toString() })}
          className='mt-1 rounded-md border border-gray-500 px-2 py-2 bg-transparent w-full outline-none'
        />


      </TaskPopUp>

      <TaskPopUp show={showDelete} setShow={setShowDelete} background='black' className='p-4 min-w-[500px]  relative'>
        <p className='text-white'>Are you sure to delete this item</p>
        <div className=' flex justify-between w-full gap-x-8 mt-20'>
          <button
            onClick={deleteHandler}
            className='bg-red-600 text-white px-4 py-2 rounded-md w-1/2'>Delete</button>
          <button
            onClick={() => setShowDelete(false)}
            className='bg-blue-600 text-white px-4 py-2 rounded-md w-1/2'>Cancel</button>
        </div>
      </TaskPopUp>
    </div> */}
      </div>
    </>
  )
}

export default Dashboard

const pToColor = ["", "red", "orange", "blue", "green", "yellow"]