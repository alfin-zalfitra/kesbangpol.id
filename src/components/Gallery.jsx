import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Gallery = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch('/api-sumbar/galery-foto/2765');
                const result = await response.json();
                if (result && result.data) {
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                    setAlbums(data.slice(0, 7)); // Show top 7
                }
            } catch (error) {
                console.error('Error fetching gallery:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    const getImageUrl = (path) => {
        if (!path) return '/gallery1.png';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/api')) return path.replace('/api', '/api-sumbar');
        return `https://api-web.sumbarprov.go.id${path}`;
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % Math.ceil((albums.length - 1) / 2));
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + Math.ceil((albums.length - 1) / 2)) % Math.ceil((albums.length - 1) / 2));
    };

    if (loading) return null;
    if (albums.length === 0) return null;

    const latestAlbum = albums[0];
    const carouselAlbums = albums.slice(1);

    return (
        <section className="section" id="galeri" style={{ background: '#ffffff', padding: '6rem 0', overflow: 'hidden' }}>
            <div className="container">
                {/* Right Aligned Header */}
                <div 
                    data-aos="fade-up"
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-end', 
                        marginBottom: '3rem',
                        gap: '2rem',
                        flexWrap: 'wrap'
                    }}
                >
                    <div style={{ textAlign: 'left' }}>
                        <span style={{ 
                            fontSize: '0.8rem', 
                            fontWeight: '800', 
                            color: 'var(--secondary)', 
                            textTransform: 'uppercase', 
                            letterSpacing: '2px',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>Dokumentasi Visual</span>
                        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.75rem' }}>Galeri Kegiatan</h2>
                        <div style={{ width: '40px', height: '3px', background: 'var(--secondary)', marginBottom: '1rem', borderRadius: '2px' }}></div>
                        <p style={{ color: '#64748b', maxWidth: '600px', fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>
                            Koleksi dokumentasi terbaru Badan Kesbangpol Sumatera Barat.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/galeri" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: 'var(--primary)',
                            textDecoration: 'none',
                            fontWeight: '800',
                            fontSize: '0.9rem',
                            padding: '0.8rem 1.5rem',
                            borderRadius: '12px',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.3s ease'
                        }} className="view-all-gallery">
                            Lihat Semua <i className="fas fa-arrow-right"></i>
                        </Link>
                        {carouselAlbums.length > 2 && (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={prevSlide} className="nav-btn-gallery"><i className="fas fa-chevron-left"></i></button>
                                <button onClick={nextSlide} className="nav-btn-gallery"><i className="fas fa-chevron-right"></i></button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="gallery-main-layout" style={{
                    display: 'grid',
                    gridTemplateColumns: '1.4fr 1.6fr',
                    gap: '2rem'
                }}>
                    {/* Latest Album (Featured Left) */}
                    <Link
                        to={`/galeri-detail/${latestAlbum.slug || latestAlbum.id}`}
                        data-aos="fade-right"
                        className="featured-gallery-card"
                        style={{
                            position: 'relative',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            height: '450px',
                            textDecoration: 'none',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.08)'
                        }}
                    >
                        <img 
                            src={getImageUrl(latestAlbum.gambar || latestAlbum.image)} 
                            alt={latestAlbum.title || latestAlbum.judul} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} 
                            className="zoom-img"
                            onError={(e) => { e.target.src = '/gallery1.png' }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(7, 29, 51, 0.95) 0%, rgba(7, 29, 51, 0.2) 60%, transparent 100%)',
                            padding: '2.5rem',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end'
                        }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', letterSpacing: '2px', marginBottom: '0.75rem' }}>UTAMA</span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.3' }}>{latestAlbum.title || latestAlbum.judul}</h3>
                            <div className="btn-detail-v2">Lihat Album <i className="fas fa-arrow-right"></i></div>
                        </div>
                    </Link>

                    {/* Carousel (Older Right) */}
                    <div style={{ position: 'relative', overflow: 'hidden' }} data-aos="fade-left">
                        <div style={{
                            display: 'flex',
                            gap: '1.5rem',
                            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: `translateX(-${activeIndex * 100}%)`,
                            height: '100%'
                        }}>
                            {carouselAlbums.map((item, index) => (
                                <Link
                                    key={item.id || index}
                                    to={`/galeri-detail/${item.slug || item.id}`}
                                    className="carousel-gallery-card-v2"
                                    style={{
                                        minWidth: 'calc(50% - 0.75rem)',
                                        position: 'relative',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        height: '450px',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <img 
                                        src={getImageUrl(item.gambar || item.image)} 
                                        alt={item.title || item.judul} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} 
                                        className="zoom-img"
                                        onError={(e) => { e.target.src = '/gallery1.png' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(7, 29, 51, 0.9) 0%, transparent 100%)',
                                        padding: '1.5rem',
                                        color: 'white',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '0.4rem' }}>{item.title || item.judul}</h4>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--secondary)' }}>DETAIL →</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .zoom-img { transition: transform 0.6s ease; }
                .featured-gallery-card:hover .zoom-img, .carousel-gallery-card-v2:hover .zoom-img {
                    transform: scale(1.1);
                }
                .btn-detail-v2 {
                    width: fit-content;
                    padding: 0.6rem 1.2rem;
                    background: var(--secondary);
                    color: white;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 800;
                }
                .nav-btn-gallery {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid #e2e8f0;
                    background: white;
                    color: var(--primary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                .nav-btn-gallery:hover {
                    background: var(--primary);
                    color: white;
                }
                @media (max-width: 1024px) {
                    .gallery-main-layout { grid-template-columns: 1fr !important; }
                    .carousel-gallery-card-v2 { min-width: 100% !important; }
                }
            `}</style>
        </section>
    );
};

export default Gallery;
