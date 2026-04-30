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
                navigate('/berita');
            } else if (query.includes('pengumuman')) {
                navigate('/pengumuman');
            } else if (query.includes('foto') || query.includes('gambar')) {
                navigate('/media/foto');
            } else if (query.includes('video')) {
                navigate('/media/video');
            } else if (query.includes('tugas') || query.includes('fungsi')) {
                navigate('/profil/tugas-fungsi');
            } else if (query.includes('struktur')) {
                navigate('/profil/struktur');
            } else if (query.includes('kontak') || query.includes('alamat')) {
                navigate('/kontak');
            } else if (query.includes('login') || query.includes('admin')) {
                navigate('/login');
            } else if (query.includes('home') || query.includes('beranda')) {
                navigate('/');
            } else {
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
                        <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Profil <span className="dropdown-arrow" style={{ fontSize: '0.7rem' }}>▼</span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/profil/visi-misi">Visi dan Misi</Link></li>
                            <li><Link to="/profil/tugas-fungsi">Tugas dan Fungsi</Link></li>
                            <li><Link to="/profil/struktur">Struktur Organisasi</Link></li>
                            <li><Link to="/profil/lhkpn">LHKPN</Link></li>
                            <li><Link to="/profil/sejarah">Sejarah Singkat</Link></li>
                            <li><Link to="/profil/pejabat">Profil Pejabat</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <Link to="/ppid" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            PPID <span className="dropdown-arrow" style={{ fontSize: '0.7rem' }}>▼</span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/ppid">Daftar Informasi Publik (DIP)</Link></li>
                            <li className="submenu">
                                <Link to="#" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    Kategori Informasi <span style={{ fontSize: '0.6rem' }}>▶</span>
                                </Link>
                                <ul className="submenu-list">
                                    <li><Link to="/ppid/category/3">Informasi Berkala</Link></li>
                                    <li><Link to="/ppid/category/1">Informasi Serta Merta</Link></li>
                                    <li><Link to="/ppid/category/2">Informasi Setiap Saat</Link></li>
                                    <li><Link to="/ppid/category/6">Informasi Dikecualikan</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Informasi <span className="dropdown-arrow" style={{ fontSize: '0.7rem' }}>▼</span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/publikasi/download">Unduh Data</Link></li>
                            <li><Link to="/publikasi/infografis">Infografis</Link></li>
                            <li><Link to="/publikasi/sop">SOP</Link></li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Perencanaan <span className="dropdown-arrow" style={{ fontSize: '0.7rem' }}>▼</span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/publikasi/rencana-strategis">Rencana Strategis</Link></li>
                            <li><Link to="/publikasi/rencana-kerja">Rencana Kerja</Link></li>
                            <li><Link to="/publikasi/rencana-kinerja-tahunan">Rencana Tahunan</Link></li>
                            <li><Link to="/publikasi/iku">IKU</Link></li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Kinerja <span className="dropdown-arrow" style={{ fontSize: '0.7rem' }}>▼</span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/publikasi/laporan-kinerja-instansi-pemerintah">Laporan Kinerja</Link></li>
                            <li><Link to="/publikasi/perjanjian-kinerja">Perjanjian Kinerja</Link></li>
                            <li><Link to="/publikasi/renaksi-dan-realisasi-renaksi">Renaksi & Realisasi</Link></li>
                            <li><Link to="/publikasi/skp">SKP</Link></li>
                            <li><Link to="/publikasi/indikator-kinerja-individu">IKI</Link></li>
                        </ul>
                    </li>

                    <li className="dropdown">
                        <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Kategori <span className="dropdown-arrow" style={{ fontSize: '0.7rem' }}>▼</span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/berita">Berita</Link></li>
                            <li><Link to="/galeri">Foto</Link></li>
                            <li><Link to="/video">Video</Link></li>
                            <li><Link to="/pengumuman">Pengumuman</Link></li>
                        </ul>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
