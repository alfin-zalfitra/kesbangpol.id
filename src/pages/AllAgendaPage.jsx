import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allEvents = [
    {
        id: 1,
        date: '15',
        month: 'Mar',
        year: '2026',
        title: 'Sosialisasi Pemilihan Umum Serentak',
        location: 'Aula Kantor Bupati',
        time: '09:00 - Selesai'
    },
    {
        id: 2,
        date: '22',
        month: 'Mar',
        year: '2026',
        title: 'Rapat Koordinasi Forum Pembauran Kebangsaan',
        location: 'Ruang Pertemuan Hotel Sago',
        time: '13:00 - 16:00'
    },
    {
        id: 3,
        date: '05',
        month: 'Apr',
        year: '2026',
        title: 'Penyuluhan Bahaya Narkoba bagi Generasi Muda',
        location: 'SMAN 1 Painan',
        time: '08:30 - 12:00'
    },
    {
        id: 4,
        date: '12',
        month: 'Apr',
        year: '2026',
        title: 'Workshop Penguatan Ideologi Pancasila',
        location: 'Gedung Pertemuan Umum',
        time: '09:00 - 15:00'
    },
    {
        id: 5,
        date: '20',
        month: 'Apr',
        year: '2026',
        title: 'Dialog Lintas Agama dan Kepercayaan',
        location: 'Aula Wisma Atlet',
        time: '14:00 - 17:00'
    },
    {
        id: 6,
        date: '28',
        month: 'Apr',
        year: '2026',
        title: 'Monitoring Organisasi Kemasyarakatan tahap I',
        location: 'Kantor Kesbangpol Provinsi',
        time: '08:00 - Selesai'
    }
];

const AllAgendaPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            {/* Page Header */}
            <div style={{
                background: 'linear-gradient(rgba(10, 37, 64, 0.9), rgba(10, 37, 64, 0.9)), url("/hero-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '6rem 0 4rem',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Semua Agenda Kegiatan</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
                        Daftar lengkap rencana kegiatan, sosialisasi, dan program kerja Badan Kesbangpol Provinsi Sumatera Barat.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))',
                        gap: '1.5rem',
                        marginTop: '2rem'
                    }}>
                        {allEvents.map((event, index) => (
                            <div key={index} className="event-card-full" style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2.5rem',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{
                                    backgroundColor: '#0a2540',
                                    color: 'white',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                    minWidth: '100px',
                                    boxShadow: '0 10px 15px -3px rgba(10, 37, 64, 0.2)'
                                }}>
                                    <span style={{ display: 'block', fontSize: '2rem', fontWeight: '900', lineHeight: '1' }}>{event.date}</span>
                                    <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>{event.month}</span>
                                    <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '4px', opacity: 0.7 }}>{event.year}</span>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: '#0a2540' }}>{event.title}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', fontSize: '0.95rem', color: '#64748b' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <i className="fas fa-map-marker-alt" style={{ color: '#c8102e' }}></i>
                                            <strong>Lokasi:</strong> {event.location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <i className="fas fa-clock" style={{ color: '#c8102e' }}></i>
                                            <strong>Waktu:</strong> {event.time}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '1rem' }}>
                                    <Link to={`/agenda-detail/${event.id}`} className="btn btn-primary">
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                        <Link to="/" className="btn btn-outline">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AllAgendaPage;
