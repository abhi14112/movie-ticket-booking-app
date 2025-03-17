import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";

const Bookings = () => {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(`/api/cinema/bookings/${id}`)
            .then((response) => setBookings(response.data))
            .catch((error) => console.error("Error fetching bookings:", error));
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Bookings</h2>

            {bookings.length === 0 ? (
                <p className="text-gray-600">No bookings found.</p>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
                        >
                            <h3 className="text-lg font-semibold text-blue-600">Movie: {booking.show.title}</h3>
                            <p className="text-gray-700">
                                <strong>Cinema:</strong> {booking.cinema.name}
                            </p>
                            <p className="text-gray-600">
                                <strong>Show Time:</strong> {new Date(booking.show.startTime).toLocaleString()}
                            </p>
                            <p className="text-gray-500">
                                <strong>Booking Time:</strong> {new Date(booking.bookingTime).toLocaleString()}
                            </p>
                            <p className="text-gray-500">
                                <strong>Status:</strong> {booking.status}
                            </p>
                            <p className="text-gray-500">
                                <strong>Amount:</strong> {booking.amount}
                            </p>
                            <div className="mt-4">
                                <p className="text-gray-700 font-medium">Seats:</p>
                                <div className="flex gap-2 mt-2">
                                    {booking.seats.map((seat) => (
                                        <span
                                            key={seat.id}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium"
                                        >
                                            {seat.seatNumber}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Bookings;