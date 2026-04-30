import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Agenda = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgenda = async () => {
            try {
                const response = await fetch('/api-sumbar/category/agenda/2765');
                const result = await response.json();
                if (result && result.data) {
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                    setEvents(data.slice(0, 5)); // Show top 5
                }
            } catch (error) {
                console.error('Error fetching agenda:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgenda();
    }, []);

    const formatLongDate = (dateStr) => {
        if (!dateStr) return { day: '?', month: '?', year: '?' };
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return { day, month, year };
    };

    return (
        <section className="section" id="agenda" style={{ background: '#ffffff', padding: '6rem 0' }}>
            <div className="container">
                {/* Standard Left Header */}
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
                            fontSize: '0.8rem', 
                            fontWeight: '800', 
                            color: 'var(--secondary)', 
                            textTransform: 'uppercase', 
                            letterSpacing: '2px',
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>Jadwal Acara</span>
                        <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.75rem' }}>Agenda Kegiatan</h2>
                        <div style={{ width: '40px', height: '3px', background: 'var(--secondary)', marginBottom: '1rem', borderRadius: '2px' }}></div>
                        <p style={{ color: '#64748b', maxWidth: '600px', fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>
                            Ikuti berbagai agenda penting dan kegiatan mendatang dari Badan Kesbangpol Sumatera Barat.
                        </p>
                    </div>
                    <Link to="/agenda" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        transition: 'all 0.3s ease'
                    }} className="view-all-btn">
                        Lihat Semua Agenda <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>

                <div className="agenda-list-vertical" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1.25rem' 
                }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>Memuat agenda...</div>
                    ) : events.length > 0 ? (
                        events.map((event, index) => {
                            const { day, month, year } = formatLongDate(event.created_at || event.tgl_posting);
                            return (
                                <Link key={index} 
                                    to={`/agenda-detail/${event.slug || event.id}`}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    className="agenda-row-card" 
                                    style={{
                                        background: 'white',
                                        borderRadius: '20px',
                                        padding: '1.25rem 2rem',
                                        display: 'grid',
                                        gridTemplateColumns: '80px 1fr auto',
                                        alignItems: 'center',
                                        gap: '2.5rem',
                                        border: '1px solid #f1f5f9',
                                        transition: 'all 0.3s ease',
                                        textDecoration: 'none',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                    }}>
                                    {/* Date Block */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRight: '1px solid #f1f5f9',
                                        paddingRight: '1.5rem'
                                    }}>
                                        <span style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--primary)', lineHeight: '1' }}>{day}</span>
                                        <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', marginTop: '4px' }}>{month.slice(0, 3)}</span>
                                    </div>
                                    
                                    {/* Content Info */}
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ 
                                            fontSize: '1.15rem', 
                                            fontWeight: '800', 
                                            color: 'var(--primary)',
                                            lineHeight: '1.4',
                                            marginBottom: '0.5rem'
                                        }}>{event.title}</h3>
                                        
                                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#64748b' }}>
                                                <i className="fas fa-map-marker-alt" style={{ color: 'var(--secondary)' }}></i>
                                                {event.keterangan_gambar || 'Lokasi Kegiatan'}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#64748b' }}>
                                                <i className="far fa-calendar-check" style={{ color: 'var(--secondary)' }}></i>
                                                {day} {month} {year}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Arrow */}
                                    <div style={{ 
                                        width: '45px', 
                                        height: '45px', 
                                        borderRadius: '50%', 
                                        background: '#f8fafc', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        color: 'var(--primary)',
                                        transition: 'all 0.3s ease'
                                    }} className="arrow-box">
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>Belum ada agenda saat ini.</div>
                    )}
                </div>
            </div>

            <style>{`
                .agenda-row-card:hover {
                    transform: translateX(10px);
                    border-color: var(--secondary);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                }
                .agenda-row-card:hover .arrow-box {
                    background: var(--primary);
                    color: white;
                    transform: scale(1.1);
                }
                .view-all-btn:hover {
                    border-color: var(--secondary) !important;
                    background: white !important;
                    transform: translateY(-3px);
                }
                @media (max-width: 768px) {
                    .agenda-row-card {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                        text-align: center;
                    }
                    .agenda-row-card div {
                        border-right: none !important;
                        padding-right: 0 !important;
                        justify-content: center !important;
                    }
                    .arrow-box { display: none !important; }
                }
            `}</style>
        </section>
    );
};

export default Agenda;
