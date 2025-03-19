import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`, { state: { movie } });
    };
    return (
        <div
            className="bg-white rounded-lg shadow-lg hover:cursor-pointer overflow-hidden w-60"
            onClick={handleClick}
        >
            <img src={movie.coverImage} alt={movie.title} className="w-full h-80 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-600">{movie.description.substring(0, 20)}...</p>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-yellow-500 font-bold">{movie.rating}⭐</span>
                    <span className="text-gray-500 text-sm">{movie.votes} Votes</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
