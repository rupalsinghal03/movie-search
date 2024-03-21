import React from 'react';
import './spinner.css'; // Import your CSS file for styling

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-overlay">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingSpinner;
