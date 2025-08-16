import React ,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { formatDate, formatTime, getAvatarName } from '../../utils'

const CustomerInfo = () => {
  
    const [dateTime, setDateTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const customerData = useSelector((state) => state.customer);  //// customer gets from redux>store.js  reducer:{ customer }


    return (
        
        <div className='flex items-center justify-between px-4 py-3 h-[65px] shadow-xl'>

            <div className='flex flex-col items-start'>
                <h1 className='text-xs text-sky-600 font-semibold tracking-wide'>{customerData.customerName || 'Customer Name :'}</h1>
                <p className='text-xs text-[#ababab] font-medium mt-1'>{customerData.orderId || 'N/A'} / Dine in</p>
                <p className='text-xs text-[#ababab] font-medium nt-2'>{formatDate(dateTime)} - {formatTime(dateTime)}</p>
            </div>

            <button className='bg-[#f6b100] w-12 h-12  text-sm font-bold rounded-full'>
                {getAvatarName(customerData.customerName || 'CN')}
            </button>
        </div>

    );
};


export default CustomerInfo ;