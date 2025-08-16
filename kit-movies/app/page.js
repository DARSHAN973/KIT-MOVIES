"use client";
import Header from './pages/components/Header';
import Home from './pages/Home';

const HomePage = () => {
  return (
    <div>
      <Header />
        <main>
          <Home />
        </main>
    </div>
  );
};

export default HomePage;