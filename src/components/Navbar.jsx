import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const navigate = useNavigate();

    const placeholders = [
        "ketik kata kunci disini.....",
        "cari berita terbaru.....",
        "telusuri pengumuman resmi.....",
        "temukan informasi publik....."
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = searchQuery.toLowerCase().trim();

            if (query.includes('visi') || query.includes('misi')) {
                navigate('/profil/visi-misi');
            } else if (query.includes('berita') || query.includes('news')) {
                navigate('/berita-lengkap');
            } else if (query.includes('agenda')) {
                navigate('/agenda-lengkap');
            } else if (query.includes('galeri') || query.includes('foto')) {
                navigate('/galeri-lengkap');
            } else if (query.includes('sambutan')) {
                navigate('/profil/sambutan');
            } else if (query.includes('pegawai')) {
                navigate('/profil/pegawai');
            } else if (query.includes('struktur')) {
                navigate('/profil/struktur');
            } else if (query.includes('tugas') || query.includes('fungsi')) {
                navigate('/profil/tugas-fungsi');
            } else if (query.includes('unit') || query.includes('kerja')) {
                navigate('/profil/unit-kerja');
            } else if (query.includes('login') || query.includes('admin')) {
                navigate('/login');
            } else if (query.includes('home') || query.includes('beranda')) {
                navigate('/');
            } else {
                // Default action: maybe go to home or show an alert
                alert('Pencarian untuk: ' + query);
            }
            setSearchQuery('');
        }
    };

    return (
        <nav className={scrolled ? 'scrolled' : ''}>
            <div className="container nav-container">
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                    <img
                        src="/logo.jpg"
                        alt="Logo Sumbar"
                        style={{
                            height: '60px',
                            width: 'auto',
                            objectFit: 'contain'
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                        <span style={{
                            fontSize: '1.15rem',
                            fontWeight: '800',
                            color: '#1a2540',
                            whiteSpace: 'nowrap'
                        }}>Badan Kesbangpol</span>
                        <span style={{
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: 'var(--secondary)',
                            whiteSpace: 'nowrap'
                        }}>Provinsi Sumatera Barat</span>
                    </div>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/" className="active">Beranda</Link></li>
                    <li className="dropdown">
                        <Link to="/profil" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Profil <span style={{ fontSize: '0.7rem' }}>▼</span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/profil/sambutan">Kata Sambutan</Link></li>
                            <li><Link to="/profil/visi-misi">Visi dan Misi</Link></li>
                            <li className="submenu">
                                <Link to="/profil/unit-kerja" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Unit Kerja <span>▶</span>
                                </Link>
                                <ul className="submenu-list">
                                    <li><Link to="/profil/unit-kerja/ideologi">Ideologi, Wawasan Kebangsaan, Ketahanan Ekonomi Sosial Budaya dan Agama</Link></li>
                                    <li><Link to="/profil/unit-kerja/politik">Politik Dalam Negeri dan Ormas</Link></li>
                                    <li><Link to="/profil/unit-kerja/kewaspadaan">Kewaspadaan Nasional dan Penanganan Konflik</Link></li>
                                    <li><Link to="/profil/unit-kerja/sekretariat">Sekretariat</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/profil/tugas-fungsi">Tugas dan Fungsi</Link></li>
                            <li><Link to="/profil/pegawai">Daftar Pegawai</Link></li>
                            <li><Link to="/profil/struktur">Struktur Organisasi</Link></li>
                        </ul>
                    </li>
                    <li><a href="/#berita">Berita</a></li>
                    <li><a href="/#agenda">Agenda</a></li>
                    <li><a href="/#galeri">Galeri</a></li>
                    <li><a href="/#publik">Info Publik</a></li>
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="search-box" style={{
                        background: 'var(--surface)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #e6e9f0',
                        minWidth: '220px'
                    }}>
                        <span style={{ fontSize: '0.9rem' }}>🔍</span>
                        <input
                            type="text"
                            placeholder={placeholders[placeholderIndex]}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                marginLeft: '0.5rem',
                                outline: 'none',
                                fontSize: '0.85rem',
                                width: '100%',
                                transition: 'all 0.5s ease'
                            }}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
