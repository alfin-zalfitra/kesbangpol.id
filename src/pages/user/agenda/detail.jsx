import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const AgendaDetail = () => {
    const { slug } = useParams();
    const [agenda, setAgenda] = useState(null);
    const [allAgendas, setAllAgendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgendaDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api-sumbar/category/agenda/2765');
                if (!response.ok) throw new Error('Data tidak ditemukan');
                const result = await response.json();
                
                const data = Array.isArray(result.data) ? result.data : [result.data];
                setAllAgendas(data);

                const found = data.find(item => item.slug === slug || item.id === slug || item.id == slug);
                if (found) {
                    setAgenda(found);
                } else {
                    throw new Error('Agenda tidak ditemukan');
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAgendaDetail();
        window.scrollTo(0, 0);
    }, [slug]);

    const getImageUrl = (path) => {
        if (!path) return '/news1.png';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/api')) return path.replace('/api', '/api-sumbar');
        return `https://api-web.sumbarprov.go.id${path}`;
    };

    if (loading) return (
        <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
            <TopBar /><Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <div className="loader"></div>
            </div>
            <Footer />
            <style>{`.loader { width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid var(--secondary); border-radius: 50%; animation: spin 1s linear infinite; } @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (error || !agenda) return (
        <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
            <TopBar /><Navbar />
            <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>⚠️ Ops!</h1>
                <p>{error || 'Agenda tidak ditemukan'}</p>
                <Link to="/agenda" className="btn btn-primary" style={{ marginTop: '2rem' }}>Kembali ke Daftar Agenda</Link>
            </div>
            <Footer />
        </div>
    );

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <TopBar /><Navbar />

            {/* Header Section */}
            <div style={{ backgroundColor: 'white', padding: '4rem 0 3rem', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '1.25rem' }}>
                        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                        <Link to="/agenda" style={{ color: '#94a3b8' }}>Agenda</Link> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>Detail Agenda</span>
                    </div>

                    <h1 style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: '1.1', maxWidth: '1000px', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                        {agenda.title}
                    </h1>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>
                        <span style={{ color: 'var(--secondary)', fontWeight: '800' }}>#{agenda.category || 'Agenda'}</span>
                        <span>📅 {agenda.created_at || agenda.tgl_posting}</span>
                        <span>👤 Oleh: <span style={{ color: 'var(--primary)' }}>{agenda.created_by || 'Admin'}</span></span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem' }} className="agenda-detail-grid">
                    <div>
                        {agenda.gambar && (
                            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
                                <img 
                                    src={getImageUrl(agenda.gambar)} 
                                    alt={agenda.title} 
                                    style={{ width: '100%', display: 'block' }} 
                                    onError={(e) => { e.target.src = '/news1.png' }}
                                />
                            </div>
                        )}

                        <div 
                            style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#334155', fontFamily: 'serif' }}
                            dangerouslySetInnerHTML={{ __html: agenda.content || agenda.isi || '<p>Detail agenda tidak tersedia.</p>' }}
                        />
                        
                        <div style={{ marginTop: '3rem', padding: '2rem', background: 'white', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: '800' }}>Informasi Kegiatan</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <span style={{ width: '100px', fontWeight: '700', color: '#64748b' }}>Lokasi:</span>
                                    <span>{agenda.keterangan_gambar || 'Aula Kantor Bupati'}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <span style={{ width: '100px', fontWeight: '700', color: '#64748b' }}>Waktu:</span>
                                    <span>{agenda.created_at || agenda.tgl_posting}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <h4 style={{ borderLeft: '4px solid var(--secondary)', paddingLeft: '1rem', marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: '800' }}>Agenda Lainnya</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {allAgendas.filter(n => (n.slug || n.id) !== slug).slice(0, 5).map((item, idx) => (
                                <Link key={idx} to={`/agenda-detail/${item.slug || item.id}`} style={{ display: 'flex', gap: '1rem', textDecoration: 'none' }} className="side-agenda-link">
                                    <div style={{ 
                                        width: '60px', height: '60px', borderRadius: '10px', background: 'var(--primary)', color: 'white', 
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                                    }}>
                                        <span style={{ fontSize: '1.1rem', fontWeight: '900', lineHeight: '1' }}>{item.created_at ? new Date(item.created_at).getDate() : '?'}</span>
                                        <span style={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>{item.created_at ? new Date(item.created_at).toLocaleString('default', { month: 'short' }) : '?'}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h5 style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', lineHeight: '1.4' }} className="atitle">{item.title}</h5>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
            <style>{`
                .side-agenda-link:hover .atitle { color: var(--secondary) !important; }
                @media (max-width: 992px) { .agenda-detail-grid { grid-template-columns: 1fr !important; } aside { position: static !important; margin-top: 4rem; } }
            `}</style>
        </div>
    );
};

export default AgendaDetail;
