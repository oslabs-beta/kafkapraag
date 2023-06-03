'use client'
import { useEffect, useState } from 'react'

const ProducerTesting: React.FC = () => {
  const [producersList, setProducersList] = useState([])
  const [dropDown, setDropDown] = useState('DEFAULT')

  const [producerName, setProducerName] = useState('')
  const [messagesPerSecond, setMessagesPerSecond] = useState('')

  const [brokers,setBrokers] = useState('localhost:9092')
  // Currently using default values for testing, need dynamic values
  // const [brokers, setBrokers] = useState(['localhost:9092'])
  // const [clientId, setClientId] = useState('kafkajs-producer1')
  // Change these from hardcoded values to useState when adding feature to choose cluster connection
  // const brokers = ['localhost:9092']
  const clientId = 'kafkajs-producer1'

  const handleProducerNameInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProducerName(e.target.value)
  }

  const handleMessagesPerSecondInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessagesPerSecond(e.target.value)
  }

  const handleStartButtonClick = (): void => {
    // Handle invalid producer name
    if (producerName === '' || producerName.includes(' ')) {
      window.alert('Producer name cannot be an empty string or contain any spaces.')
      return
    }
    // Handle invalid MPS value
    if (messagesPerSecond === '') {
      window.alert('Messages/second must be an integer value from 1 to 10.')
      setMessagesPerSecond(' ')
      return
    }
    if (parseInt(messagesPerSecond) > 10) {
      window.alert('Messages/second must be an integer value from 1 to 10.')
      setMessagesPerSecond('10')
      return
    }
    if (parseInt(messagesPerSecond) < 1) {
      window.alert('Messages/second must be an integer value from 1 to 10.')
      setMessagesPerSecond('1')
      return
    }

    const requestBody = {
      clientId,
      brokers,
      producerName,
      message: {
        rate: messagesPerSecond,
        size: 100 // Test value for message size
      }
    }

    fetch('/api/producers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(async (data) => await data.json())
      .then((parsed) => {
        console.log(parsed)
        getProducerList()
      })
      .catch((err) => { console.log(err) })
  }

  const handleStopButtonClick = (): void => {
    if (dropDown === 'DEFAULT') {
      window.alert('No producer selected.')
      return
    }

    const requestBody = {
      producerName: dropDown
    }

    fetch('/api/producers', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(async (data) => await data.json())
      .then((parsed) => {
        console.log(parsed)
        getProducerList()
      })
      .catch((err) => { console.log(err) })
  }

  const handleProducerSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDropDown(e.target.value)
  }

  useEffect(() => {
    getProducerList()
  }, [])

  const getProducerList = (): void => {
    fetch('/api/producers')
      .then(async (data) => await data.json())
      .then((parsed) => {
        console.log(parsed.producerList)
        const newProducerList = parsed.producerList.map((prodName: string) => {
          return (
          <option key={`prodlist${Date.now()}`}>{prodName}</option>
          )
        })
        setProducersList(newProducerList.length > 0 ? newProducerList : <option disabled>No producers running</option>)
        setDropDown('DEFAULT')
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <div className="flex flex-col items-center  ">
      <p className="text-2xl mb-7">Producer Testing</p>

      <div className="flex flex-col md:flex-row md:justify-center items-center max-w-[800px]">

        <input
          value={producerName}
          onChange={handleProducerNameInputChange}
          type="text"
          placeholder="Producer name"
          className="input input-bordered w-[200px] md:w-[300px] m-2"
      />

      <input
        value={messagesPerSecond}
        onChange={handleMessagesPerSecondInputChange}
        type="number"
        placeholder="Messages/second"
        className="input input-bordered w-[200px] md:w-[300px] m-2"
      />

      <select
        value={dropDown}
        onChange={handleProducerSelect}
        className="select select-bordered w-[200px] md:w-[276px] m-2"
      >
      <option value="DEFAULT" disabled>Select a producer:</option>
      {producersList}
      </select>

      <button
        onClick={handleStartButtonClick}
        className="btn btn-primary m-2 w-[200px] text-white"
      >
        Start Producer
      </button>

      <div className="flex flex-col md:flex-row justify-center items-center max-w-[800px]">
        <button
          onClick={handleStopButtonClick}
          className="btn btn-primary bg-red-700 hover:bg-red-800 text-white m-2 w-[200px]"
        >
          Stop Producer
        </button>
      </div>
      </div>
    </div>

  )
}

export default ProducerTesting
