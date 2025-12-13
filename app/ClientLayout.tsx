"use client"

import type React from "react"
import { Press_Start_2P, Rajdhani } from "next/font/google"

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
})

const rajdhani = Rajdhani({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={rajdhani.className}>
      <style jsx global>{`
        :root {
          --font-pixel: ${pressStart.style.fontFamily};
        }
      `}</style>
      {children}
    </div>
  )
}
