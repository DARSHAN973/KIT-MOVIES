import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info, Star, Clock, Users, Loader } from 'lucide-react';

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
        const response = await fetch('/api/movies/?type=trending&take=5');
        const data = await response.json();
        setMovies(data);
        
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  
  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 4000);

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
    setIsAutoPlaying(true);
  };

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/movies/default-movie.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return imagePath;
    return `/movies/${imagePath}`;
  };

  // Helper function to format duration
  const formatDuration = (duration) => {
    if (!duration) return '';
    
    // If duration is in minutes (number)
    if (typeof duration === 'number' || !isNaN(duration)) {
      const mins = parseInt(duration);
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      return hours > 0 ? `${hours}h ${remainingMins}m` : `${mins}m`;
    }
    
    // If duration is already formatted string
    return duration;
  };

  // Helper function to format cast
  const formatCast = (actors, actresses) => {
    const allCast = [];
    if (actors) allCast.push(...actors.split(',').map(name => name.trim()));
    if (actresses) allCast.push(...actresses.split(',').map(name => name.trim()));
    return allCast.slice(0, 4); // Show max 4 cast members
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-950 pt-20 lg:pt-24">
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
      <div className="relative w-full h-screen overflow-hidden bg-gray-950 pt-20 lg:pt-24">
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
  const castMembers = formatCast(currentMovie.actors, currentMovie.actresses);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-950 pt-20 md:pt-16 lg:pt-20 z-0">
      
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
                backgroundImage: `url(${getImageUrl(movie.image)})`,
                filter: 'brightness(0.2) contrast(1.2) blur(3px)'
              }}
            />
          </div>
        ))}
        
        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/98 via-gray-950/85 to-gray-950/98" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-gray-950/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-transparent to-gray-950" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 w-full items-center">
          
          {/* Enhanced Movie Poster - Bigger Area */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-all duration-700 animate-pulse"></div>
              
              {/* Secondary Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
              
              <div className="relative">
                <img
                  src={getImageUrl(currentMovie.image)}
                  alt={currentMovie.title}
                  className="relative w-72 lg:w-96 h-96 lg:h-[600px] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 border border-purple-500/20"
                  onError={(e) => {
                    e.target.src = `/movies/default-movie.jpg`;
                    e.target.onerror = () => {
                      e.target.src = `https://via.placeholder.com/400x600/1a1a1a/8b5cf6?text=${encodeURIComponent(currentMovie.title)}`;
                    };
                  }}
                />
                
                {/* Enhanced Play Button Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Category Badge */}
                {currentMovie.category && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {currentMovie.category}
                  </div>
                )}

                {/* Rating Badge */}
                {currentMovie.rating && (
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" fill="currentColor" />
                    {currentMovie.rating}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Movie Details - Organized Layout */}
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
            
            {/* Movie Meta Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                {currentMovie.year}
              </span>
              {currentMovie.duration && (
                <span className="flex items-center gap-2 text-gray-300 bg-gray-800/50 px-3 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  {formatDuration(currentMovie.duration)}
                </span>
              )}
              {castMembers.length > 0 && (
                <span className="flex items-center gap-2 text-gray-300 bg-gray-800/50 px-3 py-2 rounded-full">
                  <Users className="w-4 h-4" />
                  {castMembers.length} Stars
                </span>
              )}
            </div>
            
            {/* Movie Title */}
            <div className="space-y-3">
              <h1 className="text-3xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {currentMovie.title}
              </h1>
              {currentMovie.genre && (
                <p className="text-lg lg:text-xl text-purple-300 font-medium">
                  {currentMovie.genre}
                </p>
              )}
            </div>

            {/* Movie Description */}
            {currentMovie.description && (
              <p className="text-base lg:text-lg text-gray-300 max-w-3xl leading-relaxed">
                {currentMovie.description}
              </p>
            )}

            {/* Cast Information */}
            {castMembers.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Starring:</h3>
                <div className="flex flex-wrap gap-2">
                  {castMembers.map((name, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700/50"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a
                href={`/watch/${currentMovie.id}`}
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
              
              <button className="group px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-full transition-all duration-300 border border-gray-600/50 hover:border-purple-500/50 backdrop-blur-sm">
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

      {/* Enhanced Slide Indicators */}
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
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50'
                : 'bg-white/30 hover:bg-white/50'
            }`} />
          </button>
        ))}
      </div>

      
      {/* {movies.length > 1 && (
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-24 lg:top-28 right-4 lg:right-8 z-20 px-4 py-2 rounded-full bg-black/30 hover:bg-black/50 text-white text-sm transition-all duration-300 backdrop-blur-sm"
        >
          {isAutoPlaying ? 'Pause' : 'Play'}
        </button>
      )}Auto-play Toggle */}

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 shadow-lg"
          style={{ 
            width: `${((currentSlide + 1) / movies.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default MovieCarousel;