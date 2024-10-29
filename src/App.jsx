
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; 
import Homes from "./Components/Home/Homes";
import Contact from "./Components/Contact/Contact";
import Collections from "./Components/Work/Collections";
import About from "./Components/About/About";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import Layout from "./Layout";
import AllWork from "./Components/AdminPanel/AllWork";
import AddWork from "./Components/AdminPanel/AddWork";
import ArtworkPage from "./Components/Work/ArtworkPage";
import Aboutadmin from "./Components/AdminPanel/Aboutadmin";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", isDarkMode ? "light" :"dark" );
  };

  return (
    <div>
      <BrowserRouter>
       
        <button
          onClick={toggleTheme}
          className={`p-2  rounded-full absolute top-5 right-1 
            ${isDarkMode ? "bg-black text-white" : "bg-white text-black border border-gray-400"}
            transition-colors duration-300 ease-in-out flex items-center gap-2`}
        >
          {isDarkMode ? <FaMoon /> : <FaSun />} 
          
        </button>
        
        <Routes>
          <Route path="/" element={<Layout isDarkMode={isDarkMode} />}>
            <Route path="/" element={<Homes isDarkMode={isDarkMode} />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path='/contact' element={<Contact isDarkMode={isDarkMode} />} />
            <Route path="/artwork/:id" element={<ArtworkPage isDarkMode={isDarkMode}/>} />
          </Route>
          <Route>
            <Route path="/AdminPanel/abijithea/3/10/1997" element={<AdminPanel isDarkMode={isDarkMode}/>} />
            <Route path="/AllWorks" element={<AllWork isDarkMode={isDarkMode}/>} />
            <Route path="/AddWork" element={<AddWork isDarkMode={isDarkMode}/>} />
            <Route path="/Aboutme" element={<Aboutadmin isDarkMode={isDarkMode} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

