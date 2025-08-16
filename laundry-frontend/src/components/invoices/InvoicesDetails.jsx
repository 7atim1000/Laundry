import React from 'react'
import { RxUpdate } from "react-icons/rx";
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useDispatch } from 'react-redux'
import { updateOrder } from '../../https';
import { toast } from 'react-toastify';

const InvoicesDetails = ({ id, date, shift, length, customer, payment, total, tax, totalWithTax, payed, balance, items , orderStatus, orderDate, receiptDate}) => {
    const dispatch = useDispatch();

    const handleStatusChange = ({ orderId, orderStatus }) => {                          // orderId ?
        orderUpdateMutation.mutate({ orderId, orderStatus });
        window.location.reload();
    };

    const queryClient = useQueryClient();
    const orderUpdateMutation = useMutation({

        mutationFn: ({ reqData, orderId, orderStatus }) => updateOrder({ reqData, orderId, orderStatus }),
        onSuccess: (resData) => {
            const { data } = resData.data;

            //enqueueSnackbar('Order status updated successfully..', { variant: 'success' });
            toast.success('Invoice status updated successfully ...')
            queryClient.invalidateQueries(['invoices']);

        },

        onError: () => {
            //enqueueSnackbar('Failed to update order status!', { variant: 'error' });
            toast.error(response.data.message);
        }

    });


    return (
        <>
            <tr className='border-b-3  border-[#f5f5f5]  bg-white text-xs font-normal'>
                <td className='p-1 hidden'>{id}</td>
                <td className='hide-print text-[#1a1a1a] hidden'>{new Date(date).toLocaleDateString('en-GB')}</td>
                
                <td className='hide-print text-[#1a1a1a] p-1'>{new Date(orderDate).toLocaleDateString('en-GB')}</td>
                <td className={`hide-print text-[#1a1a1a] p-1 ${new Date(receiptDate).toDateString() === new Date().toDateString()
                        ? 'text-green-500'
                        : ''
                    }`}>
                    {new Date(receiptDate).toLocaleDateString('en-GB')}
                </td>
                
                <td className={`${shift === 'Morning' ? "text-[#f6b100]" : "text-sky-600"} p-1`}>{shift}</td>
                <td className='p-1 text-sm text-[#0ea5e9] underline  cursor-pointer '>{length}</td>
                <td className='p-1 text-[#1a1a1a]'>{customer}</td>

                <td className='p-1   text-[#1a1a1a]'>{total.toFixed(2)}</td>
                <td className='p-1   text-[#1a1a1a]'>{tax.toFixed(2)}</td>
                <td className='p-1   text-sky-600 font-semibold'>{totalWithTax}</td>
                <td className='p-1   text-green-600'>{payed.toFixed(2)}</td>
                <td className='p-1   text-[#1a1a1a] underline'>{payment}</td>
                <td className={`${balance === '0' ? 'text-[#1a1a1a]' : 'text-[#be3e3f]'} p-1`}>{balance.toFixed(2)}</td>

                <td className='p-1 text-xs hide-print'>

                    <select
                        className={`hide-print cursor-pointer h-6 shadow-lg rounded-lg  text-[#1a1a1a]
                                        ${orderStatus === 'Completed' ? "text-sky-600 bg-sky-100" : "text-[#f6b100] bg-orange-100"} font-semibold`}
                        value={orderStatus}
                        onChange={(e) => handleStatusChange({ orderId: id, orderStatus: e.target.value })}
                    >
                        <option className='text-[#1a1a1a] rounded-lg cursor-pointer' value='In Progress'>In Progress</option>
                        <option className='text-[#1a1a1a] rounded-lg cursor-pointer' value='Completed'>Completed</option>
                    </select>
                </td>

                <td className='p-4 text-center'>
                    <button className={`${orderStatus === 'Completed' ? "text-sky-600 " : "text-[#f6b100]"} cursor-pointer text-sm font-bold`}>
                        <RxUpdate size={22} />
                    </button>
                </td>


            </tr>
        
        </>

    );

};


export default InvoicesDetails ;