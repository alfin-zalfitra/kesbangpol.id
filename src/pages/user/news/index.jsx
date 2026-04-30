import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileLayout from '../../../components/ProfileLayout';

const NewsIndex = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api-sumbar/category/berita-utama/2765');
                if (!response.ok) throw new Error('Gagal mengambil data dari server');
                const result = await response.json();
                
                if (result && result.data) {
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                    setNewsItems(data);
                } else {
                    setNewsItems([]);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
        window.scrollTo(0, 0);
    }, []);

    const getImageUrl = (path) => {
        if (!path) return '/news1.png';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/api')) return path.replace('/api', '/api-sumbar');
        return `https://api-web.sumbarprov.go.id${path}`;
    };

    if (error) {
        return (
            <ProfileLayout title="Error" subtitle="Informasi">
                <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--surface)', borderRadius: '24px' }}>
                    <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>⚠️</span>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', fontWeight: '600' }}>{error}</p>
                </div>
            </ProfileLayout>
        );
    }

    return (
        <ProfileLayout title="Daftar Berita" subtitle="Kumpulan Berita Terkini" theme="light">
            <div style={{ minHeight: '300px', position: 'relative', marginTop: '-3rem' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5rem' }}>
                        <div className="premium-loader"></div>
                    </div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                        gap: '2.5rem',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        {newsItems.length > 0 ? newsItems.map((item) => (
                            <Link
                                key={item.id}
                                to={`/berita-detail/${item.slug || item.id}`}
                                className="news-item-card"
                                style={{
                                    background: 'white',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid #f1f5f9'
                                }}
                            >
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative', backgroundColor: '#f1f5f9' }}>
                                    <div style={{ 
                                        position: 'absolute', 
                                        inset: '0', 
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)', 
                                        zIndex: '1' 
                                    }}></div>
                                    <img 
                                        src={getImageUrl(item.gambar)} 
                                        alt={item.title} 
                                        className="news-card-img"
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }} 
                                        onError={(e) => { e.target.src = '/news1.png' }}
                                    />
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '1.25rem',
                                        left: '1.25rem',
                                        zIndex: '2',
                                        background: 'var(--secondary)',
                                        color: 'white',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem'
                                    }}>
                                        <i className="far fa-calendar-alt"></i>
                                        {item.created_at ? item.created_at.split(' ')[0] : (item.tgl_posting ? item.tgl_posting.split(' ')[0] : '')}
                                    </span>
                                </div>
                                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: '700', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                                        {item.category || 'Berita Utama'}
                                    </div>
                                    <h3 style={{ 
                                        fontSize: '1.3rem', 
                                        margin: '0 0 1rem 0', 
                                        color: 'var(--primary)', 
                                        lineHeight: '1.4',
                                        fontWeight: '800'
                                    }}>{item.title}</h3>
                                    <p style={{ 
                                        fontSize: '0.95rem', 
                                        color: '#64748b', 
                                        lineHeight: '1.6', 
                                        marginBottom: '1.5rem',
                                        flexGrow: '1',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {item.content ? item.content.replace(/<[^>]*>?/gm, '') : (item.isi ? item.isi.replace(/<[^>]*>?/gm, '') : 'Baca selengkapnya untuk detail informasi...')}
                                    </p>
                                    
                                    <div style={{ 
                                        marginTop: 'auto', 
                                        color: 'var(--primary)', 
                                        fontWeight: '800', 
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }} className="read-more-link">
                                        Baca Berita <span className="arrow-icon">→</span>
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem', background: '#f8fafc', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🗞️</span>
                                <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '600' }}>Belum ada berita yang tersedia saat ini.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                .news-item-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
                    border-color: rgba(200, 16, 46, 0.2) !important;
                }
                .news-item-card:hover .news-card-img {
                    transform: scale(1.05);
                }
                .read-more-link .arrow-icon {
                    transition: transform 0.3s ease;
                }
                .news-item-card:hover .read-more-link .arrow-icon {
                    transform: translateX(5px);
                    color: var(--secondary);
                }
                .news-item-card:hover .read-more-link {
                    color: var(--secondary);
                }
            `}</style>
        </ProfileLayout>
    );
};

export default NewsIndex;
