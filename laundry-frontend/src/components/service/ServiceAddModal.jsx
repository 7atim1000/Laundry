import React ,{useState, useEffect}from 'react' ;

import { motion } from 'framer-motion'
import { api } from '../../https';

import { IoCloseCircle } from 'react-icons/io5';

import { toast } from 'react-toastify'
import fileUpload from '../../assets/file-upload.jpg'

const ServiceAddModal = ({setIsAddServiceModal}) => {
    const handleClose = () => {
        setIsAddServiceModal(false)
    };


    const [serImg, setSerImg] = useState(false)
    const [category, setCategory] = useState('Cleaning')
    const [serviceName , setServiceName] = useState('')
    const [price, setPrice] = useState('')
    const [unit, setUnit] = useState('Pc')


    const onSubmitHandler = async(event) => {
        event.preventDefault()

        try {
            if(!serImg) {
                return toast.error('Please selected image')
            }

            const formData = new FormData()

            formData.append('image', serImg) 
            formData.append('category', category)
            formData.append('serviceName', serviceName)
            formData.append('price', price)
            formData.append('unit', unit)
            
            //console log formData
            formData.forEach((value, key) => {
               console.log(`${key} : ${value}`);
            });

            const {data} = await api.post('/api/service', formData, {
                  headers: {
                'Content-Type': 'multipart/form-data',
            },
            // 'Content-Type': 'multipart/form-data' ensures Axios sends the file correctly.

            })

            if (data.success) {
                //toast.success(data.message)
                window.location.reload();
                setIsAddServiceModal(false);

                setSerImg(false)
                setCategory('Cleaning')
                setServiceName('')
                setUnit('')
                setPrice('')

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            
        }
    };

   


    // Categories fetch
    const [list, setList] = useState([])
    const fetchList = async () => {
        try {

            const response = await api.get('/api/category/') // get Method not post Method
            if (response.data.success) {
                setList(response.data.categories);
            }
            else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    // cat selection
    const [selectedValue, setSelectedValue] = useState('');


    // Unit fetch
    const [unitlist, setUnitList] = useState([])
    const fetchUnit = async () => {

        try {

            const response = await api.get('/api/unit/')
            if (response.data.success) {
                setUnitList(response.data.units);
            }
            else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    };

    // unit selection
    const [unitValue, setUnitValue] = useState('');


    useEffect(()=>{
        fetchList() , fetchUnit()
    },[]);


    return (

        <div className='fixed inset-0 flex items-center justify-center shadow-lg/10 z-50' style={{ backgroundColor: 'rgba(6, 76, 133, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-white border-b-3 border-[#0ea5e9] rounded-sm p-2 shadow-xl w-120 md:mt-1 mt-1 h-[calc(100vh-2rem)] overflow-y-scroll scrollbar-hidden'
                //  max-h-[80vh] overflow-y-scroll
            >


                {/*Modal Header */}
                <div className="flex justify-between items-center mb-4 shadow-xl p-2">
                    <h2 className='text-[#1a1a1a] text-sm font-bold'>New Items</h2>

                    <button onClick={handleClose} className='rounded-sm text-[#be3e3f] cursor-pointer border-b 
                    border-[#be3e3f] hover:bg-[#be3e3f]/30'>
                        <IoCloseCircle size={25} />
                    </button>
                </div>

               
                {/*Modal Body*/}
                <form className='mt-3 space-y-6' onSubmit ={onSubmitHandler} >
                        
                        <div className ='flex items-center gap-4 mb-2'>
                            <label htmlFor='ser-img'>
                                <img className='w-16 bg-white w-15 cursor-pointer rounded-full w-15 h-15 p-1 border border-[#0ea5e9] shadow-xl' 
                                src ={serImg ? URL.createObjectURL(serImg): fileUpload}
                                />
                            </label>
                            <input  onChange={(e)=> setSerImg(e.target.files[0])} type ='file' id ='ser-img' hidden />
                            <p className='text-xs font-semibold text-[#1a1a1a] underline'>Upload item image</p>
                        </div>


                    <div className='mt-2 flex items-center justify-between'>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Service :</label>
                        <div className='flex w-[80%] items-center p-2 px-4 bg-white shadow-xl'>
                            <select className='w-full bg-sky-100 text-[#1a1a1a] h-8 rounded-sm' 
                               
                                onChange ={(e) => setCategory(e.target.value)}
                                value ={category}
                                // value={selectedValue}  
                                // name='category' 
                                required
                                >
                               
                               
                               <option className ='text-[#0ea5e9] text-xs font-normal'> </option>
                               
                                {list.map((category, index) => (
                                    <option key={index} value={category.categoryName} className='text-xs font-normal'>
                                        {category.categoryName}

                                </option>

                                ))};
                            </select>
                        </div>
                    </div>

                    <div className ='flex items-center justify-between'>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Item Name :</label>
                        <div className='flex w-[80%] items-center p-3 px-4 bg-white shadow-xl'>
                            <input
                                type='text'
                                // name='serviceName'
                                onChange ={(e)=> setServiceName(e.target.value)} 
                                value ={serviceName}
                
                                placeholder='Enter item name'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>


                    

                    <div className='flex items-center justify-between gap-5'>
                      
                        <label className='text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Price</label>
                        <div className='flex items-center  p-3 px-4 bg-white shadow-xl'>
                            <input
                                type='text'
                                name='price'
                                onChange ={(e)=> setPrice(e.target.value)} 
                                value ={price}

                                placeholder='Enter price of unit'
                                className='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none font-semibold text-sm border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>

                        <div className='flex w-full items-center rounded-lg p-2 px-4 bg-white shadow-xl'>
                            <select className='w-full bg-sky-100 text-[#1a1a1a] h-8 '
                                onChange ={(e) => setUnit(e.target.value)}
                                value ={unit}
                            >

                                <option className='text-[#0ea5e9] text-xs rounded-sm font-normal'></option>
                                {unitlist.map((unit, index) => (

                                    <option key={index} value={unit.unitName} className='text-xs font-normal'>
                                        {unit.unitName}
                                    </option>

                                ))};
                            </select>
                        </div>

                    </div>

                   {/* 
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Service Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {file && (
                            <div className="mt-2">
                                <span className="text-sm text-gray-600">
                                    Selected: {file.name} ({Math.round(file.size / 1024)} KB)
                                </span>
                            </div>
                        )}
                    </div> */}

                    <button
                        type='submit'
                        className='w-full p-2 rounded-lg mt-6 py-3 text-sm bg-[#0ea5e9] text-white font-semibold cursor-pointer'
                    >
                        Add Item
                    </button>

                </form>

            </motion.div>
        </div> 

    );
};


export default ServiceAddModal ;