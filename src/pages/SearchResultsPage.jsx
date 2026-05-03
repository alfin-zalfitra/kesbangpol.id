import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { searchData } from '../data/searchData';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        
        const timer = setTimeout(() => {
            if (query) {
                const filtered = searchData.filter(item => 
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.category.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filtered);
            } else {
                setResults([]);
            }
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const getIcon = (category) => {
        switch(category) {
            case 'Berita': return 'fas fa-newspaper';
            case 'Profil': return 'fas fa-user-tie';
            case 'Media': return 'fas fa-photo-video';
            case 'Agenda': return 'fas fa-calendar-alt';
            case 'PPID': return 'fas fa-info-circle';
            case 'Informasi': return 'fas fa-bullhorn';
            default: return 'fas fa-link';
        }
    };

    const handleResultClick = (item) => {
        if (item.type === 'page') navigate(`/profil/${item.slug}`);
        else if (item.type === 'news-index') navigate('/berita');
        else if (item.type === 'gallery-index') navigate('/galeri');
        else if (item.type === 'video-index') navigate('/video');
        else if (item.type === 'agenda-index') navigate('/agenda');
        else if (item.type === 'ppid') navigate(item.sub ? `/ppid/${item.sub}` : '/ppid');
        else if (item.type === 'contact') navigate('/kontak');
        else if (item.type === 'announcement') navigate('/pengumuman');
    };

    return (
        <div className="search-page-kesbang" style={{ background: '#ffffff', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />
            
            {/* Minimalist Header */}
            <header style={{ 
                background: '#f8fafc', 
                padding: '60px 20px', 
                color: '#0a2540', 
                borderBottom: '1px solid #e2e8f0',
                marginTop: '0'
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '15px', fontSize: '0.85rem', color: '#64748b' }}>
                        <Link to="/" style={{ color: '#c8102e', textDecoration: 'none', fontWeight: '600' }}>Beranda</Link> 
                        <span style={{ margin: '0 8px' }}>/</span> 
                        <span>Hasil Pencarian</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', color: '#0a2540' }}>
                        Pencarian <span style={{ color: '#c8102e' }}>"{query}"</span>
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
                        Menampilkan <strong style={{ color: '#0a2540' }}>{results.length}</strong> informasi yang relevan.
                    </p>
                </div>
            </header>

            <div className="container" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} style={{ height: '160px', background: '#f1f5f9', borderRadius: '20px', animation: 'pulse 1.5s infinite ease-in-out' }}></div>
                        ))}
                    </div>
                ) : results.length > 0 ? (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                        gap: '25px' 
                    }}>
                        {results.map((item, idx) => (
                            <div 
                                key={idx} 
                                style={{
                                    background: 'white',
                                    padding: '25px',
                                    borderRadius: '20px',
                                    border: '1px solid #e2e8f0',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = '#c8102e';
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(200, 16, 46, 0.08)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                                onClick={() => handleResultClick(item)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ 
                                        width: '45px', 
                                        height: '45px', 
                                        background: 'rgba(200, 16, 46, 0.05)', 
                                        color: '#c8102e', 
                                        borderRadius: '12px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        fontSize: '1.2rem'
                                    }}>
                                        <i className={getIcon(item.category)}></i>
                                    </div>
                                    <div style={{ 
                                        fontSize: '0.7rem', 
                                        fontWeight: '800', 
                                        color: '#c8102e', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '1.5px'
                                    }}>{item.category}</div>
                                </div>
                                
                                <h3 style={{ 
                                    margin: 0, 
                                    fontSize: '1.1rem', 
                                    color: '#0a2540', 
                                    fontWeight: '700',
                                    lineHeight: '1.4',
                                    flexGrow: 1
                                }}>{item.title}</h3>
                                
                                <div style={{ 
                                    fontSize: '0.85rem', 
                                    color: '#c8102e', 
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginTop: '10px'
                                }}>
                                    Kunjungi Halaman <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '120px 20px', background: '#f8fafc', borderRadius: '30px' }}>
                        <i className="fas fa-search" style={{ fontSize: '4rem', color: '#cbd5e1', marginBottom: '25px' }}></i>
                        <h3 style={{ color: '#0a2540', fontSize: '1.8rem', fontWeight: '800' }}>Hasil Tidak Ditemukan</h3>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '500px', margin: '15px auto 30px' }}>Kami tidak menemukan informasi yang cocok dengan kata kunci Anda. Silakan coba kata kunci lain.</p>
                        <Link to="/" style={{ 
                            background: '#0a2540', 
                            color: 'white', 
                            padding: '12px 40px', 
                            borderRadius: '50px', 
                            textDecoration: 'none', 
                            fontWeight: '700',
                            display: 'inline-block',
                            boxShadow: '0 10px 20px rgba(10, 37, 64, 0.2)'
                        }}>Kembali ke Beranda</Link>
                    </div>
                )}
            </div>

            <Footer />

            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 0.3; }
                    100% { opacity: 0.6; }
                }
            `}</style>
        </div>
    );
};

export default SearchResultsPage;
