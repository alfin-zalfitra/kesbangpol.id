import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const VideoDetail = () => {
    const { slug } = useParams();
    const [video, setVideo] = useState(null);
    const [allVideos, setAllVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api-sumbar/galery-video/2765');
                if (!response.ok) throw new Error('Data tidak ditemukan');
                const result = await response.json();
                
                const data = Array.isArray(result.data) ? result.data : [result.data];
                setAllVideos(data);

                const found = data.find(item => item.slug === slug || item.id === slug || item.id == slug);
                if (found) {
                    setVideo(found);
                } else {
                    throw new Error('Video tidak ditemukan');
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVideoDetail();
        window.scrollTo(0, 0);
    }, [slug]);

    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (loading) return (
        <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
            <TopBar /><Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <div className="loader"></div>
            </div>
            <Footer />
            <style>{`.loader { width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid var(--secondary); border-radius: 50%; animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (error || !video) return (
        <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
            <TopBar /><Navbar />
            <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>⚠️ Ops!</h1>
                <p>{error || 'Video tidak ditemukan'}</p>
                <Link to="/video" className="btn btn-primary" style={{ marginTop: '2rem' }}>Kembali ke Galeri Video</Link>
            </div>
            <Footer />
        </div>
    );

    const videoId = getYoutubeId(video.url);

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <TopBar /><Navbar />

            {/* Header Section */}
            <div style={{ background: 'white', padding: '4rem 0 3rem', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '1rem' }}>
                        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                        <Link to="/video" style={{ color: '#94a3b8' }}>Video</Link> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>Detail Video</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', lineHeight: '1.2', color: 'var(--primary)', marginBottom: '1rem' }}>
                        {video.title}
                    </h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>
                        <span style={{ color: 'var(--secondary)', fontWeight: '800' }}>#VideoKegiatan</span>
                        <span>📅 {video.created_at}</span>
                        <span>👤 Oleh: <span style={{ color: 'var(--primary)' }}>{video.created_by || 'Admin'}</span></span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem' }} className="video-detail-grid">
                    <div>
                        {videoId ? (
                            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '3rem', position: 'relative', paddingTop: '56.25%' }}>
                                <iframe 
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div style={{ padding: '5rem', background: '#f1f5f9', borderRadius: '24px', textAlign: 'center', marginBottom: '3rem' }}>
                                <p>Video tidak tersedia untuk diputar langsung.</p>
                                <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Tonton di YouTube ↗</a>
                            </div>
                        )}

                        <div 
                            style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#334155' }}
                            dangerouslySetInnerHTML={{ __html: video.isi || video.content || '<p>Keterangan video tidak tersedia.</p>' }}
                        />
                    </div>

                    <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <h4 style={{ borderLeft: '4px solid var(--secondary)', paddingLeft: '1rem', marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: '800' }}>Video Lainnya</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {allVideos.filter(n => (n.slug || n.id) !== slug).slice(0, 5).map((item, idx) => {
                                const vId = getYoutubeId(item.url);
                                const tUrl = vId ? `https://img.youtube.com/vi/${vId}/default.jpg` : '/video-placeholder.png';
                                return (
                                    <Link key={idx} to={`/video-detail/${item.slug || item.id}`} style={{ display: 'flex', gap: '1rem', textDecoration: 'none' }} className="side-video-link">
                                        <div style={{ width: '100px', height: '60px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1px solid #f1f5f9' }}>
                                            <img src={tUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.title} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <h5 style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700', lineHeight: '1.4' }} className="vtitle">{item.title}</h5>
                                            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{item.created_at}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
            <style>{`
                .side-video-link:hover .vtitle { color: var(--secondary) !important; }
                @media (max-width: 992px) { .video-detail-grid { grid-template-columns: 1fr !important; } aside { position: static !important; margin-top: 4rem; } }
            `}</style>
        </div>
    );
};

export default VideoDetail;
