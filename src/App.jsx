import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Home/Navbar';
import Homes from './Components/Home/Homes';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Home/Footer'
import Collections from './Components/Work/Collections'
import About from './Components/About/About';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Layout from './Layout';
import AllWork from './Components/AdminPanel/AllWork';
import AddWork from './Components/AdminPanel/AddWork';
import ArtworkPage from './Components/Work/ArtworkPage';
import Aboutadmin from './Components/AdminPanel/Aboutadmin';


const App = () => {
  return (
    <div>
  <BrowserRouter>
 
  <Routes>
    <Route path='/' element={<Layout/>}>
    <Route path='/' element={<Homes/>}/>
     <Route path='/collections' element={<Collections/>}/>
      <Route path='/about' element={<About/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path="/artwork/:id" element={<ArtworkPage />} />
     

    </Route>

    <Route >
    <Route path='/AdminPanel/abijithea/3/10/1997' element={<AdminPanel/>}/>
    <Route path='/AllWorks' element={<AllWork/>}/>
    <Route path='/AddWork' element={<AddWork/>}/>
    <Route path='/Aboutme' element={<Aboutadmin/>}/>
    </Route>
 
  </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App
