import React, { useState, useEffect } from "react";
import arrowblack from "../../assets/arrowblack.png";
const Contact = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    const object = Object.fromEntries(data);
    const json = JSON.stringify(object);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());
    if (res.success) {
      console.log("Success", res);
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } else {
      console.error("Error", res);
      setSuccessMessage(
        "There was an error sending your message. Please try again."
      );
    }
  };
  useEffect(() => {
    return () => {
      setSuccessMessage("");
    };
  }, []);
  return (
    <div className="contact">
      <div className="flex flex-col lg:flex-row items-center justify-center mt-24 px-6 lg:px-12">
        <div className="flex-1 flex justify-center items-center w-full lg:w-1/2 lg:mr-8">
          <form
            className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md"
            onSubmit={onSubmit}
          >
            <label className="block text-lg mb-2 text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-5 p-3 rounded-md border border-gray-300 bg-gray-700 text-white"
              required
            />
            <label className="block text-lg mb-2 text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-5 p-3 rounded-md border border-gray-300 bg-gray-700 text-white"
              required
            />
            <label className="block text-lg mb-2 text-white">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full mb-5 p-3 rounded-md border border-gray-300 bg-gray-700 text-white"
              rows="4"
              required
            ></textarea>
            <div className="flex justify-center">
              <button className="flex items-center py-3 px-10 text-sm font-bold rounded-full bg-white text-black">
                SUBMIT
                <img src={arrowblack} alt="Arrow" className="w-5 ml-2" />
              </button>
            </div>
            {successMessage && (
              <p className="mt-4 text-green-600 text-center">
                {successMessage}
              </p>
            )}
          </form>
        </div>
        <div className={`flex-1 flex w-full flex-col items-flex-start lg:w-1/2 text-center lg:text-left ${isDarkMode ? 'text-black':'text-white'  } mt-12 lg:mt-0`}>
          <div>
            <h4 className="text-3xl mb-4 font-serif">Abijith E A</h4>
            <p className="text-lg mb-2">
              Number:{" "}
              <a
                href="tel:+917034349362"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-black':'text-white'  } underline font-mono font-semibold text-sm hover:bg-blue-500`}
              >
                +917034349362
              </a>
            </p>
            <p className="text-lg mb-2">
              Email:{" "}
              <a
                href="mailto:eaabijith3@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-black':'text-white'} underline font-mono font-semibold text-sm hover:bg-blue-500`}
              >
                eaabijith3@gmail.com
              </a>
            </p>
            <h5 className="text-lg">
              Follow me on{" "}
              <a
                href="https://www.instagram.com/abijith_e_a"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-mono font-semibold text-sm hover:bg-red-400"
              >
                Instagram
              </a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
