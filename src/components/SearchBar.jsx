import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { destinationsData } from '../data/destinations';

// Configure Fuse.js to act like a smart, typo-tolerant search engine
const fuseOptions = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    includeMatches: true,
    findAllMatches: false,
    minMatchCharLength: 2,
    location: 0,
    threshold: 0.4, // High threshold for fuzzy matching (typo tolerance)
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: true,
    keys: [
        { name: 'title', weight: 0.7 },
        { name: 'tags', weight: 0.2 },
        { name: 'category', weight: 0.1 }
    ]
};

const fuse = new Fuse(destinationsData, fuseOptions);

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Handle clicks outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        
        if (value.length > 1) {
            const searchResults = fuse.search(value);
            setResults(searchResults.map(result => result.item));
        } else {
            setResults([]);
        }
    };

    return (
        <div className="smart-search-container" ref={searchRef}>
            <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
                <i className="fas fa-search search-icon"></i>
                <input 
                    type="text" 
                    placeholder="Try 'Gao' or 'Keral' (Typo-tolerant)" 
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => setIsFocused(true)}
                    className="smart-search-input"
                />
                <div className="azure-badge">
                    <i className="fas fa-bolt"></i> Cognitive Search
                </div>
            </div>

            {isFocused && query.length > 1 && (
                <div className="search-dropdown reveal-element is-visible">
                    {results.length > 0 ? (
                        <ul className="search-results">
                            {results.map((item) => (
                                <li key={item.id} className="search-result-item" onClick={() => { 
                                    setQuery(item.title); 
                                    setIsFocused(false);
                                    navigate(`/destination/${item.id}`);
                                }}>
                                    <div className="result-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="result-content">
                                        <h4>{item.title}</h4>
                                        <p>{item.category} • {item.tags.join(', ')}</p>
                                    </div>
                                    <i className="fas fa-arrow-right result-action"></i>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-results">
                            <i className="fas fa-frown"></i>
                            <p>No destinations found for "{query}"</p>
                            <small>Try searching by category (e.g., Beach, Mountains)</small>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
