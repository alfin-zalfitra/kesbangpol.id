import React from 'react';
import Navbar from './Navbar';
import TopBar from './TopBar';
import Footer from './Footer';
import { useReveal } from '../hooks/useReveal';

const ProfileLayout = ({ title, subtitle, children, theme = 'dark' }) => {
    const [headerRef, headerRevealed] = useReveal();
    const [contentRef, contentRevealed] = useReveal();

    const isLight = theme === 'light';

    return (
        <div style={{ background: isLight ? '#f8fafc' : 'var(--surface)', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            {/* Header Section */}
            <div
                ref={headerRef}
                className={`animate-up ${headerRevealed ? 'revealed' : ''}`}
                style={{
                    padding: '8rem 0 5rem',
                    background: isLight ? '#ffffff' : 'linear-gradient(135deg, var(--primary) 0%, #1a3a5c 100%)',
                    color: isLight ? 'var(--primary)' : 'white',
                    textAlign: 'center',
                    borderBottom: isLight ? '1px solid #e2e8f0' : 'none'
                }}
            >
                <div className="container">
                    <span style={{
                        color: isLight ? 'var(--secondary)' : 'var(--accent)',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.875rem',
                        display: 'block',
                        marginBottom: '0.5rem'
                    }}>{subtitle}</span>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: 0 }}>{title}</h1>
                    {isLight && <div style={{ width: '60px', height: '4px', background: 'var(--secondary)', margin: '1.5rem auto 0', borderRadius: '2px' }}></div>}
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
