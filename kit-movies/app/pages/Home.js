import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info, Star, Calendar, Clock, Loader } from 'lucide-react';

const MovieCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies from your API/database
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Replace '/api/movies/trending' with your actual API endpoint
        const response = await fetch('/api/movies/trending');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ensure we have movies data
        if (data && data.length > 0) {
          setMovies(data);
        } else {
          // Fallback to demo data if no movies found
          setMovies(getFallbackMovies());
        }
        
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError(err.message);
        // Use fallback data on error
        setMovies(getFallbackMovies());
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Fallback demo data (same structure as your database should provide)
  const getFallbackMovies = () => [
    {
      id: 1,
      title: "Guardians of the Galaxy Vol. 3",
      description: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own.",
      year: "2023",
      duration: "2h 30m",
      genre: "Action • Adventure • Comedy",
      rating: "8.1",
      image: "/banner-images/1-banner.jpg", // Path to your public folder
    },
    {
      id: 2,
      title: "Spider-Man: Across the Spider-Verse",
      description: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse.",
      year: "2023",
      duration: "2h 20m",
      genre: "Animation • Action • Adventure",
      rating: "8.7",
      image: "/banner-images/2-banner.jpg",
    },
    {
      id: 3,
      title: "John Wick: Chapter 4",
      description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
      year: "2023",
      duration: "2h 49m",
      genre: "Action • Thriller • Crime",
      rating: "7.8",
      image: "/banner-images/3-banner.jpg",
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, movies.length]);

  const nextSlide = () => {
    if (movies.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % movies.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    if (movies.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/banner-images/default-banner.jpg';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it starts with '/', it's relative to your domain
    if (imagePath.startsWith('/')) return imagePath;
    
    // Otherwise, prepend with /banner-images/
    return `/banner-images/${imagePath}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-950 pt-16 lg:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto" />
            <h2 className="text-2xl text-white font-semibold">Loading Movies...</h2>
            <p className="text-gray-400">Fetching the latest trending movies</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && movies.length === 0) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-950 pt-16 lg:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-purple-900/20" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-red-400 text-2xl">⚠</span>
            </div>
            <h2 className="text-2xl text-white font-semibold">Unable to Load Movies</h2>
            <p className="text-gray-400">There was an error loading the movie carousel. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (movies.length === 0) return null;

  const currentMovie = movies[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-950 pt-16 lg:pt-20">
      
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${getImageUrl(movie.backdrop_image || movie.banner_image)})`,
                filter: 'brightness(0.3) contrast(1.1)'
              }}
            />
          </div>
        ))}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/60 to-gray-950/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-transparent to-gray-950" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
          
          {/* Movie Poster */}
          <div className="flex-shrink-0 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="relative">
                <img
                  src={getImageUrl(currentMovie.banner_image)}
                  alt={currentMovie.title}
                  className="relative w-56 lg:w-80 h-80 lg:h-[500px] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.target.src = `/banner-images/default-banner.jpg`;
                    // If default also fails, use placeholder
                    e.target.onerror = () => {
                      e.target.src = `https://via.placeholder.com/400x600/1a1a1a/8b5cf6?text=${encodeURIComponent(currentMovie.title)}`;
                    };
                  }}
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex-1 text-center lg:text-left space-y-6 order-1 lg:order-2">
            
            {/* Movie Meta Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                {currentMovie.year}
              </span>
              {currentMovie.duration && (
                <span className="flex items-center gap-1 text-gray-300">
                  <Clock className="w-4 h-4" />
                  {currentMovie.duration}
                </span>
              )}
              {currentMovie.rating && (
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4" fill="currentColor" />
                  {currentMovie.rating}
                </span>
              )}
            </div>
            
            {/* Movie Title */}
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-7xl font-bold text-white leading-tight">
                {currentMovie.title}
              </h1>
              {currentMovie.genre && (
                <p className="text-lg text-purple-300 font-medium">
                  {currentMovie.genre}
                </p>
              )}
            </div>

            {/* Movie Description */}
            {currentMovie.description && (
              <p className="text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
                {currentMovie.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href={`/watch/${currentMovie.slug || currentMovie.id}`}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
              >
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-0.5"></div>
                  </div>
                  <span className="text-lg">Watch Movie</span>
                </div>
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <button className="group px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-full transition-all duration-300 border border-gray-600/50 hover:border-purple-500/50">
                <div className="flex items-center gap-3 justify-center">
                  <Info className="w-5 h-5" />
                  <span className="text-lg">More Info</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-300 ${
              index === currentSlide 
                ? 'w-12 h-3' 
                : 'w-3 h-3 hover:w-6'
            }`}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                : 'bg-white/30 hover:bg-white/50'
            }`} />
          </button>
        ))}
      </div>
{/* 
      Auto-play Toggle
      {movies.length > 1 && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-24 lg:top-28 right-4 lg:right-8 z-20 px-4 py-2 rounded-full bg-black/30 hover:bg-black/50 text-white text-sm transition-all duration-300 backdrop-blur-sm"
        >
          {isAutoPlaying ? 'Pause' : 'Play'}
        </button>
      )} */}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / movies.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default MovieCarousel;