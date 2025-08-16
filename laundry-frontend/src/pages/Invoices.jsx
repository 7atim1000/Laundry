import React , {useState, useEffect} from 'react' ;
import BackButton from '../components/shared/BackButton';
import BottomNav from '../components/shared/BottomNav';
import { Progress, Flex } from 'antd'
import { api } from '../https';
import InvoicesDetails from '../components/invoices/InvoicesDetails';


const Invocies = () => {
    // fetch Invoices
    const [allInvoices, setAllInvoices] = useState([]);

    // filter by date
    const [frequency, setFrequency] = useState('30')
    const [orderStatus, setOrderStatus] = useState('all')
    const [shift, setShift] = useState('all')


    useEffect(() => {

        const getOrders = async () => {
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
                message.error('Fetch Issue with transaction')

            }
        };

        getOrders();

    }, [frequency, orderStatus, shift]);


    // fetch Items or services
    const [list, setList] = useState([])
    const fetchCategories = async () => {
      
        try {
            const response = await api('/api/category/')

            if (response.data.success) {
                setList(response.data.categories)
                console.log(response.data.categories)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, []);



    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    const conicColors = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7',
    };

    
    
    return (

        <section className='flex h-[calc(100vh)] overflow-y-scroll scrollbar-hidden gap-3 bg-white shadow-xl'>

            <div className='flex-[4] h-[calc(100vh)] overflow-y-scroll scrollbar-hidden bg-white shadow-xl'>

                <div className='flex items-center justify-between px-8 py-2 shadow-xl'>

                    <div className='flex gap-2 items-center'>
                        <BackButton />
                        <h1 className='text-[#1a1a1a] text-l font-bold'>Orders Management</h1>
                    </div>

                    <div className='flex gap-2 mt-1'>

                        <button className={`${frequency === '30' ? 'bg-sky-500 text-white' : 'bg-white text-sky-600'} p-2 rounded-lg  shadow-lg/30 text-xs  font-medium cursor-pointer`}
                            onClick={() => setFrequency('30')}
                        >One Month
                        </button>
                        <button className={`${frequency === '365' ? 'bg-sky-500 text-white' : 'bg-white text-sky-600'} p-2 rounded-lg  shadow-lg/30 text-xs  font-medium cursor-pointer`}
                            onClick={() => setFrequency('365')}
                        >One Year
                        </button>


                        <button className={`${orderStatus === 'In Progress' ? 'bg-sky-500 text-white' : 'bg-white text-sky-600'} p-2 rounded-lg  shadow-lg/30 text-xs  font-medium cursor-pointer`}
                            onClick={() => setOrderStatus('In Progress')}
                        >In Progress
                        </button>
                        <button className={`${orderStatus === 'Completed' ? 'bg-sky-500 text-white' : 'bg-white text-sky-600'} p-2 rounded-lg  shadow-lg/30 text-xs font-medium cursor-pointer`}
                            onClick={() => setOrderStatus('Completed')}
                        >Completed
                        </button>


                        <button className={`${shift === 'Morning' ? 'bg-sky-500 text-white' : 'bg-white text-sky-600'} p-2 rounded-lg  shadow-lg/30 text-xs font-medium cursor-pointer`}
                            onClick={() => setShift('Morning')}
                        >Morning
                        </button>

                        <button className={`${shift === 'Evening' ? 'bg-sky-500 text-white' : 'bg-white text-sky-600'} p-2 rounded-lg  shadow-lg/30 text-xs font-medium cursor-pointer`}
                            onClick={() => setShift('Evening')}
                        >Evening
                        </button>

                    </div>

                </div>

                <div className='mt-10'>

                    <div className='overflow-x-auto px-5'>
                        <table className='w-full text-left'>
                            <thead className='bg-white text-xs font-normal text-[#1a1a1a]'>
                                <tr className='border-b-2  border-[#0ea5e9]'>
                                   
                                
                                    <th className='p-1'>Order date</th>
                                    <th className='p-1'>Receipt</th>
                                    <th className='p-1'></th> 
                                    <th className='p-1'></th> 
                             
                                   
                                    <th className='p-1'>Customer</th>

                                    <th className='p-1'>Total</th>
                                    <th className='p-1'>Tax</th>
                                    <th className='p-1'>Grand</th>
                                    <th className='p-1'>Payed</th>
                                    <th className='p-1'>Payment</th>
                                    <th className='p-1'>Balance</th>
                                    <th className='p-1'>Status</th>
                                    <th className='p-1'></th>

                                </tr>
                            </thead>


                            <tbody>
                                {
                                    allInvoices.length === 0
                                        ? (<p className='p-1 w-50 text-lg text-[#be3e3f] flex justify-center'>Invoices menu is empty!</p>)
                                        : allInvoices.map((invoice) => {

                                            return (
                                                <InvoicesDetails id ={invoice._id} date ={invoice.date} orderDate ={invoice.orderDate} receiptDate ={invoice.receiptDate} 
                                                    shift ={invoice.shift} length ={invoice.items.length} customer ={invoice.customerDetails.name} total ={invoice.bills.total} tax={invoice.bills.tax}
                                                    totalWithTax ={invoice.bills.totalWithTax} payed ={invoice.bills.payed} payment ={invoice.paymentMethod} 
                                                    balance ={invoice.bills.balance} orderStatus ={invoice.orderStatus} items ={invoice.items}
                                                />
                                            )
                                        })
                                }
                            </tbody>


                        </table>

                    </div>

                </div>




            </div>


            <div className='flex-[2] h-[calc(100vh)] overflow-y-scroll scrollbar-hidden bg-white shadow-xl'>

                <div className='flex items-center justify-center gap-2 p-2 shadow-xl'>

                    <div className='flex items-center justify-between'>
                        <p className='p-2 bg-white text-sky-600 font-semibold text-xs rounded-lg shadow-lg/30' >
                            <span className='text-xs font-normal text-[#1a1a1a]'>Total : </span>
                            {allInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)}
                            <span className='text-xs font-normal text-[#1a1a1a]'> AED</span>
                        </p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='p-2 bg-white text-sky-600 font-semibold text-sm rounded-lg shadow-lg/30'>
                            <span className='text-xs font-normal text-[#1a1a1a]'>Tax : </span>
                            {allInvoices.reduce((acc, invoice) => acc + invoice.bills.tax, 0).toFixed(2)}
                            <span className='text-xs font-normal text-[#1a1a1a]'> AED</span>
                        </p>
                    </div>

                    <div className='flex items-center justify-between shadow-lg/30 rounded-lg px-2'>
                        <p className='text-xs font-normal text-[#1a1a1a]'>Grand Total : </p>
                        <p className='p-2 bg-white text-sky-600 font-semibold text-sm  rounded-lg'>{allInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)}
                            <span className='text-xs font-normal text-[#1a1a1a]'> AED</span>
                        </p>
                    </div>

                </div>

                <hr className ='border-t-3 border-[#f5f5f5]'/>

               


                <div className='h-[calc(100vh)] flex  flex-col items-start gap-4 justify-start p-2 px-2 bg-white overflow-y-scroll scrollbar-hidden shadow-xl' >

                    <p className='text-[#1a1a1a] text-sm font-semibold'>Orders Services :</p>
                    {list.map((category) => {
                        //////////////  status="exception" showInfo={false}
                        const amount = allInvoices.filter((invoice) =>
                            //invoice.invoiceType === "Sale" && invoice.items.name === serv.serviceName)
                            invoice.items.some(item => item.category === category.categoryName))
                            .reduce((acc, invoice) => acc + invoice.bills.total, 0);
                        /////////////////
                        return (

                            amount > 0 && (
                                <div className='shadow-lg/30  p-1 w-full rounded-lg p-2 bg-sky-100' style={{ color: 'red' }}  >
                                    <h5 className='text-xs text-sky-600 font-medium'>{category.categoryName}</h5>

                                    <Flex gap="small" vertical style={{ width: '100%' }}> {/*trailColor="rgba(217, 233, 243, 0.6)" */}
                                        <Progress type='line' style={{ color: 'red' }} strokeColor={twoColors} percent={((amount / allInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0)
                                        ) * 100).toFixed(0)} />
                                    </Flex>
                                </div>

                            )
                        )

                    })}

                </div>

            </div>



            <BottomNav/>
        </section>


    );
};


export default Invocies ;