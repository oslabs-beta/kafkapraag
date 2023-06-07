'use client'
import React, { type Dispatch, type SetStateAction } from 'react'

interface AddressInputProps {
  setBrokers: Dispatch<SetStateAction<string[]>>
};

const AddressInput: React.FC<AddressInputProps> = ({ setBrokers }) => {
  return (
    <section>
      <label htmlFor="my_modal_6" className="btn btn-primary">Change cluster address</label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-center gap-2">
          <label htmlFor="text" className="text-xl">Input Cluster Host Address:</label>
          <input
            type="text"
            placeholder="Your Cluster Address"
            className="flex items-center input input-bordered input-primary w-full max-w-xs"
            onChange={(event) => { setBrokers([event.target.value]) }}
          />
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-primary modal-close">Confirm</label>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddressInput
