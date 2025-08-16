import React, {useState} from 'react'

import { IoMdArrowDropright } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

import { useSelector } from 'react-redux'
import BackButton from '../components/shared/BackButton';
import CustomerSelection from '../components/menu/CustomerSelection';
import MenuContainer from '../components/menu/MenuContainer';
import CustomerInfo from '../components/menu/CustomerInfo';
import CartInfo from '../components/menu/CartInfo';
import Bill from '../components/menu/Bill';


const Menu = () => {
    const customerData = useSelector(state => state.customer);

    const cstButton = [{ label: 'Select Customer', action: 'customer' }]

    const [isSelectCustomer, setIsSelectCustomer] = useState();
    const handleSelectCustomer = (action) => {
        if (action === 'customer') setIsSelectCustomer(true)
    }


        
    return(
        <section className ='bg-white shadow-xl h-[calc(100vh)] overflow-hidden flex gap-3'>
          
            {/* left side */}
            <div className='flex-[3] bg-white'>

                <div className='flex items-center justify-between px-3 py-1 shadow-xl'>

                    <div className='flex items-center gap-2'>
                        <BackButton />
                        <h1 className='text-[#1a1a1a] text-l font-bold'>Cashair</h1>
                    </div>

                    <div className='flex items-center justify-content shadow-xl px-1 h-10 bg-sky-50 border-b border-[#0ea5e9]'>
                        <div className='flex items-center gap-3 cursor-pointer '>

                            <div className='p-4  mb-4 rounded-md flex justify-center cursor-pointer'>
                                {cstButton.map(({ label, action }) => {

                                    return (
                                        <button onClick={() => handleSelectCustomer(action)} className='flex gap-1 items-center cursor-pointer'>
                                            <p className='text-xs mt-3 underline text-[#1a1a1a] font-semibold'>{label}</p>
                                            <IoMdArrowDropright className='inline mt-4 text-sky-600' size={20} />
                                        </button>
                                    );
                                })}
                            </div>

                            <FaCircleUser className='h-6 w-6 text-green-600' />
                            <div className='flex flex-col items-start'>
                                <p className='text-xs font-semibold text-[#1a1a1a]'>
                                    Customer :
                                </p>
                                <p className='text-xs font-normal text-sky-600'>
                                    {customerData.customerName || 'Customer name'}
                                </p>

                            </div>

                            <div className='flex flex-col items-start'>
                                <p className='text-xs font-semibold text-[#1a1a1a]'>
                                    Balance :
                                </p>

                                <p className={`${customerData.balance === 0 ? 'text-green-600' : 'text-[#be3e3f]'} text-xs font-normal`}>
                                    {(Number(customerData.balance) || 0).toFixed(2)}
                                    <span className='text-xs font-normal text-[#1a1a1a] font-normal'> AED</span>
                                </p>
                            </div>
                            
                            <div className ='flex items-center gap-2'>
                                
                                <span className='text-xs font-normal text-green-600 font-medium'>Order Date</span> <IoMdArrowDropright className='inline text-green-600' size={20} />
                                <p className ='text-xs font-normal'>{customerData.orderDate}</p>
                                
                                <span className='text-xs font-normal text-green-600 font-medium'>Reciept Date</span><IoMdArrowDropright className='inline text-green-600 ' size={20} />
                                <p className ='text-xs font-normal'>{customerData.receiptDate}</p>

                            
                            </div>

                            

                        </div>

                    </div>

                </div>
              
                    <MenuContainer />
               
                </div>

            
           {/* right side */ }
            <div className='flex-[1] bg-white shadow-xl'>
                 <CustomerInfo /> 
                {/* <hr className='border border-sky-400 mt-2 ' /> */}
                <CartInfo/>
                {/* <hr className='border border-sky-400' /> */}
                <Bill />
            </div>

          {isSelectCustomer && <CustomerSelection setIsSelectCustomer={setIsSelectCustomer}/>}
        </section>
    );
};


export default Menu ;