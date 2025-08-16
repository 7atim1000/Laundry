import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { login } from '../../https/index'
import { enqueueSnackbar } from 'notistack'

import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        email: "", password: "",
    })
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log(formData)
       loginMutation.mutate(formData);
    }


    const loginMutation = useMutation({
        mutationFn : (reqData) => login(reqData),
      
        onSuccess: (res) => {
            const { data } = res;
            console.log(data)

            // depent on userSlice -> redux
            const { _id, name, phone, email, role } = data.data;
            dispatch(setUser({ _id, name, phone, email, role }));

            navigate("/");

        },
        onError: (error) => {
            //console.log(error)
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });
        }

    })


    return(
        <div>
            <form onSubmit={handleSubmit}>
            
                <div className =''>
                    <label htmlFor='' className ='block text-[#0ea5e9] mb-2 text-xs font-medium mt-5'>Email</label>
                        <div className = 'flex items-center rounded-sm p-3 bg-white'>
                            <input 
                                type='email'
                                name ='email'
                                value={formData.email}
                                onChange={handleChange}

                                placeholder ='Enter employee email'
                                className ='bg-transparent flex-1 text-[#607d8b] focus:outline-none border-b border-[#0ea5e9]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>

                
                     
                <div className =''>
                    <label htmlFor='' className ='block text-[#0ea5e9] mb-2 text-xs font-medium mt-5'>Password</label>
                        <div className = 'flex items-center rounded-sm p-3 bg-white '>
                            <input 
                                type='password'
                                name ='password'

                                value={formData.password}
                                onChange={handleChange}

                                placeholder ='Enter password'
                                className ='bg-transparent flex-1 text-[#607d8b] focus:outline-none border-b border-[#0ea5e9]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>

                


                <button type ='submit' className ='w-full mt-6 py-3 text-lg bg-sky-600 text-white font-bold rounded-lg cursor-pointer'>Sign in</button>
                
            </form>  
        </div>
    )
}


export default Login;