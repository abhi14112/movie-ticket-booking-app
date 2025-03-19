import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios.js';
import { Calendar, Clock, Film, Ticket, Users, CheckCircle, AlertCircle } from 'lucide-react';

const AddShow = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [showData, setShowData] = useState({
    startDate: "",
    endDate: "",
    movieId: "",
    cinemaId: id,
    ticketPrice: "",
    totalSeats: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!showData.startDate) errors.startDate = "Start date is required";
    if (!showData.endDate) errors.endDate = "End date is required";
    if (!showData.movieId) errors.movieId = "Please select a movie";
    if (!showData.ticketPrice) errors.ticketPrice = "Ticket price is required";
    if (!showData.totalSeats) errors.totalSeats = "Total seats is required";

    // Check if end date is after start date
    if (showData.startDate && showData.endDate && new Date(showData.endDate) <= new Date(showData.startDate)) {
      errors.endDate = "End date must be after start date";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/cinema/addshow/${id}`, showData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setNotification({
        show: true,
        type: 'success',
        message: 'Show added successfully!'
      });

      // Reset form after successful submission
      setShowData({
        startDate: "",
        endDate: "",
        movieId: "",
        cinemaId: id,
        ticketPrice: "",
        totalSeats: ""
      });

      setTimeout(() => {
        setNotification({ show: false, type: '', message: '' });
      }, 3000);

    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: error.response?.data?.message || 'Failed to add show. Please try again.'
      });

      setTimeout(() => {
        setNotification({ show: false, type: '', message: '' });
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const getMovies = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/movie/all");
      setMovies(res.data);
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Failed to fetch movies. Please refresh the page.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const NotificationBanner = () => {
    if (!notification.show) return null;

    const bgColor = notification.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
    const Icon = notification.type === 'success' ? CheckCircle : AlertCircle;

    return (
      <div className={`mb-6 p-4 border-l-4 rounded ${bgColor} flex items-center`}>
        <Icon className="h-5 w-5 mr-2" />
        <span>{notification.message}</span>
      </div>
    );
  };

  const FormInput = ({ label, name, type, value, icon: IconComponent }) => (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3 text-gray-400">
          <IconComponent size={18} />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className={`pl-10 w-full border ${formErrors[name] ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
      {formErrors[name] && (
        <p className="text-red-500 text-xs mt-1">{formErrors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Show</h2>
      <p className="text-gray-600 mb-6">Schedule a new movie showing</p>

      <NotificationBanner />

      <div className="space-y-5">
        <FormInput
          label="Start Date & Time"
          name="startDate"
          type="datetime-local"
          value={showData.startDate}
          icon={Calendar}
        />

        <FormInput
          label="End Date & Time"
          name="endDate"
          type="datetime-local"
          value={showData.endDate}
          icon={Clock}
        />

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Select Movie</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400">
              <Film size={18} />
            </div>
            <select
              name="movieId"
              value={showData.movieId}
              onChange={handleChange}
              className={`pl-10 w-full border ${formErrors.movieId ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>{movie.title}</option>
              ))}
            </select>
          </div>
          {formErrors.movieId && (
            <p className="text-red-500 text-xs mt-1">{formErrors.movieId}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Ticket Price ($)"
            name="ticketPrice"
            type="number"
            value={showData.ticketPrice}
            icon={Ticket}
          />

          <FormInput
            label="Total Seats"
            name="totalSeats"
            type="number"
            value={showData.totalSeats}
            icon={Users}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-4 rounded-lg transition duration-300 mt-4 font-medium flex justify-center items-center`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : 'Schedule Show'}
        </button>
      </div>
    </div>
  );
};

export default AddShow;