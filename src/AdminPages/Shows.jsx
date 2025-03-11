import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
const Shows = () => {
    const { id } = useParams();
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const getShows = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/api/Cinema/GetAdminShows/${id}`);
            setShows(response.data);
        } catch (error) {
            console.error("Error fetching shows:", error);
            setError("Failed to load shows. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getShows();
    }, [id]);
    const formatDateTime = (dateString) => {
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };
    return (
        <div className="container mx-auto p-6 mt-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Cinema Shows</h2>

            <div className="ml-2">
                <button onClick={() => navigate(`/admin/addShow/${id}`)} className="bg-blue-500 mb-3 cursor-pointer hover:bg-red-500 text-white rounded-sm py-1 px-2">Add Show</button>
            </div>
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div
                            key={index}
                            className="bg-gray-200 animate-pulse h-40 rounded-lg shadow-md p-4"
                        ></div>
                    ))}
                </div>
            )}

            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && !error && (
                shows.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shows.map((show) => (
                            <div onClick={() => navigate(`/admin/showDetails/${show.id}`)}
                                key={show.id}
                                className="cursor-pointer hover:bg-red-500 hover:!text-white bg-white rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-xl"
                            >
                                <h3 className="text-xl font-semibold mb-3">{show.movieTitle}</h3>
                                <p className="">
                                    <span className="font-semibold">Start:</span> {formatDateTime(show.startDate)}
                                </p>
                                <p className="">
                                    <span className="font-semibold ">End:</span> {formatDateTime(show.endDate)}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No shows available.</p>
                )
            )}
        </div>
    );
};
export default Shows;