import React , {useState} from 'react' ;
import { useDispatch, useSelector } from 'react-redux';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify' ;
import { addItems } from '../../redux/slices/cartSlice';

const ItemsCart = ({id, name, price, unit, cat, image}) => {

    const [qtCount, setqtCount] = useState(0);
    const [itemId, setItemId] = useState();   

    const increment = (id) => {                          // to solve counting
        setItemId(id);                                   // to solve counting DAY
        setqtCount((prev) => prev + 1)
    };

    const decrement = (id) => {
        setItemId(id);
        if (qtCount <= 0) return;
        setqtCount((prev) => prev - 1);
    };

    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
           
        if (qtCount === 0) {

            toast.warning('Please specify number of service first.');
            return;
        };

        const {name, price } = item; 
        const newObj = { id: id, name: name, category: cat, pricePerQuantity: price, quantity: qtCount, price: price * qtCount };

        setqtCount(0);
        dispatch(addItems(newObj));

    }
    return (
        <div className='flex flex-col justify-start gap-2 p-2 rounded-lg h-[200px] w-[200px] cursor-pointer bg-white shadow-lg/30 mt-0 ' >

            <div className='flex justify-between items-center mb-0'>

                <div className='flex flex-col gap-0 mb-0'>
                    <h1 className='text-sm font-semibold text-[#1a1a1a] flex justify-start items-start'>{name}</h1>
                    <p className='text-xs text-sky-600 mt-0'>{cat}</p>
                </div>

                <div className='mt-0'>
                    <button  onClick={() => handleAddToCart({ id, name, price, cat, unit })}
                        className='cursor-pointer mt-0'>
                        <IoCheckmarkCircleOutline className='text-sky-600 rounded-lg flex justify-end items-end shadow-xl hover:bg-[#0ea5e9]/30' size={35} /></button>
                </div>

            </div>

            <div className='flex items-center justify-center px-0 w-full mt-2'>
            
                <div className='flex gap-3 items-center justify-center bg-sky-50 px-4 py-3 mr-0 shadow-lg/30'>
                    <button
                        onClick={() => decrement(id)}
                        className='text-[#be3e3f] text-sm hover:bg-[#be3e3f]/30 rounded-full p-2 cursor-pointer'
                    >
                        &minus;
                    </button>
                    <span className={`${qtCount > 9 ? "text-md" : "text-3xl"} text-sky-600 flex flex-wrap gap-2  font-medium`}>{id === itemId ? qtCount : "0"}<span className={`${qtCount > 9 ? "mt-2  text-xs" : "mt-5 text-xs"} text-[#1f1f1f]`}>{unit}</span></span>

                    <button
                        onClick={() => increment(id)}
                        className='text-sky-600 text-sm hover:bg-[#0ea5e9]/30 p-2 rounded-full cursor-pointer'
                    >
                        &#43;
                    </button>

                </div>

            </div>

            <div className ='flex items-center justify-between mt-2'>
                <img className='w-12 h-12 rounded-full shadow-lg/30 border-b-3 border-[#0ea5e9]' src={image} />
                <p className='ml-0 text-sky-600 text-lg font-semibold text-xl'><span className='text-xs font-normal text-[#1a1a1a]'>AED </span>{price}</p>

            </div>
        </div>
    )  ;  
};


export default ItemsCart ;
