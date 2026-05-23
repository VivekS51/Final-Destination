import React from 'react';
import './TravelChatbot.css';

const TravelChatbot = ({ destination }) => {
    return (
        <div className="travel-chatbot-wrapper">
            <div className="glass-blob glass-blob-1"></div>
            <div className="glass-blob glass-blob-2"></div>
            
            <div className="travel-chatbot-container glassmorphism-bot-container">
                <iframe 
                    src="https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/05/23/08/20260523082534-G8SL5RE9.json"
                    title="Travel Planner Bot"
                    className="botpress-iframe"
                    allow="microphone"
                ></iframe>
            </div>
        </div>
    );
};

export default TravelChatbot;
