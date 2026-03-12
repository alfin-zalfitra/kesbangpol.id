import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allGalleryItems = [
    { id: 1, image: '/gallery1.png', title: 'Rapat Koordinasi Kesatuan Bangsa', category: 'Kegiatan', date: '10 Maret 2026', description: 'Rapat koordinasi ini membahas penguatan persatuan dan kesatuan bangsa di tingkat daerah, melibatkan berbagai elemen masyarakat dan instansi pemerintah terkait.' },
    { id: 2, image: '/gallery2.png', title: 'Upacara Bendera HUT RI', category: 'Seremonial', date: '17 Agustus 2025', description: 'Pelaksanaan upacara bendera memperingati Hari Ulang Tahun Republik Indonesia ke-80 yang diikuti oleh seluruh staf dan pejabat Badan Kesbangpol.' },
    { id: 3, image: '/gallery3.png', title: 'Sosialisasi Lapangan', category: 'Sosialisasi', date: '5 Maret 2026', description: 'Kegiatan sosialisasi langsung ke tengah masyarakat mengenai peran aktif warga dalam menjaga stabilitas keamanan dan ketertiban di lingkungan masing-masing.' },
    { id: 4, image: '/gallery1.png', title: 'Pembinaan Ormas Daerah', category: 'Pembinaan', date: '1 Maret 2026', description: 'Program pembinaan berkelanjutan bagi organisasi kemasyarakatan di daerah untuk meningkatkan sinergitas dengan pemerintah provinsi.' },
    { id: 5, image: '/gallery2.png', title: 'Forum Kerukunan Umat Beragama', category: 'Dialog', date: '25 Februari 2026', description: 'Pertemuan rutin Forum Kerukunan Umat Beragama (FKUB) untuk memupuk toleransi dan harmoni antar pemeluk agama di Sumatera Barat.' },
    { id: 6, image: '/gallery3.png', title: 'Monitoring Wilayah Strategis', category: 'Keamanan', date: '20 Februari 2026', description: 'Peninjauan langsung ke titik-titik strategis wilayah untuk memonitor perkembangan situasi sosial politik menjelang agenda nasional.' },
];

const GalleryDetailPage = () => {
    const { id } = useParams();
    const item = allGalleryItems.find(i => i.id === parseInt(id)) || allGalleryItems[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            <main style={{ paddingTop: '100px' }}>
                <div className="container" style={{ paddingBottom: '5rem' }}>
                    <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Beranda</Link>
                        <span style={{ color: 'var(--text-muted)' }}>/</span>
                        <Link to="/galeri-lengkap" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Galeri</Link>
                        <span style={{ color: 'var(--text-muted)' }}>/</span>
                        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Detail Foto</span>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
                        gap: '3rem',
                        alignItems: 'start'
                    }}>
                        {/* Main Image View */}
                        <div className="animate-up revealed">
                            <div style={{
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                                backgroundColor: 'white',
                                height: '500px'
                            }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Details Sidebar */}
                        <div className="animate-up revealed" style={{ animationDelay: '0.2s' }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--accent)',
                                color: 'var(--primary)',
                                borderRadius: '30px',
                                fontSize: '0.8rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                marginBottom: '1.5rem'
                            }}>
                                {item.category}
                            </span>

                            <h1 style={{
                                fontSize: '2.5rem',
                                color: 'var(--primary)',
                                fontWeight: '800',
                                lineHeight: '1.2',
                                marginBottom: '1.5rem'
                            }}>
                                {item.title}
                            </h1>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                marginBottom: '2rem',
                                color: 'var(--text-muted)',
                                fontSize: '1rem'
                            }}>
                                📅 <span>{item.date}</span>
                                <span style={{ opacity: 0.3 }}>|</span>
                                👤 <span>Admin Kesbangpol</span>
                            </div>

                            <div style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '20px',
                                border: '1px solid #e2e8f0',
                                marginBottom: '2rem'
                            }}>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>Deskripsi Kegiatan</h3>
                                <p style={{ color: '#4a5568', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                    {item.description}
                                </p>
                            </div>

                            <Link to="/galeri-lengkap" className="btn btn-primary" style={{ display: 'flex', width: '100%', padding: '1.2rem' }}>
                                Lihat Foto Lainnya
                            </Link>

                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Bagikan:</p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                    <button style={{ border: 'none', background: '#3b5998', color: 'white', width: '35px', height: '35px', borderRadius: '50%' }}>f</button>
                                    <button style={{ border: 'none', background: '#1da1f2', color: 'white', width: '35px', height: '35px', borderRadius: '50%' }}>t</button>
                                    <button style={{ border: 'none', background: '#25d366', color: 'white', width: '35px', height: '35px', borderRadius: '50%' }}>w</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default GalleryDetailPage;
