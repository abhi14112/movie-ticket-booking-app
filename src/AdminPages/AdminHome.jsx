import React from 'react'
import Cinemas from '../Components/Cinemas'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
const AdminHome = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
export default AdminHome