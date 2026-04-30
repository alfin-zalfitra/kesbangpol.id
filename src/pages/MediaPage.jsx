import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import Loader from '../components/Loader';

const MediaPage = () => {
    const { type } = useParams(); // 'foto' or 'video'
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedia = async () => {
            setLoading(true);
            try {
                const endpoint = type === 'foto' ? 'galery-foto' : 'galery-video';
                const response = await fetch(`/api-sumbar/${endpoint}/2765`);
                if (!response.ok) throw new Error('Data tidak ditemukan');
                const result = await response.json();
                setItems(result.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMedia();
    }, [type]);

    if (error) return (
        <ProfileLayout title="Error" subtitle="Informasi">
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>{error}</p>
            </div>
        </ProfileLayout>
    );

    if (loading) return <Loader />;

    const pageTitle = type === 'foto' ? 'Galeri Foto' : 'Galeri Video';

    return (
        <ProfileLayout title={pageTitle} subtitle="Media Center">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {items.length > 0 ? items.map((item, index) => (
                    <div
                        key={item.id || index}
                        style={{
                            background: 'white',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow)',
                            transition: 'var(--transition)'
                        }}
                    >
                        <div style={{ height: '220px', overflow: 'hidden', position: 'relative', background: '#000' }}>
                            {type === 'foto' ? (
                                <img 
                                    src={`https://api-web.sumbarprov.go.id/uploads/${item.gambar}`} 
                                    alt={item.judul} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                    <span style={{ fontSize: '3rem' }}>🎬</span>
                                    <a 
                                        href={item.link_video || '#'} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                                    ></a>
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', color: 'var(--primary)', lineHeight: '1.4' }}>{item.judul}</h3>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.tgl_posting}</span>
                        </div>
                    </div>
                )) : (
                    <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Belum ada media tersedia.</p>
                    </div>
                )}
            </div>
        </ProfileLayout>
    );
};

export default MediaPage;
