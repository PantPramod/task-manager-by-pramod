import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'

const Login = () => {
    return (
        <div className='min-h-screen bg-[#0f0c0c] grid place-items-center'>

            <div className='bg-[#0c0909] shadow-xl shadow-[#353333] w-[500px] p-3 py-8 flex items-center justify-center'>
                <div className=' w-full sm:w-[400px]   rounded-3xl  flex flex-col items-center gap-y-4'>
                    <div className='text-[#f3ecec] text-center py-2 text-xl uppercase font-semibold '>Register Form</div>

                    <input type='text' className='border bg-transparent rounded-md p-2 w-full' placeholder='User Name' />

                    <input type='text' className='border bg-transparent rounded-md p-2 w-full' placeholder='Email Address ' />

                    <input type='password' className='border bg-transparent rounded-md p-2 w-full' placeholder='Password' />

                   
                    <div className='relative w-full my-6'>
                    <div className='border-bottom border w-full'>
                      
                      </div>
                    <p className='text-white bg-[#0c0909] absolute top-1/2 left-1/2 px-2 -translate-x-1/2 -translate-y-1/2'>OR</p>
                    </div>
                      
                    <button className=' text-white flex items-center justify-center gap-x-3 border rounded-md p-2 px-4 w-full'>
                        <FcGoogle />
                        <span>SignIn With Google</span>
                    </button>
                    
                    
                    <button className='text-white flex items-center justify-center gap-x-3 border rounded-md p-2 px-4 w-full'>
                        <BsGithub />
                        <span>SignIn With Github</span>
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Login
