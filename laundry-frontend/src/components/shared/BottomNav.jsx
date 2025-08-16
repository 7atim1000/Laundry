import React ,{useState} from 'react' ;
import { useLocation, useNavigate } from 'react-router-dom' ;
import { FaHome } from 'react-icons/fa'
import { MdOutlineReorder, MdTableBar } from 'react-icons/md' ;
import { IoCloseCircle } from 'react-icons/io5';
import { CiCircleMore } from 'react-icons/ci' ;
import { GiWaterRecycling } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa6";
import { CiCircleList } from "react-icons/ci";

import { FaUsers } from "react-icons/fa";   
import { MdOutlineFormatListNumberedRtl } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { PiMathOperationsLight } from "react-icons/pi";

import { useDispatch } from 'react-redux';


const BottomNav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isMoreModal, setIsMoreModal] = useState(false);
    const handleMoreOpen = () => {
        setIsMoreModal(true)
    }

    // after redux and Location
    const isActive = (path) => location.pathname === path ;

    return(
        
        <div className='fixed bottom-0 left-0 right-0 bg-linear-65 from-sky-200 to-white p-2 h-15 flex justify-around'>
            <button
                onClick={() => navigate('/')}

                className={`flex items-center justify-center font-bold
                        ${isActive('/') ? "text-white bg-[#0ea5e9]" : "text-sky-600"}
                        w-[150px] rounded-[20px] cursor-pointer`
                }
            ><FaHome className='inline mr-2' size={30} /><p>Home</p>
            </button>

            
            <button
                onClick={() => navigate('/orders')}

                className={`flex items-center justify-center font-bold
                        ${isActive('/orders') ? "text-white bg-[#0ea5e9]" : "text-sky-600"}
                        w-[150px] rounded-[20px] cursor-pointer`
                }
            >
                <MdOutlineReorder className='inline mr-2' size={30} /><p>Orders</p>
            </button>

            <button
                onClick={() => navigate('/invoices')}
                className={`flex items-center justify-center font-bold
                        ${isActive('/invoices') ? "text-white bg-sky-500" : "text-sky-600"}
                        w-[150px] rounded-[20px] cursor-pointer`
                }
            >
                <FaFileInvoice className='inline mr-2' size={30} /><p>Invoices</p>
            </button>

            <button 
                onClick ={handleMoreOpen}
                className='text-sky-600  w-[150px] rounded-[20px] flex items-center justify-center cursor-pointer'>
                <CiCircleMore className='inline mr-2' size={30} />More
            </button>

            <button
                onClick={() => navigate('/menu')}
                className='absolute bottom-1 bg-[#0ea5e9] text-white rounded-full p-3 items-center cursor-pointer'
            >
                <GiWaterRecycling size={30} />
            </button>


            {isMoreModal && (
                <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg z-50' style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }} >
                    <div className='flex flex-col bg-sky- rounded-lg p-3 min-w-[300px]'>
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className='text-[#f5f5f5] text-xl font-semibold'>More Options</h2>
                            <button onClick={() => setIsMoreModal(false)} className='rounded-full  text-[#be3e3f] cursor-pointer'>
                                <IoCloseCircle size={25} />
                            </button>
                        </div>

                        <hr className='border-t-3 border-[#f5f5f5] mb-2' />
                        <div className='flex flex-col gap-5 justify-between items-center px-8 mt-1'>

                            <div className='flex justify-between  items-center shadow-xl '>
                                <button onClick={() => { setIsMoreModal(false); navigate('/customers'); }}
                                    className='flex justify-around items-center  w-70 h-12 shadow-xl bg-white rounded-sm px-2 py-3 text-sm text-[#1a1a1a] font-semibold cursor-pointer'>
                                    Customers
                                    <FaUsers className='inline text-[#0ea5e9] w-8 h-5 ' />
                                </button>
                            </div>
                            <div className='flex justify-between  items-center shadow-xl '>
                                <button onClick={() => { setIsMoreModal(false); navigate('/categories'); }}
                                    className='flex justify-around items-center  w-70 h-12 shadow-xl bg-white rounded-sm px-2 py-3 text-sm text-[#1a1a1a] font-semibold cursor-pointer'>
                                    Services
                                    <MdOutlineFormatListNumberedRtl className='inline text-[#0ea5e9] w-10 h-6 ' />
                                </button>
                            </div>
                            <div className='flex justify-between  items-center shadow-xl '>
                                <button onClick={() => { setIsMoreModal(false); navigate('/services'); }}
                                    className='flex justify-around items-center  w-70 h-12 shadow-xl bg-white rounded-sm px-2 py-3 text-sm text-[#1a1a1a] font-semibold cursor-pointer'>
                                    Items
                                    <GiClothes className='inline text-[#0ea5e9] w-10 h-6 ' />
                                </button>
                            </div>
                            <div className='flex justify-between  items-center shadow-xl '>
                                <button onClick={() => { setIsMoreModal(false); navigate('/units'); }}
                                    className='flex justify-around items-center  w-70 h-12 shadow-xl bg-white rounded-sm px-2 py-3 text-sm text-[#1a1a1a] font-semibold cursor-pointer'>
                                    Units
                                    <CiCircleList className='inline text-[#0ea5e9] w-10 h-6 ' />
                                </button>
                            </div>
                            <div className='flex justify-between  items-center shadow-xl '>
                                <button onClick={() => { setIsMoreModal(false); navigate('/transactions'); }}
                                    className='flex justify-around items-center  w-70 h-12 shadow-xl bg-white rounded-sm px-2 py-3 text-sm text-[#1a1a1a] font-semibold cursor-pointer'>
                                    Transactions
                                    <PiMathOperationsLight className='inline text-[#0ea5e9] w-10 h-6 ' />
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            )}
        
        </div>
    );
};


  

export default BottomNav ;