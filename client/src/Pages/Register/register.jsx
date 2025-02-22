import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import RegisterForm from '../../assets/RegisterForm.gif';

const Register = ({ onAuthSuccess }) => {
    const [formData, setFormData] = useState({
        username: "", email: "", password: "", 
        first_name: "", last_name: "", phone_no: "", gender: "", country: ""
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) newErrors[key] = `${key} is required*`;
        });

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

        try {
            const response = await fetch("https://seba2.pythonanywhere.com/register/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) navigate('/login');
            else setServerError(data.message || "something went wrong");
        } catch (error) {
            setServerError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pb-12 pt-16">
            <img src={logo} alt="Logo" className="absolute top-4 left-4 h-11 w-30 sm:h-14 pb-2 cursor-pointer" onClick={() => navigate('/')} />
            <div className="flex bg-white px-3 py-8 rounded-2xl w-[95%] md:w-[85%] lg:w-[90%] xl:w-[90%]">
                <div className="lg:w-1/2 w-full flex flex-col px-6 justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-7 text-center md:self-start">Join Our <span className="text-black">Team</span></h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            { label: "First Name", name: "first_name" , placeholder: "john"},
                            { label: "Last Name", name: "last_name" , placeholder: "doe"},
                            { label: "Username", name: "username" , placeholder: "johndoe"},
                            { label: "Email", name: "email", type: "email" , placeholder: "john18@gmail.com" },
                            { label: "Phone Number", name: "phone_no" , placeholder: "012 345 6789"},
                            { label: "Country", name: "country" },
                            { label: "Password", name: "password", type: "password" , placeholder: "********"},
                        ].map(({ label, name, placeholder, type = "text" }) => (
                            <div key={name}>
                                <p className='text-black text-sm pb-2'>{label}</p>
                                <input type={type} name={name} placeholder={placeholder} value={formData[name]} 
                                onChange={handleChange} className="p-2 border rounded-lg bg-gray-100 focus:ring-2
                                 focus:ring-primary outline-none w-full" />
                                {errors[name] && <p className="text-red-600 text-sm">{errors[name]}</p>}
                            </div>
                        ))}
                        <div>
                            <p className='text-primary text-sm pb-2 font-bold'>Gender</p>
                            {["Male", "Female"].map((g) => (
                                <label key={g} className="flex items-center cursor-pointer space-x-2">
                                    <div className={`w-4 h-4 rounded-full border-2 ${formData.gender === g ?
                                         "border-primary flex items-center justify-center" : "border-gray-400"}`}>
                                        {formData.gender === g && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                    </div>
                                    <input type="radio" name="gender" value={g} checked={formData.gender === g} 
                                    onChange={handleChange} className="hidden" />
                                    <span className="text-black text-sm">{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                                </label>
                            ))}
                            {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
                        </div>
                        <div className='col-span-1 md:col-span-2 flex justify-end'>
                            <button type="submit" className="text-white bg-primary py-2 px-6 border
                             border-primary rounded-xl font-bold transition transform hover:scale-95 
                             ease-in duration-300">Register</button>
                        </div>
                    </form>
                    {serverError && <p className="text-red-500 text-center text-sm mt-3">{serverError}</p>}
                </div>
                <div className="w-1/2 hidden lg:flex items-center justify-center overflow-hidden">
                    <img src={RegisterForm} alt="Register Illustration" className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
};
export default Register;