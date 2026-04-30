import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const NewsDetail = () => {
    const { slug } = useParams();
    const [news, setNews] = useState(null);
    const [recentNews, setRecentNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api-sumbar/category/berita-utama/2765');
                if (!response.ok) throw new Error('Data tidak ditemukan');
                const result = await response.json();
                
                const allNews = Array.isArray(result.data) ? result.data : (result.data ? [result.data] : []);
                
                if (allNews.length > 0) {
                    setRecentNews(allNews.slice(0, 5));
                    const foundNews = allNews.find(item => (item.slug === slug || item.id === slug || item.id == slug));
                    if (foundNews) {
                        setNews(foundNews);
                    } else {
                        throw new Error('Berita tidak ditemukan');
                    }
                } else {
                    throw new Error('Tidak ada berita tersedia');
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
        window.scrollTo(0, 0);
    }, [slug]);

    const getImageUrl = (path) => {
        if (!path) return '/news1.png';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/api')) return path.replace('/api', '/api-sumbar');
        return `https://api-web.sumbarprov.go.id${path}`;
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = news?.title;
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`
        };
        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            alert('Tautan berhasil disalin!');
        }
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

    if (error || !news) return (
        <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
            <TopBar /><Navbar />
            <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>⚠️ Ops!</h1>
                <p>{error || 'Berita tidak ditemukan'}</p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Kembali ke Beranda</Link>
            </div>
            <Footer />
        </div>
    );

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            {/* 1. White Top Section */}
            <div style={{ backgroundColor: '#ffffff', paddingTop: '4rem', paddingBottom: '3rem', color: 'var(--primary)', borderBottom: '1px solid #f1f5f9' }}>
                <div className="container">
                    {/* Breadcrumb */}
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '1.25rem' }}>
                        <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                        <Link to="/berita" style={{ color: '#94a3b8' }}>Berita</Link> <span>/</span>
                        <span style={{ color: 'var(--secondary)' }}>Detail Berita</span>
                    </div>

                    <h1 style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: '1.1', maxWidth: '1000px', color: 'var(--primary)', marginBottom: '1.5rem' }}>{news.title}</h1>

                    {/* Meta Info */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>
                        <span style={{ color: 'var(--secondary)', fontWeight: '800' }}>#{news.category || 'Berita Utama'}</span>
                        <span>📅 {news.created_at || news.tgl_posting}</span>
                        <span>👤 Oleh: <span style={{ color: 'var(--primary)' }}>{news.created_by || 'Admin'}</span></span>
                    </div>

                    {/* Share Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Bagikan Artikel:</span>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button onClick={() => handleShare('facebook')} className="share-icon fb" title="Bagikan ke Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </button>
                            <button onClick={() => handleShare('whatsapp')} className="share-icon wa" title="Bagikan ke WhatsApp">
                                <i className="fab fa-whatsapp"></i>
                            </button>
                            <button onClick={() => handleShare('copy')} className="share-icon copy" title="Salin Link">
                                <i className="fas fa-link"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Content */}
            <div className="container" style={{ padding: '4rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem' }} className="detail-grid">
                    
                    {/* Left: Article Content */}
                    <div>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
                            <img 
                                src={getImageUrl(news.gambar)} 
                                alt={news.title} 
                                style={{ width: '100%', display: 'block' }} 
                                onError={(e) => { e.target.src = '/news1.png' }}
                            />
                            {news.keterangan_gambar && <div style={{ background: '#f1f5f9', padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>Dok: {news.keterangan_gambar}</div>}
                        </div>

                        <div 
                            style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#334155', fontFamily: 'serif' }}
                            dangerouslySetInnerHTML={{ __html: news.content || news.isi }}
                        />

                        <div style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                            <strong>Editor:</strong> Tim Media Kesbangpol
                        </div>
                    </div>

                    {/* Right: Sidebar */}
                    <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                        <h4 style={{ borderLeft: '4px solid var(--secondary)', paddingLeft: '1rem', marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: '800' }}>Berita Terkait</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {recentNews.filter(n => (n.slug || n.id) !== slug).slice(0, 5).map((item, idx) => (
                                <Link key={idx} to={`/berita-detail/${item.slug || item.id}`} style={{ display: 'flex', gap: '1rem', textDecoration: 'none' }} className="related-link">
                                    <img 
                                        src={getImageUrl(item.gambar)} 
                                        style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} 
                                        onError={(e) => { e.target.src = '/news1.png' }}
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h5 style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', lineHeight: '1.4' }} className="rtitle">{item.title}</h5>
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
                .detail-grid { grid-template-columns: 1fr 350px; gap: 4rem; }
                .share-icon { 
                    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
                    border-radius: 50%; color: white; border: none; cursor: pointer; transition: all 0.3s ease;
                    font-size: 0.9rem;
                }
                .share-icon:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
                .share-icon.fb { background: #1877f2; }
                .share-icon.wa { background: #25d366; }
                .share-icon.copy { background: #f1f5f9; color: var(--primary); border: 1px solid #e2e8f0; }
                .related-link:hover .rtitle { color: var(--secondary) !important; }
                @media (max-width: 992px) { .detail-grid { grid-template-columns: 1fr !important; } aside { position: static !important; margin-top: 4rem; } }
            `}</style>
        </div>
    );
};

export default NewsDetail;
