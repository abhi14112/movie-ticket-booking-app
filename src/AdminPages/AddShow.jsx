import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios.js';

const AddShow = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [showData, setShowData] = useState({
    startDate: "",
    endDate: "",
    movieId: "",
    cinemaId: id,
    ticketPrice: "",
    totalSeats: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post(`/api/cinema/addshow/${id}`, showData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("Show added successfully:", res.data);
      alert("Show added successfully!");
    } catch (error) {
      console.error("Error adding show:", error.response?.data || error.message);
      alert("Failed to add show. Please try again.");
    }
  };

  const getMovies = async () => {
    try {
      const res = await axiosInstance.get("/api/movie/all");
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Show</h2>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            onChange={handleChange}
            value={showData.startDate}
            name="startDate"
            type="datetime-local"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            onChange={handleChange}
            value={showData.endDate}
            name="endDate"
            type="datetime-local"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Select Movie</label>
          <select
            name="movieId"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>{movie.title}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Ticket Price</label>
          <input
            onChange={handleChange}
            value={showData.ticketPrice}
            name="ticketPrice"
            type="number"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Total Seats</label>
          <input
            onChange={handleChange}
            value={showData.totalSeats}
            name="totalSeats"
            type="number"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mt-2 font-medium"
        >
          Add Show
        </button>
      </div>
    </div>
  );
};

export default AddShow;
