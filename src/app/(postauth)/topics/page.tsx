'use client'
import Topics from '@components/Topics'

const Topic: React.FC = () => {
  return (
    <div className="flex-column">
      <p className="text-center text-4xl font-bold">Producers Request Rate</p>
      <div className="m-10"></div>
      <div className="flex justify-center">
        <Topics/>
      </div>
    </div>
  )
}

export default Topic
