import React from 'react'
import AdminNavbar from './AdminNavbar'
const AdminPanel = () => {
    return (
        <>
            <AdminNavbar />
            <div className='relative h-screen flex items-center justify-center overflow-hidden'>
                <div className='absolute inset-0 bg-cover bg-no-repeat filter blur-sm' style={{ backgroundImage: "url('/background.png')" }}></div>
                <div className='relative z-10 text-center text-white'>
                    <h1 className='text-7xl font-light'>WELCOME</h1>
                    <p className='text-lg mt-4'>Abijith E A</p>
                    {/* <div className='flex items-center justify-center'>   
      <button className='mt-6 py-2 px-4 border border-white rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors'>
            WORKS
            <img src={rightarrowwhite} alt="Right arrow" className='w-6' />
        </button></div> */}
                </div>
            </div>
        </>
    )
}

export default AdminPanel