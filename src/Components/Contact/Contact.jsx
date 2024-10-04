
import React from 'react'
import arrowblack from '../../assets/arrowblack.png'

const Contact = () => {
  return (
    <div className='contact'>
    
      <div className='flex flex-col lg:flex-row items-center justify-center mt-24 px-6 lg:px-12'>
        {/* Form Section */}
        <div className='flex-1 flex justify-center items-center w-full lg:w-1/2 lg:mr-8'>
          <form className='w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md'>
            <label className='block text-lg mb-2 text-white'>Name</label>
            <input type="text" className='w-full mb-5 p-3 rounded-md border border-gray-300 bg-gray-700 text-white' />
            
            <label className='block text-lg mb-2 text-white'>Email</label>
            <input type="email" className='w-full mb-5 p-3 rounded-md border border-gray-300 bg-gray-700 text-white' />
            
            <label className='block text-lg mb-2 text-white'>Message</label>
            <textarea className='w-full mb-5 p-3 rounded-md border border-gray-300 bg-gray-700 text-white' rows="4"></textarea>
            
            <div className='flex justify-center'>
              <button className='flex items-center py-3 px-10 text-sm font-bold rounded-full bg-white text-black hover:bg-gray-900'>
                SUBMIT
                <img src={arrowblack} alt="Arrow" className='w-6 ml-2' />
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information Section */}
        <div className='flex-1 flex  w-full flex-col items-flex-start lg:w-1/2 text-center lg:text-left text-white mt-12 lg:mt-0'>
          <div>
            <h4 className='text-3xl mb-4 font-serif'>Abijith E A</h4>
            <p className='text-lg mb-2'>
              Email: <a href="mailto:abijithea3@gmail.com" target="_blank" rel="noopener noreferrer" className='text-white underline font-mono font-semibold text-sm hover:bg-blue-500'>abijithea3@gmail.com</a>
            </p>
            <h5 className='text-lg'>
              Follow me on <a href="https://www.instagram.com/abijith_e_a" target="_blank" rel="noopener noreferrer" className='underline font-mono font-semibold text-sm hover:bg-red-400'>Instagram</a>
            </h5>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Contact;

