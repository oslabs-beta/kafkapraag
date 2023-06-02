"use client"
import TopicsNames from "@components/TopicsNames";
import { useSession, signIn, signOut } from "next-auth/react"

const Test = () => {
  const { data: session } = useSession()

  if (session) return (
    <div className="flex-column">
      <p className="text-center text-4xl font-light">Topics Names</p>
      <div className="flex justify-center font-extralight italic mt-10">
        <TopicsNames/>
      </div>
    </div>
  )
  else return (<>
                <button onClick={(e)=> {
                signOut({callbackUrl: 'http://localhost:3000'})
                console.log(e)
                }}>Not authorized.  Click here to log in!</button>
  </>)
}

export default Test;