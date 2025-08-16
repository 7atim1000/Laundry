import React , {useState} from 'react'

import laundry from '../assets/images/laundry.jpg'
import { MdRestaurantMenu } from "react-icons/md";
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import { GiWaterRecycling } from "react-icons/gi";

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    return(
        <div className ='flex min-h-screen w-full overflow-y-scroll scrollbar-hidden'>
            
            <div className='w-1/2  relative flex items-center justify-center bg-cover'>
                <img
                    src={laundry}
                    alt="Laundry Image"
                    className="max-w-full max-h-full object-contain"
                />

                <div className='absolute inset-0 bg-block bg-opacity-80'></div>

                {/*Quote at bottom */}
                <blockquote className='absolute bottom-10 px-8 mb-1 text-[#0ea5e9] text-lg italic'>
                    "Serve customers the best food with prompt and frienly service in a
                    welcoming atmosphere, and they'll keep coming back."
                    <br />
                    <span className='block mt-4 text-[#f6b100] underline'>- Founder of Laundry</span>

                </blockquote>
            </div>

            {/*Right end */}
            <div className='w-1/2 min-h-screen bg-white p-3'>
                <div className='flex flex-col items-center gap-2'>
                    <GiWaterRecycling className='h-14 w-14 rounded-full text-[#0ea5e9] border-2' />
                    <h1 className='text-lg font-semibold text-[#0ea5e9] tranking-wide'>Laundry</h1>
                </div>

                <h2 className='text-lg text-center mt-2 font-semibold text-[#1a1a1a] mb-10'>
                    {isRegister ? "Employee Registration" : "Employee Login"}
                </h2>

                {/*Form registration */}

                {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}


                <div className='flex justify-center mt-3'>
                    <p className='text-sm text-[#1a1a1a]'> {isRegister ? "Already have an account ?" : "Dont have an account ?"}
                       
                        <a className='text-[#0ea5e9] font-semibold hover: underline' href='#'
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? " Sign in" : " Sign up"}
                        </a>
                    </p>
                </div>

            </div>

        </div>
    );
};


export default Auth ;