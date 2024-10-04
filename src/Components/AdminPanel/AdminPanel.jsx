import React from "react";
import AdminNavbar from "./AdminNavbar";
const AdminPanel = () => {
  return (
    <>
      <AdminNavbar />
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat filter blur-sm"
          style={{ backgroundImage: "url('/background.png')" }}
        ></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-light animate-slide-up">
            WELCOME
          </h1>
          <p className="text-lg mt-4">Abijith E A</p>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
