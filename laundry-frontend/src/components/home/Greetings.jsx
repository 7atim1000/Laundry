import React ,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { GiSunflower } from "react-icons/gi";
import { BsFillMoonStarsFill } from "react-icons/bs";
import AnalogClock from './AnalogClock';






const Greetings = () => {

    function getCurrentShift() {
        const hour = new Date().getHours();
        // Example: Morning = 6:00-17:59, Evening = 18:00-5:59
        return (hour >= 6 && hour < 18) ? 'Morning' : 'Evening';
    };

    const usrData = useSelector(state => state.user)

    const [dateTime, setDateTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const months = [
            'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, 
        ${date.getFullYear()}`;
    };

    const formatTime = (date) =>
        `${String(date.getHours()).padStart(2, '0')}:${String(
            date.getMinutes()
        ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;



    
    return(
        <div className='flex justify-between items-center px-8  shadow-xl p-1'>
            <div>
                <h1 className='text-[#1a1a1a] text-md font-semibold tracking-wide mt-0 mb-1'>Good Morning - {usrData.name || "user-name"}</h1>
                <p className='text-green-600 text-xs'>Give your best services for customers</p>
            </div>
            
            <div className='flex items-center gap-2 justify-center'>

                {getCurrentShift() === 'Morning' ? (
                    <GiSunflower className='text-[#F6B100]' size={35} />
                ) : (
                    <BsFillMoonStarsFill className='text-white bg-sky-400 rounded-full p-1' size={35} />
                )}
                <h1 className='text-xs text-[#1a1a1a] font-normal'>
                    {getCurrentShift()} shift
                </h1>

            </div>

            <div className ='flex flex-col gap-1 items-center'>
                 <AnalogClock className="w-10 h-10 flex items-center" />
                <p className='text-green-600 text-xs font-normal'>{formatDate(dateTime)}</p>
            </div>

        </div>
    );
};


export default Greetings ;