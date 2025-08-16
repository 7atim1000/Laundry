import React ,{useState, useEffect} from 'react'
import Greetings from '../components/home/Greetings';
import RecentOrders from '../components/home/RecentOrders'
import BottomNav from '../components/shared/BottomNav';
import laundry from '../assets/images/laundry-home.jpg'
import { GrInProgress } from 'react-icons/gr'
import { BsCashCoin } from 'react-icons/bs'
import { api } from '../https';
import MiniCart from '../components/home/MiniCart';
import Popular from '../components/home/Popular';

const Home = () => {
    
    // fetch Orders 
    const [allInvoices, setAllInvoices] = useState([]);
    const [inProgressInvoices, setInProgressInvoices] = useState([]);

    // filters
    const [frequency, setFrequency] = useState('1');
    const [orderStatus, setOrderStatus] = useState('Completed');
    const [shift, setShift] = useState('all');

    const [inProgressStatus, setInProgressStatus] = useState('In Progress');
  

    useEffect(() => {

        const getInvoices = async () => {
          
            try {

                const res = await api.post('/api/order/fetch',
                    {
                        frequency,
                    
                        orderStatus,
                        shift
                    });

                setAllInvoices(res.data)
                console.log(res.data)

            } catch (error) {
                console.log(error)
            }
        };

        getInvoices();
    }, [frequency, orderStatus, shift]);




    useEffect(() => {
        const getInProgress = async () => {

        try {

            const res = await api.post('/api/order/fetch',
                {
                    frequency,
                    orderStatus: inProgressStatus,

                    shift
                });

            setInProgressInvoices(res.data)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    };
        
        getInProgress();
        }, [frequency, inProgressStatus, shift]
        );
   

    return (

        <section className ='bg-white h-[calc(85vh)] overflow-y-scroll scrollbar-hidden flex gap-3' >
            {/* Left Div */}
            <div className='flex-[3] bg-white shadow-xl'>

                <Greetings />

                {/*MiniCard --- Earning & inProgress */}
                <div className='flex items-center w-full gap-3 px-8 mt-2'>

                    <MiniCart title='Completed Earning' icon ={<BsCashCoin />} number ={allInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)} />
                    <MiniCart title='In Progress' icon ={<GrInProgress />} number ={inProgressInvoices.reduce((acc, invo) => acc + invo.bills.totalWithTax, 0).toFixed(2)} />

                </div>

                {/* Recent Orders */}
                <RecentOrders />
            </div> 

            {/* Right Div */}
            <div className='flex-[1] bg-white'>
                <Popular />
            </div>
          

            <BottomNav  />
        </section>
    );
};



export default Home ;