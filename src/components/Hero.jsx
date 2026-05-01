import React from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <video className="hero-video-bg" autoPlay muted loop playsInline>
                <source src="/he.mp4" type="video/mp4" />
            </video>
            <div className="hero-content">
                <h1 className="animated-heading">Discover Incredible India</h1>
                <p className="animated-text">Experience the rich culture, breathtaking landscapes, and ancient heritage</p>
                <div className="hero-search-wrapper reveal-element is-visible" style={{ animationDelay: '1.5s', transitionDelay: '1.5s' }}>
                    <SearchBar />
                </div>
            </div>
            <div className="hero-social">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-pinterest"></i></a>
            </div>
            <div className="scroll-down">
                <a href="#destinations">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
        </section>
    );
};

export default Hero;
