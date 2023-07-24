"use client"
import React from 'react'
import { signIn } from 'next-auth/react'

type propTypes={
    sm:string
}

const SignInWithSocialMedia = ({sm}:propTypes) => {
    return (
        <button onClick={() => signIn(sm)}>
            Sign In With{" "} <span className='capitalize'>{sm}</span>
        </button>
    )
}


export default SignInWithSocialMedia
