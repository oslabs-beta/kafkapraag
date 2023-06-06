'use client'
import TopicsNames from '@components/TopicsNames'
import { signIn, useSession } from 'next-auth/react'

const Test: React.FC = () => {
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
      <p className="text-center text-4xl font-light">Topics Names</p>
      <div className="flex justify-center font-extralight italic mt-10">
        <TopicsNames/>
      </div>
    </div>
    )
  }
}

export default Test
