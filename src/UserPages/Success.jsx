import { useEffect } from "react";
import React from "react";
import axiosInstance from "../api/axios.js";
import { useSearchParams } from "react-router-dom";
const Success = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("token");
    useEffect(() => {
        const capturePayment = async () => {
            if (!orderId) return;
            try {
                const response = await axiosInstance.post(`/api/paypal/capture-order/${orderId}`);
                console.log("Payment Captured:", response.data);
            } catch (error) {
                console.error("Error capturing payment:", error);
            }
        };
        capturePayment();
    }, [orderId]);
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-100">
            <h2 className="text-3xl font-semibold text-green-700">Payment Successful! 🎉</h2>
            <p className="text-lg mt-2">Thank you for your purchase.</p>
        </div>
    );
};
export default Success;