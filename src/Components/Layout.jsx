import React from 'react'
import Navbar from './Navbar'
import Home from '../UserPages/Home'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout