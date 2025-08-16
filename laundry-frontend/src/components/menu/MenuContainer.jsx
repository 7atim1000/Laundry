import React, {useState} from 'react';

import { GrRadialSelected } from 'react-icons/gr'
import { FcSearch } from "react-icons/fc";
import { getBgColor } from '../../utils';

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { getCategories, getServices } from '../../https';
import ItemsCart from './ItemsCart';

const MenuContainer = () => {
    // fetch categories from DB :-
    const { data: responseData, IsError } = useQuery({
        queryKey: ['categories'],

        queryFn: async () => {
            return await getCategories();
        },

        placeholderData: keepPreviousData,
    });

    if (IsError) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
    console.log(responseData);


    // Implementing Search Functionality in Your Service List
    const [searchTerm, setSearchTerm] = useState('');
    // fetch Sevices
    const { data: resData, isError } = useQuery({
        queryKey: ['services' ,searchTerm],

        queryFn: async () => {
            return await getServices(searchTerm);
        },
        placeholderData: keepPreviousData,
    });
    if (isError) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' })
    }

    console.log(resData); 

    const [selectedCategory, setSelectedCategory] = useState(`Cleaning`) ;


    return(
       <>
            <div className='flex w-full gap-1 justify-start items-start p-2 '>


                <div className='flex-col justify-between  w-[15%] bg-white px-1 py-4 shadow-xl h-[calc(100vh)]'>


                    {responseData?.data.data.map(category => (

                        <button className='w-[100%] grid grid-cols-1 p-1 items-center  mb-3 rounded-lg h-[60px] cursor-pointer shadow-lg/30'
                            style={{ backgroundColor: getBgColor() }}
                            onClick={() => setSelectedCategory(category.categoryName)}
                        >

                            <div className='flex items-center justify-between w-full shadow-lg/30 px-3'>
                                <h1 className='text-sm font-semibold text-white'>{category.categoryName}</h1>
                                {selectedCategory === category.categoryName && <GrRadialSelected className='text-[#e6e6e6]' size={20} />}
                            </div>
                        </button>

                    ))}

                </div>


                {/* grid grid-cols-3 */}

         
                <div className =' flex flex-col justify-between items-center gap-1 w-full p-3 bg-white shadow-xl h-[calc(100vh)]'>
                    {/*SEARCH*/}
                    <div className='flex items-center gap-2 bg-white  px-5 py-1 w-full shadow-xl'>
                        <FcSearch className='text-[#0ea5e9]' />

                        <input
                            type='text'
                            placeholder="search"
                            className='bg-transparent outline-none text-[#1a1a1a] w-full border-b border-[#0ea5e9] text-xs '

                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>


                    <div className='flex items-start justify-between flex-wrap gap-1 w-full px-2 py-2 rounded-lg overflow-y-scroll scrollbar-hidden'>

                        {resData?.data.data.filter(i => i.category === selectedCategory).map((service) => {

                            return (
                                <ItemsCart id ={service._id} name ={service.serviceName} price ={service.price} unit ={service.unit} cat ={service.category} image ={service.image}/>
                            )
                        })
                        }


                    </div>
                  
                </div>


            </div>
       </>
    );
};


export default MenuContainer ; 


