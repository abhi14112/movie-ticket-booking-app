import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Ticket } from 'lucide-react';

const Login = () => {
    const setUserData = useAuthStore(state => state.setUserData);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
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
        try {
            const response = await axiosInstance.post('api/auth/login', formData);
            navigate("/");
            setUserData(response.data.user);
            console.log('Login successful:', response.data);
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-600 p-3 rounded-full">
                        <Ticket size={32} className="text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-6">Sign in to book your cinema tickets</p>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            placeholder="your@email.com"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
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
                        className="w-full cursor-pointer bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 font-medium shadow-md"
                    >
                        Sign In
                    </button>
                </form>





                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <a href="/register" className="text-red-600 font-medium hover:text-red-800 transition">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;