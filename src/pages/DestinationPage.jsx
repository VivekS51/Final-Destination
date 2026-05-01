import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinationsData } from '../data/destinations';
import { realImages } from '../data/realImages';

const DestinationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Find destination by ID
    let destination = destinationsData.find(d => d.id === id);

    // If destination is not in the hardcoded data, generate it procedurally
    if (!destination) {
        // Parse ID back to a human-readable title
        const formattedTitle = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        destination = {
            id: id,
            title: formattedTitle,
            state: "Incredible India",
            category: "Explore",
            tags: ["Scenic", "Adventure", "Culture"],
            image: realImages[id] || `https://picsum.photos/seed/${id}/1200/800`,
            description: `Experience the breathtaking beauty and unique culture of ${formattedTitle}. This destination offers an unforgettable journey filled with scenic landscapes, local traditions, and hidden gems. Whether you're seeking adventure or relaxation, ${formattedTitle} has something extraordinary for every traveler.`,
            highlights: [`Explore the local landmarks of ${formattedTitle}`, "Taste authentic regional cuisine", "Guided sightseeing tours", "Photography and nature walks"],
            itinerary: [
                { day: "Day 1", title: "Arrival & Local Exploration", description: `Arrive at ${formattedTitle} and settle into your accommodation. Spend the afternoon exploring the local markets and getting a feel for the culture.` },
                { day: "Day 2", title: "Major Attractions", description: `A full day dedicated to visiting the top highlights and scenic spots around ${formattedTitle}. Enjoy guided tours and stunning photo opportunities.` },
                { day: "Day 3", title: "Leisure & Departure", description: "Enjoy a relaxing morning at your own pace before packing up and beginning your journey back home." }
            ],
            vehicles: ["Flight to nearest airport, followed by private cab", "Luxury Volvo Buses from major cities", "Local taxis and auto-rickshaws available for sightseeing"],
            gallery: [
                realImages[id] || `https://picsum.photos/seed/${id}1/600/400`,
                `https://images.unsplash.com/photo-1564507592208-027092147391?auto=format&fit=crop&w=600&q=80`,
                `https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80`,
                `https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80`
            ]
        };
    } else {
        // Ensure existing destinations have the new properties as well
        if (!destination.itinerary) {
            destination.itinerary = [
                { day: "Day 1", title: "Arrival & Acclimatization", description: `Welcome to ${destination.title}. Check in and relax.` },
                { day: "Day 2", title: "Sightseeing", description: `Explore ${destination.highlights[0]} and ${destination.highlights[1]}.` },
                { day: "Day 3", title: "Departure", description: "Collect memories and depart." }
            ];
        }
        if (!destination.vehicles) {
            destination.vehicles = ["Flights available to nearest airport", "Private Cabs", "Local Transport"];
        }
        if (!destination.gallery) {
            destination.gallery = [
                realImages[destination.id] || `https://picsum.photos/seed/${destination.id}1/600/400`,
                `https://images.unsplash.com/photo-1564507592208-027092147391?auto=format&fit=crop&w=600&q=80`,
                `https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80`,
                `https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80`
            ];
        }
    }

    return (
        <div className="destination-details-page">
            <div className="destination-hero" style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${destination.image})`,
                height: '60vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                marginTop: '80px' // offset for navbar
            }}>
                <div className="reveal-element is-visible">
                    <span className="destination-badge" style={{ background: 'var(--primary-color)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        {destination.category}
                    </span>
                    <h1 style={{ fontSize: '4rem', margin: '20px 0', fontFamily: 'Playfair Display, serif' }}>{destination.title}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9 }}><i className="fas fa-map-marker-alt"></i> {destination.state}, India</p>
                </div>
            </div>

            <div className="destination-content-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 5%', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                
                <div className="destination-main-content reveal-element is-visible">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--dark-color)' }}>About {destination.title}</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--medium-gray)', marginBottom: '2rem' }}>
                        {destination.description}
                    </p>
                    
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--dark-color)' }}>Key Highlights</h3>
                    <ul className="highlights-list" style={{ listStyle: 'none', padding: 0, marginBottom: '3rem' }}>
                        {destination.highlights.map((highlight, index) => (
                            <li key={index} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: 'var(--medium-gray)' }}>
                                <i className="fas fa-check-circle" style={{ color: 'var(--primary-color)' }}></i> {highlight}
                            </li>
                        ))}
                    </ul>

                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--dark-color)' }}>Trip Itinerary</h3>
                    <div className="itinerary-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '3rem' }}>
                        {destination.itinerary.map((item, index) => (
                            <div key={index} className="itinerary-card" style={{ background: 'var(--white-color)', padding: '20px', borderRadius: '10px', borderLeft: '4px solid var(--primary-color)', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                                    <span style={{ background: 'var(--primary-color)', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>{item.day}</span>
                                    <h4 style={{ fontSize: '1.2rem', color: 'var(--dark-color)', margin: 0 }}>{item.title}</h4>
                                </div>
                                <p style={{ color: 'var(--medium-gray)', margin: 0, paddingLeft: '5px' }}>{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--dark-color)' }}>Gallery</h3>
                    <div className="destination-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                        {destination.gallery.map((img, index) => (
                            <div key={index} style={{ height: '200px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                                <img src={img} alt={`${destination.title} ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="destination-sidebar reveal-element is-visible" style={{ transitionDelay: '0.2s' }}>
                    <div className="booking-card" style={{ background: 'var(--white-color)', padding: '2rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.02)' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Plan Your Trip</h3>
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--medium-gray)', marginBottom: '5px' }}>Tags</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {destination.tags.map((tag, index) => (
                                    <span key={index} style={{ background: 'rgba(255,153,51,0.1)', color: 'var(--primary-color)', padding: '5px 12px', borderRadius: '15px', fontSize: '0.85rem' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button className="btn" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>Book Now</button>
                        <button onClick={() => navigate('/')} className="btn-outline" style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginTop: '10px', background: 'transparent', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', borderRadius: '30px', cursor: 'pointer' }}>Back to Destinations</button>
                    </div>

                    <div className="travel-options-card" style={{ background: 'var(--white-color)', padding: '2rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.02)', marginTop: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}><i className="fas fa-plane-departure" style={{ color: 'var(--primary-color)', marginRight: '10px' }}></i>Travel Plans & Vehicles</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {destination.vehicles.map((vehicle, index) => (
                                <li key={index} style={{ display: 'flex', gap: '15px', marginBottom: '15px', color: 'var(--medium-gray)' }}>
                                    <div style={{ color: 'var(--primary-color)', marginTop: '2px' }}>
                                        <i className={`fas ${index === 0 ? 'fa-plane' : index === 1 ? 'fa-train' : 'fa-car'}`}></i>
                                    </div>
                                    <span style={{ fontSize: '0.95rem' }}>{vehicle}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DestinationPage;
