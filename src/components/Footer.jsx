import React, { useState, useEffect } from 'react';

const Footer = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <footer>
                <div className="footer-container">
                    <div className="footer-about">
                        <h3><span>Incredible</span> India</h3>
                        <p>Creating unforgettable travel experiences since 2011. Let us help you discover the magic of India in comfort and style.</p>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-pinterest"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#destinations">Destinations</a></li>
                            <li><a href="#packages">Packages</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>Destinations</h3>
                        <ul>
                            <li><a href="#">Rajasthan</a></li>
                            <li><a href="#">Kerala</a></li>
                            <li><a href="#">Goa</a></li>
                            <li><a href="#">Ladakh</a></li>
                            <li><a href="#">Himachal Pradesh</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>Travel Resources</h3>
                        <ul>
                            <li><a href="#">Travel Blog</a></li>
                            <li><a href="#">Travel Insurance</a></li>
                            <li><a href="#">Visa Information</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2023 Incredible India Tours. All Rights Reserved.</p>
                </div>
            </footer>
            
            <a 
                href="#" 
                className={`back-to-top ${showBackToTop ? 'active' : ''}`} 
                id="backToTop"
                onClick={scrollToTop}
            >
                <i className="fas fa-chevron-up"></i>
            </a>
        </>
    );
};

export default Footer;
