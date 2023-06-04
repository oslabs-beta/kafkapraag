'use client'
import React, { Dispatch, SetStateAction } from 'react';

interface AddressInputProps {
  setBrokers: Dispatch<SetStateAction<string[]>>
};

const AddressInput: React.FC<AddressInputProps> = ({ setBrokers }) => {
  const handleSubmit = () => {
    // Clear the input field
    setBrokers('')
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
            onChange={(event) => setBrokers(event.target.value)}
          />

          <div className="modal-action">
            <button onClick={handleSubmit} className="btn">Submit</button>
            <label htmlFor="my_modal_6" className="btn modal-close">Close</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressInput
