import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
const Cancel = () => {
    const { bookingId } = useParams();
    useEffect(() => {
        const cancelBooking = async () => {
            if (!bookingId) return;
            try {
                const response = await axiosInstance.post(`/api/paypal/cancel-order/${bookingId}`);
                console.log("Booking cancelled");
            } catch (error) {
                console.error("Error cancelling booking: ", error);
            }
        }
    })
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100">
            <h2 className="text-3xl font-semibold text-red-600">Payment Cancelled ❌</h2>
            <p className="text-lg mt-2">You have canceled the transaction.</p>
        </div>
    );
};
export default Cancel;