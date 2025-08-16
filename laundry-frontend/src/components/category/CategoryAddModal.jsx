import React , {useState} from 'react'

import { IoCloseCircle } from 'react-icons/io5';
import { enqueueSnackbar } from 'notistack';
import { motion } from 'framer-motion';

import {useMutation} from '@tanstack/react-query';
import { addCategory } from '../../https';

const CategoryAddModal=({setIsAddCategoryModal}) => {

    const [formData, setFormData] = useState({
        categoryName: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        categoryMutation.mutate(formData)
        window.location.reload()
        setIsAddCategoryModal(false)
    };



    const categoryMutation = useMutation({
        mutationFn: (reqData) => addCategory(reqData),
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



    const handleClose = () => {
        setIsAddCategoryModal(false)
    };



    return (
       
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-xl z-50' style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-white rounded-sm border-b-3 border-[#0ea5e9]  p-2 shadow-xl w-120 md:mt-1 mt-1  overflow-y-scroll scrollbar-hidden '
            >


                {/*Modal Header */}
                <div className="flex justify-between items-center mb-4 shadow-xl p-2">
                    <h2 className='text-[#1a1a1a] text-sm font-semibold'>Add Service</h2>
                    <button onClick={handleClose} className='text-[#be3e3f] cursor-pointer rounded-sm border-b border-[#be3e3f] 
                    hover:bg-[#be3e3f]/30'>
                        <IoCloseCircle size={25} />
                    </button>
                </div>

                {/*Modal Body*/}
                <form className='mt-3 space-y-6' onSubmit={handleSubmit}>
                    
                    <div className='mt-5'>
                        <label className='text-[#0ea5e9] block mb-2 mt-3 px-4 text-sm font-medium'>Service Name :</label>
                        <div className='mt-5 flex items-center justify-between gap-5'>
                            <div className='w-full flex items-center  p-3 shadow-xl'>
                                <input
                                    type= 'text'
                                    name= 'categoryName'
                                    value= {formData.categoryName}
                                    onChange= {handleInputChange}

                                    placeholder='Enter service name'
                                    className='bg-transparent text-[#1a1a1a] focus:outline-none  border-b border-[#0ea5e9] w-full'
                                    required
                                    autoComplete='none'
                                />
                            </div>

                            <button
                                type='submit'
                                className='rounded-lg px-3 py-2 text-sm font-semibold bg-sky-600 text-white cursor-pointer'
                            >
                                Save
                            </button>

                        </div>

                    </div>

                </form>
            </motion.div>
        </div>

    );
};


export default CategoryAddModal ;