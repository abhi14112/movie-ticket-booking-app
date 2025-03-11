import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const MovieDetailsPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const movie = location.state?.movie;
    const navigate = useNavigate();
    if (!movie) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md">
                    <p className="font-bold">Movie not found!</p>
                    <p className="text-sm">Please go back and try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
            <div className="relative">
                <img
                    src={movie.coverImage}
                    alt={movie.title}
                    className="w-full h-96 object-cover rounded-lg shadow-md"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold">
                    {movie.rating}⭐
                </div>
            </div>

            <div className="mt-6">
                <h1 className="text-4xl font-bold text-gray-800">{movie.title}</h1>

                {/* <div className="flex items-center mt-2 text-gray-500">
                    <span>{movie.votes} Votes</span>
                    {movie.runtime && (
                        <>
                            <span className="mx-2">•</span>
                            <span>{movie.runtime} min</span>
                        </>     
                    )}
                    {movie.releaseDate && (
                        <>
                            <span className="mx-2">•</span>
                            <span>{movie.releaseDate}</span>
                        </>
                    )}
                </div> */}

                <div className="mt-4">
                    <p className="text-lg text-gray-700 leading-relaxed">{movie.description}</p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <button onClick={() => navigate(`/shows/${id}`)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 mb-4 sm:mb-0"
                    >
                        Book Tickets
                    </button>

                    <div className="flex space-x-4">
                        <button className="border border-gray-300 hover:border-gray-500 text-gray-700 font-medium py-2 px-4 rounded-lg">
                            <span className="mr-2">❤️</span> Add to Favorites
                        </button>
                        <button className="border border-gray-300 hover:border-gray-500 text-gray-700 font-medium py-2 px-4 rounded-lg">
                            <span className="mr-2">🔗</span> Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MovieDetailsPage;