
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import NavBar from "./components/NavBar"
import { TbFlag3Filled } from 'react-icons/tb'
import Link from "next/link"
import MainPage from "./components/MainPage"

export default async function Home() {
  const session = await getServerSession(options)

  return (

    <div className="min-h-screen bg-[#0f0c0cef]">
      <NavBar user={session?.user} />
      <MainPage/> 
    </div>

  )
}