"use client"

import Image from 'next/image';
import logo from "src/assets/kafkaPRAAG-logo-transparent.png"

import { getProviders, signIn, signOut} from 'next-auth/react'
type NavProps = {
  children: React.ReactNode
}

const Landing = () => {
  
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-lg flex flex-col justify-center items-center">
          <div className="font-title font-semibold text-primary inline-flex text-6xl transition-all duration-200 md:text-8xl text-center">
            <Image
      src={logo}
      alt="kafkaPRAAG logo"
      width={700}
      height={700}
    />

          </div>
          <p className="py-6 text-lg max-w-xs md:text-xl md:max-w-lg font-light">Your<span class="font-semibold"> Apache Kafka </span>health and performance visualizer.</p>
          <div className="flex flex-col items-center md:inline">
            <button className="btn btn-primary px-10 m-2 w-[200px]" onClick={async (e)=> {
            const prov =  await getProviders();
            signIn(prov, {callbackUrl: 'http://localhost:3000/testing'})
            }}>Authenticate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;