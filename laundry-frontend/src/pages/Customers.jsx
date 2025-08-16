import React, { useState , useEffect } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircle } from 'react-icons/io'; 
import { LiaEditSolid } from "react-icons/lia";
import { PiListMagnifyingGlassFill } from "react-icons/pi"

import { useDispatch } from 'react-redux'
import { FaCcAmazonPay } from "react-icons/fa";

import { toast } from 'react-toastify';

import BackButton from '../components/shared/BackButton';
import CustomerAdd from '../components/customer/CustomerAdd';
import BottomNav from '../components/shared/BottomNav';
import { setCustomer } from '../redux/slices/customerSlice';
// import DetailsModal from '../components/customers/DetailsModal';
// import CustomerPayment from '../components/customers/CustomerPayment';
import { api } from '../https';
import CustomerPayment from '../components/customer/CustomerPayment';
import OrdersDetails from '../components/customer/OrdersDetails';


const Customers = () => {
    const dispatch = useDispatch();

    const Button = [
        { label : 'New Customer' , icon : <IoIosAddCircle className ='text-[#0ea5e9]' size={20} />, action :'customer' }
    ];

    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

    const handleOpenModal = (action) => {
        if(action === 'customer') setIsCustomerModalOpen(true);
    }

    
        
    // fetch customers - any error on .map or length check next function
    const [list, setList] = useState([])

    const fetchCustomers = async() => {

        try {
            const response = await api.get('/api/customer/')
        
            if (response.data.success){
                setList(response.data.customers)
            } else{
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
        
    useEffect(()=>{
        fetchCustomers() 
    },[])
        
        
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const removeCustomer = async (id) => {
              
        try {
            const res = api.post('/api/customer/remove', { id }, )
            if (res.data.success) {
                toast.success(res.data.message)
               
                //Update the LIST after Remove
                await fetchCustomers();
              
            } else{
                toast.error(res.data.message)
             }
            
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
    };


    
    const detailsButton = [
        { label : '' , icon : <PiListMagnifyingGlassFill className ='text-green-600 w-6 h-6'  />, action :'details' }
    ]

    const [isDetailsModal, setIsDetailsModal] = useState(false);

    const handleDetailsModal = (customerId, customerName, balance, action) => {
        dispatch(setCustomer({ customerId, customerName, balance  }));
        if (action === 'details') setIsDetailsModal(true);
    };

    const paymentButton = [
        { label : '' , icon : <FaCcAmazonPay className ='text-[#0ea5e9]' size={22   } />, action :'payment' }
    ]

    const [isPaymentModal, setIsPaymentModal] = useState(false);

    const handlePaymentModal = (customerId, customerName, customerEmail, contactNo ,balance, action) => {
        dispatch(setCustomer({ customerId, customerName , customerEmail, contactNo, balance }));
        if (action === 'payment') setIsPaymentModal(true);

       // console.log(customerId, customerName , balance)

    };



            

    return (
        <section className ='h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden'>
            
            <div className ='flex items-center justify-between px-8 py-2 shadow-xl shadow-xl mb-2'>
                <div className='flex items-center gap-2'>
                    <BackButton />
                    <h1 className='text-md font-semibold text-[#1a1a1a]'>Customers Management</h1>
                </div>
                                        
                <div className ='flex items-center justify-around gap-4 hover:bg-[#0ea5e9] shadow-lg/30'>
                    {Button.map(({ label, icon, action}) => {
                        return(
                            <button 
                                onClick = {() => handleOpenModal(action)}
                                className ='cursor-pointer bg-white  text-[#1a1a1a]
                                px-4 py-2 rounded-full font-medium text-xs flex items-center gap-2'> 
                                {label} {icon}
                            </button>
                            )
                        })}
                </div>
                                    
                {isCustomerModalOpen && <CustomerAdd setIsCustomerModalOpen={setIsCustomerModalOpen} />} 
                                    
            </div>

            
            <div className ='mt-2 bg-white py-1 px-10' >
                      
            <div className ='overflow-x-auto bg-white'>
                <table className ='text-left w-full'>
                    <thead>
                        <tr className ='border-b-3 border-[#0ea5e9] text-xs font-normal text-[#1a1a1a]'>
                            <th className ='p-1'>Name</th>
                            <th className ='p-1'>Email</th>
                            <th className ='p-1'>Contact No</th>
                            <th className ='p-1'>Address</th>
                            <th className ='p-1'>Balance</th>
                         
                            
                            <th className ='p-1' style={{ marginRight: '0px'}}></th>  
                        </tr>
                    </thead>
                        
                <tbody>
                    
                    {list.length === 0 
                    ? (<p className ='ml-2 mt-2 text-xs font-medium text-[#be3e3f] flex items-start justify-start'>Your customers list is empty . Start adding customers !</p>) 
                    :list.map((customer, index) => (
                    
                    <tr
                       // key ={index}
                        className ='border-b-3 border-[#f5f5f5] text-xs font-normal text-[#1a1a1a]'
                    >
                        <td className ='p-1' hidden>{customer._id}</td>
                        <td className ='p-1'>{customer.customerName}</td>
                        <td className ='p-1'>{customer.customerEmail}</td>
                        <td className ='p-1'>{customer.contactNo}</td>
                        <td className ='p-1'>{customer.address}</td>
                        <td className ={`p-1 ${customer.balance === 0 ? 'text-green-600' : 'text-[#be3e3f]'}`}>{customer.balance.toFixed(2)}<span className ='text-[#1a1a1a] font-normal'> AED</span></td>
                     
                        
                        <td className ='p-1  flex flex-wrap gap-5  justify-center bg-zinc-1' style={{marginRight: '0px'}}>

                                <button className='cursor-pointer text-[#0ea5e9] text-sm font-semibold  hover:bg-[#0ea5e9]/10  p-1 '>
                                    <LiaEditSolid size={20} className='w-5 h-5 text-[#0ea5e9] border-b border-[#0ea5e9]'
                                />
                            </button>
                            
                                <button className={`text-[#be3e3f] cursor-pointer text-sm font-semibold  hover:bg-[#be3e3f]/10 p-1`}>
                                    <MdDeleteForever
                                onClick={()=> {setSelectedCustomer(customer); setDeleteModalOpen(true); }} 
                                size ={20}  
                                className ='w-5 h-5 text-[#be3e3f] border-b border-[#be3e3f]'/> 
                            </button>

                           
                           
                            {detailsButton.map(({label, icon, action}) => {

                            return(
                                <button className ='cursor-pointer'
                                    onClick = {() => handleDetailsModal(customer._id, customer.customerName, customer.balance, action)}
                                >
                                {label} {icon}
                                </button>                            
                            )
                        })}


                        {paymentButton.map(({label, icon, action}) => {

                            return(
                                <button className ='cursor-pointer'
                                    onClick = {() => handlePaymentModal(customer._id, customer.customerName, customer.customerEmail, customer.contactNo, customer.balance, action)}
                                >
                                {label} {icon}
                                </button>                            
                            )
                        })}

                        </td>

            
                                               
                    </tr>
               ))}
            
                        
                    </tbody>
                </table>
                        
            </div>
            
            {isDetailsModal && <OrdersDetails setIsDetailsModal ={setIsDetailsModal} />}  

            {isPaymentModal && <CustomerPayment setIsPaymentModal ={setIsPaymentModal} />}    
                    
        </div>

            <BottomNav />

            {/* Place the ConfirmModal here */}
            <ConfirmModal
                open={deleteModalOpen}
                customerName={selectedCustomer?.customerName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeCustomer(selectedCustomer._id);
                    setDeleteModalOpen(false);
                }}
            />

        </section>
    )
};


// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, customerName }) => {
  if (!open) return null;
  return (
       <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
    >
      
      <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
        {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
        <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-[#be3e3f]">{customerName}</span>?</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
};

export default Customers ;