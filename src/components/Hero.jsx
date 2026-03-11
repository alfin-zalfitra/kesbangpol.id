import React from 'react';

const Hero = () => {
    return (
        <section className="hero" id="home" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
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
                    backgroundImage: 'url("/hero-bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                    transform: 'scale(1.1)',
                    animation: 'slowZoom 20s infinite alternate'
                }}></div>
                {/* Advanced Gradient Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(10, 37, 64, 0.4) 0%, rgba(10, 37, 64, 0.8) 100%), linear-gradient(135deg, rgba(62, 87, 113, 0.5) 0%, transparent 100%)'
                }}></div>
            </div>

            <div className="container hero-content" style={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '2rem'
            }}>
                {/* Modern Badge-like element */}


                <h1 style={{
                    animation: 'fadeInUp 1s ease forwards',
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    lineHeight: '1.1',
                    marginBottom: '1rem',
                    color: 'white',
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    textTransform: 'uppercase'
                }}>
                    Badan Kesatuan Bangsa dan Politik<br />
                </h1>

                <div className="animate-up revealed" style={{
                    width: '60px',
                    height: '4px',
                    background: 'var(--accent)',
                    margin: '2rem auto',
                    borderRadius: '2px'
                }}></div>

                <p style={{
                    animation: 'fadeInUp 1s ease forwards 0.4s',
                    opacity: 0,
                    animationFillMode: 'forwards',
                    fontSize: 'clamp(0.8rem, 4vw, 1.2rem)',
                    fontWeight: '700',
                    color: 'var(--accent)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase'
                }}>
                    Provinsi Sumatera Barat
                </p>
            </div>

            {/* Scroll Indicator */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                opacity: 0.6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
            }} className="animate-fade-in">
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'white' }}>Scroll Down</span>
                <div style={{
                    width: '24px',
                    height: '40px',
                    border: '2px solid white',
                    borderRadius: '12px',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '4px',
                        height: '8px',
                        background: 'white',
                        position: 'absolute',
                        left: '50%',
                        top: '8px',
                        transform: 'translateX(-50%)',
                        borderRadius: '2px',
                        animation: 'mouseWheel 0.7s infinite'
                    }}></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
