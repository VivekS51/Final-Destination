import React, { useState } from 'react';

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonialsData = [
        {
            id: 0,
            name: "Priya Sharma",
            tour: "Golden Triangle Tour",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80",
            text: "\"Our Golden Triangle tour was absolutely magical! The guides were knowledgeable, accommodations were luxurious, and every detail was perfectly arranged. The Taj Mahal at sunrise was a moment I'll cherish forever!\"",
            rating: 5
        },
        {
            id: 1,
            name: "Rahul Mehta",
            tour: "Kerala Bliss Tour",
            image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            text: "\"The Kerala Bliss package exceeded all our expectations. The houseboat stay on the backwaters was incredibly peaceful, and the Ayurvedic treatments were rejuvenating. Incredible India Tours made our honeymoon truly special!\"",
            rating: 5
        },
        {
            id: 2,
            name: "Ananya Patel",
            tour: "Ladakh Adventure Tour",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
            text: "\"Our Ladakh Adventure was the trip of a lifetime! The breathtaking landscapes, monastery visits, and the night under stars at Pangong Lake were unforgettable. The team handled the altitude challenges expertly and made us feel safe throughout.\"",
            rating: 4.5
        }
    ];

    const handlePrev = () => {
        setCurrentSlide(prev => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide(prev => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="testimonials">
            <div className="section-title">
                <span className="subtitle">Happy Travelers</span>
                <h2>What Our Clients Say</h2>
                <p>Read testimonials from our satisfied customers</p>
            </div>
            <div className="testimonials-container">
                <div className="testimonial-slider">
                    {testimonialsData.map((testimonial, index) => (
                        <div className={`testimonial-slide ${index === currentSlide ? 'active' : ''}`} key={testimonial.id}>
                            <div className="testimonial-content">
                                <div className="testimonial-img">
                                    <img src={testimonial.image} alt={testimonial.name} />
                                </div>
                                <div className="testimonial-text">
                                    <div className="testimonial-rating">
                                        {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                                            <i className="fas fa-star" key={i}></i>
                                        ))}
                                        {testimonial.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                                    </div>
                                    <p>{testimonial.text}</p>
                                    <h4>{testimonial.name}</h4>
                                    <span>{testimonial.tour}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="testimonial-controls">
                    <button className="testimonial-btn prev" onClick={handlePrev}><i className="fas fa-chevron-left"></i></button>
                    <div className="testimonial-dots">
                        {testimonialsData.map((_, index) => (
                            <span 
                                key={index} 
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            ></span>
                        ))}
                    </div>
                    <button className="testimonial-btn next" onClick={handleNext}><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
