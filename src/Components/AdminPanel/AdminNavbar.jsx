import React, { useState } from 'react'
import listicon from '../../assets/listicon.png';
import returnarrow from '../../assets/returnarrow.png';


const AdminNavbar = () => {
    const [isVisible,setIsVisible] = useState(false);
  return (
    <div>
           <div className='flex justify-between items-center py-6 px-8'>
        <div className='flex items-center gap-4'>
            <h1 className='text-xl font-bold text-white'>ABIJITH</h1>
        </div>
        <div className='flex'>
            <ul className=' hidden md:flex gap-6'>
                <li><a href="" className="text-white text-md font-medium hover:underline">HOME</a></li>
                <li><a href="/AllWorks" className="text-white text-md font-medium hover:underline">All Works</a></li>
                <li><a href="/Aboutme" className="text-white text-md font-medium hover:underline">About me</a></li>

              
            </ul>
            <img onClick={()=>{setIsVisible(true)}} src={listicon} className='w-9 sm:hidden absolute right-5 top-5 ' alt="" />
        </div>

        <div className={`fixed h-full bottom-0 right-0 top-0 overflow-hidden bg-white  transition-all duration-700 ease-in-out  z-40 ${isVisible ? 'w-full' : 'w-0'} `}>
            <div className='flex flex-col text-gray-600'>
              <div onClick={()=>{setIsVisible(false)}} className='flex items-center p-3'>
                <img src={returnarrow} alt="" className='w-5' />
                <p>Back</p>
              </div>
              <ul className='flex flex-col gap-2'>
                <li><a href="" className="text-black text-sm  py-2 pl-6 ">HOME</a></li>
                <li><a href="/AllWorks" className="text-black text-sm  py-2 pl-6 ">All Works</a></li>
          
          
            </ul>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminNavbar