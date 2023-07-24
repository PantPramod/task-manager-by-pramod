"use client"

import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {

    const router = useRouter()
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e: any) => {

        e.preventDefault();
        try {
            const signInResponse = await signIn("credentials", {
                username: email,
                password: password,
                redirect: false
            })

            console.log("signInResponse", signInResponse)
            if (!signInResponse?.error) {
                router.push('/dashboard')
            } else {
                setError("Wrong Email or Password")
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='min-h-screen bg-[#0f0c0c] grid place-items-center'>

            <div className='bg-[#0c0909] shadow-xl shadow-[#353333] w-full sm:w-[500px] p-3 py-8 flex items-center justify-center rounded-3xl'>
                <form
                    onSubmit={submitHandler}
                    className=' w-full sm:w-[400px]   rounded-3xl  flex flex-col items-center gap-y-4'>
                    <div className='text-[#f3ecec] text-center py-2 text-xl uppercase font-semibold '>Login Form</div>
                    {error &&
                        <p className='text-xs text-white  text-center w-full py-2 px-2 bg-red-700 rounded-md'>{error}</p>
                    }
                    <input
                        type='text'
                        className='border bg-transparent rounded-md p-2 w-full text-white'
                        placeholder='Email Address '
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <input
                        type='password'
                        className='border bg-transparent rounded-md p-2 w-full text-white'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <button
                        type='submit'
                        className="text-white border w-full p-2 rounded-md mt-5"
                    >
                        Login
                    </button>

                    <Link href="/register" className=' text-blue-600'>Create an account</Link>
                    <div className='relative w-full my-6'>
                        <div className='border-bottom border w-full'>

                        </div>
                        <p className='text-white bg-[#0c0909] absolute top-1/2 left-1/2 px-2 -translate-x-1/2 -translate-y-1/2'>OR</p>
                    </div>

                    <button
                        type='button'
                        onClick={() => signIn('google')}
                        className=' text-white flex items-center justify-center gap-x-3 border rounded-md p-2 px-4 w-full'>
                        <FcGoogle />
                        <span>SignIn With Google</span>
                    </button>


                    <button
                        type='button'
                        onClick={() => signIn('github')}
                        className='text-white flex items-center justify-center gap-x-3 border rounded-md p-2 px-4 w-full'>
                        <BsGithub />
                        <span>SignIn With Github</span>
                    </button>
                </form>
            </div>


        </div>
    )
}

export default LoginForm
