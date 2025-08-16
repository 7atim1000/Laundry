import React ,{useState, useEffect} from 'react' ;

import BottomNav from '../components/shared/BottomNav';
import OrderCard from '../components/orders/OrderCard'
import BackButton from '../components/shared/BackButton';
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { api, getOrders } from '../https/index';
import { enqueueSnackbar } from 'notistack';


const Orders = () => {
    // fetch Invoices
    const [allInvoices, setAllInvoices] = useState([]);

    // filter by date
    const [frequency, setFrequency] = useState('1')
    const [orderStatus, setOrderStatus] = useState('all')
    const [shift, setShift] = useState('all')

    useEffect(() => {

        const getOrders = async () => {
            try {

                const res = await api.post('/api/order/fetch',
                    {
                        frequency,
                        orderStatus,
                        shift,

                        sort: '-createdAt' 
                    });

                setAllInvoices(res.data)
                console.log(res.data)


            } catch (error) {
                console.log(error)
                message.error('Fetch Issue with transaction')
            };
        };

        getOrders();

    }, [frequency, orderStatus, shift]);


    return(
        <section className='bg-white h-[calc(100vh-5rem)] overflow-hidden'>

            <div className='flex items-center justify-between px-10 py-1 shadow-xl mb-1'>

                <div className='flex gap-4 justify-between'>
                    <BackButton />
                    <h1 className='text-[#1a1a1a] text-l font-bold tracking-wider mt-2'>Orders</h1>
                </div>

                <div className='flex gap-2 mt-1'>

                    <button className={`${frequency === '30' ? 'bg-sky-600 text-white' : 'bg-white text-sky-600'} p-3 rounded-lg  shadow-lg/30 text-xs font-medium cursor-pointer`}
                        onClick={() => setFrequency('30')}
                    >One Month
                    </button>


                    <button className={`${orderStatus === 'In Progress' ? 'bg-sky-600 text-white' : 'bg-white text-sky-600'} p-3 rounded-lg  shadow-lg/30 text-xs font-medium cursor-pointer`}
                        onClick={() => setOrderStatus('In Progress')}
                    >In Progress
                    </button>
                    <button className={`${orderStatus === 'Completed' ? 'bg-sky-600 text-white' : 'bg-white text-sky-600'} p-3 rounded-lg  shadow-lg/30 text-xs  font-medium cursor-pointer`}
                        onClick={() => setOrderStatus('Completed')}
                    >Completed
                    </button>


                    <button className={`${shift === 'Morning' ? 'bg-sky-600 text-white' : 'bg-white text-sky-600'} p-3 rounded-lg  shadow-lg/30 text-xs font-medium cursor-pointer`}
                        onClick={() => setShift('Morning')}
                    >Morning
                    </button>

                    <button className={`${shift === 'Evening' ? 'bg-sky-600 text-white' : 'bg-white text-sky-600'} p-3 rounded-lg  shadow-lg/30 text-xs font-medium cursor-pointer`}
                        onClick={() => setShift('Evening')}
                    >Evening
                    </button>

                </div>

            </div>

            <div className='px-10 py-4 flex flex-wrap gap-6 overflow-y-scroll scrollbar-hide '>

                {
                    allInvoices.length > 0 ? (
                        allInvoices.map((order, index) => (
                            <OrderCard key={order._id} order={order} />
                        ))
                    ) : <p className='text-sm font-medium text-[#f6b100]'>No invocies available now</p>
                }

            </div>


            <BottomNav />
        </section>

    );

};


export default Orders ;