import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useReveal } from '../hooks/useReveal';

const AllNewsPage = () => {
    const [ref, revealed] = useReveal();
    const [newsItems, setNewsItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const initialNews = [
            { id: 1, date: '27 Feb 2026', title: 'Sosialisasi Pemilu Damai 2026 di Tingkat Kecamatan', image: '/news1.png', category: 'Berita' },
            { id: 2, date: '28 Feb 2026', title: 'Sosialisasi Pemilu Damai 2026 di Tingkat Kecamatan', image: '/news1.png', category: 'Berita' },
            { id: 3, date: '24 Feb 2026', title: 'Pelantikan Forum Pembauran Kebangsaan Periode Baru', image: '/gallery1.png', category: 'Pengumuman' },
            { id: 4, date: '20 Feb 2026', title: 'Rapat Koordinasi Kewaspadaan Dini Daerah', image: '/gallery3.png', category: 'Berita' }
        ];

        try {
            const storedNews = JSON.parse(localStorage.getItem('news_data') || '[]');
            setNewsItems([...storedNews, ...initialNews]);
        } catch (error) {
            setNewsItems(initialNews);
        }

        window.scrollTo(0, 0);
    }, []);

    const filteredNews = newsItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <TopBar />
            <Navbar />
            <main style={{ paddingTop: '100px', background: 'var(--surface)', minHeight: '80vh' }}>
                <header className="page-header" style={{
                    padding: '4rem 0',
                    background: 'linear-gradient(135deg, var(--primary) 0%, #1a365d 100%)',
                    color: 'white',
                    marginBottom: '3rem'
                }}>
                    <div className="container">
                        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Semua Berita</h1>
                        <p style={{ opacity: 0.8, maxWidth: '600px' }}>Arsip berita dan informasi terkini seputar kegiatan Kesbangpol Sumatera Barat.</p>
                    </div>
                </header>

                <div className="container" style={{ marginBottom: '5rem' }}>
                    {/* Search & Filter Bar */}
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        boxShadow: 'var(--shadow)',
                        marginBottom: '3rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                            <input
                                type="text"
                                placeholder="Cari berita..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 1rem 0.8rem 2.5rem',
                                    borderRadius: '10px',
                                    border: '1px solid #eee',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Terbaru</button>
                            <button className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Populer</button>
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="services-grid" ref={ref}>
                        {filteredNews.length > 0 ? (
                            filteredNews.map((item, index) => (
                                <div
                                    key={item.id || index}
                                    className={`news-card animate-up revealed`}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        boxShadow: 'var(--shadow)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                                        <span style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            left: '1rem',
                                            background: 'var(--accent)',
                                            color: 'var(--primary)',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.7rem',
                                            fontWeight: '700',
                                            textTransform: 'uppercase'
                                        }}>
                                            {item.category || 'Berita'}
                                        </span>
                                    </div>
                                    <div style={{ padding: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📅 {item.date}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', lineHeight: '1.4', marginBottom: '1.5rem', minHeight: '3.6rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {item.title}
                                        </h3>
                                        <a href="#" style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'var(--secondary)',
                                            fontWeight: '600',
                                            textDecoration: 'none'
                                        }}>
                                            Baca Selengkapnya <span>→</span>
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0' }}>
                                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Tidak ada berita yang ditemukan.</p>
                            </div>
                        )}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <Link to="/" className="btn" style={{
                            backgroundColor: 'white',
                            color: '#0a2540',
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            fontWeight: '700',
                            border: '2px solid #0a2540',
                            textDecoration: 'none'
                        }}>
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AllNewsPage;
