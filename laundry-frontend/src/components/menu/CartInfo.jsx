import React , {useEffect, useRef} from 'react'
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/slices/cartSlice';

const CartInfo = () => {
    const cartData = useSelector((state) => state.cart);    // cart from cartSlice  name : 'cart' , 
    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [cartData]);

    const dispatch = useDispatch();
    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId))
    };
    
    return(
        <div className='px-4 py-2 shadow-xl bg-sky-50'>

            {/* <h1 className='text-sm text-sky-600 font-semibold '>Order Details : </h1> */}
            {/*h-[380px] */}
            <div className='mt-1 overflow-y-scroll scrollbar-hidden h-[175px]' ref={scrollRef}>
                {cartData.length === 0 ? (<p className='text-xs font-bold text-[#be3e3f] flex items-center justify-center rounded-lg mt-15'>Cart is empty ... Start adding items .</p>)
                    : cartData.map((item) => {

                        return (

                            <div className='bg-white rounded-lg px-2  py-2 mb-2 mt-0 shadow-lg/30 border-l-2 border-sky-500'>

                                <div className='flex items-center justify-between shadow-xl'>

                                    <h1 className='text-[#1a1a1a] font-bold tracking-wide text-xs'>{item.name}</h1>
                                    <p className='text-[#1a1a1a] text-sm font-semibold'>
                                        <span className ='text-[#1a1a1a]'>{item.pricePerQuantity} </span>
                                        <span className='text-xs font-normal text-sky-500'>x </span>
                                        {item.quantity}
                                    </p>

                                </div>

                                <div className='flex items-center justify-between mt-3 shadow-xl'>

                                    <div className='flex items-center gap-3'>
                                        <RiDeleteBin2Fill
                                            onClick={() => handleRemove(item.id)}
                                            className='text-[#be3e3f] text-xs cursor-pointer w-4 h-5 border-b border-[#be3e3f]' />
                                    </div>

                                    <p className='text-sky-600 text-lg font-semibold'><span className='text-xs text-[#1a1a1a] font-normal'>AED </span>{item.price}</p>

                                </div>

                            </div>

                        );
                    })}

            </div>
        </div>

    );
};


export default CartInfo ;