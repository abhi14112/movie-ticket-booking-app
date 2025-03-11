import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";

const ShowDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState({
        id: "",
        startDate: "",
        endDate: "",
        totalSeats: 0,
        ticketPrice: 0,
    });

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await axiosInstance.get(`api/Cinema/GetShowDetails/${id}`);
                console.log(response.data);
                setShow(response.data);

            } catch (error) {
                console.error("Error fetching show details", error);
            }
        };

        fetchShowDetails();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setShow((prevShow) => ({
            ...prevShow,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await axiosInstance.put(`api/Cinema/UpdateShowDetails`, show);
            console.log("Show details updated:", response.data);
            alert("Show details updated successfully!");
        } catch (error) {
            console.error("Error updating show details", error);
            alert("Failed to update show details!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Show Details</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Start Date:</label>
                        <input
                            type="text"
                            value={new Date(show.startDate).toLocaleString()}
                            className="w-full border p-2 rounded bg-gray-200"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">End Date:</label>
                        <input
                            type="text"
                            value={new Date(show.endDate).toLocaleString()}
                            className="w-full border p-2 rounded bg-gray-200"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Total Seats:</label>
                        <input
                            type="number"
                            name="totalSeats"
                            value={show.totalSeats}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Ticket Price:</label>
                        <input
                            type="number"
                            name="ticketPrice"
                            value={show.ticketPrice}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShowDetails;
