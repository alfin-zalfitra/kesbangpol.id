import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import Loader from '../components/Loader';

const ID_INSTANSI = 38;

const PPIDDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            setError(null);
            window.scrollTo(0, 0);
            try {
                const response = await fetch(`/api-ppid/detaildip?id_instansi=${ID_INSTANSI}&id_content=${id}`);
                if (!response.ok) throw new Error('Gagal memuat data dokumen.');
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error(err);
                setError('Dokumen tidak dapat dimuat. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetail();
    }, [id]);

    if (loading) return <Loader />;

    if (error || !data) return (
        <ProfileLayout title="Detail Dokumen" subtitle="PPID Kesbangpol" theme="light">
            <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
                <i className="fas fa-exclamation-triangle" style={{ fontSize: '4rem', color: '#f59e0b', marginBottom: '1.5rem' }}></i>
                <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{error || 'Dokumen tidak ditemukan.'}</h2>
                <button onClick={() => navigate(-1)} style={{
                    background: 'var(--primary)', color: 'white', border: 'none',
                    padding: '0.9rem 2rem', borderRadius: '12px', cursor: 'pointer',
                    fontWeight: '700', fontSize: '1rem'
                }}>
                    <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i> Kembali
                </button>
            </div>
        </ProfileLayout>
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const metaItems = [
        { icon: 'fas fa-tag', label: 'Kategori', value: data.title_category },
        { icon: 'fas fa-list-ul', label: 'Sub Kategori', value: data.title_sub_category },
        { icon: 'fas fa-user-tie', label: 'Penanggung Jawab', value: data.penanggung_jawab },
        { icon: 'fas fa-calendar-check', label: 'Waktu & Tempat', value: data.tgl_dan_tempat },
        { icon: 'fas fa-hourglass-half', label: 'Jangka Waktu', value: data.jangka_waktu },
        { icon: 'fas fa-calendar-alt', label: 'Tanggal Unggah', value: formatDate(data.created) },
        { icon: 'fas fa-eye', label: 'Jumlah Dilihat', value: `${data.hits || 0}x` },
        { icon: 'fas fa-check-circle', label: 'Status', value: data.nm_status || 'Publish' },
    ];

    return (
        <ProfileLayout title="Detail Informasi Publik" subtitle="PPID Kesbangpol Provinsi Sumatera Barat" theme="light">
            {/* Breadcrumb */}
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '2rem' }}>
                <Link to="/" style={{ color: '#94a3b8' }}>Home</Link> <span>/</span>
                <Link to="/ppid" style={{ color: '#94a3b8' }}>PPID</Link> <span>/</span>
                <span style={{ color: 'var(--secondary)' }}>Detail Dokumen</span>
            </div>

            {/* Title */}
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', lineHeight: '1.3', marginBottom: '2.5rem', maxWidth: '800px' }}>
                {data.title_content}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>

                {/* Left: Metadata Table */}
                <div>
                    <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', overflow: 'hidden', marginBottom: '2rem' }}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(7,29,51,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                <i className="fas fa-info-circle"></i>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: 'var(--primary)' }}>Informasi Dokumen</h3>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                {metaItems.map((item, i) => item.value ? (
                                    <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                                        <td style={{ padding: '1rem 2rem', width: '38%', color: '#64748b', fontSize: '0.85rem', fontWeight: '600', verticalAlign: 'top' }}>
                                            <i className={item.icon} style={{ color: 'var(--secondary)', marginRight: '8px', width: '14px' }}></i>
                                            {item.label}
                                        </td>
                                        <td style={{ padding: '1rem 2rem', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '700', lineHeight: '1.5' }}>
                                            {item.value}
                                        </td>
                                    </tr>
                                ) : null)}
                            </tbody>
                        </table>
                    </div>

                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        style={{ background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', padding: '0.8rem 1.8rem', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#f8fafc'; }}
                    >
                        <i className="fas fa-arrow-left"></i> Kembali ke Daftar
                    </button>
                </div>

                {/* Right: Download Card */}
                <div style={{ position: 'sticky', top: '100px' }}>
                    <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                        <div style={{ background: 'var(--primary)', padding: '2rem', textAlign: 'center' }}>
                            <div style={{ width: '65px', height: '65px', background: 'rgba(255,255,255,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                                <i className="fas fa-file-pdf" style={{ fontSize: '2.2rem', color: 'white' }}></i>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.85rem', fontWeight: '600', lineHeight: '1.4' }}>
                                {data.images ? data.images.split('/').pop() : 'Dokumen PPID'}
                            </p>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            {data.downloads ? (
                                <>
                                    <a
                                        href={data.downloads}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: 'block', width: '100%', background: 'var(--secondary)', color: 'white', textDecoration: 'none', padding: '1rem', borderRadius: '12px', textAlign: 'center', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.75rem', transition: 'opacity 0.3s', boxSizing: 'border-box' }}
                                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
                                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                                    >
                                        <i className="fas fa-download" style={{ marginRight: '8px' }}></i>Unduh Dokumen
                                    </a>
                                    {data.downloads1 && (
                                        <a
                                            href={data.downloads1}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: 'block', width: '100%', background: '#f8fafc', color: 'var(--primary)', textDecoration: 'none', padding: '0.9rem', borderRadius: '12px', textAlign: 'center', fontWeight: '700', fontSize: '0.9rem', border: '1px solid #e2e8f0', transition: 'all 0.3s', boxSizing: 'border-box' }}
                                            onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'}
                                            onMouseOut={(e) => e.currentTarget.style.background = '#f8fafc'}
                                        >
                                            <i className="fas fa-eye" style={{ marginRight: '8px' }}></i>Pratinjau Online
                                        </a>
                                    )}
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#94a3b8' }}>
                                    <i className="fas fa-lock" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}></i>
                                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600' }}>Dokumen ini tidak tersedia untuk diunduh.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </ProfileLayout>
    );
};

export default PPIDDetail;
