'use client'
import ProducerTesting from '@components/ProducerTesting'
import { signIn, useSession } from 'next-auth/react'

const ProducersRequestRate: React.FC = () => {
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
      <h2 className="text-center text-4xl font-light">Cluster Testing</h2>
      <div className="flex justify-center mt-10">
        <ProducerTesting/>
      </div>
    </div>
    )
  }
}

export default ProducersRequestRate
