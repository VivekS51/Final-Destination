import React from 'react';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="section-title">
                <span className="subtitle">Our Story</span>
                <h2>About Incredible India Tours</h2>
                <p>Your trusted travel partner since 2011</p>
            </div>
            <div className="about-container">
                <div className="about-img">
                    <div className="about-img-grid">
                        <div className="about-img-item">
                            <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Travel Team" />
                        </div>
                        <div className="about-img-item">
                            <img src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Travel Planning" />
                        </div>
                        <div className="about-img-item">
                            <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Team Meeting" />
                        </div>
                        <div className="about-img-item">
                            <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Travel Experience" />
                        </div>
                    </div>
                </div>
                <div className="about-content">
                    <h3>Why Choose Us?</h3>
                    <p>At Incredible India Tours, we are passionate about showcasing the diverse beauty, rich culture, and warm hospitality of our magnificent country. Founded in 2011 by a team of travel enthusiasts, we've spent over a decade crafting authentic Indian experiences for travelers from around the world.</p>
                    <p>Our team consists of local experts who have in-depth knowledge of every region we cover. We personally visit and vet each destination to ensure we only offer the highest quality experiences. We pride ourselves on attention to detail, personalized service, and sustainable travel practices that respect local communities and environments.</p>
                    
                    <div className="about-features">
                        <div className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <div>
                                <h4>Authentic Experiences</h4>
                                <p>Immersive journeys that connect you with the real India.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <div>
                                <h4>24/7 Local Support</h4>
                                <p>Round-the-clock assistance throughout your journey.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-check-circle"></i>
                            <div>
                                <h4>Responsible Tourism</h4>
                                <p>Sustainable practices that benefit local communities.</p>
                            </div>
                        </div>
                    </div>
                    
                    <a href="#contact" className="btn">Contact Us</a>
                </div>
            </div>
        </section>
    );
};

export default About;
