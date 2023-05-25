"use client"
import TopicsNames from "@components/TopicsNames";

const Test = () => {

  return (
    <div className="flex-column">
      <p className="text-center text-4xl font-bold">Topics Names</p>
      <div className="m-10"></div>
      <div className="flex justify-center">
        <TopicsNames/>
      </div>
    </div>
  )
}

export default Test;