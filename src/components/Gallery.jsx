import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

const galleryItems = [
    {
        id: 1,
        image: '/gallery1.png',
        title: 'Rapat Koordinasi Kesatuan Bangsa',
        category: 'Kegiatan'
    },
    {
        id: 2,
        image: '/gallery2.png',
        title: 'Upacara Bendera HUT RI',
        category: 'Seremonial'
    },
    {
        id: 3,
        image: '/gallery3.png',
        title: 'Sosialisasi Lapangan',
        category: 'Sosialisasi'
    },
    {
        id: 4,
        image: '/gallery1.png',
        title: 'Pembinaan Ormas Daerah',
        category: 'Pembinaan'
    },
    {
        id: 5,
        image: '/gallery2.png',
        title: 'Forum Kerukunan Umat Beragama',
        category: 'Dialog'
    },
    {
        id: 6,
        image: '/gallery3.png',
        title: 'Monitoring Wilayah Strategis',
        category: 'Keamanan'
    }
];

const Gallery = () => {
    const [ref, revealed] = useReveal();
    return (
        <section ref={ref} className="section" id="galeri">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }} className={`animate-up ${revealed ? 'revealed' : ''}`}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>Galeri Kegiatan</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Dokumentasi berbagai kegiatan dan program kerja Badan Kesbangpol Kabupaten Pesisir Selatan.</p>
                </div>

                <div className="gallery-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {galleryItems.map((item, index) => (
                        <Link
                            key={index}
                            to={`/galeri-detail/${item.id}`}
                            className={`gallery-item animate-up ${revealed ? 'revealed' : ''} reveal-delay-${(index % 4) + 1}`}
                            style={{
                                position: 'relative',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                height: '350px',
                                cursor: 'pointer',
                                display: 'block',
                                textDecoration: 'none'
                            }}
                        >
                            <img src={item.image} alt={item.title} style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'var(--transition)'
                            }} />
                            <div className="gallery-overlay" style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(transparent, rgba(10, 37, 64, 0.95))',
                                padding: '1.5rem',
                                color: 'white',
                                transform: 'translateY(0)',
                                transition: 'var(--transition)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end'
                            }}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    fontWeight: '700',
                                    letterSpacing: '1px',
                                    color: 'var(--accent)'
                                }}>{item.category}</span>
                                <h3 style={{ fontSize: '1.1rem', marginTop: '0.25rem', marginBottom: '1rem' }}>{item.title}</h3>

                                <div className="btn btn-primary" style={{ width: 'fit-content', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                                    Lihat Detail →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Link to="/galeri-lengkap" className={`btn btn-primary animate-up ${revealed ? 'revealed' : ''}`}>
                        Lihat Semua Album →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
