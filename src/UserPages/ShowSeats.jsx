import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useAuthStore from "../store/useAuthStore.js";
import { useNavigate } from 'react-router-dom';
const ShowSeats = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const location = useLocation();
    let { seats, cinemaId, ticketPrice } = location.state || {};
    const [seatsData, setSeatsData] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeatsId, setSelectedSeatsId] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showId } = useParams();
    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axiosInstance.get(`api/Cinema/GetShowSeats/${showId}`);
                setSeatsData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching seats:', error);
                setLoading(false);
            }
        };
        fetchSeats();
    }, [showId]);
    const createOrder = async (bookingId) => {
        try {
            setLoading(true);
            let amount = ticketPrice * selectedSeats.length;
            const response = await axiosInstance.post("/api/paypal/create-order", {
                amount: amount,
                currency: "USD",
                returnUrl: "http://localhost:5173/success",
                cancelUrl: `http://localhost:5173/cancel/${bookingId}`,
            });
            const approvalUrl = response.data.links.find(link => link.rel === "approve")?.href;
            if (approvalUrl) {
                window.location.href = approvalUrl;
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to create order.");
        } finally {
            setLoading(false);
        }
    };
    const handleSeatClick = (row, column, id) => {
        console.log(selectedSeats, selectedSeatsId);
        const seatKey = `${row}-${column}`;
        const rowData = seatsData.find(r => r.row === row);
        const seatData = rowData?.columns.find(c => c.column === column);
        if (seatData && seatData.seatStatus === 1) {
            return;
        }
        if (selectedSeats.includes(seatKey)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatKey));
            setSelectedSeatsId(selectedSeatsId.filter(seat => seat !== id));
        } else {
            if (selectedSeats.length === seats) {
                setSelectedSeats([...selectedSeats.slice(1), seatKey]);
                setSelectedSeatsId([...selectedSeatsId.slice(1), id]);
            } else {
                setSelectedSeats([...selectedSeats, seatKey]);
                setSelectedSeatsId([...selectedSeatsId, id]);
            }
        }
    };
    const getSeatColor = (row, column) => {
        const seatKey = `${row}-${column}`;
        const rowData = seatsData.find(r => r.row === row);
        const seatData = rowData?.columns.find(c => c.column === column);
        if (seatData && seatData.seatStatus === 1) {
            return 'bg-gray-200 text-gray-400 cursor-not-allowed';
        }
        if (selectedSeats.includes(seatKey)) {
            return 'bg-green-500 text-white border-green-600';
        }
        return 'bg-white text-green-500 border-green-500 hover:bg-green-100';
    };
    const handleBookTickets = async () => {
        if (!selectedSeatsId.length)
            return;
        try {
            let amount = ticketPrice * selectedSeats.length;
            const res = await axiosInstance.post(`/api/Cinema/BookSeats`, { Ids: selectedSeatsId, cinemaId, showId, userId: user.id, amount: amount });
            console.log(res.data);
            createOrder(res.data.bookingId);
        } catch (error) {
            console.log(error);
        }
    }
    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading seats...</div>;
    }
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Select Your Seats</h2>
            <p className='absolute right-36 top-36 text-xl'>Selected Seats : {seats}</p>
            <div className="max-w-2xl mx-auto">
                {seatsData.map((row) => (
                    <div key={row.row} className="flex items-center mb-4">
                        <div className="w-8 text-center font-bold text-gray-700">{row.row}</div>
                        <div className="flex flex-1 gap-2 flex-wrap">
                            {row.columns.map((seat) => (
                                <button
                                    key={`${row.row}-${seat.column}`}
                                    className={`w-8 h-8 flex items-center justify-center border rounded-md ${getSeatColor(row.row, seat.column)}`}
                                    onClick={() => handleSeatClick(row.row, seat.column, seat.id)}
                                    disabled={seat.seatStatus === 1}
                                >
                                    {seat.column}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex justify-center gap-8">
                <div className="flex items-center">
                    <div className="w-6 h-6 border border-green-500 bg-white rounded-md mr-2"></div>
                    <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 border border-green-600 rounded-md mr-2"></div>
                    <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-200 border border-gray-300 rounded-md mr-2"></div>
                    <span className="text-sm">Booked</span>
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold mb-2">Selected Seats:</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedSeats.map(seat => (
                            <span key={seat} className="px-2 py-1 bg-green-100 text-green-800 rounded">
                                {seat}
                            </span>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold">Total: {selectedSeats.length} seats</p>
                        <button onClick={handleBookTickets} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Book
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ShowSeats;