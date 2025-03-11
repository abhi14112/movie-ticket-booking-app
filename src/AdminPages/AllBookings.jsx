import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/api/cinema/bookings")
            .then((response) => setBookings(response.data))
            .catch((error) => console.error("Error fetching bookings:", error));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">All Bookings</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="py-2 px-4 text-left">#</th>
                            <th className="py-2 px-4 text-left">Movie</th>
                            <th className="py-2 px-4 text-left">Cinema</th>
                            <th className="py-2 px-4 text-left">Show Time</th>
                            <th className="py-2 px-4 text-left">Seats</th>
                            <th className="py-2 px-4 text-left">Booking Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking.id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{booking.show.title}</td>
                                <td className="py-2 px-4">{booking.cinema.name}</td>
                                <td className="py-2 px-4">
                                    {new Date(booking.show.startTime).toLocaleString()}
                                </td>
                                <td className="py-2 px-4">
                                    {booking.seats.map((seat) => seat.seatNumber).join(", ")}
                                </td>
                                <td className="py-2 px-4">
                                    {new Date(booking.bookingTime).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {bookings.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">No bookings found.</p>
                )}
            </div>
        </div>
    );
};

export default AllBookings;
