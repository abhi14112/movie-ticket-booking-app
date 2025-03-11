import React from "react";
const Cancel = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100">
            <h2 className="text-3xl font-semibold text-red-600">Payment Cancelled ❌</h2>
            <p className="text-lg mt-2">You have canceled the transaction.</p>
        </div>
    );
};

export default Cancel;
