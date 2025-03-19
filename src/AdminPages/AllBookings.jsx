import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Calendar, Clock, Film, MapPin, Users, Search } from "lucide-react";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "bookingTime",
    direction: "desc"
  });

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/api/cinema/bookings")
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, []);

  const handleSort = (key) => {
    const direction = 
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    if (sortConfig.key === "show.title") {
      return sortConfig.direction === "asc" 
        ? a.show.title.localeCompare(b.show.title)
        : b.show.title.localeCompare(a.show.title);
    }
    
    if (sortConfig.key === "cinema.name") {
      return sortConfig.direction === "asc"
        ? a.cinema.name.localeCompare(b.cinema.name)
        : b.cinema.name.localeCompare(a.cinema.name);
    }
    
    if (sortConfig.key === "show.startTime") {
      return sortConfig.direction === "asc"
        ? new Date(a.show.startTime) - new Date(b.show.startTime)
        : new Date(b.show.startTime) - new Date(a.show.startTime);
    }
    
    if (sortConfig.key === "bookingTime") {
      return sortConfig.direction === "asc"
        ? new Date(a.bookingTime) - new Date(b.bookingTime)
        : new Date(b.bookingTime) - new Date(a.bookingTime);
    }
    
    if (sortConfig.key === "seats") {
      return sortConfig.direction === "asc"
        ? a.seats.length - b.seats.length
        : b.seats.length - a.seats.length;
    }
    
    return 0;
  });

  const filteredBookings = sortedBookings.filter(booking => 
    booking.show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.cinema.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Movie Bookings</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies or cinemas..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {filteredBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="py-3 px-4 text-left">#</th>
                      <th 
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSort("show.title")}
                      >
                        <div className="flex items-center">
                          <Film className="h-4 w-4 mr-2" />
                          <span>Movie {getSortIcon("show.title")}</span>
                        </div>
                      </th>
                      <th 
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSort("cinema.name")}
                      >
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Cinema {getSortIcon("cinema.name")}</span>
                        </div>
                      </th>
                      <th 
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSort("show.startTime")}
                      >
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Show Time {getSortIcon("show.startTime")}</span>
                        </div>
                      </th>
                      <th 
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSort("seats")}
                      >
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Seats {getSortIcon("seats")}</span>
                        </div>
                      </th>
                      <th 
                        className="py-3 px-4 text-left cursor-pointer hover:bg-gray-700"
                        onClick={() => handleSort("bookingTime")}
                      >
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Booking Time {getSortIcon("bookingTime")}</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking, index) => (
                      <tr key={booking.id} className="border-b hover:bg-blue-50 transition-colors">
                        <td className="py-3 px-4 font-medium">{index + 1}</td>
                        <td className="py-3 px-4 font-medium text-blue-700">{booking.show.title}</td>
                        <td className="py-3 px-4">{booking.cinema.name}</td>
                        <td className="py-3 px-4">{formatDate(booking.show.startTime)}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {booking.seats.map((seat) => (
                              <span key={seat.id} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs">
                                {seat.seatNumber}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-sm">{formatDate(booking.bookingTime)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <Film className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No bookings found.</p>
                {searchTerm && (
                  <button 
                    className="mt-4 text-blue-600 hover:underline"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4 text-gray-500 text-sm">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      </div>
    </div>
  );
};

export default AllBookings;