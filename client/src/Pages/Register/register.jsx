import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import RejesterForm from '../../assets/rejesterForm.gif'


const Register = ({onAuthSuccess}) => {

    const [formData, setFormData] = useState({ username: "", email: "", password: "" ,
        confirmPassword: "" ,firstName: "", lastName: "", phoneNumber: "" , gender: "", country: "",
     });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        let newErrors = {};

        if (!formData.username) newErrors.username = "username is required*";
        if (!formData.email) newErrors.email = "email is required*";
        if (!formData.password) newErrors.password = "password is required*";
        if (!formData.confirmPassword) newErrors.confirmPassword = "confirmPassword is required*";
        if (!formData.firstName) newErrors.firstName = "firstName is required*";
        if (!formData.lastName) newErrors.lastName = "lastName is required*";
        if (!formData.phoneNumber) newErrors.phoneNumber = "phoneNumber is required*";
        if (!formData.gender) newErrors.gender = "gender is required*";
        if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, confirmPassword: "Passwords do not match" });
            return;
        }
        if ( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.-])[A-Za-z\d@$!%*?&_.-]{8,}$/.test(formData.password)) {
            setErrors({ ...errors, password:
                 "Password must be at least 8 characters and include uppercase, lowercase, number, and special character." });
            return;
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            return;
        }
        
        try {
            const response = await fetch("https://seba2.pythonanywhere.com/register/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                mode: "cors"
            });

            const data = await response.json();
            console.log(response, data);

            if (response.ok) {
                navigate('/login');
            } else {
                setServerError(data.message);
            }
        } 
        catch (error) {
            console.error(error);
            setServerError("Registration failed. Please try again.");
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pb-12 pt-16">
        {/* Logo */}
        <img 
        src={logo}
        alt="Logo" 
        className="absolute top-4 left-4 h-11 w-30 sm:h-14 pb-2 cursor-pointer" 
        onClick={() => navigate('/')} 
        />

        {/* Form Container */}
        <div className="flex bg-white px-3 py-8  rounded-2xl  w-[95%]  
        md:w-[85%] lg:w-[90%] xl:w-[90%]">
            {/* Left Section - Form */} 
            <div className="lg:w-1/2 w-full flex flex-col px-6 justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-7 text-center md:self-start">
                Join Our <span className="text-black">Team</span></h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 
                gap-5">
                    
                    <div>
                        <p className='text-black text-sm pb-2'>First Name</p>
                        <input type="text" name="firstName" placeholder="John"
                        value={formData.firstName} onChange={handleChange} 
                        className="p-2 border rounded-lg bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full" />
                        {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
                    </div> 

                    <div>
                        <p className='text-black text-sm pb-2'>Last Name</p>
                        <input type="text" name="lastName" placeholder="Divid" 
                        value={formData.lastName} onChange={handleChange} 
                        className="p-2 border rounded-lg bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full" />
                        {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
                    </div>

                    <div>
                        <p className='text-black text-sm pb-2'>Username</p>
                        <input type="text" name="username" placeholder="johndiv" 
                        value={formData.username} onChange={handleChange} 
                        className="p-2 border rounded-lg bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full" />
                        {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
                    </div>

                    <div>
                        <p className='text-black text-sm pb-2'>Email</p>
                        <input type="email" name="email" placeholder="johndivid23@gmail.com" 
                        value={formData.email} onChange={handleChange} 
                        className="p-2 border rounded-lg bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full" />
                        {errors.email && <p className="text-red-600 text-sm ">{errors.email}</p>}
                    </div>

                    <div>
                        <p className='text-black text-sm pb-2'>Phone Number</p>
                        <input type="text" name="phoneNumber" placeholder="+967 123 456 789" 
                        value={formData.phoneNumber} onChange={handleChange} 
                        className="p-2 border rounded-lg bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full" />
                        {errors.phoneNumber && <p className="text-red-600 text-sm">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                        <p className='text-black text-sm pb-2'>Country</p>
                        <input type="text" name="countary" placeholder="Egypt"
                        value={formData.country} onChange={handleChange}
                        className="p-2 border rounded-lg bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full" />
                    </div>

                    <div>
                        <p className='text-black text-sm pb-2'>Password</p>
                        <input type="password" name="password" placeholder="********" 
                        value={formData.password} onChange={handleChange} 
                        className="p-2 border rounded-lg bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full" />
                        {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                    </div>

                    <div>
                        <p className='text-black text-sm pb-2'>Confirm Password</p>
                        <input type="password" name="confirmPassword" placeholder="********"
                        value={formData.confirmPassword} onChange={handleChange}
                        className="p-2 border rounded-lg bg-gray-100 focus:ring-2
                        focus:ring-[#1b5709] outline-none w-full" />
                        {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                        <p className='text-[#1b5709] text-sm pb-2 font-bold'> Gender </p>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center cursor-pointer space-x-2">
                                <div className={`w-4 h-4 rounded-full border-2 
                                    ${formData.gender === "male" ? "border-[#1b5709] flex items-center justify-center" 
                                    : "border-gray-400"}`}>
                                    {formData.gender === "male" && 
                                    <div className="w-2.5 h-2.5 bg-[#1b5709] rounded-full"></div>}
                                </div>
                                <input type="radio" name="gender" value="male"
                                checked={formData.gender === "male"}
                                onChange={handleChange} className="hidden" />
                                <span className="text-black text-sm">Male</span>
                            </label>

                            <label className="flex items-center cursor-pointer space-x-2">
                                <div className={`w-4 h-4 rounded-full border-2 
                                    ${formData.gender === "female" ? "border-[#1b5709] flex items-center justify-center" 
                                    : "border-gray-400"}`}>
                                    {formData.gender === "female" && 
                                    <div className="w-2.5 h-2.5 bg-[#1b5709] rounded-full"></div>}
                                </div>
                                <input type="radio" name="gender" value="female" 
                                checked={formData.gender === "female"} 
                                onChange={handleChange} className="hidden" />
                                <span className="text-black text-sm">Female</span>
                            </label>

                            {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
                        </div>
                    </div>
                    
                    <div className='col-span-1 md:col-span-2 flex justify-end '>
                        <button type="submit" className="
                        text-white bg-[#1b5709] py-2 px-6 border border-[#1b5709] rounded-xl font-bold 
                        transition transform hover:scale-95 ease-in duration-300">
                            Register
                        </button>
                    </div>
                </form>
                {serverError && <p className="text-red-500 text-center text-sm mt-3">{serverError}</p>}
            </div>
            {/* Right Section - Image */}
            <div className="w-1/2 hidden lg:flex items-center justify-center overflow-hidden">
                <img src={RejesterForm} alt="Register Illustration" className="w-full h-auto" />
            </div>
        </div>
    </div>
  )
}

export default Register