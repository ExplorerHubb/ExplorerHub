import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import privacyImage from '../../assets/privacy policy.gif';
import logo from '../../assets/logo.png';

const login = ({ onAuthSuccess }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        let newErrors = {};

        if (!formData.email) newErrors.email = "email is required*";
        if (!formData.password) newErrors.password = "password is required*";

        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }

        try {
            const response = await fetch("https://seba2.pythonanywhere.com/login/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

        

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                onAuthSuccess(data.token);
                navigate('/profile');
            } else {
                setServerError(data.message);
            }
        } 
        catch (error) {
        console.error(error);
        setServerError("Login failed: Not valid credentials");
        }
    };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        {/* Logo */}
        <img 
        src={logo}
        alt="Logo" 
        className="absolute top-4 left-4 h-11 w-30 sm:h-14 cursor-pointer" 
        onClick={() => navigate('/')} 
        />

        {/* Form Container */}
        <div className="flex bg-white p-8 rounded-2xl shadow-lg w-[70%] h-[70%] md:w-[60%] lg:w-[70%] xl:w-[70%] max-w-4xl">
            {/* Left Section - Form */}
            <div className="lg:w-1/2 w-full flex flex-col  px-6 justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-7 text-center">Explorer<span className="text-black">Hub</span></h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                {/* email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`p-2 border rounded-xl bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full mt-3
                        ${errors.email ? "border-red-600" : ""}`}
                />
                {errors.email && <p className="text-red-600 text-sm self-start">{errors.email}</p>}
            
                {/* password */}
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`p-2 border rounded-xl bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full mt-3
                        ${errors.password ? "border-red-600" : ""}`}
                    />
                {errors.password && <p className="text-red-600 text-sm self-start">{errors.password}</p>}
                
                {/* forget password */}
                <p className="text-sm text-black mt-5">
                    Forgot Password? <span className="text-[#1b5709] cursor-pointer">Forget</span>
                </p>

                {/* register */}
                <p className="text-sm text-black mt-2">
                    Don't have an account?
                    <span className="text-[#1b5709] cursor-pointer"
                    onClick={() => navigate('/register')}>
                    Register</span>
                </p>

                <button
                type="submit"
                className="bg-[#1b5709] text-white p-2 rounded-xl font-bold w-1/3
                transition transform hover:scale-95 ease-in duration-300 mt-5"
                >
                Log In
                </button>
                {serverError && <p className="text-red-600 text-center text-sm mt-3 ">{serverError}</p>}
            </form>
            </div>

            {/* Right Section - Image */}
            <div className="w-1/2 hidden lg:flex items-center justify-center">
            <img src={privacyImage} alt="Login Illustration" className="w-full" />
            </div>
        </div>
    </div>
  );
};

export default login;
