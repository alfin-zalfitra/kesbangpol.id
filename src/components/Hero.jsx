import React from 'react';

const Hero = () => {
    return (
        <section className="hero" id="home" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden',
            backgroundColor: '#0a192f'
        }}>
            {/* Background with Zoom Animation Container */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: 0
            }}>
                <div style={{
                    backgroundImage: 'url("https://sumbarprov.go.id/fitur/publicfile/view/ZGRkYjcxNTEyZDA0MDVjNWE0MTg4MGRjN2U4MDkxODQyOTBjYjZmODk2OThmMjAzNjRiZmE1NzhkZTlhOGVhY2RiYzRiNWUyMDRjNjRiOTc5MmQ5ZTFhMDNlMmUzMTBmZWRiMzMwMmMxNDUxZDcwYTRmYzY4NzcyYzA1MDk0Y2R4Rm5NY3g2UThSdndxemh6eElEblZMWnV2RmlEWGNjTndwSlU2M1dhYWVGYVlFQmY5ZXJQS0dLWGN1RjdsTUNHS2lnNFlnT0ppVzFWV2tKbko4aEFUZz09")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%'
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)'
                }}></div>
            </div>

            {/* Social Media Sidebar - Standard */}
            <div style={{
                position: 'absolute',
                left: '2rem',
                top: '45%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                zIndex: 10
            }} className="hero-socials">
                <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.3)', margin: '0 auto' }}></div>
                <a href="#" className="social-icon-hero facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon-hero instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon-hero youtube"><i className="fab fa-youtube"></i></a>
                <div style={{ width: '1px', height: '100px', background: 'rgba(255,255,255,0.3)', margin: '0 auto' }}></div>
            </div>

            {/* Main Content - Standard Government Style */}
            <div className="container hero-content" style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '2rem',
                marginTop: '-10vh'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    fontWeight: '800',
                    color: 'white',
                    marginBottom: '1rem',
                    textShadow: '0 4px 10px rgba(0,0,0,0.3)',
                    textTransform: 'uppercase'
                }}>
                    Badan Kesatuan Bangsa dan Politik
                </h1>

                <p style={{
                    fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '3rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                }}>
                    Provinsi Sumatera Barat
                </p>

                {/* Standard Clean Search Bar */}
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '0.5rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}>
                        <div style={{ padding: '0 1.2rem', color: '#64748b' }}>
                            <i className="fas fa-search" style={{ fontSize: '1.2rem' }}></i>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Cari informasi, berita, atau layanan publik..." 
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#1e293b',
                                width: '100%',
                                padding: '1rem 0',
                                fontSize: '1.1rem',
                                outline: 'none'
                            }}
                        />
                        <button style={{
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '8px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            marginLeft: '0.5rem',
                            transition: 'all 0.3s ease'
                        }} className="hero-search-btn-std">
                            CARI
                        </button>
                    </div>
                </div>
            </div>

            {/* Simple Wave Divider */}
            <div style={{
                position: 'absolute',
                bottom: -1,
                left: 0,
                width: '100%',
                lineHeight: 0,
                zIndex: 2
            }}>
                <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
                    <path fill="#ffffff" fillOpacity="1" d="M0,64L1440,32L1440,120L0,120Z"></path>
                </svg>
            </div>

            <style>{`
                .social-icon-hero {
                    width: 45px;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 50%;
                    color: white;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                }
                .social-icon-hero.facebook:hover {
                    background: #1877F2;
                    border-color: #1877F2;
                    transform: translateX(10px) scale(1.1);
                }
                .social-icon-hero.instagram:hover {
                    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
                    border-color: transparent;
                    transform: translateX(10px) scale(1.1);
                }
                .social-icon-hero.youtube:hover {
                    background: #FF0000;
                    border-color: #FF0000;
                    transform: translateX(10px) scale(1.1);
                }
                .hero-search-btn-std:hover {
                    background: var(--secondary);
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .hero-socials { display: none; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
