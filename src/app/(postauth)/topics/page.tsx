"use client"
import Topics from "@components/Topics";

const Topic = () => {

  return (
    <div className="flex-column">
      <p className="text-center text-4xl font-light">Producers Request Rate</p>
      <div className="flex justify-center shadow-none border-none">
        <Topics/>
      </div>
    </div>
  )
}

export default Topic;