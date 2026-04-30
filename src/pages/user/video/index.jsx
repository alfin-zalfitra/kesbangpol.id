import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const VideoIndex = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api-sumbar/galery-video/2765');
                if (!response.ok) throw new Error('Gagal mengambil data video');
                const result = await response.json();
                
                if (result && result.data) {
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                    setVideos(data);
                } else {
                    setVideos([]);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
        window.scrollTo(0, 0);
    }, []);

    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            {/* Header Section */}
            <div style={{ background: 'white', padding: '4rem 0 3rem', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '1rem' }}>
                        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>Galeri Video</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.5rem' }}>Galeri Video</h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>Kumpulan dokumentasi video kegiatan Badan Kesbangpol Sumatera Barat</p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="container" style={{ padding: '4rem 0' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                        <div className="premium-loader"></div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {videos.length > 0 ? videos.map((item, index) => {
                            const videoId = getYoutubeId(item.url);
                            const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/video-placeholder.png';
                            
                            return (
                                <Link
                                    key={item.id || index}
                                    to={`/video-detail/${item.slug || item.id}`}
                                    style={{
                                        background: 'white',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                        transition: 'all 0.3s ease',
                                        border: '1px solid #f1f5f9',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                    className="video-card"
                                >
                                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
                                        <img 
                                            src={thumbUrl} 
                                            alt={item.title} 
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                                            className="video-thumb"
                                            onError={(e) => { e.target.src = `https://img.youtube.com/vi/${videoId}/0.jpg` }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%', left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: '60px', height: '60px',
                                            background: 'rgba(200, 16, 46, 0.9)',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'white', fontSize: '1.5rem',
                                            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                                            zIndex: 2
                                        }}>
                                            ▶
                                        </div>
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: '800', letterSpacing: '1px' }}>Video Kegiatan</span>
                                        <h3 style={{ fontSize: '1.1rem', margin: '0.5rem 0', fontWeight: '800', color: 'var(--primary)', lineHeight: '1.4', height: '3rem', overflow: 'hidden' }}>
                                            {item.title}
                                        </h3>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem' }}>📅 {item.created_at}</div>
                                    </div>
                                </Link>
                            );
                        }) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '20px' }}>
                                <p style={{ color: '#64748b' }}>Belum ada galeri video saat ini.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />

            <style>{`
                .premium-loader { width: 50px; height: 50px; border: 3px solid rgba(200, 16, 46, 0.1); border-top: 3px solid var(--secondary); border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                
                .video-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    border-color: var(--secondary);
                }
                .video-card:hover .video-thumb {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default VideoIndex;
