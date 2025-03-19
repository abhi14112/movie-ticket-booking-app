import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
const Navbar = () => {
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);
    return (
        <nav className="bg-red-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold flex items-center">
                    <Link to={"/"}>BookYourShow</Link>
                </div>
                <div className="space-x-6">
                    <Link to="/" className="hover:text-gray-200 transition">Home</Link>
                    {/* <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
                    <Link to="/signup" className="hover:text-gray-200 transition">Signup</Link> */}
                    {
                        user.role == 'Admin' &&
                        <Link to={`/admin/addCinema/${user.id}`}>Add Cinema</Link>
                    }
                    {
                        user.role == 'Admin' &&
                        <Link to={`/admin/addMovie`}>Add Movie</Link>
                    }
                    {
                        user.role == 'Admin' &&
                        <Link to={`/admin/bookings`}>Bookings</Link>
                    }
                    {
                        user.role == 'User' &&
                        <Link to={`/bookings/${user.id}`}>Bookings</Link>
                    }
                    <button onClick={logout} className="hover:text-gray-200 transition">Logout</button>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
