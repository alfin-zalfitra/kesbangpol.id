import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

const News = () => {
    const [ref, revealed] = useReveal();
    const [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        const initialNews = [
            { id: 1, date: '5 Maret 2026', title: 'Bangkit dari Bencara, Safari Ramadhan Pemprov Sumbar Tebar Semangat Pemulihan di Matua', image: '/news1.png', category: 'BERITA UTAMA' },
            { id: 2, date: '5 Maret 2026', title: 'Refleksi Satu Tahun Kepemimpinan Mahyeldi - Vasko', image: '/news1.png', category: 'BERITA UTAMA' },
            { id: 3, date: '5 Maret 2026', title: 'Safari Ramadhan di Nagari Campago, Pemprov Sumbar Tegaskan Komitmen Pembangunan...', image: '/gallery1.png', category: 'BERITA UTAMA' },
            { id: 4, date: '5 Maret 2026', title: 'Gubernur Mahyeldi Serahkan Bantuan Bedah Rumah Rp25 Juta untuk Warga Paninggahan, Solok', image: '/gallery3.png', category: 'BERITA UTAMA' },
            { id: 5, date: '4 Maret 2026', title: 'Rapat Koordinasi Persiapan Pilkada Serentak 2026 di Sumatera Barat', image: '/gallery2.png', category: 'POLITIK' },
            { id: 6, date: '3 Maret 2026', title: 'Sosialisasi Bahaya Narkoba bagi Generasi Muda di Kota Padang', image: '/gallery1.png', category: 'KEAMANAN' }
        ];

        try {
            const storedNews = JSON.parse(localStorage.getItem('news_data') || '[]');
            const allNews = [...storedNews, ...initialNews];
            setNewsItems(allNews.slice(0, 6));
        } catch (error) {
            setNewsItems(initialNews.slice(0, 6));
        }
    }, []);

    return (
        <section ref={ref} className="section" id="berita" style={{ backgroundColor: '#f0f9ff', padding: '5rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div className={`animate-up ${revealed ? 'revealed' : ''}`}>
                        <h2 style={{ fontSize: '2.5rem', color: '#003366', fontWeight: '800' }}>Berita Terkini</h2>
                        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Informasi terbaru seputar kegiatan dan kebijakan Kesbangpol.</p>
                    </div>
                    <Link to="/berita-lengkap">
                        <button className={`btn btn-outline animate-up ${revealed ? 'revealed' : ''}`} style={{ borderColor: '#003366', color: '#003366' }}>Lihat Semua Berita</button>
                    </Link>
                </div>

                {/* News Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {newsItems.map((item, index) => (
                        <div key={item.id || index} className={`animate-up ${revealed ? 'revealed' : ''} reveal-delay-${(index % 4) + 1}`} style={{
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            padding: '1.5rem',
                            border: '1px solid #e0f2fe',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.02)',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'var(--transition)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.02)';
                            }}
                        >
                            <div style={{ width: '100%', height: '220px', borderRadius: '18px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s all' }} />
                            </div>
                            <span style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.8rem' }}>
                                {item.category || 'BERITA UTAMA'}
                            </span>
                            <h4 style={{ fontSize: '1.15rem', color: '#1e293b', fontWeight: '700', lineHeight: '1.4', marginBottom: '1.5rem', flex: 1 }}>
                                {item.title}
                            </h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <a href="#" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    Baca Selengkapnya <span style={{ fontSize: '1rem' }}>→</span>
                                </a>
                                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
