import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import Loader from '../components/Loader';

const CategoryPage = () => {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api-sumbar/category/${category}/2765`);
                if (!response.ok) throw new Error('Data tidak ditemukan');
                const result = await response.json();
                
                setData(result.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const setData = (data) => {
            const mapped = data.map(item => ({
                id: item.id_konten || item.id,
                title: item.judul,
                date: item.tgl_posting || item.created_at,
                image: item.gambar ? `https://api-web.sumbarprov.go.id/uploads/${item.gambar}` : '/news1.png',
                desc: item.isi ? item.isi.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''
            }));
            setItems(mapped);
        };

        fetchCategory();
    }, [category]);

    if (error) return (
        <ProfileLayout title="Error" subtitle="Informasi">
            <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--surface)', borderRadius: '24px' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>⚠️</span>
                <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', fontWeight: '600' }}>{error}</p>
            </div>
        </ProfileLayout>
    );

    const pageTitle = category ? category.replace(/-/g, ' ').toUpperCase() : 'KATEGORI';

    return (
        <ProfileLayout title={pageTitle} subtitle="Konten Informasi Publik">
            <div style={{ minHeight: '300px', position: 'relative' }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5rem' }}>
                        <div className="premium-loader"></div>
                    </div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                        gap: '2rem',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        {items.length > 0 ? items.map((item) => (
                            <Link
                                key={item.id}
                                to={`/detail/${category}/${item.id}`}
                                className="category-item-card"
                                style={{
                                    background: 'white',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow)',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    transition: 'var(--transition)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <div style={{ 
                                        position: 'absolute', 
                                        inset: '0', 
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)', 
                                        zIndex: '1' 
                                    }}></div>
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="category-card-img"
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }} 
                                    />
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        left: '1rem',
                                        zIndex: '2',
                                        background: 'var(--secondary)',
                                        color: 'white',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700'
                                    }}>
                                        {item.date}
                                    </span>
                                </div>
                                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                                    <h3 style={{ 
                                        fontSize: '1.2rem', 
                                        margin: '0 0 1rem 0', 
                                        color: 'var(--primary)', 
                                        lineHeight: '1.5',
                                        fontWeight: '800'
                                    }}>{item.title}</h3>
                                    <p style={{ 
                                        fontSize: '0.9rem', 
                                        color: 'var(--text-muted)', 
                                        lineHeight: '1.6', 
                                        marginBottom: '1.5rem',
                                        flexGrow: '1'
                                    }}>{item.desc}</p>
                                    
                                    <div style={{ 
                                        marginTop: 'auto', 
                                        color: 'var(--primary)', 
                                        fontWeight: '800', 
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }} className="read-more-link">
                                        Baca Selengkapnya <span className="arrow-icon">→</span>
                                    </div>
                                </div>
                            </Link>
                        )) : (
                            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem', background: 'var(--surface)', borderRadius: '24px' }}>
                                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📄</span>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Belum ada konten untuk kategori ini.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                .premium-loader {
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(200, 16, 46, 0.1);
                    border-top: 3px solid var(--secondary);
                    border-radius: 50%;
                    animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .category-item-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-lg);
                    border-color: rgba(200, 16, 46, 0.2);
                }
                .category-item-card:hover .category-card-img {
                    transform: scale(1.05);
                }
                .read-more-link .arrow-icon {
                    transition: transform 0.3s ease;
                }
                .category-item-card:hover .read-more-link .arrow-icon {
                    transform: translateX(5px);
                    color: var(--secondary);
                }
                .category-item-card:hover .read-more-link {
                    color: var(--secondary);
                }
            `}</style>
        </ProfileLayout>
    );
};

export default CategoryPage;
