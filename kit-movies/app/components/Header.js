"use client"
import React, { useState, useEffect } from 'react';
import { Film, Home, Music, FileText, BookOpen, LogIn, LogOut, Menu, X, Search } from 'lucide-react';
import client from '../generated/prisma/client';

const AnimatedHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'Movies', icon: Film, href: '#' },
    { name: 'Music', icon: Music, href: '#' },
    { name: 'Lyrics', icon: FileText, href: '#' },
    { name: 'Blog', icon: BookOpen, href: '#' }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-purple-500/20' 
        : 'bg-transparent'
    }`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <div className="relative bg-gray-900 p-2 rounded-lg border border-purple-500/30">
                <Film className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
            <div className="relative">
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x group-hover:scale-105 transition-transform duration-300">
                KIT MOVIES
              </h1>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{item.name}</span>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className={`relative w-full transition-all duration-300 ${
              isSearchFocused ? 'transform scale-105' : ''
            }`}>
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-sm transition-opacity duration-300 ${
                isSearchFocused ? 'opacity-100' : 'opacity-0'
              }`}></div>
              <div className="relative flex items-center">
                <Search className={`absolute left-4 w-5 h-5 transition-colors duration-300 cursor-pointer ${
                  isSearchFocused ? 'text-purple-400' : 'text-gray-400'
                }`} onClick={handleSearch} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search movies, music, lyrics..."
                  className={`w-full pl-12 pr-12 py-2.5 rounded-full bg-gray-800/50 border transition-all duration-300 text-white placeholder-gray-400 focus:outline-none ${
                    isSearchFocused 
                      ? 'border-purple-500/50 bg-gray-800/70 shadow-lg shadow-purple-500/10' 
                      : 'border-gray-700/50 hover:border-gray-600/50'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Auth Button & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Sign In/Out Button */}
            <button
              onClick={() => setIsSignedIn(!isSignedIn)}
              className="hidden lg:flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              {isSignedIn ? (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign Up</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-purple-500/20 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="p-4 space-y-3">
            
            {/* Mobile Search Bar */}
            <div className="relative">
              <div className="flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-gray-400 cursor-pointer" onClick={handleSearch} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search movies, music, lyrics..."
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/70 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Navigation */}
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
            
            <div className="pt-2 border-t border-gray-700/50">
              <button
                onClick={() => {
                  setIsSignedIn(!isSignedIn);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-300"
              >
                {isSignedIn ? (
                  <>
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign Up</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
      <div className="absolute top-0 right-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </header>
  );
};

export default AnimatedHeader;