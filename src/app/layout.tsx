"use client"
import React, { useEffect, useState } from 'react'
import AuthProvider from './context/AuthProvider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export const ThemeContext = React.createContext({ isDarkMode: true, setIsDarkMode: (arg: boolean) => { } });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const isDark = localStorage.getItem('isDarkMode')
    if (isDark) {
      setIsDarkMode(true)
    }else{
      setIsDarkMode(false)
    }
  }, [])
  useEffect(() => {
     if(isDarkMode){
      localStorage.setItem('isDarkMode', "true")
     }else{
      localStorage.removeItem('isDarkMode')
     } 
      
  }, [isDarkMode])

  const data = {
    isDarkMode,
    setIsDarkMode
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContext.Provider value={data}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  )
}
