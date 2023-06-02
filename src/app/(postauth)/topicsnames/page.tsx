'use client'
import TopicsNames from '@components/TopicsNames'
import { useSession } from 'next-auth/react'

const Test: React.FC = () => {
  const { data: session } = useSession()

  if (session != null) {
    return (
    <div className="flex-column">
      <p className="text-center text-4xl font-bold">Topics Names</p>
      <div className="m-10"></div>
      <div className="flex justify-center">
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
