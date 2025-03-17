import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axiosInstance from "../api/axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/api/movie/all");
        setMovies(response.data);
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Movies</h2>
      {loading && <p className="text-center">Loading movies...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
