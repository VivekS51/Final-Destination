import React from 'react';

const Newsletter = () => {
    return (
        <section className="newsletter">
            <div className="newsletter-container">
                <div className="newsletter-content">
                    <h2>Subscribe to Our Newsletter</h2>
                    <p>Get exclusive travel deals, insider tips, and travel inspiration delivered straight to your inbox</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Your Email Address" required />
                        <button type="submit" className="btn">Subscribe</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
