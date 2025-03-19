import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axios.js";

const AddMovie = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        title: "",
        description: "",
        coverImage: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/api/movie/add', movieData);
            navigate("/");
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    }

    return (
        <div className="max-w-xl mt-4 mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Movie</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={handleChange}
                        placeholder="Enter movie title"
                        value={movieData.title}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        onChange={handleChange}
                        placeholder="Enter movie description"
                        value={movieData.description}
                        rows="4"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="coverImage" className="text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                    <input
                        type="text"
                        id="coverImage"
                        name="coverImage"
                        required
                        onChange={handleChange}
                        placeholder="Enter cover image URL"
                        value={movieData.coverImage}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="flex items-center justify-end pt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Movie
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddMovie