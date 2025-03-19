import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Ticket, UserPlus } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        mobile: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axiosInstance.post('api/auth/signup', formData);
            setSuccess('Account created successfully!');
            navigate('/login');
            console.log('SignUp successful:', response.data);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            <div className="bg-white py-2 px-8 rounded-2xl shadow-2xl w-96 max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-600 p-3 rounded-full">
                        <Ticket size={32} className="text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-6">Sign up to start booking cinema tickets</p>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <p className="text-green-700 text-sm">{success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            placeholder="johndoe123"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            placeholder="+1 (555) 123-4567"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? 
                                    <EyeOff size={20} /> : 
                                    <Eye size={20} />
                                }
                            </button>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 font-medium shadow-md flex items-center justify-center"
                    >
                        <UserPlus size={18} className="mr-2" />
                        Create Account
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-red-600 font-medium hover:text-red-800 transition">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;