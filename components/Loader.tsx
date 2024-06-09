'use client'
import React from 'react'
import { PuffLoader } from 'react-spinners'
const Loader = () => {
  return (
    <div className='h-[70vh] flex flex-col justify-center items-center' >
        <PuffLoader
            size={200}
            color={"#000000"}
        />
    </div>
  )
}

export default Loader