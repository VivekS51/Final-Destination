import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DestinationPage from './pages/DestinationPage'

// ScrollRestoration component to handle scrolling logic across routes
const ScrollHandler = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Re-run animation observer when route changes
    setTimeout(() => {
      const elements = document.querySelectorAll(
        '.section-title, .destination-card, .stat-item, .about-img, .about-content, .contact-info, .contact-form, .gallery-item, .newsletter-content, .analytics-container, .map-section, .destination-main-content'
      );
      
      elements.forEach(el => {
        if (!el.classList.contains('reveal-element')) {
          el.style.animationName = 'none';
          el.classList.add('reveal-element');
        }
      });

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' 
      });

      elements.forEach(el => observer.observe(el));
      
      return () => observer.disconnect();
    }, 100);
  }, [pathname]);

  return null;
};

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <ScrollHandler />
        <Preloader />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destination/:id" element={<DestinationPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
