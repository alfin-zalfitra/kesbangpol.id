import React from 'react';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { useReveal } from '../hooks/useReveal';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const [headerRef, headerRevealed] = useReveal();
    const [contentRef, contentRevealed] = useReveal();

    const [activeSubMenu, setActiveSubMenu] = React.useState(null);

    const menuItems = [
        {
            title: "Kata Sambutan",
            description: "Pesan dan harapan dari pimpinan Badan Kesbangpol.",
            icon: "👤",
            path: "/profil/sambutan"
        },
        {
            title: "Visi dan Misi",
            description: "Cita-cita dan langkah strategis lembaga kami.",
            icon: "🎯",
            path: "/profil/visi-misi"
        },
        {
            title: "Unit Kerja",
            description: "Struktur pembagian kerja di lingkungan Kesbangpol.",
            icon: "🏢",
            path: "/profil/unit-kerja",
            subItems: [
                { title: "Ideologi, Wawasan Kebangsaan, ketahanan ekonomi sosial budaya dan agama", path: "/profil/unit-kerja/ideologi" },
                { title: "Politik dalam negeri dan ormas", path: "/profil/unit-kerja/politik" },
                { title: "Kewaspadaan nasional dan penanganan konflik", path: "/profil/unit-kerja/kewaspadaan" },
                { title: "Sekretariat", path: "/profil/unit-kerja/sekretariat" }
            ]
        },
        {
            title: "Tugas dan Fungsi",
            description: "Penjabaran tugas pokok dan fungsi organisasi.",
            icon: "📋",
            path: "/profil/tugas-fungsi"
        },
        {
            title: "Daftar Pegawai",
            description: "Informasi sumber daya manusia yang kami miliki.",
            icon: "👥",
            path: "/profil/pegawai"
        },
        {
            title: "Struktur Organisasi",
            description: "Bagan susunan kepemimpinan dan departemen.",
            icon: "📊",
            path: "/profil/struktur"
        }
    ];

    return (
        <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            {/* Header Section */}
            <div
                ref={headerRef}
                className={`animate-up ${headerRevealed ? 'revealed' : ''}`}
                style={{
                    padding: '8rem 0 4rem',
                    background: 'linear-gradient(135deg, var(--primary) 0%, #1a3a5c 100%)',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <div className="container">
                    <span style={{
                        color: 'var(--accent)',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.875rem'
                    }}>Informasi Lembaga</span>
                    <h1 style={{ fontSize: '3.5rem', marginTop: '1rem' }}>Profil Badan Kesbangpol</h1>
                    <p style={{ maxWidth: '700px', margin: '1.5rem auto', opacity: '0.9', fontSize: '1.1rem' }}>
                        Kenali lebih jauh tentang struktur, visi, misi, dan tim yang bekerja di balik Badan Kesatuan Bangsa dan Politik Provinsi Sumatera Barat.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section
                ref={contentRef}
                className={`section animate-up ${contentRevealed ? 'revealed' : ''}`}
                style={{ marginTop: '-4rem' }}
            >
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem'
                    }}>
                        {menuItems.map((item, index) => {
                            const isSubMenuOpen = activeSubMenu === index;
                            const CardWrapper = item.subItems ? 'div' : Link;

                            return (
                                <CardWrapper
                                    to={!item.subItems ? item.path : undefined}
                                    key={index}
                                    className="glass"
                                    style={{
                                        padding: '2.5rem',
                                        borderRadius: '24px',
                                        transition: 'var(--transition)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                        textDecoration: 'none',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        boxShadow: 'var(--shadow)',
                                        position: 'relative',
                                        zIndex: isSubMenuOpen ? 100 : 1,
                                        cursor: 'pointer',
                                        background: 'white'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-10px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                        e.currentTarget.style.borderColor = 'var(--secondary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow)';
                                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                                        if (!item.subItems) setActiveSubMenu(null);
                                    }}
                                    onClick={() => {
                                        if (item.subItems) {
                                            setActiveSubMenu(isSubMenuOpen ? null : index);
                                        }
                                    }}
                                >
                                    <div style={{
                                        fontSize: '2.5rem',
                                        width: '60px',
                                        height: '60px',
                                        background: 'var(--surface)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '16px',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.description}</p>

                                    <div style={{
                                        marginTop: 'auto',
                                        color: 'var(--secondary)',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            Lihat Detail <span style={{
                                                transition: 'transform 0.3s ease',
                                                transform: isSubMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                                display: 'inline-block'
                                            }}>→</span>
                                        </div>
                                    </div>

                                    {/* Submenu Dropdown */}
                                    {item.subItems && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: '0',
                                            right: '0',
                                            background: 'white',
                                            borderRadius: '16px',
                                            boxShadow: 'var(--shadow-lg)',
                                            padding: '1rem',
                                            zIndex: 10,
                                            marginTop: '0.5rem',
                                            display: isSubMenuOpen ? 'flex' : 'none',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            border: '1px solid rgba(0,0,0,0.05)',
                                            animation: 'fadeInUp 0.3s ease-out'
                                        }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {item.subItems.map((sub, sIndex) => (
                                                <Link
                                                    key={sIndex}
                                                    to={sub.path}
                                                    style={{
                                                        padding: '0.75rem 1rem',
                                                        borderRadius: '8px',
                                                        color: 'var(--text-main)',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '500',
                                                        transition: 'var(--transition)',
                                                        display: 'block',
                                                        background: 'transparent',
                                                        textDecoration: 'none'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = 'var(--surface)';
                                                        e.currentTarget.style.color = 'var(--secondary)';
                                                        e.currentTarget.style.paddingLeft = '1.25rem';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.color = 'var(--text-main)';
                                                        e.currentTarget.style.paddingLeft = '1rem';
                                                    }}
                                                >
                                                    {sub.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </CardWrapper>
                            );
                        })}
                    </div>
                </div>

            </section>

            <Footer />
        </div>
    );
};

export default ProfilePage;
