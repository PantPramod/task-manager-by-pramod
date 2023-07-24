import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                try {
                    const { data } = await axios.post(`https://node-ecommerce-backend-5x4l.onrender.com/api/user/login`, {
                        email: credentials?.username,
                        password: credentials?.password
                    })
                    // console.log(data)
                    return { name: credentials?.username, email: credentials?.username, image: undefined, access: data?.accesstoken }
                } catch (err) {
                    return null
                }

            }
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return `${baseUrl.replace('/dashboard', "")}/dashboard`

        }
    }
}