import axios from 'axios'

export const api = axios.create({
    
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

// auth
export const login = (data) => api.post('/api/auth/login', data);
export const register = (data) => api.post('/api/auth/register', data);
export const getUserData = () => api.get('/api/auth');
export const logout = () => api.post('/api/auth/logout');

// Category Endpoint
export const getCategories = () => api.get('/api/category');
export const addCategory = (data) => api.post('/api/category', data);


// Services Endpoint
// export const getServices = () => api.get('/api/service');
export const getServices = (search = '') => api.get(`/api/service?search=${search}`);
export const addService = (data) => api.post('/api/service', data 
   
    // , {
    //     headers: {
    //     'Content-Type': 'multipart/form-data'
    //     }
    // }

);

// When you add the 'Content-Type': 'multipart/form-data' header manually, the browser doesn't automatically set the correct boundary parameter, which is required for file uploads. This can cause the server to receive null for the image.

export const updateService = ({serviceId, ...serviceData}) => api.put(`/api/service/${serviceId}`, serviceData);  // serviceData explain in Bill.jsx

// Units Endpoint
export const getUnits = () => api.get('/api/unit');
export const addUnit = (data) => api.post('/api/unit', data);

//  Customers Endpoint
export const addCustomer = (data) => api.post('/api/customer', data);
export const updateCustomer = ({customerId, ...balanceData}) => api.put(`/api/customer/${customerId}`, balanceData);  // serviceData explain in Bill.jsx

// Order Endpoint
export const addOrder = (data) => api.post('/api/order/', data);
export const getOrders = () => api.get('/api/order');
export const updateOrder = ({orderId, orderStatus}) => api.put(`/api/order/${orderId}`, {orderStatus});

// Transaction Endpoint
export const addTransaction = (data) => api.post('/api/transactions/add-transaction', data);



