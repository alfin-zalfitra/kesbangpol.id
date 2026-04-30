import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const GalleryDetail = () => {
    const { slug } = useParams();
    const [album, setAlbum] = useState(null);
    const [allAlbums, setAllAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGalleryDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api-sumbar/galery-foto/2765');
                if (!response.ok) throw new Error('Data tidak ditemukan');
                const result = await response.json();
                
                const data = Array.isArray(result.data) ? result.data : [result.data];
                setAllAlbums(data);

                const found = data.find(item => item.slug === slug || item.id === slug || item.id == slug);
                if (found) {
                    setAlbum(found);
                } else {
                    throw new Error('Album tidak ditemukan');
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryDetail();
        window.scrollTo(0, 0);
    }, [slug]);

    const getImageUrl = (path) => {
        if (!path) return '/gallery1.png';
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

    if (error || !album) return (
        <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
            <TopBar /><Navbar />
            <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>⚠️ Ops!</h1>
                <p>{error || 'Album tidak ditemukan'}</p>
                <Link to="/galeri" className="btn btn-primary" style={{ marginTop: '2rem' }}>Kembali ke Galeri</Link>
            </div>
            <Footer />
        </div>
    );

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <TopBar /><Navbar />

            {/* Header Section */}
            <div style={{ background: 'white', padding: '4rem 0 3rem', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '1rem' }}>
                        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                        <Link to="/galeri" style={{ color: '#94a3b8' }}>Galeri</Link> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>Detail Album</span>
                    </div>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: '1.1', maxWidth: '1000px', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                        {album.title || album.judul}
                    </h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>
                        <span style={{ color: 'var(--secondary)', fontWeight: '800' }}>#GaleriFoto</span>
                        <span>📅 {album.created_at || album.tgl_posting}</span>
                        <span>👤 Oleh: <span style={{ color: 'var(--primary)' }}>{album.created_by || 'Admin'}</span></span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem' }} className="gallery-detail-grid">
                    <div>
                        <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '3rem' }}>
                            <img 
                                src={getImageUrl(album.gambar || album.image)} 
                                alt={album.title || album.judul} 
                                style={{ width: '100%', display: 'block' }} 
                                onError={(e) => { e.target.src = '/gallery1.png' }}
                            />
                        </div>

                        <div 
                            style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#334155', fontFamily: 'serif' }}
                            dangerouslySetInnerHTML={{ __html: album.content || album.isi || '<p>Keterangan album tidak tersedia.</p>' }}
                        />

                        {/* If there are more photos (assuming API might have them) */}
                        {album.photos && Array.isArray(album.photos) && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '3rem' }}>
                                {album.photos.map((p, i) => (
                                    <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
                                        <img src={getImageUrl(p)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Photo ${i}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <h4 style={{ borderLeft: '4px solid var(--secondary)', paddingLeft: '1rem', marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: '800' }}>Album Lainnya</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {allAlbums.filter(n => (n.slug || n.id) !== slug).slice(0, 5).map((item, idx) => (
                                <Link key={idx} to={`/galeri-detail/${item.slug || item.id}`} style={{ display: 'flex', gap: '1rem', textDecoration: 'none' }} className="side-album-link">
                                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1px solid #f1f5f9' }}>
                                        <img 
                                            src={getImageUrl(item.gambar || item.image)} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                            onError={(e) => { e.target.src = '/gallery1.png' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h5 style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', lineHeight: '1.4' }} className="altitle">{item.title || item.judul}</h5>
                                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.created_at || item.tgl_posting}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
            <style>{`
                .side-album-link:hover .altitle { color: var(--secondary) !important; }
                @media (max-width: 992px) { .gallery-detail-grid { grid-template-columns: 1fr !important; } aside { position: static !important; margin-top: 4rem; } }
            `}</style>
        </div>
    );
};

export default GalleryDetail;
