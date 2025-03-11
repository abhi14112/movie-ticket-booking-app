import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './UserPages/Home'
import Login from './Common/Login'
import MovieDetailsPage from './UserPages/MovieDetailsPage.jsx'
import SignUp from './Common/SignUp'
import Layout from './Components/Layout.jsx'
import useAuthStore from "./store/useAuthStore.js"
import MovieShows from './UserPages/MovieShows.jsx'
import ShowSeats from './UserPages/ShowSeats.jsx'
import AdminHome from './AdminPages/AdminHome.jsx'
import Cinemas from './Components/Cinemas.jsx'
import AddCinema from './AdminPages/AddCinema.jsx'
import Shows from './AdminPages/Shows.jsx'
import ShowDetails from './AdminPages/ShowDetails.jsx'
import AddShow from './AdminPages/AddShow.jsx'
import Bookings from './UserPages/Bookings.jsx'
import AllBookings from './AdminPages/AllBookings.jsx'
// import Checkout from './UserPages/Checkout.jsx'
import Success from './UserPages/Success.jsx'
import Cancel from './UserPages/Cancel.jsx'
const App = () => {
    const user = useAuthStore(state => state.user)
    return (
        <BrowserRouter>

            <Routes>
                <Route path='/admin' element={user && user.role === 'Admin' ? <AdminHome /> : <Navigate to={"/"} />} >
                    <Route index element={<Cinemas />} />
                    <Route path='/admin/bookings' element={<AllBookings />} />
                    <Route path='/admin/addCinema/:id' element={<AddCinema />} />
                    <Route path='/admin/addShow/:id' element={<AddShow />} />
                    <Route path='/admin/shows/:id' element={<Shows />} />
                    <Route path='/admin/showDetails/:id' element={<ShowDetails />} />
                </Route>
                <Route path="/" element={user ? (user.role === 'User' ? <Layout /> : <Navigate to="/admin" replace />) : <Navigate to={"/login"} replace />} >
                    <Route index element={<Home />} />
                    <Route path="/movie/:id" element={user ? <MovieDetailsPage /> : <Navigate to={"/"} />} />
                    <Route path="/bookings/:id" element={user ? <Bookings /> : <Navigate to={"/"} />} />
                    <Route path="/shows/:id" element={user ? <MovieShows /> : <Navigate to={"/"} />} />
                    <Route path="/seats/:showId" element={user ? <ShowSeats /> : <Navigate to={"/"} />} />
                    {/* <Route path="/checkout" element={user ? <Checkout /> : <Navigate to={"/"} />} /> */}
                    <Route path="/success" element={user ? <Success /> : <Navigate to={"/"} />} />
                    <Route path="/cancel" element={user ? <Cancel /> : <Navigate to={"/"} />} />

                </Route>
                <Route path='/login' element={!user ? <Login /> : <Navigate to={"/"} />} />
                <Route path='/register' element={!user ? <SignUp /> : <Navigate to={"/"} />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;