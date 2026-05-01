import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { destinationsData } from '../data/destinations';

import { allDestinationsList } from '../data/allDestinations';

const Destinations = () => {
    const [filter, setFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);

    // Get a subset of destinations for the homepage grid
    const featuredDestinations = destinationsData.slice(0, 6);

    const filteredDestinations = filter === 'all' 
        ? featuredDestinations 
        : featuredDestinations.filter(d => d.category.toLowerCase() === filter);

    return (
        <section id="destinations" className="destinations">
            <div className="section-title reveal-element">
                <span className="subtitle">Top Destinations</span>
                <h2>Popular Places</h2>
                <p>Explore the most breathtaking destinations across the country</p>
            </div>
            
            <div className="filter-container reveal-element" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
                <button className={`btn-small ${filter === 'all' ? '' : 'btn-outline'}`} onClick={() => setFilter('all')}>All</button>
                <button className={`btn-small ${filter === 'heritage' ? '' : 'btn-outline'}`} onClick={() => setFilter('heritage')}>Heritage</button>
                <button className={`btn-small ${filter === 'nature' ? '' : 'btn-outline'}`} onClick={() => setFilter('nature')}>Nature</button>
                <button className={`btn-small ${filter === 'beach' ? '' : 'btn-outline'}`} onClick={() => setFilter('beach')}>Beach</button>
                <button className={`btn-small ${filter === 'mountains' ? '' : 'btn-outline'}`} onClick={() => setFilter('mountains')}>Mountains</button>
            </div>
            
            <div className="destinations-container">
                {filteredDestinations.map((dest, index) => (
                    <div className="destination-card reveal-element" key={dest.id} style={{ '--i': index + 1 }}>
                        <div className="destination-img">
                            <img src={dest.image} alt={dest.title} />
                            <div className="destination-overlay">
                                <div className="destination-overlay-content">
                                    <div className="destination-meta">
                                        <span><i className="fas fa-map-marker-alt"></i> {dest.state}</span>
                                        <span><i className="fas fa-tag"></i> {dest.category}</span>
                                    </div>
                                    <Link to={`/destination/${dest.id}`} className="btn-small">View Details</Link>
                                </div>
                            </div>
                        </div>
                        <div className="destination-info">
                            <h3>{dest.title}</h3>
                            <p>{dest.description.substring(0, 100)}...</p>
                            <div className="destination-features">
                                {dest.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i}><i className="fas fa-check"></i> {tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {filter === 'all' && (
                <div className="view-all-container reveal-element" style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button 
                        className="btn btn-outline" 
                        onClick={() => setShowAll(!showAll)}
                        style={{ cursor: 'pointer' }}
                    >
                        {showAll ? 'Hide All Destinations' : 'Explore All Destinations'}
                    </button>
                </div>
            )}

            {showAll && filter === 'all' && (
                <div className="all-destinations-expanded" style={{ 
                    marginTop: '50px', 
                    padding: '30px', 
                    background: 'rgba(255, 255, 255, 0.15)', 
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '16px', 
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    animation: 'fadeIn 0.5s forwards'
                }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem', color: 'var(--dark-color)' }}>Complete Destination Directory</h3>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '30px', 
                        textAlign: 'left' 
                    }}>
                        {allDestinationsList.map((regionItem, idx) => (
                            <div key={idx} className="region-card" style={{
                                padding: '20px',
                                borderRadius: '16px',
                                background: 'rgba(255, 255, 255, 0.12)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                            }}>
                                <h4 style={{ 
                                    color: 'var(--primary-color)', 
                                    borderBottom: '2px solid var(--primary-color)', 
                                    paddingBottom: '10px',
                                    marginBottom: '20px',
                                    fontSize: '1.2rem'
                                }}>
                                    {regionItem.region}
                                </h4>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {regionItem.states.map((state, sIdx) => (
                                        <div key={sIdx}>
                                            {state.name && (
                                                <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--dark-color)' }}>
                                                    {state.name}
                                                </strong>
                                            )}
                                            <ul style={{ 
                                                listStyle: 'none', 
                                                padding: '0', 
                                                margin: '0',
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '8px'
                                            }}>
                                                {state.places.map((place, pIdx) => (
                                                    <li key={pIdx} style={{
                                                        fontSize: '0.9rem',
                                                        background: 'rgba(255, 255, 255, 0.2)',
                                                        backdropFilter: 'blur(8px)',
                                                        WebkitBackdropFilter: 'blur(8px)',
                                                        padding: '0',
                                                        borderRadius: '20px',
                                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <Link 
                                                            to={`/destination/${place.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} 
                                                            style={{
                                                                display: 'block',
                                                                padding: '4px 10px',
                                                                color: 'var(--dark-color)',
                                                                textDecoration: 'none'
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.target.style.background = 'var(--primary-color)';
                                                                e.target.style.color = '#fff';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.target.style.background = 'transparent';
                                                                e.target.style.color = 'var(--dark-color)';
                                                            }}
                                                        >
                                                            {place}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Destinations;
