 import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { register } from '../../https/index'
import { enqueueSnackbar } from 'notistack'


const Register = ({setIsRegister}) => {

    const [formData, setFormData] = useState({
       name: "", email: "", phone: "", password: "", role: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate(formData);
    }

    const handleRoleSelection = (selectedRole) => {
        setFormData({...formData, role: selectedRole})
    }


    const registerMutation = useMutation({
        
        mutationFn : (reqData) => register(reqData),
          
            onSuccess: (res) => {
            const { data } = res;
            // console.log(data)
            enqueueSnackbar(data.message, { variant: "success" });
            
            setFormData({  
              name: "", phone: "", email: "", password: "", role: "",
            })

            setTimeout(() => {
                setIsRegister(false);
            }, 1500);
        },
        onError: (error) => {
            //console.log(error)
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });
    
        }
    
        })

   return(
        <div className =''>

            <form onSubmit={handleSubmit}>
                
                <div className ='flex items-center justify-between'>
                    <label htmlFor='' className ='flex w-[10%] block text-[#0ea5e9] mb-2 text-xs font-medium'>Name</label>
                        <div className = 'flex w-[90%] items-center rounded-sm p-3 bg-white shadow-xl'>
                            <input 
                                type='text'
                                name ='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder ='Full name'
                                className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>
                
                <div className ='flex items-center justify-between mt-3'>
                    <label htmlFor='' className ='flex w-[10%] block text-[#0ea5e9] mb-2 text-xs font-medium mt-5'>Phone</label>
                        <div className = 'flex w-[90%] items-center rounded-sm p-3 bg-white shadow-xl'>
                            <input 
                                type='number'
                                name ='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder ='+971 999999999'
                                className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>

                <div className ='flex items-center justify-between mt-3'>
                    <label htmlFor='' className ='w-[10%] block text-[#0ea5e9] mb-2 text-xs font-medium mt-5'>Email</label>
                        <div className = 'flex w-[90%] items-center rounded-sm p-3 bg-white shadow-xl'>
                            <input 
                                type='email'
                                name ='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder ='email@email.com'
                                className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>
                
                <div className ='flex items-center justify-between mt-3'>
                    <label htmlFor='' className ='w-[10%] block text-[#0ea5e9] mb-2 text-xs font-medium mt-5'>Password</label>
                        <div className = 'flex w-[90%] items-center rounded-sm p-3 bg-white shadow-xl'>
                            <input 
                                type='password'
                                name ='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder ='*******'
                                className ='bg-transparent flex-1 text-[#1a1a1a] focus:outline-none border-b border-[#0ea5e9]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>

                <div>
                    <label className ='block text-[#0ea5e9] mb-2 mt-5 text-sm font-medium'>Choose your role</label>
                <div className ='flex items-center gap-3 mt-4'>
                    {['Admin','Employee'].map((role) => {
                        
                        return (
                            <button 
                            key={role}
                            type='button'
                            onClick={() => handleRoleSelection(role)}
                            className = {`px-3 p-3 w-full cursor-pointer  rounded-sm  font-semibold shadow-lg/30
                                ${formData.role === role ? "bg-sky-600 text-white" : "bg-white text-[#0ea5e9]"}  
                                `}  // here used ternary operator
                            >{role}
                            </button>
                        )

                    })}
                </div>
                </div>

                <button type ='submit' className ='w-full mt-5 py-3 text-lg bg-sky-600 text-white font-bold rounded-lg cursor-pointer'>Sign up</button>
                
            </form>  
        </div>
   )
    
}


export default Register;