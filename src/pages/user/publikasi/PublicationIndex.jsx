import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const PublicationIndex = () => {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPublications = async () => {
            if (!category) return;
            setLoading(true);
            try {
                const response = await fetch(`/api-sumbar/category/${category}/2765`);
                if (!response.ok) throw new Error('Gagal mengambil data publikasi');
                const result = await response.json();

                if (result && result.data) {
                    const data = Array.isArray(result.data) ? result.data : [result.data];
                    setItems(data);
                } else {
                    setItems([]);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
        window.scrollTo(0, 0);
    }, [category]);

    const formatTitle = (slug) => {
        if (!slug) return 'Publikasi';
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const getImageUrl = (path) => {
        if (!path) return '/news1.png';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/api')) return path.replace('/api', '/api-sumbar');
        return `https://api-web.sumbarprov.go.id${path}`;
    };

    const filteredItems = items.filter(item =>
        (item.title || item.judul || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            {/* Header Section */}
            <div style={{ background: 'white', padding: '4rem 0 3rem', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '1rem' }}>
                        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>Publikasi</span> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>{formatTitle(category)}</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                        {formatTitle(category)}
                    </h1>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', maxWidth: '500px' }}>
                        <input
                            type="text"
                            placeholder="Cari dokumen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1.5rem',
                                paddingLeft: '3rem',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            className="search-input"
                        />
                        <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>🔍</span>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="container" style={{ padding: '4rem 0' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                        <div className="premium-loader"></div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {filteredItems.length > 0 ? filteredItems.map((item, index) => (
                            <div
                                key={item.id || index}
                                style={{
                                    background: 'white',
                                    borderRadius: '24px',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid #f1f5f9',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                className="doc-card"
                            >
                                <div style={{
                                    width: '50px', height: '50px', background: 'rgba(200, 16, 46, 0.05)',
                                    borderRadius: '12px', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem'
                                }}>
                                    📄
                                </div>
                                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', fontWeight: '800', lineHeight: '1.5', marginBottom: '1rem', height: '3.5rem', overflow: 'hidden' }}>
                                    {item.title || item.judul}
                                </h3>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '2rem' }}>
                                    📅 {item.created_at || item.tgl_posting}
                                </div>
                                <Link
                                    to={`/publikasi-detail/${category}/${item.slug || item.id}`}
                                    className="btn-download"
                                    style={{
                                        marginTop: 'auto',
                                        padding: '0.8rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        )) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '30px', border: '1px dashed #e2e8f0' }}>
                                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📂</span>
                                <p style={{ color: '#64748b', fontWeight: '600' }}>Tidak ada dokumen ditemukan.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />

            <style>{`
                .premium-loader { width: 50px; height: 50px; border: 3px solid rgba(200, 16, 46, 0.1); border-top: 3px solid var(--secondary); border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                
                .search-input:focus {
                    border-color: var(--secondary) !important;
                    box-shadow: 0 0 0 4px rgba(200, 16, 46, 0.05);
                }

                .doc-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    border-color: var(--secondary);
                }
                
                .btn-download:hover {
                    background: var(--secondary);
                    transform: scale(1.02);
                }
                @media (max-width: 768px) {
                    .container { padding: 0 1rem; }
                }
            `}</style>
        </div>
    );
};

export default PublicationIndex;
