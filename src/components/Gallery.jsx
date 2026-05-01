import React from 'react';

const Gallery = () => {
    const galleryData = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            alt: "Hawa Mahal",
            title: "Hawa Mahal",
            location: "Jaipur, Rajasthan"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
            alt: "Taj Mahal",
            title: "Taj Mahal",
            location: "Agra, Uttar Pradesh"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1514222134-b57cbb8ff081?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            alt: "Varanasi Ghats",
            title: "Varanasi Ghats",
            location: "Varanasi, Uttar Pradesh"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            alt: "Goa Beaches",
            title: "Calangute Beach",
            location: "Goa"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            alt: "Ladakh",
            title: "Pangong Lake",
            location: "Ladakh"
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            alt: "Kerala Backwaters",
            title: "Alleppey Backwaters",
            location: "Kerala"
        }
    ];

    return (
        <section className="gallery">
            <div className="section-title">
                <span className="subtitle">Visual Journey</span>
                <h2>India Gallery</h2>
                <p>Glimpses of incredible destinations across India</p>
            </div>
            <div className="gallery-container">
                {galleryData.map((item, index) => (
                    <div className="gallery-item" key={item.id} style={{ '--i': index + 1 }}>
                        <img src={item.image} alt={item.alt} />
                        <div className="gallery-overlay">
                            <h3>{item.title}</h3>
                            <p>{item.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
