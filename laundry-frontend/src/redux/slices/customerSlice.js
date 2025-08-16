import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    orderId :"",
    customerId :"",
    customerName : "",
    customerEmail : "",
    contactNo : "",
    address :"",
    balance : "",
  
    orderDate :"",
    receiptDate :"",

    service: null
}

const customerSlice = createSlice({
    name :"customer",

    initialState,

    reducers :{
        
        setCustomer :(state, action) => {
            const { customerId, customerName , customerEmail, contactNo,  address, balance, orderDate, receiptDate } = action.payload ;

            state.orderId = `${Date.now()}`;

            state.customerId = customerId;
            state.customerName = customerName ;
            state.customerEmail = customerEmail ;
            state.contactNo = contactNo;
            state.address = address;

            state.balance = balance;
            state.orderDate = orderDate;
            state.receiptDate = receiptDate
        },
        removeCustomer :(state) => {
            state.customerId = "";
            state.customerName = "" ;
            state.customerEmail = "" ;
            state.contactNo = "";
            state.address = "";
            
            state.balance = "";
            state.orderDate ="";
            state.receiptDate ="";
            state.service = null;
        },
        
        updateService :(state, action) => {
            state.service = action.payload.service;
        }
    }
});

export const { setCustomer, removeCustomer, updateService } = customerSlice.actions ;
export default customerSlice.reducer;
