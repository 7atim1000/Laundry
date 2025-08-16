import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate()
    return (
        <button onClick={()=> navigate(-1)}className ='bg-sky-400 text-white mt-2 p-2 text-sm font-bold rounded-full cursor-pointer'>
            <IoArrowBackOutline />
        </button>
    )
}

export default BackButton ;