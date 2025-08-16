import React , {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { api } from '../../https';
import { toast } from 'react-toastify'
import { IoCloseCircle } from 'react-icons/io5';

const ServiceEditModal = ({ service, setIsEditServiceModal, fetchServices }) => {
  
    const [category, setCategory] = useState(service.category);
    const [serviceName, setServiceName] = useState(service.serviceName);
    const [price, setPrice] = useState(service.price);
    const [unit, setUnit] = useState(service.unit);
    const [newImage, setNewImage] = useState(null);
    
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);

    const handleClose = () => {
        setIsEditServiceModal(false)
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            if (newImage) {
                formData.append('image', newImage);
            }
            formData.append('category', category);
            formData.append('serviceName', serviceName);
            formData.append('price', price);
            formData.append('unit', unit);

            const { data } = await api.put(`/api/service/${service._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (data.success) {
                toast.success(data.message);
                fetchServices();
                handleClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Fetch categories and units
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const categoriesResponse = await api.get('/api/category/');
                if (categoriesResponse.data.success) {
                    setCategories(categoriesResponse.data.categories);
                }

                // Fetch units
                const unitsResponse = await api.get('/api/unit/');
                if (unitsResponse.data.success) {
                    setUnits(unitsResponse.data.units);
                }
                
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);


    return(

        <div className='fixed inset-0 flex items-center justify-center shadow-lg/10 z-50'
            style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='bg-white border-b-3 border-[#0ea5e9]  rounded-sm p-2 shadow-xl w-120 md:mt-1 mt-1 h-[calc(100vh-2rem)] overflow-y-scroll scrollbar-hidden'
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4 shadow-xl p-2">
                    <h2 className='text-[#1a1a1a] text-sm font-bold'>Edit Item</h2>
                    <button onClick={handleClose} className='rounded-sm text-[#be3e3f] border-b border-[#be3e3f] cursor-pointer'>
                        <IoCloseCircle size={25} />
                    </button>
                </div>

                {/* Modal Body */}
                <form className='mt-3 space-y-6' onSubmit={onSubmitHandler}>
                    {/* Image Upload */}
                    <div className='flex items-center gap-4 mb-2'>
                        <label htmlFor='edit-service-img'>
                            <img
                                className='w-16 h-16 cursor-pointer rounded-full p-1 border border-[#0ea5e9] shadow-xl object-cover'
                                src={newImage ? URL.createObjectURL(newImage) : service.image}
                                alt="Service"
                            />
                        </label>
                        <input
                            onChange={(e) => setNewImage(e.target.files[0])}
                            type='file'
                            id='edit-service-img'
                            hidden
                        />
                        <p className='text-xs font-semibold text-[#0ea5e9]'>Change image</p>
                    </div>

                    {/* Category Dropdown */}
                    <div className='mt-2 flex items-center justify-between'>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Category:</label>
                        <div className='flex w-[80%] items-center p-3 px-4 bg-white shadow-xl'>
                            <select
                                className='w-full bg-sky-100 text-[#1a1a1a] h-8 rounded-sm '
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat.categoryName}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Service Name */}
                    <div className ='flex items-center justify-between'>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Service Name:</label>
                        <div className='flex w-[80%] items-center p-3 bg-white shadow-xl'>
                            <input
                                type='text'
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                            />
                        </div>
                    </div>

                    {/* Price and Unit */}
                    <div className='flex items-center justify-between'>
                      
                            <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Price:</label>
                            <div className=' w-[40%] flex items-center p-3 bg-white shadow-xl'>
                                <input
                                    type='text'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                    required
                                />
                            </div>
                        

        
                            <div className='flex w-[40%] items-center  ml-2 p-2 px-4 bg-white shadow-xl'>
                                <select
                                    className='w-full bg-sky-100 rounded-sm text-[#1a1a1a] h-8'
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    required
                                >
                                    {units.map((unitItem) => (
                                        <option key={unitItem._id} value={unitItem.unitName}>
                                            {unitItem.unitName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                   

                    <button
                        type='submit'
                        className='p-2 rounded-lg mt-6 py-3 text-sm bg-[#0ea5e9] text-white font-semibold cursor-pointer w-full'
                    >
                        Update Service
                    </button>
                </form>
            </motion.div>
        </div>
    );
};


export default ServiceEditModal