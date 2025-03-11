import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const MovieShows = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [totalSeats, setTotalSeats] = useState(0);
    const { id } = useParams();
    const [showId, setShowId] = useState(0);
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedShow, setSelectedShow] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/api/Cinema/GetShows/${id}`);
                setTheaters(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch theater data');
                setLoading(false);
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto  px-4 py-8">

            {
                active &&
                <div className='bg-gray-400 flex items-center justify-center h-screen w-screen opacity-90  absolute inset-0'>
                    <div className='w-[400px] py-4 flex flex-col items-center justify-between  px-2 font-semibold text-xl rounded-md shadow-2xl h-[300px] bg-white'>
                        <h1 className='text-center'>How Many Seats?</h1>
                        <div className='flex justify-around'>

                            {
                                Array.from({ length: 10 }).map((_, i) => {
                                    return (
                                        <button onClick={() => setTotalSeats(i + 1)} className={`hover:bg-red-500 hover:cursor-pointer hover:shadow-2xl ${totalSeats == i + 1 ? 'bg-red-500 text-white shadow-2xl ' : ''} rounded-full h-8 w-8 hover:text-white`}>{i + 1}</button>
                                    )
                                })
                            }
                        </div>
                        <button onClick={() => { setActive((prev) => !prev); totalSeats != 0 && navigate(`/seats/${showId}`, { state: { seats: totalSeats, cinemaId: id, ticketPrice: selectedShow.ticketPrice } }) }} className='w-full bg-red-500 rounded-sm cursor-pointer  py-2 px-4 text-white font-semibold text-xl'>Select Seats</button>

                    </div>
                </div>
            }
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Movie Shows</h1>

            {theaters.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No shows available at this time.</p>
                </div>
            ) : (
                theaters.map((theater) => (
                    <div key={theater.id} className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">{theater.name}</h2>
                            <p className="text-gray-600">{theater.location}</p>
                        </div>

                        <div className="p-6">
                            {theater.shows.length === 0 ? (
                                <p className="text-gray-500 text-center">No shows available for this theater.</p>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                                        {formatDate(theater.shows[0].startDate)}
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {theater.shows.map((show) => (
                                            <button onClick={() => { setActive((prev) => !prev); setShowId(show.id); setSelectedShow(show) }}
                                                key={show.id}
                                                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-md border border-blue-200 transition-colors"
                                            >
                                                <span className="block">{formatDateTime(show.startDate)}</span>
                                                <span className="text-xs text-gray-500">₹{show.ticketPrice}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 px-6 py-3 border-t flex items-center text-sm">
                            <div className="flex items-center mr-6">
                                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">Available</span>
                            </div>
                            <div className="flex items-center mr-6">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">Filling Fast</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">Almost Full</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MovieShows;