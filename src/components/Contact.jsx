import React, { useState } from 'react';

const Contact = () => {
    const [isSatellite, setIsSatellite] = useState(false);

    return (
        <section id="contact" className="contact">
            <div className="section-title">
                <span className="subtitle">Get In Touch</span>
                <h2>Contact Us</h2>
                <p>Reach out to our travel experts for personalized assistance</p>
            </div>
            <div className="contact-container">
                <div className="contact-info">
                    <div className="info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <div>
                            <h3>Our Office</h3>
                            <p>123 Tourism Avenue, New Delhi, 110001</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-envelope"></i>
                        <div>
                            <h3>Email Us</h3>
                            <p>info@incredibleindiatours.com</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-phone-alt"></i>
                        <div>
                            <h3>Call Us</h3>
                            <p>+91 98765 43210</p>
                        </div>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-clock"></i>
                        <div>
                            <h3>Office Hours</h3>
                            <p>Monday - Saturday: 9am - 6pm</p>
                            <p>Sunday: 10am - 2pm</p>
                        </div>
                    </div>
                    <div className="contact-social">
                        <h3>Follow Us</h3>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-pinterest"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className="contact-form">
                    <form id="contactForm">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-submit">Send Message</button>
                    </form>
                </div>
            </div>
            
            <div className="map-section reveal-element" style={{ marginTop: '5rem' }}>
                <div className="section-title">
                    <span className="subtitle" style={{ color: '#0078D4' }}><i className="fas fa-map"></i> Location</span>
                    <h2>Find Us Here</h2>
                </div>
                <div className="azure-map-container" style={{ height: '450px', position: 'relative', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
                    <div className="azure-map-overlay" style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.85)', padding: '10px 20px', borderRadius: '30px', zIndex: 10, fontSize: '0.9rem', fontWeight: 'bold', color: '#0078D4', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-bolt"></i> Azure Maps Simulation
                        <button 
                            onClick={() => setIsSatellite(!isSatellite)}
                            style={{ 
                                marginLeft: '10px', 
                                padding: '6px 14px', 
                                background: isSatellite ? '#0078D4' : '#f0f0f0', 
                                color: isSatellite ? '#fff' : '#333', 
                                border: 'none', 
                                borderRadius: '20px', 
                                cursor: 'pointer', 
                                fontSize: '0.8rem', 
                                fontWeight: 'bold', 
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                        >
                            <i className={`fas ${isSatellite ? 'fa-map' : 'fa-satellite'}`}></i> 
                            {isSatellite ? 'Roadmap' : 'Satellite'}
                        </button>
                    </div>
                    {/* Highly reliable Microsoft Bing/Azure Maps embed styled nicely with dynamic mode */}
                    <iframe src={`https://www.bing.com/maps/embed?h=450&w=1000&cp=28.630771~77.225675&lvl=15&typ=d&sty=${isSatellite ? 'h' : 'r'}&src=SHELL&FORM=MBEDV8`} width="100%" height="100%" style={{ border: 0, filter: isSatellite ? 'contrast(1.1) brightness(1.1)' : 'contrast(1.1) opacity(0.95)', transition: 'filter 0.5s ease' }} allowFullScreen="" loading="lazy"></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;
