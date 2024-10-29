import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Home/Navbar'
import Footer from './Components/Home/Footer'

const Layout = ({isDarkMode}) => {
  return (
    <>
        <Navbar isDarkMode={isDarkMode}/>
        <Outlet />
        <Footer isDarkMode={isDarkMode}/>
    </>
  )
}

export default Layout;