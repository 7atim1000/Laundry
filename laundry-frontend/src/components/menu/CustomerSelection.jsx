import React ,{useState, useEffect} from 'react'
import { motion } from 'framer-motion'

import { IoCloseCircle } from 'react-icons/io5';
import { IoMdArrowDropright } from "react-icons/io";
import { PiUserCircleCheckLight } from "react-icons/pi";
import { FcSearch } from 'react-icons/fc'
import { BsCalendar2Date } from "react-icons/bs";

import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { enqueueSnackbar } from 'notistack';
import { setCustomer } from '../../redux/slices/customerSlice';
import { api } from '../../https';


const CustomerSelection = ({setIsSelectCustomer}) => {


    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        orderDate: "", receiptDate :"",
    });
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'orderDate' && value) {
            // Calculate receipt date (orderDate + 2 days)
            const date = new Date(value);
            date.setDate(date.getDate() + 2);

            // Format as YYYY-MM-DD for the date input
            const formattedDate = date.toISOString().split('T')[0];

            setFormData(prev => ({
                ...prev,
                orderDate: value,
                receiptDate: formattedDate
            }));
        } else {
            // For all other fields (including manual receiptDate changes)
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // const [orderDate, setOrderDate] = useState('');
    // const [receiptDate, setReceiptDate] = useState('');
    // // ... your other existing state (customerData, etc.)

    // const handleOrderDateChange = (e) => {
    //     const selectedDate = e.target.value;
    //     setOrderDate(selectedDate);

    //     if (selectedDate) {
    //         // Calculate receipt date (orderDate + 2 days)
    //         const date = new Date(selectedDate);
    //         date.setDate(date.getDate() + 2);

    //         // Format as YYYY-MM-DD for the date input
    //         const formattedDate = date.toISOString().split('T')[0];
    //         setReceiptDate(formattedDate);
    //     }
    // };



    const handleClose = (customerId, customerName, customerEmail, contactNo, balance, orderDate, receiptDate) => {
        if (formData.orderDate === '') {
            enqueueSnackbar('please specify order date', { variant: "warning" });
            return;
        }

        dispatch(setCustomer({ customerId, customerName, customerEmail, contactNo, balance, orderDate, receiptDate }));
        setIsSelectCustomer(false);
    };

    // Fetch and search 
    const [list, setList] = useState([]);
    
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/api/customer/')

            if (response.data.success) {
            
                setList(response.data.customers)
                // to Search 
                setFilteredCustomers(response.data.customers);
            
            } else {
                toast.error(response.data.message || 'customer not found')
            }

        } catch (error) {
            // Show backend error message if present in error.response
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message)
            }
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, []);

    
    // create search handler function
    const handleSearch = (term) => {

    setSearchTerm(term);
    if (!term.trim()) {
        setFilteredCustomers(list); // Show all when search is empty
        return;
    }
    
    const filtered = list.filter(customer => 
        customer.customerName.toLowerCase().includes(term.toLowerCase()) ||
        (customer.customerEmail && customer.customerEmail.toLowerCase().includes(term.toLowerCase())) ||
        (customer.contactNo && customer.contactNo.includes(term))
    );
    setFilteredCustomers(filtered);
};



    
    return(
        
       <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg/10 z-50' style={{ backgroundColor:  'rgba(6, 76, 133, 0.4)'}}>

           <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ durayion: 0.3, ease: 'easeInOut' }}
               className='bg-white p-2 rounded-lg shadow-lg/30 w-180 h-[calc(100vh-5rem)] md:mt-5 mt-5 
                
               border-b-2 border-[#0ea5e9]'
           >


               {/*Modal Header */}
               <div className="flex justify-between items-center mb-4 gap-5 shadow-xl p-2">
                    <h2 className='text-sm font-semibold underline text-sky-600'>Please select customer </h2>
                        <div className ='flex items-center justify-between gap-1'>
                            <form>
                                <span className='text-xs text-green-600 font-normal'>Order Date</span> <IoMdArrowDropright className='inline text-green-600' size={20} />

                                <input
                                    type ='date'
                                    name ='orderDate'
                                    value ={formData.orderDate}
                                    onChange ={handleInputChange}
                                    className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none text-xs font-normal border-b border-green-600'
                                    required
                                    autoComplete ='off'
                                />


                                <BsCalendar2Date className ='inline mx-5 w-10 h-10 text-sky-600'/>
                                <span className='text-xs text-green-600 font-normal'>Reciept Date</span><IoMdArrowDropright className='inline text-green-600 ' size={20} />

                                <input
                                    type  ='date'
                                    name ='receiptDate'
                                    value ={formData.receiptDate}
                                    // onChange={(e) => setReceiptDate(e.target.value)} // Still allow manual override
                                    onChange ={handleInputChange}
                                    className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none text-xs font-normal border-b border-green-600'
                                    required
                                    autoComplete ='off'
                                />

                                </form>
                                

                            </div>

                   <button onClick={()=> setIsSelectCustomer(false)} className='rounded-sm text-[#be3e3f] hover:bg-[#be3e3f]/30 cursor-pointer border-b border-[#be3e3f]'>
                       <IoCloseCircle size={25} />
                   </button>
               </div>

                {/*SEARCH*/}
                <div className='flex items-center gap-4 bg-sky-50 text-[#1a1a1a] p-3 w-full shadow-xl'>
                    <FcSearch className='text-sky-600' />
                    <input
                        type='text'
                        placeholder="search"
                        className='bg-transparent outline-none text-[#1a1a1a] border-b border-[#0ea5e9] w-full text-xs font-normal'

                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                {/*Modal Body*/}
                <div className='mt-2 bg-white'>


                    <div className='overflow-x-auto bg-white shadow-xl'>
                        <table className='text-left w-full'>
                            <thead className=''>
                                <tr className='border-b-1 border-[#0ea5e9] text-xs font-normal text-[#1a1a1a]'>
                                    <th className='p-2'>Name</th>
                                    <th className='p-2'>Email</th>
                                    <th className='p-2'>Contact No</th>
                                    <th className='p-2'>Address</th>
                                    <th className='p-2'></th>
                                    <th className='p-2'></th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredCustomers.length === 0
                                    ? (<p className='ml-5 mt-5 text-xs text-[#be3e3f] flex items-start justify-start'>Your customers list is empty!</p>)
                                    : filteredCustomers.map((customer, index) => (

                                        <tr
                                            // key ={index}
                                            className='border-b-3 border-[#f5f5f5] text-xs font-normal text-[#1a1a1a]'
                                        >
                                            <td className='p-2' hidden>{customer._id}</td>
                                            <td className='p-4'>{customer.customerName}</td>
                                            <td className='p-4'>{customer.customerEmail}</td>
                                            <td className='p-2'>{customer.contactNo}</td>
                                            <td className='p-2'>{customer.address}</td>
                                            <td className={`p-2 ${customer.balance === 0 ? 'text-sky-600' : 'text-[#be3e3f]'} text-xs font-bold`}>  {(Number(customer.balance) || 0).toFixed(2)}</td>
                                            <td className='p-2'>

                                                <button className={`text-red-700 cursor-pointer text-sm font-semibold`}>
                                                    <PiUserCircleCheckLight size={20} className='w-7 h-7 text-green-600 rounded-full   flex justify-end'
                                                        onClick={() => handleClose(customer._id, customer.customerName, customer.customerEmail, 
                                                        customer.contactNo, customer.balance, formData.orderDate, formData.receiptDate)} />
                                                </button>

                                            </td>

                                        </tr>

                                    ))}


                            </tbody>
                        </table>

                    </div>
                </div>





            </motion.div>  
        </div>
    );
};


export default CustomerSelection ;