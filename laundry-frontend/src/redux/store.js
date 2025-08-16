import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import customerSlice from './slices/customerSlice';
import cartSlice from './slices/cartSlice';


const store = configureStore({
   
    reducer: {
        user: userSlice,
        customer :customerSlice,
        cart: cartSlice,
    },

    devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;