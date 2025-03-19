import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddCinema = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({ name: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axiosInstance.post(`/api/cinema/addcinema/${id}`, data);
      setSuccess(true);
      setData({ name: '', location: '' });
      navigate("/admin");
    } catch (err) {
      setError('Failed to add cinema. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mt-4 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Cinema</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
          Cinema added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            required 
            onChange={handleChange} 
            placeholder="Enter cinema name" 
            value={data.name}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1">Location</label>
          <input 
            type="text" 
            id="location"
            name="location" 
            required 
            onChange={handleChange} 
            placeholder="Enter cinema location" 
            value={data.location}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        
        <div className="flex items-center justify-end pt-4">
          <button 
            type="button" 
            onClick={() => navigate("/admin")}
            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Cinema'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCinema;