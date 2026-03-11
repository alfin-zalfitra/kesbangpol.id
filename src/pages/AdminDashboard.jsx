import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [newsTitle, setNewsTitle] = useState('');
    const [newsDate, setNewsDate] = useState(new Date().toISOString().split('T')[0]);
    const [newsCategory, setNewsCategory] = useState('Berita');
    const [newsImage, setNewsImage] = useState(null);
    const [newsContent, setNewsContent] = useState('');

    const handleLogout = () => {
        alert('Keluar dari sistem admin...');
        navigate('/login');
    };

    const handleSubmitNews = (e) => {
        e.preventDefault();

        const saveNews = (imageData = '/news1.png') => {
            const newNews = {
                id: Date.now(),
                // Format tanggal ke Indonesia (mis: 5 Mar 2026)
                date: new Date(newsDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }),
                title: newsTitle,
                image: imageData,
                category: newsCategory,
                content: newsContent
            };

            // Ambil berita yang sudah ada
            const existingNews = JSON.parse(localStorage.getItem('news_data') || '[]');

            // Simpan berita baru di paling atas
            localStorage.setItem('news_data', JSON.stringify([newNews, ...existingNews]));

            alert('Berita berhasil dipublikasikan!');

            // Reset form
            setNewsTitle('');
            setNewsContent('');
            setNewsImage(null);
            // Kembali ke halaman utama untuk melihat hasilnya
            // navigate('/'); 
        };

        if (newsImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                saveNews(reader.result);
            };
            reader.readAsDataURL(newsImage);
        } else {
            saveNews();
        }
    };

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f9' }}>
            {/* Sidebar */}
            <aside className="admin-sidebar" style={{
                width: '280px',
                background: 'var(--primary)',
                color: 'white',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh'
            }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '2px' }}>ADMIN PANEL</h2>
                    <p style={{ opacity: 0.6, fontSize: '0.8rem' }}>Kesbangpol Sumbar</p>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <a href="#" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: 'var(--accent)'
                            }}>
                                <span>📋</span> Kelola Berita
                            </a>
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', opacity: 0.7 }}>
                                <span>📅</span> Agenda Kegiatan
                            </a>
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', opacity: 0.7 }}>
                                <span>🖼️</span> Galeri Foto
                            </a>
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', opacity: 0.7 }}>
                                <span>👥</span> Pengguna
                            </a>
                        </li>
                    </ul>
                </nav>

                <button onClick={handleLogout} style={{
                    background: 'rgba(200, 16, 46, 0.2)',
                    border: '1px solid var(--secondary)',
                    color: 'white',
                    padding: '0.8rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}>
                    🚪 Keluar Sistem
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: '280px', padding: '3rem' }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '3rem'
                }}>
                    <div>
                        <h1 style={{ color: 'var(--primary)', fontSize: '1.8rem' }}>Input Berita Baru</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Tambahkan informasi terkini untuk masyarakat.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>Administrator</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--success)' }}>● Online</p>
                        </div>
                        <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#ddd' }}></div>
                    </div>
                </header>

                <div className="admin-card" style={{
                    background: 'white',
                    padding: '2.5rem',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    maxWidth: '800px'
                }}>
                    <form onSubmit={handleSubmitNews}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div className="admin-form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Judul Berita</label>
                                <input
                                    type="text"
                                    value={newsTitle}
                                    onChange={(e) => setNewsTitle(e.target.value)}
                                    placeholder="Masukkan judul berita..."
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        outline: 'none'
                                    }}
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Tanggal Publikasi</label>
                                <input
                                    type="date"
                                    value={newsDate}
                                    onChange={(e) => setNewsDate(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        outline: 'none'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div className="admin-form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Kategori</label>
                                <select
                                    value={newsCategory}
                                    onChange={(e) => setNewsCategory(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        background: 'white',
                                        outline: 'none'
                                    }}
                                >
                                    <option>Berita</option>
                                    <option>Pengumuman</option>
                                    <option>Opini</option>
                                    <option>Event</option>
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Foto Utama</label>
                                <input
                                    type="file"
                                    onChange={(e) => setNewsImage(e.target.files[0])}
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem',
                                        borderRadius: '10px',
                                        border: '1px solid #ddd',
                                        fontSize: '0.8rem'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="admin-form-group" style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Isi Berita</label>
                            <textarea
                                value={newsContent}
                                onChange={(e) => setNewsContent(e.target.value)}
                                placeholder="Tuliskan konten berita di sini..."
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    border: '1px solid #ddd',
                                    outline: 'none',
                                    resize: 'none',
                                    fontFamily: 'inherit'
                                }}
                                required
                            ></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
                                Publikasikan Berita
                            </button>
                            <button type="button" className="btn btn-outline" style={{ padding: '0.8rem 2rem' }}>
                                Simpan Draft
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
