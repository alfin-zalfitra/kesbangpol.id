import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
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
                console.error('Error fetching news:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Carousel Auto-play logic
    useEffect(() => {
        if (newsItems.length > 1) {
            const timer = setInterval(() => {
                setActiveSlide((prev) => (prev + 1) % Math.min(newsItems.length, 5));
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [newsItems]);

    const getImageUrl = (path) => {
        if (!path) return '/news1.png';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/api')) return path.replace('/api', '/api-sumbar');
        return `https://api-web.sumbarprov.go.id${path}`;
    };

    const formatLongDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    };

    if (loading) return null;
    if (newsItems.length === 0) return null;

    const carouselItems = newsItems.slice(0, 5);
    const otherNews = newsItems.slice(0, 5);

    return (
        <section className="section" id="berita" style={{ backgroundColor: '#ffffff', padding: '6rem 0' }}>
            <div className="container">
                <div 
                    data-aos="fade-up"
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-end', 
                        marginBottom: '4rem',
                        gap: '2rem',
                        flexWrap: 'wrap'
                    }}
                >
                    <div style={{ textAlign: 'left' }}>
                        <span style={{ 
                            fontSize: '0.85rem', 
                            fontWeight: '800', 
                            color: 'var(--secondary)', 
                            textTransform: 'uppercase', 
                            letterSpacing: '2px',
                            display: 'block',
                            marginBottom: '0.75rem'
                        }}>Update Informasi</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1rem' }}>Berita Terkini</h2>
                        <div style={{ width: '50px', height: '4px', background: 'var(--secondary)', marginBottom: '1.5rem', borderRadius: '2px' }}></div>
                        <p style={{ color: '#64748b', maxWidth: '600px', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                            Dapatkan informasi terbaru mengenai kegiatan dan kebijakan strategis Badan Kesbangpol Sumatera Barat.
                        </p>
                    </div>
                    <Link to="/berita" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        padding: '1rem 1.5rem',
                        borderRadius: '14px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        transition: 'all 0.3s ease'
                    }} className="view-all-news">
                        Lihat Semua Berita <i className="fas fa-arrow-right" style={{ transition: 'transform 0.3s ease' }}></i>
                    </Link>
                </div>

                <div className="news-grid-layout" 
                    data-aos="fade-up"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1.4fr 0.6fr',
                        gap: '4rem'
                    }}
                >
                    {/* Carousel Section (Left Column) */}
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '40px' }}>
                        <div style={{
                            display: 'flex',
                            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: `translateX(-${activeSlide * 100}%)`,
                            height: '600px'
                        }}>
                            {carouselItems.map((item, index) => (
                                <div key={index} style={{ minWidth: '100%', position: 'relative' }}>
                                    <Link to={`/berita-detail/${item.slug || item.id}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
                                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                            <img
                                                src={getImageUrl(item.gambar)}
                                                alt={item.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => { e.target.src = '/news1.png' }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to top, rgba(7, 29, 51, 0.95) 0%, rgba(7, 29, 51, 0.4) 40%, transparent 100%)',
                                                zIndex: 1
                                            }}></div>
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                padding: '4rem',
                                                zIndex: 2,
                                                color: 'white'
                                            }}>
                                                <div style={{
                                                    backgroundColor: 'var(--secondary)',
                                                    color: 'white',
                                                    padding: '0.5rem 1.2rem',
                                                    borderRadius: '12px',
                                                    fontWeight: '800',
                                                    fontSize: '0.8rem',
                                                    display: 'inline-block',
                                                    marginBottom: '1.5rem',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {item.category || 'Berita Utama'}
                                                </div>
                                                <h3 style={{
                                                    fontSize: '2.8rem',
                                                    fontWeight: '900',
                                                    lineHeight: '1.1',
                                                    marginBottom: '1.5rem',
                                                    textShadow: '0 2px 15px rgba(0,0,0,0.5)',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {item.title}
                                                </h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', opacity: 0.9, fontSize: '1rem', fontWeight: '500' }}>
                                                    <span><i className="far fa-calendar-alt" style={{ marginRight: '0.5rem' }}></i> {formatLongDate(item.created_at)}</span>
                                                    <span><i className="far fa-user" style={{ marginRight: '0.5rem' }}></i> {item.created_by || 'Kesbangpol'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {carouselItems.length > 1 && (
                            <div style={{ position: 'absolute', bottom: '2rem', right: '4rem', zIndex: 10, display: 'flex', gap: '0.75rem' }}>
                                {carouselItems.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveSlide(index)}
                                        style={{
                                            width: index === activeSlide ? '30px' : '10px',
                                            height: '10px',
                                            borderRadius: '10px',
                                            border: 'none',
                                            backgroundColor: index === activeSlide ? 'var(--secondary)' : 'rgba(255,255,255,0.5)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column (Recent News List) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.3rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ width: '4px', height: '24px', backgroundColor: 'var(--secondary)', borderRadius: '10px' }}></span>
                            Terkini Lainnya
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {otherNews.map((item, index) => (
                                <Link
                                    key={item.id || index}
                                    to={`/berita-detail/${item.slug || item.id}`}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '80px 1fr',
                                        gap: '1rem',
                                        padding: '1rem',
                                        borderRadius: '16px',
                                        backgroundColor: 'white',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        border: '1px solid #f1f5f9',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                    }}
                                    className="list-item-card"
                                >
                                    <div style={{ width: '80px', height: '65px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                                        <img
                                            src={getImageUrl(item.gambar)}
                                            alt={item.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = '/news1.png' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h5 style={{ 
                                            fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '700', lineHeight: '1.4', 
                                            marginBottom: '0.2rem', display: '-webkit-box', WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'
                                        }}>
                                            {item.title}
                                        </h5>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <i className="far fa-calendar-alt" style={{ fontSize: '0.7rem' }}></i>
                                            {formatLongDate(item.created_at)}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .news-grid-layout { grid-template-columns: 1fr !important; gap: 4rem !important; }
                }
                .list-item-card:hover {
                    background-color: white !important;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.05);
                    border-color: #e2e8f0 !important;
                    transform: translateX(10px);
                }
                .view-all-news:hover {
                    border-color: var(--secondary) !important;
                    background: white !important;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                }
                .view-all-news:hover .fa-arrow-right {
                    transform: translateX(5px);
                }
            `}</style>
        </section>
    );
};

export default News;
