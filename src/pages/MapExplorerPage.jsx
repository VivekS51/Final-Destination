import React, { useEffect } from 'react';
import LiveTravelMap from '../components/LiveTravelMap';

const MapExplorerPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="map-explorer-page" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-gray)' }}>
            <div className="explorer-header" style={{ background: 'linear-gradient(135deg, var(--dark-color), #2d3436)', color: 'white', padding: '40px 5%', textAlign: 'center' }}>
                <span className="subtitle" style={{ color: '#4285F4', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                    <i className="fas fa-globe-asia"></i> World Explorer
                </span>
                <h1 style={{ fontSize: '3.5rem', fontFamily: 'Playfair Display, serif', margin: '0 0 15px 0' }}>Live Route Planner</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                    Discover places, compute travel routes in real-time, check live weather, and view stunning photography of your next destination.
                </p>
            </div>
            
            <div className="explorer-content" style={{ padding: '40px 5%', maxWidth: '1400px', margin: '0 auto' }}>
                <LiveTravelMap />
            </div>
        </div>
    );
};

export default MapExplorerPage;
