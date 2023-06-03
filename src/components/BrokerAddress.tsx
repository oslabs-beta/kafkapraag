'use client'
import React, { useState, createContect } from 'react';

const BrokerAddress: React.FC = () => {
  // const Context = createContext();

  const [hostAddress, setHostAddress] = useState('');

  const handleSubmit = () => {
    // Perform any necessary actions with the hostAddress state
    console.log(hostAddress);

    // Clear the input field
    setHostAddress('');
  };

  return ( 
    <div>
      <label htmlFor="my_modal_6" className="btn">Change cluster address</label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label htmlFor="text" className="text-lg">Input Cluster Host Address:</label>
          <input
            type="text"
            placeholder="Type here"
            className="flex items-center input input-bordered input-primary w-full max-w-xs"
            value={hostAddress}
            onChange={(event) => setHostAddress(event.target.value)}
          />

          <div className="modal-action">
            <button onClick={handleSubmit} className="btn">Submit</button>
            <label htmlFor="my_modal_6" className="btn modal-close">Close</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerAddress;
