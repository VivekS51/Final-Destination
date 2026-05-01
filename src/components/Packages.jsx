import React from 'react';

const Packages = () => {
    const packagesData = [
        {
            id: 1,
            badge: "Popular",
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
            alt: "Golden Triangle Package",
            title: "Golden Triangle Tour",
            location: "Delhi, Agra, Jaipur",
            duration: "6 Days / 5 Nights",
            groupSize: "Max 12 People",
            features: [
                "4-Star Accommodations",
                "Private Transportation",
                "Expert Local Guides",
                "All Entrance Fees"
            ],
            price: "₹35,999"
        },
        {
            id: 2,
            badge: null,
            image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
            alt: "Kerala Package",
            title: "Kerala Bliss",
            location: "Kochi, Munnar, Alleppey",
            duration: "7 Days / 6 Nights",
            groupSize: "Max 8 People",
            features: [
                "Luxury Resorts & Houseboat",
                "Ayurvedic Treatments",
                "Cultural Performances",
                "Daily Breakfast & Dinner"
            ],
            price: "₹42,999"
        },
        {
            id: 3,
            badge: "New",
            image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            alt: "Ladakh Package",
            title: "Ladakh Adventure",
            location: "Leh, Nubra, Pangong",
            duration: "8 Days / 7 Nights",
            groupSize: "Max 10 People",
            features: [
                "Boutique Stays & Camps",
                "4x4 Jeep Safari",
                "Monastery Visits",
                "All Meals Included"
            ],
            price: "₹49,999"
        }
    ];

    return (
        <section id="packages" className="packages">
            <div className="section-title">
                <span className="subtitle">Best Deals</span>
                <h2>Travel Packages</h2>
                <p>Curated experiences to discover the best of India</p>
            </div>
            <div className="packages-container">
                {packagesData.map((pkg, index) => (
                    <div className="package-card" key={pkg.id} style={{ '--i': index + 1 }}>
                        {pkg.badge && <div className="package-badge">{pkg.badge}</div>}
                        <div className="package-image">
                            <img src={pkg.image} alt={pkg.alt} />
                        </div>
                        <div className="package-content">
                            <h3>{pkg.title}</h3>
                            <div className="package-details">
                                <p><i className="fas fa-map-marker-alt"></i> {pkg.location}</p>
                                <p><i className="fas fa-clock"></i> {pkg.duration}</p>
                                <p><i className="fas fa-user"></i> {pkg.groupSize}</p>
                            </div>
                            <div className="package-features">
                                {pkg.features.map((feature, i) => (
                                    <p key={i}><i className="fas fa-check"></i> {feature}</p>
                                ))}
                            </div>
                            <div className="package-price">
                                <p>From <span>{pkg.price}</span> per person</p>
                                <a href="#" className="btn">Book Now</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Packages;
