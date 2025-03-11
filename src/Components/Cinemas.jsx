import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import useAuthStore from '../store/useAuthStore';
import { MapPin, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Cinemas = () => {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCinemas = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`api/Cinema/GetCinemas/${user.id}`);
            setCinemas(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cinemas:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getCinemas();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (cinemas.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                <Film className="w-16 h-16 text-gray-400 mb-4" />
                <h1 className="text-3xl font-bold text-gray-700">No Cinemas Available</h1>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Cinemas</h1>
                <button
                    onClick={() => getCinemas()}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                    Refresh
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {cinemas.map(cinema => (
                    <div
                        key={cinema.id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-100"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{cinema.name}</h2>
                                <div className="flex items-center mt-2 text-gray-600">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <p>{cinema.location}</p>
                                </div>
                            </div>
                            <div className="bg-indigo-100 p-2 rounded-full">
                                <Film className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                            <button onClick={() => navigate(`/admin/shows/${cinema.id}`)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 cursor-pointer">
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cinemas;