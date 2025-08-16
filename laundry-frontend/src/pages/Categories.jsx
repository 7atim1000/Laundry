import React , {useState, useEffect} from 'react'
import { MdDeleteForever } from "react-icons/md";
import { IoIosAddCircle } from 'react-icons/io'; 
import { FiEdit3 } from "react-icons/fi";
import { api } from '../https';
import { toast } from 'react-toastify'
import BackButton from '../components/shared/BackButton';
import { getBgColor } from '../utils';
import CategoryAddModal from '../components/category/CategoryAddModal';
import BottomNav from '../components/shared/BottomNav';


const Categories = () => {
    const addBtn = [{action :'category' , label :'New Service' , icon: <IoIosAddCircle className='text-[#0ea5e9]' size={20} />}] ;
    
    const [isAddCategoryModal, setIsAddCategoryModal] = useState(false);
    const handleAddCategoryModal = (action) => {
        if(action === 'category') setIsAddCategoryModal(true) ;
    };

    //fetch Category
    const [list, setList] = useState([])
    const fetchCategories = async () => {

        try {
            const response = await api.get('/api/category/')

            if (response.data.success) {
                setList(response.data.categories)

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


    // remove 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);


    const removeCategory = async (id) => {

        try {
            const response = await api.post('/api/category/remove', { id },)

            if (response.data.success) {
                toast.success(response.data.message)

                //Update the LIST after Remove
                await fetchCategories();

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };




    return (
        <section className ='h-[calc(100vh)] bg-white overflow-y-scroll scrollbar-hidden bg-white'>

            <div className='flex justify-between items-center px-9 py-2 shadow-xl'>
                <div className='flex items-center gap-2'>
                    <BackButton />
                    <h1 className='text-md font-semibold text-[#1a1a1a]'>Services Management</h1>
                </div>

                <div className='flex items-center gap-3 justify-around hover:bg-[#0ea5e9] shadow-lg/30'>
                    {addBtn.map(({ label, icon, action }) => {
                        return (
                            <button className='cursor-pointer bg-white text-[#1a1a1a]
                                            px-5 py-2 rounded-full font-medium text-xs flex items-center gap-2'
                                onClick={() => handleAddCategoryModal(action)}
                            >
                                {label} {icon}
                            </button>
                        )
                    })}

                </div>

                {isAddCategoryModal && <CategoryAddModal setIsAddCategoryModal={setIsAddCategoryModal} />}

            </div>


            <div className='grid grid-cols-5 gap-4 px-10 py-4 mt-0 w-[100%] rounded-lg'>

                {list.length === 0
                    ? (<p className='ml-5 mt-5 text-sm font-semibold text-[#be3e3f] flex items-start justify-start'>Your services list is empty! Start adding new one</p>)
                    : list.map((category, index) => (

                        <div key={category.categoryName} className='flex items-center justify-between px-3 rounded-lg h-[70px]  cursor-pointer'
                            style={{ backgroundColor: getBgColor() }}
                        >

                            <div className='flex justify-between w-full shadow-lg/30'>
                                <div className='items-start px-3'>
                                    <h1 className='text-md font-semibold text-white'>{category.categoryName}</h1>
                                </div>

                                <div className='items-end flex gap-1 px-3'>
                                    <FiEdit3 size={20} className='w-6 h-6 text-sky-600 rounded-full' />

                                    <button className={`cursor-pointer text-sm font-semibold`}>
                                        <MdDeleteForever
                                            onClick={() => { setSelectedCategory(category); setDeleteModalOpen(true); }} size={20}
                                            className='w-6 h-6 text-white rounded-full'
                                        />
                                    </button>
                                </div>

                            </div>
                        </div>

                    ))}

            </div>


            <ConfirmModal

                open={deleteModalOpen}
                categoryName={selectedCategory?.categoryName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeCategory(selectedCategory._id);
                    setDeleteModalOpen(false);
                }}
            />

            <BottomNav/>

        </section>
    );
} ;


const ConfirmModal = ({ open, onClose, onConfirm, categoryName }) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >

            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
                <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{categoryName}</span>?</p>
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




export default Categories ;