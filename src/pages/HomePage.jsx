import React from 'react';
import Hero from '../components/Hero';
import Destinations from '../components/Destinations';
import Parallax from '../components/Parallax';
import Stats from '../components/Stats';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';


const HomePage = () => {
    return (
        <main>
            <Hero />
            <Destinations />
            <Parallax />
            <Stats />
            <About />
            <Testimonials />
            <Gallery />
            <Contact />
        </main>
    );
};

export default HomePage;
