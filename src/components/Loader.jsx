import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <div className="loader-content">
                <div className="loader-inner">
                    <div className="loader-line-container">
                        <div className="loader-line"></div>
                    </div>
                    <div className="loader-text-reveal">
                        <span className="main-title">KESBANGPOL</span>
                        <div className="title-separator"></div>
                        <span className="sub-title">PROVINSI SUMATERA BARAT</span>
                    </div>
                    <div className="loader-footer">
                        <div className="status-indicator">
                            <div className="status-dot"></div>
                            <span className="status-text">Stabilitas & Persatuan</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Background Panels */}
            <div className="loader-bg-panel left"></div>
            <div className="loader-bg-panel right"></div>
        </div>
    );
};

export default Loader;
