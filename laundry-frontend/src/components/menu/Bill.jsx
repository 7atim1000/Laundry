import React , {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useMutation }  from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { toast } from 'react-toastify'
import { addOrder, addTransaction, updateCustomer } from '../../https';
import { removeCustomer } from '../../redux/slices/customerSlice';
import { getTotalPrice, removeAllItems } from '../../redux/slices/cartSlice';

import Invoice from './Invoice';


const Bill = () => {

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user);
    const customerData = useSelector((state) => state.customer);
    const cartData = useSelector((state) => state.cart);  

    const total = useSelector(getTotalPrice);
    const taxRate = 5.25;
    const tax = (total * taxRate) / 100;
    const totalPriceWithTax = total + tax;

    // payment method
    const [paymentMethod, setPaymentMethod] = useState();
     
    // Payed amount 
    const [payedAmount, setPayedAmount] = useState(0)

    const showPayed = () => {
        setPayedAmount(totalPriceWithTax)
    };
      
    const balance = totalPriceWithTax - payedAmount ;

   


    const cashPaymethod = () => {

        setPaymentMethod('Cash');
        showPayed();
    };
    const onlinePaymethod = () => {

        setPaymentMethod('Online');
        showPayed();
    };

    // report
    const [showInvoice, setShowInvoice] = useState(false);
    const [orderInfo, setOrderInfo] = useState();

    const handlePlaceOrder = async () => {

        if (!setPaymentMethod) {
            enqueueSnackbar('please select a payment method', { variant: "warning" });
            return;
        }
        if (customerData.customerName === '') {
            enqueueSnackbar('please select customer', { variant: "warning" });
            return;
        }
        if (cartData.length === 0) {
            enqueueSnackbar('please select item to serve', { variant: "warning" });
            return;
        }

        if (paymentMethod === "Cash" || "Online") {

            const orderData = {

                orderNumber: `${Date.now()}`,
                orderStatus: "In Progress",
                
                orderDate : customerData.orderDate,
                receiptDate : customerData.receiptDate,
                customer: customerData.customerId,

                customerDetails: {
                    name: customerData.customerName,
                    phone: customerData.contactNo,
                    email: customerData.customerEmail,
                },
           

                orderType: "Invoice",

                bills: {
                    total: total,
                    tax: tax,
                    totalWithTax: totalPriceWithTax,
                    payed: payedAmount,
                    balance: balance,
                },

                items: cartData,

                paymentMethod: paymentMethod,
                user: userData._id,
            };

            orderMutation.mutate(orderData);
        };



    };


    // order Mutation consist update table 
    const orderMutation = useMutation({

        mutationFn: (reqData) => addOrder(reqData),
        onSuccess: (resData) => {
            const { data } = resData.data;
            console.log(data);

            setOrderInfo(data)  
            toast.success('Invoice Placed and Confirmed Successfully .');

            const transactionData = {
                transactionNumber: `${Date.now()}`,

                amount: payedAmount,
                type: 'Income',
                category: 'Invoice',
                refrence: customerData.customerName,
                description: '-',
                date: new Date().toISOString().slice(0, 10),

                user: userData._id
            }
            setTimeout(() => {
                transactionMutation.mutate(transactionData)
            }, 1500);




            // Update customer 
            const balanceData = {
                // balance:  balance + customerData.balance,
                balance: balance + customerData.balance,
                customerId: data.customer
            }

            setTimeout(() => {
                customerUpdateMutation.mutate(balanceData)
            }, 1500);


            setShowInvoice(true); // to open report 

            dispatch(removeCustomer());
            dispatch(removeAllItems());

            // hidePayed();
            setPayedAmount(0)

        },


        onError: (error) => {
            console.log(error);
        }
    });

    // add transaction 
    const transactionMutation = useMutation({
        mutationFn: (reqData) => addTransaction(reqData),

        onSuccess: (resData) => {

            const { data } = resData.data; // data comes from backend ... resData default on mutation     
            toast.success('The income was transfered to the finance department .');
        },
        onError: (error) => {
            console.log(error);
        }
    });

    // update Customer
    const customerUpdateMutation = useMutation({

        mutationFn: (reqData) => updateCustomer(reqData),
        onSuccess: (resData) => {

            console.log(resData);

        },
        onError: (error) => {
            console.log(error)
        }
    });


    return(
        <>
            <div className ='bg-white shadow-xl h-[calc(100vh)] overflow-y-hidden flex flex-col gap-1 p-1'>
                {/* h-[180px] overflow-y-scroll scrollbar-hidden */}


                <div className='flex items-center justify-between px-5 mt-2'>
                    <p className='text-xs text-[#1a1a1a] font-medium mt-2'>Items <span className ='text-md font-medium text-green-600'>({cartData.length})</span></p>
                    <h1 className='text-sky-600 text-md font-bold'><span className='text-xs font-normal text-[#1a1a1a]'>AED </span>{total.toFixed(2)}</h1>
                </div>

                <div className='flex items-center justify-between px-5 mt-2'>
                    <p className='text-xs text-[#1a1a1a] font-medium mt-2'>Tax (5.25%)</p>
                    <h1 className='text-sky-600 text-md font-bold'><span className='text-xs font-normal text-[#1a1a1a]'>AED </span>{tax.toFixed(2)}</h1>
                </div>

                <div className='flex items-center justify-between px-5 mt-2 '>
                    <p className='text-xs text-[#1a1a1a] font-medium mt-2'>Grand Total</p>
                    <h1 className='text-green-600 text-lg font-bold'><span className='text-xs font-normal text-[#1a1a1a]'>AED </span>{totalPriceWithTax.toFixed(2)}</h1>
                </div>



                <div className='flex bg-[#0ea5e9]  items-center justify-between px-5 mt-5 shadow-lg/30 p-5 rounded-lg'>

                    <div className='flex gap-1 items-center justify-between'>
                        <p className='text-xs text-gray-100 font-medium mt-2'>Payed :</p>

                        <input className='w-17 text-white text-xl font-semibold'
                            name='payedAmount'
                            type='text'
                            value={Number(payedAmount).toFixed(2)}
                            onChange={(e) => Number(setPayedAmount(e.target.value))}
                        />
                        <span className='text-xs font-normal text-gray-100 mt-3'> AED</span>
                    </div>

                    <div className ='flex items-center justify-between gap-1'>
                        <p className='text-xs text-gray-100 font-medium mt-2'>Balance :</p>
                        <p className='ml-0  text-[#f6b100]'><span className='text-2xl font-semibold'> {balance.toFixed(2)}</span>
                            <span className='text-xs font-normal text-gray-100'> AED</span>
                        </p>

                    </div>
                    

                </div>

                {/* <hr className='border-sky-400 b-t-2' /> */}


                <div className='flex items-center gap-3 px-5 py-2 mt-6'>
                    <button
                        // onClick={() => setPaymentMethod('Cash')} onClick ={cashPaymethod}
                        onClick={cashPaymethod}
                        className={`px-4 py-2 w-full rounded-lg  font-semibold cursor-pointer 
               ${paymentMethod === "Cash" ? "bg-green-600 text-white" : "bg-white text-sky-600 shadow-lg/30"}`} >Cash</button>

                    <button

                        onClick={onlinePaymethod}
                        className={`px-4 py-2 w-full rounded-lg  font-semibold cursor-pointer 
               ${paymentMethod === "Online" ? "bg-green-600 text-white" : "bg-white text-sky-600 shadow-lg/30"}`} >Online</button>
                </div>

                <div className='flex items-center gap-3 px-5 mt-2'>
                    <button className='bg-[#0ea5e9] px-4 py-2 w-full rounded-lg text-white cursor-pointer font-semibold shadow-lg/30'>Print Receipt</button>
                    <button onClick={handlePlaceOrder} className='bg-[#F6B100] px-4 py-2 w-full rounded-lg text-[#1a1a1a] cursor-pointer font-semibold shadow-lg/30'>Place Order</button>
                </div>

            </div>


            {showInvoice && (
                <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
            )}


        </>
    );
};

export default Bill ;