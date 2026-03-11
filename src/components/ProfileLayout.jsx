import React from 'react';
import Navbar from './Navbar';
import TopBar from './TopBar';
import Footer from './Footer';
import { useReveal } from '../hooks/useReveal';

const ProfileLayout = ({ title, subtitle, children }) => {
    const [headerRef, headerRevealed] = useReveal();
    const [contentRef, contentRevealed] = useReveal();

    return (
        <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            {/* Header Section */}
            <div
                ref={headerRef}
                className={`animate-up ${headerRevealed ? 'revealed' : ''}`}
                style={{
                    padding: '6rem 0 3rem',
                    background: 'linear-gradient(135deg, var(--primary) 0%, #1a3a5c 100%)',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <div className="container">
                    <span style={{
                        color: 'var(--accent)',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.875rem'
                    }}>{subtitle}</span>
                    <h1 style={{ fontSize: '3rem', marginTop: '0.5rem' }}>{title}</h1>
                </div>
            </div>

            {/* Content Section */}
            <section
                ref={contentRef}
                className={`section animate-up ${contentRevealed ? 'revealed' : ''}`}
                style={{ marginTop: '-2rem' }}
            >
                <div className="container">
                    <div className="glass" style={{
                        padding: '3rem',
                        borderRadius: '24px',
                        background: 'white',
                        boxShadow: 'var(--shadow)',
                        minHeight: '400px'
                    }}>
                        {children}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProfileLayout;
