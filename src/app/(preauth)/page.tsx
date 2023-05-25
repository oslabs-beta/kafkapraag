"use client"

import Link from "next/link";

import { getProviders, signIn, signOut} from 'next-auth/react'
type NavProps = {
  children: React.ReactNode
}

const Landing = () => {
  
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg flex flex-col justify-center items-center">
          <div className="font-title font-semibold text-primary inline-flex text-6xl transition-all duration-200 md:text-8xl text-center">
            <span className="lowercase">kafka<span className="text-base-content uppercase">PRAAG</span></span> 
          </div>
          <p className="py-6 text-lg max-w-xs md:text-xl md:max-w-lg">Your Apache Kafka health and performance visualizer.</p>
          <div className="flex flex-col items-center md:inline">
            {/* <Link href="api/auth/signin" className="btn btn-primary px-10 m-2 w-[200px]">Login</Link> */}

            <button className="btn btn-primary px-10 m-2 w-[200px]" onClick={async (e)=> {
            const prov =  await getProviders();
            signIn(prov, {callbackUrl: 'http://localhost:3000/testing'})
            }}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;