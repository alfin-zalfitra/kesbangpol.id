import React, { useState, useEffect } from 'react';
import ProfileLayout from '../components/ProfileLayout';
import Loader from '../components/Loader';

const AnnouncementPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api-sumbar/pengumuman/2765`);
                if (!response.ok) throw new Error('Data tidak ditemukan');
                const result = await response.json();
                setItems(result.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) return <Loader />;
    if (error) return (
        <ProfileLayout title="Error" subtitle="Informasi">
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>{error}</p>
            </div>
        </ProfileLayout>
    );

    return (
        <ProfileLayout title="Pengumuman Bidang" subtitle="Informasi Resmi">
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {items.length > 0 ? items.map((item) => (
                    <div
                        key={item.id_pengumuman || item.id}
                        style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow)',
                            borderLeft: '5px solid var(--secondary)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}
                    >
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>{item.tgl_posting}</span>
                        <h3 style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{item.judul}</h3>
                        <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>{item.isi ? item.isi.replace(/<[^>]*>?/gm, '').substring(0, 300) + '...' : ''}</p>
                        <a 
                            href={item.lampiran ? `https://api-web.sumbarprov.go.id/uploads/${item.lampiran}` : '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ alignSelf: 'flex-start', marginTop: '1rem', color: 'var(--secondary)', fontWeight: '700', textDecoration: 'none' }}
                        >
                            Unduh Lampiran 📥
                        </a>
                    </div>
                )) : (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Belum ada pengumuman terbaru.</p>
                    </div>
                )}
            </div>
        </ProfileLayout>
    );
};

export default AnnouncementPage;
