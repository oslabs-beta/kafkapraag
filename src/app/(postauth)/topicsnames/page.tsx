'use client'
import TopicsNames from '@components/TopicsNames'
import { useSession } from 'next-auth/react'

const Test: React.FC = () => {
  const { data: session } = useSession()

  if (session != null) {
    return (
    <div className="flex-column">
      <p className="text-center text-4xl font-light">Topics Names</p>
      <div className="flex justify-center font-extralight italic mt-10">
        <TopicsNames/>
      </div>
    </div>
    )
  } else {
    return (<>
  </>)
  }
}

export default Test
