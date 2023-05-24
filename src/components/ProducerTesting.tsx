"use client"
import { useEffect, useState } from "react";

const ProducerTesting = () => {
  const [ producersList, setProducersList ] = useState([]);
  const [ dropDown, setDropDown ] = useState("DEFAULT");

  const [ producerName, setProducerName ] = useState("");
  const [ brokers, setBrokers ] = useState(["127.0.0.1:9092"]);
  const [ clientId, setClientId ] = useState("kafkajs-producer1");


  const handleProducerInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducerName(e.target.value);
  }

  const handleStartButtonClick = () => {
    if (producerName === "" || producerName.includes(" ")) {
      window.alert("Producer name cannot be an empty string or contain any spaces.")
      return;
    }

    const requestBody = {
      clientId,
      brokers,
      producerName
    }

    fetch('/api/producers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then((data) => data.json())
    .then((parsed) => {
      console.log(parsed);
      getProducerList();
    })
    .catch((err) => console.log(err));
  }

  const handleStopButtonClick = () => {
    if (dropDown === "DEFAULT") {
      window.alert("No producer selected.")
      return;
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
    .then((data) => data.json())
    .then((parsed) => {
      console.log(parsed);
      getProducerList();

    })
    .catch((err) => console.log(err));
  }

  const handleProducerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropDown(e.target.value);
  }

  useEffect(() => {
    getProducerList();
  }, [])

  const getProducerList = () => {
    fetch('/api/producers')
    .then((data) => data.json())
    .then((parsed) => {
      console.log(parsed.producerList);
      const newProducerList = parsed.producerList.map((prodName: string) => {
        return(
          <option key={`prodlist${Date.now()}`}>{prodName}</option>
        )
      })
      setProducersList(newProducerList.length ? newProducerList : <option disabled>No producers running</option>);
      setDropDown("DEFAULT");
    })
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-bold">Producer Testing</p>
      <div className="flex justify-center items-center">
        <input value={producerName} onChange={handleProducerInputchange} type="text" placeholder="Enter a producer name" className="input input-bordered w-[300px] m-2" />
        <button onClick={handleStartButtonClick} className="btn btn-primary m-2 w-[170px]">Start Producer</button>
      </div>
      <div className="flex justify-center items-center">
        <select value={dropDown} onChange={handleProducerSelect} className="select select-bordered w-[300px] m-2">
          <option value="DEFAULT" disabled>Select a producer:</option>
          {producersList}
        </select>
        <button onClick={handleStopButtonClick} className="btn btn-primary bg-red-700 text-red-100 m-2 w-[170px]">Stop Producer</button>
      </div>
    </div>
    
  )
}

export default ProducerTesting;