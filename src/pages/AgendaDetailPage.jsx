import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
        time: '09:00 - Selesai',
        description: 'Kegiatan sosialisasi ini bertujuan untuk memberikan pemahaman mendalam kepada masyarakat mengenai tahapan, mekanisme, dan pentingnya partisipasi dalam Pemilihan Umum Serentak 2026. Acara ini akan menghadirkan narasumber dari KPU dan Bawaslu.',
        schedule: [
            { time: '08:30 - 09:00', activity: 'Registrasi Peserta' },
            { time: '09:00 - 09:30', activity: 'Pembukaan & Sambutan Kepala Badan Kesbangpol' },
            { time: '09:30 - 11:30', activity: 'Materi Utama: Mekanisme Pemungutan Suara' },
            { time: '11:30 - 12:30', activity: 'Diskusi & Tanya Jawab' },
            { time: '12:30 - Selesai', activity: 'Penutup & Ramah Tamah' }
        ]
    },
    {
        id: 2,
        date: '22',
        month: 'Mar',
        year: '2026',
        title: 'Rapat Koordinasi Forum Pembauran Kebangsaan',
        location: 'Ruang Pertemuan Hotel Sago',
        time: '13:00 - 16:00',
        description: 'Rapat koordinasi ini melibatkan seluruh pengurus Forum Pembauran Kebangsaan (FPK) Sumatera Barat untuk membahas program kerja triwulan kedua dan penguatan harmoni antar etnis di wilayah kabupaten/kota.',
        schedule: [
            { time: '13:00 - 13:15', activity: 'Pembukaan' },
            { time: '13:15 - 14:30', activity: 'Evaluasi Program Kerja Triwulan I' },
            { time: '14:30 - 15:45', activity: 'Perencanaan Kegiatan Strategis Triwulan II' },
            { time: '15:45 - 16:00', activity: 'Rekomendasi Rapat & Penutup' }
        ]
    },
    {
        id: 3,
        date: '05',
        month: 'Apr',
        year: '2026',
        title: 'Penyuluhan Bahaya Narkoba bagi Generasi Muda',
        location: 'SMAN 1 Painan',
        time: '08:30 - 12:00',
        description: 'Program penyuluhan intensif yang menyasar pelajar tingkat menengah atas. Fokus utama adalah edukasi mengenai dampak buruk zat adiktif bagi kesehatan dan masa depan, serta cara membentengi diri dari tekanan pergaulan negatif.',
        schedule: [
            { time: '08:30 - 09:00', activity: 'Persiapan & Pembukaan' },
            { time: '09:00 - 10:30', activity: 'Presentasi: Bahaya Narkoba dari Sisi Medis & Hukum' },
            { time: '10:30 - 10:45', activity: 'Istirahat' },
            { time: '10:45 - 11:45', activity: 'Testimoni & Sesi Motivasi' },
            { time: '11:45 - 12:00', activity: 'Ikrar Anti Narkoba & Penutup' }
        ]
    }
];

const AgendaDetailPage = () => {
    const { id } = useParams();
    const event = allEvents.find(e => e.id === parseInt(id)) || allEvents[0];

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
                        <Link to="/agenda-lengkap" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Agenda</Link>
                        <span style={{ color: 'var(--text-muted)' }}>/</span>
                        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Detail Acara</span>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) 350px',
                        gap: '3rem',
                        alignItems: 'start'
                    }}>
                        {/* Main Content */}
                        <div className="animate-up revealed">
                            <div style={{
                                display: 'flex',
                                gap: '1.5rem',
                                alignItems: 'center',
                                marginBottom: '2rem',
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '24px',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    padding: '1.5rem',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    minWidth: '100px'
                                }}>
                                    <span style={{ display: 'block', fontSize: '2.5rem', fontWeight: '900', lineHeight: '1' }}>{event.date}</span>
                                    <span style={{ fontSize: '1rem', textTransform: 'uppercase', fontWeight: '700' }}>{event.month}</span>
                                    <span style={{ display: 'block', fontSize: '0.8rem', opacity: 0.8 }}>{event.year}</span>
                                </div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', lineHeight: '1.2' }}>
                                    {event.title}
                                </h1>
                            </div>

                            <section style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '1.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem' }}>Deskripsi Acara</h2>
                                <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    {event.description}
                                </p>

                                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '1.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem' }}>Jadwal Kegiatan</h2>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {event.schedule.map((item, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            gap: '2rem',
                                            padding: '1.2rem',
                                            backgroundColor: idx % 2 === 0 ? '#f8fafc' : 'white',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            <span style={{ minWidth: '120px', fontWeight: '700', color: 'var(--secondary)' }}>{item.time}</span>
                                            <span style={{ color: '#1e293b' }}>{item.activity}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar Info */}
                        <aside className="animate-up revealed" style={{ animationDelay: '0.2s', position: 'sticky', top: '120px' }}>
                            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '1.5rem' }}>Informasi Tambahan</h3>

                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>📍</span>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '0.9rem', color: '#64748b' }}>Lokasi</strong>
                                            <span style={{ color: '#1e293b', fontWeight: '600' }}>{event.location}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>⏰</span>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '0.9rem', color: '#64748b' }}>Waktu</strong>
                                            <span style={{ color: '#1e293b', fontWeight: '600' }}>{event.time}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>👥</span>
                                        <div>
                                            <strong style={{ display: 'block', fontSize: '0.9rem', color: '#64748b' }}>Peserta</strong>
                                            <span style={{ color: '#1e293b', fontWeight: '600' }}>Terbuka Umum</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%' }}>
                                    Ingatkan Saya
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AgendaDetailPage;
