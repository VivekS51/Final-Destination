import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHide(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`preloader ${hide ? 'hide' : ''}`}>
            <div className="loader">
                <div className="loader-inner">
                    <div className="center-dot"></div>
                    <div className="rotating-line">
                        <div className="sweeping-dot"></div>
                    </div>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div className={`loader-dot dot-${i + 1}`} key={i}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Preloader;
