import React from 'react'
import LoginForm from '../components/LoginForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { options } from '../api/auth/[...nextauth]/options'


const Login = async () => {
    const session = await getServerSession(options)

    if (session) {
        redirect('/')
    }
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default Login
