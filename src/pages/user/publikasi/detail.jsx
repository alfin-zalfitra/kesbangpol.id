import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const PublicationDetail = () => {
    const { category, slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!category || !slug) return;
            setLoading(true);
            try {
                const response = await fetch(`/api-sumbar/category/${category}/2765`);
                if (!response.ok) throw new Error('Data tidak ditemukan');
                const result = await response.json();
                
                const allItems = Array.isArray(result.data) ? result.data : [result.data];
                const found = allItems.find(item => item.slug === slug || item.id === slug || item.id == slug);
                
                if (found) {
                    setData(found);
                } else {
                    throw new Error('Dokumen tidak ditemukan');
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
        window.scrollTo(0, 0);
    }, [category, slug]);

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('/api')) return path.replace('/api', '/api-sumbar');
        return `https://api-web.sumbarprov.go.id${path}`;
    };

    const fixImageUrl = (content) => {
        if (!content || typeof content !== 'string') return content;
        return content.replace(/\/api\/files\//g, '/api-sumbar/files/');
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

    if (error || !data) return (
        <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
            <TopBar /><Navbar />
            <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>⚠️ Ops!</h1>
                <p>{error || 'Dokumen tidak ditemukan'}</p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Kembali ke Beranda</Link>
            </div>
            <Footer />
        </div>
    );

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <TopBar /><Navbar />

            {/* Header Section */}
            <div style={{ backgroundColor: '#ffffff', paddingTop: '4rem', paddingBottom: '3rem', color: 'var(--primary)', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '1.25rem' }}>
                        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                        <Link to={`/publikasi/${category}`} style={{ color: '#94a3b8' }}>Publikasi</Link> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>Detail Dokumen</span>
                    </div>

                    <h1 style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: '1.1', maxWidth: '1000px', color: 'var(--primary)', marginBottom: '1.5rem' }}>{data.title || data.judul}</h1>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>
                        <span style={{ color: 'var(--secondary)', fontWeight: '800' }}>#{data.category || category}</span>
                        <span>📅 {data.created_at || data.tgl_posting}</span>
                        <span>👤 Oleh: <span style={{ color: 'var(--primary)' }}>{data.created_by || 'Admin'}</span></span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    {data.gambar && (
                        <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', marginBottom: '3.5rem' }}>
                            <img 
                                src={getImageUrl(data.gambar)} 
                                alt={data.title || data.judul} 
                                style={{ width: '100%', display: 'block' }} 
                            />
                        </div>
                    )}

                    <div 
                        className="static-content"
                        style={{ 
                            fontSize: '1.2rem', 
                            lineHeight: '2', 
                            color: '#334155', 
                            background: 'white',
                            padding: '4rem',
                            borderRadius: '30px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                            border: '1px solid #f1f5f9'
                        }}
                        dangerouslySetInnerHTML={{ __html: fixImageUrl(data.isi || data.content || '<p>Isi dokumen tidak tersedia.</p>') }}
                    />

                    {data.file && (
                        <div style={{ marginTop: '3rem', padding: '2rem', background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <h4 style={{ fontWeight: '800', color: 'var(--primary)' }}>Lampiran Dokumen</h4>
                                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Silakan unduh file untuk informasi lebih lengkap.</p>
                            </div>
                            <a href={getImageUrl(data.file)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                Unduh File ⬇
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
            <style>{`
                .static-content p { margin-bottom: 2rem; }
                .static-content h2, .static-content h3 { color: var(--primary); margin: 3rem 0 1.5rem 0; font-weight: 800; }
                .static-content ul, .static-content ol { margin: 2rem 0; padding-left: 2rem; }
                .static-content li { margin-bottom: 1rem; }
                @media (max-width: 768px) { .static-content { padding: 2rem !important; } }
            `}</style>
        </div>
    );
};

export default PublicationDetail;
