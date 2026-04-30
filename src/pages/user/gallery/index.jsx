import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const GalleryIndex = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api-sumbar/galery-foto/2765');
                if (!response.ok) throw new Error('Gagal mengambil data galeri');
                const result = await response.json();
                
                if (result && result.data) {
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                    setAlbums(data);
                } else {
                    setAlbums([]);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
        window.scrollTo(0, 0);
    }, []);

    const getImageUrl = (path) => {
        if (!path) return '/gallery1.png';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/api')) return path.replace('/api', '/api-sumbar');
        return `https://api-web.sumbarprov.go.id${path}`;
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            {/* Header Section - White Theme */}
            <div style={{ background: 'white', padding: '4rem 0 3rem', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '1rem' }}>
                        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>Galeri Foto</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.5rem' }}>Galeri Kegiatan</h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>Kumpulan dokumentasi foto kegiatan Badan Kesbangpol Sumatera Barat</p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="container" style={{ padding: '4rem 0' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                        <div className="premium-loader"></div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {albums.length > 0 ? albums.map((item, index) => (
                            <Link
                                key={item.id || index}
                                to={`/galeri-detail/${item.slug || item.id}`}
                                style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid #f1f5f9',
                                    position: 'relative',
                                    height: '380px'
                                }}
                                className="album-card"
                            >
                                <img 
                                    src={getImageUrl(item.gambar || item.image)} 
                                    alt={item.title || item.judul} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                                    className="album-img"
                                    onError={(e) => { e.target.src = '/gallery1.png' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0, left: 0, right: 0,
                                    padding: '2rem 1.5rem',
                                    background: 'linear-gradient(transparent, rgba(10, 37, 64, 0.9))',
                                    color: 'white'
                                }}>
                                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '800' }}>Album Foto</span>
                                    <h3 style={{ fontSize: '1.2rem', margin: '0.25rem 0 0.5rem 0', lineHeight: '1.4' }}>{item.title || item.judul}</h3>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>📅 {item.created_at || item.tgl_posting}</div>
                                </div>
                            </Link>
                        )) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '20px' }}>
                                <p style={{ color: '#64748b' }}>Belum ada album galeri saat ini.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />

            <style>{`
                .premium-loader { width: 50px; height: 50px; border: 3px solid rgba(200, 16, 46, 0.1); border-top: 3px solid var(--secondary); border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                
                .album-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    border-color: var(--secondary);
                }
                .album-card:hover .album-img {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default GalleryIndex;
