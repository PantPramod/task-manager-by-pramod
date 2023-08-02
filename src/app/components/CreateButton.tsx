"use client"
import React, { useContext } from 'react'
import {BiMessageSquareAdd} from 'react-icons/bi'
import { ThemeContext } from '../layout'

type PropTypes={
    OnClick:()=>void
}

const CreateButton = ({OnClick}:PropTypes) => {
  const {isDarkMode } = useContext(ThemeContext)
  return (
    <div 
    onClick={()=>{OnClick()}}
    className={` border border-dashed inline-block p-4 m-10 rounded-md cursor-pointer  transition-all ease-in-out duration-300 ${isDarkMode?"text-white bg-[#0a0a30] hover:bg-[#0e0e4b]":" text-black "}`}>
      Create New Task
      <BiMessageSquareAdd className="inline ml-4" size={25}/>
    </div>
  )
}

export default CreateButton
