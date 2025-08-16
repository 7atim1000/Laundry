import React , {useState, useEffect} from 'react'
import BackButton from '../components/shared/BackButton'

import { IoIosAddCircle } from 'react-icons/io'; 
import { MdDeleteForever } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { api } from '../https';
import { toast } from 'react-toastify'
import ServiceAddModal from '../components/service/ServiceAddModal';
import ServiceEditModal from '../components/service/ServiceEditModal';
import BottomNav from '../components/shared/BottomNav';


const Services = () => {
    const addBtn = [{ label: 'New Item', action: 'service', icon: <IoIosAddCircle className='text-[#0ea5e9] w-6 h-6' /> }];
    const editBtn = [{ label: '', action: 'edit', icon: <LiaEditSolid size={20} className='w-6 h-6 text-sky-600 rounded-full' /> }];

    const [isAddServiceModal, setIsAddServiceModal] = useState(false);
    const handleAddServiceModal = (action) => {
        if (action === 'service') setIsAddServiceModal(true)
    };


    

    // Fetch services
    const [services, setServices] = useState([]);
    const [isEditServiceModal, setIsEditServiceModal] = useState(false);
    const [currentService, setCurrentService] = useState(null);

     const fetchServices = async () => {
        try {
            const { data } = await api.get('/api/service');
            if (data.success) {
                setServices(data.services);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);


    // Handle edit
    const handleEdit = (service) => {
        setCurrentService(service);
        setIsEditServiceModal(true);
    };



    // remove 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const removeService = async (id) => {

        try {
            const response = await api.post('/api/service/remove', { id },)

            if (response.data.success) {
                toast.success(response.data.message)

                //Update the LIST after Remove
                await fetchServices();

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };


    
    return (
        <section className ='h-[calc(100vh)] overflow-y-scroll scrollbar-hidden bg-white'>

            <div className='flex items-center justify-between px-9 py-2 shadow-xl'>

                <div className='flex items-center gap-2'>
                    <BackButton />
                    <h1 className='text-[#1a1a1a] text-md font-bold tracking-wider'>Items Management</h1>
                </div>

                <div className='flex items-center  gap-4 hover:bg-[#0ea5e9] shadow-lg/30'>

                    <div className='flex items-center gap-3'>
                        {
                            addBtn.map(({ label, icon, action }) => {
                                return (
                                    <button onClick={() => handleAddServiceModal(action)}
                                        className='bg-white px-4 py-2 rounded-full text-[#1a1a1a] cursor-pointer
                                        font-medium text-xs flex items-center gap-2'>
                                        {label} {icon}
                                    </button>
                                )
                            })
                        }

                        {isAddServiceModal && <ServiceAddModal setIsAddServiceModal={setIsAddServiceModal} />}

                    </div>

                </div>

            </div>

            {/** table  */}
            <div className='mt-2 bg-white py-1 px-10'>


                <div className='overflow-x-auto bg-white'>
                    <table className='text-left w-full'>
                        <thead className=''>
                            <tr className='border-b-3 border-[#0ea5e9] text-xs font-normal text-[#1a1a1a]'>
                               
                                <th className='p-1'>Service</th>
                                 <th></th>
                                <th className='p-1'>Name</th>
                                <th className='p-1'>Price</th>
                             
                                <th className='p-1'></th>
                            </tr>
                        </thead>

                        <tbody>

                            {services.length === 0
                                ? (<p className='ml-2 w-full mt-2 text-xs font-normal text-[#be3e3f] flex items-start justify-start'>Your items list is empty . Start adding items !</p>)
                                
                                : services.map((service) => (

                                    <tr
                                        key={service._id}
                                        className='border-b-3 border-[#f5f5f5] text-xs font-normal text-[#1a1a1a]'
                                    >
                                        <td className='p-1' hidden>{service._id}</td>
                                      
                                        <td className='p-1 bg-sky-100'>{service.category}</td>
                                        <td className ='p-1'>
                                            <img className ='rounded-full border-1 border-[#0ea5e9] w-9 h-9' src ={service.image}/></td>
                                        
                                        <td className='p-1'>{service.serviceName}</td>
                                        <td className='p-1'>{service.price}
                                            <span className ='text-sky-600 font-normal'> AED </span>
                                            <span className ='text-white'>---</span>
                                            <span className ='text-green-600 font-normal'> FOR </span>
                                            <span className ='text-sky-600 font-normal'> {service.unit}</span>
                                        </td>

                                        <td className='p-1'>

                                            <button className='cursor-pointer text-[#0ea5e9] text-sm font-semibold  hover:bg-[#0ea5e9]/10  p-1 ml-2'>
                                                <LiaEditSolid size={20} className='w-5 h-5 text-[#0ea5e9] border-b border-[#0ea5e9]'
                                                onClick={() => handleEdit(service)}
                                                />
                                            </button>

                                            <button className={`text-[#be3e3f] cursor-pointer text-sm font-semibold  hover:bg-[#be3e3f]/10  p-1 ml-2`}>
                                                <MdDeleteForever
                                                    onClick={() => { setSelectedService(service); setDeleteModalOpen(true); }} size={20}
                                                    className='w-5 h-5 text-[#be3e3f] border-b border-[#be3e3f]'
                                                />
                                            </button>

                                        </td>

                                    </tr>

                                ))}


                        </tbody>
                        <tfoot>
                            <tr className="bg-[#0ea5e9] font-bold text-white text-xs">
                                <td className="p-1" colSpan={1}>Count : </td>
                                <td className="p-2">{services.length}</td>
                                <td></td><td></td><td></td><td></td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>

           

            {/* Edit Service Modal */}
            {isEditServiceModal && currentService && (
                <ServiceEditModal
                    service ={currentService}
                    setIsEditServiceModal ={setIsEditServiceModal}
                    fetchServices ={fetchServices}
                />
            )}




            <ConfirmModal

                open={deleteModalOpen}
                serviceName={selectedService?.serviceName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeService(selectedService._id);
                    setDeleteModalOpen(false);
                }}
            />
            
            <BottomNav/>
        </section>
    );
};




// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, serviceName }) => {
  if (!open) return null;
  return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >
      
        <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
            {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
            <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{serviceName}</span>?</p>
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


export default Services ;