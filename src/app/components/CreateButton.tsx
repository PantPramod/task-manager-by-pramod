"use client"
import React from 'react'
import {BiMessageSquareAdd} from 'react-icons/bi'

type PropTypes={
    OnClick:()=>void
}

const CreateButton = ({OnClick}:PropTypes) => {
  return (
    <div 
    onClick={()=>{OnClick()}}
    className='text-white border border-dashed inline-block p-4 m-10 rounded-md cursor-pointer hover:bg-[#0e0e4b] transition-all ease-in-out duration-300'>
      Create New Task
      <BiMessageSquareAdd className="inline ml-4" size={25}/>
    </div>
  )
}

export default CreateButton
