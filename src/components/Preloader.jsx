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
                    <span>I</span>
                    <span>N</span>
                    <span>C</span>
                    <span>R</span>
                    <span>E</span>
                    <span>D</span>
                    <span>I</span>
                    <span>B</span>
                    <span>L</span>
                    <span>E</span>
                    <span>&nbsp;</span>
                    <span>I</span>
                    <span>N</span>
                    <span>D</span>
                    <span>I</span>
                    <span>A</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
