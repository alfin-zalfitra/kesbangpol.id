import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchData } from '../data/searchData';

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 1) {
            const filtered = searchData.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            setSearchResults(filtered);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const handleResultClick = (item) => {
        if (item.type === 'page') navigate(`/profil/${item.slug}`);
        else if (item.type === 'news-index') navigate('/berita');
        else if (item.type === 'ppid') navigate(item.sub ? `/ppid/${item.sub}` : '/ppid');
        else if (item.type === 'contact') navigate('/kontak');
        else if (item.type === 'announcement') navigate('/pengumuman');
        
        setSearchQuery('');
        setShowResults(false);
    };

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
                }} ref={searchRef}>
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
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => searchQuery.length > 1 && setShowResults(true)}
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
                        <button 
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '8px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                marginLeft: '0.5rem',
                                transition: 'all 0.3s ease'
                            }} 
                            className="hero-search-btn-std"
                            onClick={() => searchQuery.trim() && navigate(`/search?q=${searchQuery}`)}
                        >
                            CARI
                        </button>
                    </div>

                    {showResults && searchResults.length > 0 && (
                        <div className="search-results-kesbang" style={{
                            position: 'absolute',
                            top: 'calc(100% + 10px)',
                            left: 0,
                            width: '100%',
                            background: 'white',
                            borderRadius: '16px',
                            padding: '10px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                            textAlign: 'left',
                            zIndex: 100,
                            maxHeight: '300px',
                            overflowY: 'auto'
                        }}>
                            {searchResults.map((item, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleResultClick(item)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        padding: '12px 15px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                    className="search-item-hover"
                                >
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        background: '#f1f5f9', 
                                        color: 'var(--primary)', 
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className={item.category === 'Berita' ? 'fas fa-newspaper' : 'fas fa-link'}></i>
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '1rem' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>{item.category}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
