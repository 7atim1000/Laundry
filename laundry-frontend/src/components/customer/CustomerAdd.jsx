import React , { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { addCustomer } from '../../https';
import { motion } from 'framer-motion'
import { enqueueSnackbar } from 'notistack';
import { IoCloseCircle } from 'react-icons/io5'; 

const CustomerAdd = ({setIsCustomerModalOpen}) => {
    const handleClose = () => {
        setIsCustomerModalOpen(false)
    };

    const [formData, setFormData] = useState({
        customerName :"", 
        customerEmail :"",
        contactNo :"",
        address :"",
        balance :0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        CustomerMutation.mutate(formData)
        window.location.reload()
        setIsCustomerModalOpen(false)
    };


    const CustomerMutation = useMutation({
        mutationFn: (reqData) => addCustomer(reqData),
        onSuccess: (res) => {

            const { data } = res;
            //console.log(data)
            enqueueSnackbar(data.message, { variant: "success" });
        },

        onError: (error) => {
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });

            console.log(error);
        },
    });


    return (
        
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50' style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-white rounded-sm border-b-3 border-[#0ea5e9]  p-2 shadow-xl w-120 md:mt-1 mt-1 h-[calc(100vh-2rem)] overflow-y-scroll scrollbar-hidden'
            >


                {/*Modal Header */}
                <div className="flex justify-between items-center shadow-xl p-2">
                    <h2 className='text-[#1a1a1a] text-sm font-bold'>New Customer</h2>
                    <button onClick={handleClose} className='rounded-md  text-[#be3e3f] cursor-pointer border-b border-[#be3e3f] hover:bg-[#be3e3f]/30'>
                        <IoCloseCircle size={25} />
                    </button>
                </div>

                {/*Modal Body*/}
                <form className='mt-3 space-y-6' onSubmit={handleSubmit}>
                    
                    <div className='mt-5 flex items-center justify-between'>
                        <label className='w-[25%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Customer Name :</label>
                        <div className='flex w-[75%] items-center p-3 shadow-xl'>
                            <input
                                type='text'
                                name='customerName'
                                value={formData.customerName}
                                onChange={handleInputChange}

                                placeholder='Enter customer name'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className='mt-6 flex justify-between items-center'>
                        <label className='text-sky-600 w-[25%] block mb-2 mt-3 text-xs font-medium'>Customer email :</label>
                        <div className='flex w-[75%] items-center p-3 bg-sky-50 shadow-xl'>
                            <input
                                type='email'
                                name='customerEmail'
                                value={formData.customerEmail}
                                onChange={handleInputChange}

                                placeholder='Enter customer email'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>


                    <div className ='flex items-center justify-between'>
                        <label className='text-sky-600 w-[25%] block mb-2 mt-3 text-xs font-medium'>Contact number : </label>
                        <div className='flex items-center w-[75%] p-3 bg-sky-50 shadow-xl'>
                            <input
                                type='text'
                                name='contactNo'
                                value={formData.contactNo}
                                onChange={handleInputChange}

                                placeholder='+971 9999999'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className ='flex items-center justify-between'>
                        <label className='w-[25%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Address : </label>
                        <div className='flex w-[75%] items-center rounded-lg py-4 px-4 bg-sky-50 shadow-xl'>
                            <input
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder='Enter address of customer'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                                required
                                autoComplete='none'
                            />

                        </div>
                    </div>

                    <div className ='flex items-center justify-between'>
                        <label className='w-[25%] text-sky-600 block mb-2 mt-3 text-xs font-medium'>Balance : </label>
                        <div className='flex w-[75%] items-center rounded-lg py-4 px-4 bg-sky-50 shadow-xl'>
                            <input
                                type='text'
                                name='balance'
                                value={formData.balance}
                                onChange={handleInputChange}

                                placeholder='Enter opening balance of customer'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none  font-medium text-sm font-semibold border-b border-[#0ea5e9] w-full'
                                required
                                autoComplete='none'
                            />

                        </div>
                    </div>




                    <button
                        type='submit'
                        className='p-3 rounded-lg mt-6 py-3 text-sm bg-[#0ea5e9] text-white font-semibold cursor-pointer'
                    >
                        Add Customer
                    </button>


                </form>

            </motion.div>
        </div>

    );
    
};



export default CustomerAdd ;