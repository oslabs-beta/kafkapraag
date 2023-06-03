'use client'

import Image from 'next/image'
import logo from 'src/assets/kafkaPRAAG-logo-transparent.png'

import { getProviders, signIn } from 'next-auth/react'
// interface NavProps {
//   children: React.ReactNode
// }

const Landing: React.FC = () => {
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
          <p className="py-6 text-lg max-w-xs md:text-xl md:max-w-lg font-light">Your<span className="font-semibold"> Apache Kafka </span>health and performance visualizer.</p>
          <div className="flex flex-col items-center md:inline">
            <button className="btn btn-primary px-10 m-2 w-[200px]" onClick={() => {
              getProviders()
                .then((data) => {
                  signIn('_', { callbackUrl: 'http://localhost:3000/overall' })
                    .catch((err) => { console.log(err) })
                })
                .catch((err) => { console.log(err) })
            }}>Authenticate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
