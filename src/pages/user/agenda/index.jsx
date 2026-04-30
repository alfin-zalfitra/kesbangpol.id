import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const AgendaIndex = () => {
    const [agendas, setAgendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgendas = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api-sumbar/category/agenda/2765');
                if (!response.ok) throw new Error('Gagal mengambil data agenda');
                const result = await response.json();
                
                if (result && result.data) {
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                    setAgendas(data);
                } else {
                    setAgendas([]);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAgendas();
        window.scrollTo(0, 0);
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return { day: '?', month: '?', year: '?' };
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return { day, month, year };
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            {/* Header Section - White Theme */}
            <div style={{ background: 'white', padding: '4rem 0 3rem', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '1rem' }}>
                        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>Agenda</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.5rem' }}>Agenda Kegiatan</h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>Informasi kegiatan dan agenda resmi Badan Kesbangpol Sumatera Barat</p>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ minHeight: '300px' }}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                            <div className="premium-loader"></div>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {agendas.length > 0 ? agendas.map((item, index) => {
                                const { day, month, year } = formatDate(item.created_at || item.tgl_posting);
                                return (
                                    <Link
                                        key={item.id || index}
                                        to={`/agenda-detail/${item.slug || item.id}`}
                                        className="agenda-row"
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '100px 1fr auto',
                                            gap: '2rem',
                                            alignItems: 'center',
                                            padding: '1.5rem',
                                            background: 'white',
                                            borderRadius: '16px',
                                            border: '1px solid #f1f5f9',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                        }}
                                    >
                                        <div style={{
                                            background: '#f8fafc',
                                            color: 'var(--primary)',
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            textAlign: 'center',
                                            border: '1px solid #e2e8f0',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }} className="date-box">
                                            <span style={{ fontSize: '1.5rem', fontWeight: '900', lineHeight: '1' }}>{day}</span>
                                            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px', color: 'var(--secondary)', marginTop: '0.2rem' }}>{month}</span>
                                            <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{year}</span>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', margin: 0, fontWeight: '800' }} className="agenda-title">
                                                {item.title}
                                            </h3>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                                                <span>📍 {item.keterangan_gambar || 'Lokasi Kegiatan'}</span>
                                                <span>⏰ {item.created_at || item.tgl_posting}</span>
                                            </div>
                                        </div>

                                        <div style={{ color: '#94a3b8', fontSize: '1.2rem' }}>→</div>
                                    </Link>
                                );
                            }) : (
                                <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                                    <p style={{ color: '#64748b' }}>Belum ada agenda kegiatan saat ini.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            <style>{`
                .premium-loader { width: 50px; height: 50px; border: 3px solid rgba(200, 16, 46, 0.1); border-top: 3px solid var(--secondary); border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                
                .agenda-row:hover {
                    transform: translateY(-5px);
                    border-color: var(--secondary);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                }
                .agenda-row:hover .date-box {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                }
                .agenda-row:hover .date-box span:nth-child(2) {
                    color: var(--accent) !important;
                }
                .agenda-row:hover .agenda-title {
                    color: var(--secondary);
                }
            `}</style>
        </div>
    );
};

export default AgendaIndex;
