import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

const events = [
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
    }
];

const Agenda = () => {
    const [ref, revealed] = useReveal();
    return (
        <section ref={ref} className="section" id="agenda" style={{ background: 'var(--surface)' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div className={`animate-up ${revealed ? 'revealed' : ''}`}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Agenda Kegiatan</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Ikuti berbagai kegiatan dan acara mendatang kami.</p>
                    </div>
                    <Link to="/agenda-lengkap" className={`btn btn-outline animate-up ${revealed ? 'revealed' : ''}`} style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}>Lihat Semua →</Link>
                </div>

                <div className="agenda-list" style={{ display: 'grid', gap: '1.5rem' }}>
                    {events.map((event, index) => (
                        <div key={index} className={`event-card animate-up ${revealed ? 'revealed' : ''} reveal-delay-${index + 1}`} style={{
                            background: 'var(--white)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem',
                            border: '1px solid #e6e9f0',
                            transition: 'var(--transition)'
                        }}>
                            <div className="agenda-date" style={{
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: '8px',
                                textAlign: 'center',
                                minWidth: '80px'
                            }}>
                                <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '800', lineHeight: '1' }}>{event.date}</span>
                                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: '0.8' }}>{event.month}</span>
                            </div>
                            <div className="agenda-info" style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>{event.title}</h3>
                                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        📍 {event.location}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        ⏰ {event.time}
                                    </span>
                                </div>
                            </div>
                            <Link to={`/agenda-detail/${event.id}`} className="btn btn-primary">Detail →</Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Agenda;
