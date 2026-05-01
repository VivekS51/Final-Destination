import React from 'react';

const Stats = () => {
    return (
        <section className="stats-section">
            <div className="stats-overlay"></div>
            <div className="stats-container">
                <div className="stat-item" style={{ '--i': 1 }}>
                    <i className="fas fa-map-marked-alt"></i>
                    <div className="counter" data-target="29">29</div>
                    <h4>States Covered</h4>
                </div>
                <div className="stat-item" style={{ '--i': 2 }}>
                    <i className="fas fa-route"></i>
                    <div className="counter" data-target="150">150</div>
                    <h4>Tour Packages</h4>
                </div>
                <div className="stat-item" style={{ '--i': 3 }}>
                    <i className="fas fa-users"></i>
                    <div className="counter" data-target="15000">15000+</div>
                    <h4>Happy Travelers</h4>
                </div>
                <div className="stat-item" style={{ '--i': 4 }}>
                    <i className="fas fa-award"></i>
                    <div className="counter" data-target="12">12</div>
                    <h4>Years Experience</h4>
                </div>
            </div>
        </section>
    );
};

export default Stats;
