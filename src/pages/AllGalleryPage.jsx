import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allGalleryItems = [
    { image: '/gallery1.png', title: 'Rapat Koordinasi Kesatuan Bangsa', category: 'Kegiatan' },
    { image: '/gallery2.png', title: 'Upacara Bendera HUT RI', category: 'Seremonial' },
    { image: '/gallery3.png', title: 'Sosialisasi Lapangan', category: 'Sosialisasi' },
    { image: '/gallery1.png', title: 'Pembinaan Ormas Daerah', category: 'Pembinaan' },
    { image: '/gallery2.png', title: 'Forum Kerukunan Umat Beragama', category: 'Dialog' },
    { image: '/gallery3.png', title: 'Monitoring Wilayah Strategis', category: 'Keamanan' },
    { image: '/gallery1.png', title: 'Kunjungan Kerja Luar Daerah', category: 'Kegiatan' },
    { image: '/gallery2.png', title: 'Pelatihan Kader Bela Negara', category: 'Pelatihan' },
    { image: '/gallery3.png', title: 'Penyuluhan Anti Narkoba', category: 'Sosialisasi' },
    { image: '/gallery1.png', title: 'Rapat Koordinasi Intelijen Daerah', category: 'Keamanan' },
    { image: '/gallery2.png', title: 'Pawai Budaya Nusantara', category: 'Seremonial' },
    { image: '/gallery3.png', title: 'Musyawarah Perencanaan Pembangunan', category: 'Kegiatan' },
];

const AllGalleryPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            <div style={{
                background: 'linear-gradient(rgba(10, 37, 64, 0.9), rgba(10, 37, 64, 0.9)), url("/hero-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '6rem 0 4rem',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Seluruh Album Galeri</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
                        Dokumentasi visual dari berbagai program, kegiatan, dan momen penting Badan Kesbangpol Provinsi Sumatera Barat.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem',
                        marginTop: '2rem'
                    }}>
                        {allGalleryItems.map((item, index) => (
                            <div key={index} style={{
                                position: 'relative',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                height: '300px',
                                cursor: 'pointer',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease'
                            }} className="gallery-item-full">
                                <img src={item.image} alt={item.title} style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'linear-gradient(transparent, rgba(10, 37, 64, 0.95))',
                                    padding: '2rem',
                                    color: 'white'
                                }}>
                                    <span style={{
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        fontWeight: '700',
                                        letterSpacing: '1.5px',
                                        color: '#ffd700',
                                        display: 'block',
                                        marginBottom: '0.5rem'
                                    }}>{item.category}</span>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                        <Link to="/" className="btn" style={{
                            backgroundColor: 'white',
                            color: '#0a2540',
                            padding: '1rem 2.5rem',
                            borderRadius: '12px',
                            fontWeight: '700',
                            border: '2px solid #0a2540',
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}>
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AllGalleryPage;
