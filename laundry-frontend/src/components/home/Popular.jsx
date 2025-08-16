import React , {useState, useEffect}  from 'react'
import { api } from '../../https';

const  Popular = () => {

    // Fetch services
    const [items, setItems] = useState([]);
   
    const fetchServices = async () => {
        try {
            const { data } = await api.get('/api/service');
            if (data.success) {
                setItems(data.services);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);


    return (
       <div className='' >
            <div className='bg-white w-full rounded-lg items-center h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden shadow-xl'>
                
                <div className='flex justify-between items-center px-6 py-2 w-[100%] shadow-xl'>
                    <h1 className='text-[#0ea5e9] text-xs font-semibold tracking-wide'>Service all that</h1>
                    {/* <a className='text-[#025cca] text-sm font-semibold'>View all</a> */}
                </div>
                
                <div className= ''>
                    {
                        items.map((item) => {
                            return (
                                <div key={item._id} className= 'flex items-center gap-4 bg-white rounded-[15px] px-2 py-1 mx-2 mt-2 shadow-lg/30 cursor-pointer hover:bg-[#f5f5f5]'>
                                    {/* <h1 className='text-[#02ca3a] font-bold text-sm mr-4' >{dish._id < 10 ? `0${dish._id}` : dish._id}</h1> */}
                                    <img src={item.image} alt={item.name} className='w-[35px] h-[35px] rounded-full border-b-3 border-[#0ea5e9]' />
                                    <div>
                                        <h1 className='text-[#1a1a1a] text-xs font-semibold mt-1 tracking-wide'>{item.serviceName}</h1>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                

            </div>
       </div>
    )
}

export default Popular ;