import React from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa';
import { getAvatarName } from '../../utils';

// evedence
const OrderCard = ({key, order}) => {
    
    return (

            <div className='w-[400px] bg-white p-4 rounded-lg mb-4 shadow-lg/30 border-b-3 border-sky-500'>
                <div className='flex items-center gap-5'>
               
                <button className='bg-sky-600 w-13 h-13 text-white text-xs font-semibold rounded-full'>{getAvatarName(order.customerDetails.name)}</button>
               
                <div className='flex items-center justify-between w-[100%]'>
                   
                    <div className='flex flex-col items-start gap-1'>
                       <h1 className='text-[#1a1a1a] text-xs font-semibold tracking-wide'>{order.customerDetails.name}</h1>
                       <p className={`${order.shift === 'morning' ? 'text-[#f6b100]' : 'text-sky-600'} text-sm font-medium`}>{order.shift}</p> 
       
                    </div>
       
                    <div className='flex flex-col items-center gap-2'>
                       {
                        order.orderStatus === "Completed" ? (
                            <>
                                <p className='text-green-900 bg-green-300 py-2 px-2 rounded-lg text-xs'>{order.orderStatus}</p>
                                <p className='text-[#1a1a1a] text-xs'><FaCircle className='inline mr-1 text-green-600'/>Completed</p>
                            </>
                            
                        ) : (
                            <>
                                <p className='text-white bg-[#f6b100] py-2 px-2 rounded-lg text-xs font-normal'>{order.orderStatus}</p>
                                <p className='text-[#1a1a1a] text-xs font-normal'><FaCircle className='inline mr-1 text-[#f6b100]'/>Preparing</p>
                            </>
                          
                        )
                       }
                    </div>

                </div>

                </div>


                <div className='flex justify-around items-center mt-4 text-[#ababab]'>
                    <p className ='text-sky-600 text-sm font-semibold'>{order.date? new Date(order.date).toLocaleDateString('en-GB') : ''}</p>
                    <p className ='text-sm font-semibold text-sky-600'>{order.items.length} <span className ='text-xs font-normal'>Items</span></p>
                </div>
                <hr className ='w-full mt-4 text-sky-500 border-t-1'/>

                <div className ='flex items-center justify-between mt-4'>
                    <h1 className='text-[#1a1a1a] text-sm font-semibold'>Total</h1>
                    <p className='text-sky-600 text-lg font-semibold'>
                    <span className ='text-xs font-normal text-[#1a1a1a]'>UAE </span>
                    {order.bills.totalWithTax.toFixed(2)}</p>
                </div>
               
             </div>
             
    )
}


export default OrderCard; 