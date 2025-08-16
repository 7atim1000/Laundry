import React from 'react'
import { FcSearch } from 'react-icons/fc'
import { FaUserCircle } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { GiWaterRecycling } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../https'
import { removeUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux';

const Headers = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutMutation = useMutation({
        mutationFn: () => logout(),
        onSuccess: (data) => {
            console.log(data);
            dispatch(removeUser());

            navigate('/auth')
        },
        onError: (error) => {
            console.log(error)
            //const { response } = error;
            //enqueueSnackbar(response.data.message, { variant: "error" });
        }
    });

    const handleLogout = () => {
        logOutMutation.mutate();
    }

    // userSlice (reducer)
    const userData = useSelector(state => state.user);


    return (
        <header className='flex justify-between items-center py-2 px-8 bg-linear-65 from-sky-200 to-white '>
            {/*LOGO */}
            <div className='flex items-center gap-2'>
                <GiWaterRecycling className='text-[#0ea5e9] text-3xl ' size={40} />
                <h1 className='cursor-pointer text-md font-semibold text-sky-600 under-line hover:underline hover:text-green-400'
                    onClick={() => navigate('/')}>Laundry</h1>
            </div>

            
            {/*SEARCH*/}
            <div className='flex items-center gap-4 bg-white text-black rounded-[10px] px-5 py-2 w-[500px] shadow-xl'>
                <FcSearch className='text-sky-600' />
                <input
                    type='text'
                    placeholder="search"
                    className='bg-transparent outline-none border-b border-[#0ea5e9] w-full text-[#1a1a1a]'
                />
            </div>

            {/* Dashboard & Bell - LOGED DEAILS */}
            <div className='flex items-center gap-4'>

                {/*Dashboard */}

                {userData.role === "Admin" && (

                    <div onClick={() => navigate('/dashboard')} className='rounded-lg p-3 cursor-pointer'>
                        <MdDashboardCustomize className='text-[#0ea5e9] text-2xl' />
                    </div>

                )}


                {/*Bills */}
                <div className='rounded-lg p-3 cursor-pointer'>
                    <FaBell className='text-[#f6b100] text-2xl' />
                </div>


                {/*User */}
                <div className='flex flex-center gap-3 cursor-pointer mt-1'>
                    <FaUserCircle className='text-[#0ea5e9]' size={35} />
                    <div className='flex flex-col'>
                        <h1 className='text-xs font-medium text-green-600'>{userData.name || "User-name"}</h1>
                        <p className='text-xs text-sky-600 font-normal'>{userData.role || "User-role"}</p>
                    </div>

                    <AiOutlineLogout className='text-[#be3e3f] mt-2' size={25} onClick={handleLogout} />

                </div>
            </div>

        </header>
    )
}


export default Headers ;