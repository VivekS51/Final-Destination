import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { allDestinationsList } from '../data/allDestinations';

const Navbar = ({ theme, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="header">
            <nav className="navbar">
                <div className="logo">
                    <i className="fas fa-wave-square" style={{marginRight: '8px', color: 'var(--dark-color)'}}></i>
                    <h1>Incredible</h1>
                </div>
                
                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
                    <i className="fas fa-times" id="closeMenu" onClick={closeMenu}></i>
                    <ul>
                        <li className="dropdown">
                            <a href="/#destinations" className="nav-link">
                                Destinations <i className="fas fa-chevron-down" style={{fontSize: '0.8rem', marginLeft: '4px'}}></i>
                            </a>
                            <div className="dropdown-menu">
                                <a href="/#destinations" className="dropdown-item">
                                    <i className="fas fa-monument"></i>
                                    <div>
                                        <h4>Heritage</h4>
                                        <p>Historical monuments</p>
                                    </div>
                                </a>
                                <a href="/#destinations" className="dropdown-item">
                                    <i className="fas fa-water"></i>
                                    <div>
                                        <h4>Nature</h4>
                                        <p>Beaches & backwaters</p>
                                    </div>
                                </a>
                                <a href="/#destinations" className="dropdown-item">
                                    <i className="fas fa-mountain"></i>
                                    <div>
                                        <h4>Mountains</h4>
                                        <p>Himalayas & hill stations</p>
                                    </div>
                                </a>
                                <a href="/#destinations" className="dropdown-item">
                                    <i className="fas fa-om"></i>
                                    <div>
                                        <h4>Spiritual</h4>
                                        <p>Temples & pilgrimage</p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li><a href="/#about" className="nav-link" onClick={closeMenu}>About Us</a></li>
                        <li><a href="/#contact" className="nav-link" onClick={closeMenu}>Contact</a></li>
                    </ul>
                </div>
                
                <div className="nav-actions">
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
                    </button>
                    <a href="#login" className="nav-link login-btn">Sign in</a>
                    <a href="#signup" className="btn-get-started">Get started</a>
                    <i className="fas fa-bars" id="openMenu" onClick={toggleMenu}></i>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
