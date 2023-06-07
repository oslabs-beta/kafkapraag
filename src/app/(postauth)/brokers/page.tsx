'use client'
import BytesPerSecond from '@components/BrokersBytesInGraph'
import { signIn, useSession } from 'next-auth/react'

const Brokers: React.FC = () => {
  const { data: session } = useSession()

  if (session === null) {
    return (<div className='md:mr-80 mt-80 flex flex-wrap justify-center '>    <button className='btn btn-outline btn-accent' onClick={(e) => {
      signIn({ callbackUrl: 'http://localhost:3000/overall' })
        .catch((err) => { console.log(err) })
    }}>You are not currently authorized to view this page.  Click here to sign in</button>
  </div>)
  } else {
    return (
    <div className="flex-column">
      <p className="text-center text-4xl font-light">Metrics</p>
      <div className="flex justify-center mt-10">
        <BytesPerSecond/>
      </div>
    </div>
    )
  }
}

export default Brokers
