import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="kontak" style={{
            background: '#071d33',
            color: 'white',
            padding: '8rem 0 0',
            position: 'relative',
            marginTop: '0',
            overflow: 'hidden'
        }}>
            {/* Perfectly Aligned Clean Wave Divider */}
            <div style={{
                position: 'absolute',
                top: -1,
                left: 0,
                width: '100%',
                lineHeight: 0,
                zIndex: 1,
                transform: 'rotate(180deg)'
            }}>
                <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
                    <path fill="#ffffff" d="M0,64L1440,32L1440,120L0,120Z"></path>
                </svg>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                {/* Top Section: Brand & Contact */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    marginBottom: '4rem',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    paddingBottom: '4rem'
                }}>
                    <div className="footer-column">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            <img src="/sumatrabarat.png" alt="Logo" style={{ width: '45px', height: 'auto' }} />
                            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1.25rem' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px', margin: 0, color: 'white' }}>KESBANGPOL</h2>
                                <p style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Sumatera Barat</p>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', lineHeight: '1.8', opacity: 0.6, marginBottom: '2rem' }}>
                            Mewujudkan stabilitas nasional yang kondusif di daerah melalui peningkatan kesadaran berbangsa dan bernegara bagi seluruh masyarakat.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" className="soc-btn"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="soc-btn"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="soc-btn"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-title">Jam Layanan</h4>
                        <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', opacity: 0.6, lineHeight: '1.6' }}>
                            <div style={{ marginBottom: '0.5rem' }}>Senin - Kamis: <strong style={{ color: 'white', opacity: 0.9 }}>07:30 - 16:00</strong></div>
                            <div>Jumat: <strong style={{ color: 'white', opacity: 0.9 }}>07:30 - 16:30</strong></div>
                        </div>
                        <h4 className="footer-title" style={{ marginTop: '2rem' }}>Kontak</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <i className="fas fa-phone-alt" style={{ color: 'var(--secondary)', fontSize: '0.8rem' }}></i>
                                <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>(0751) 31554</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <i className="fas fa-envelope" style={{ color: 'var(--secondary)', fontSize: '0.8rem' }}></i>
                                <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>kesbangpol@sumbarprov.go.id</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-title">Lokasi Kantor</h4>
                        <div style={{ 
                            borderRadius: '12px', 
                            overflow: 'hidden', 
                            height: '160px', 
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2903957864132!2d100.35765537496512!3d-0.9320769990589093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b928a38f8a51%3A0x63bf4279bb2e30d5!2sBadan%20Kesatuan%20Bangsa%20dan%20Politik%20Provinsi%20Sumatera%20Barat!5e0!3m2!1sid!2sid!4v1777558593981!5m2!1sid!2sid" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy"
                                title="Map Lokasi"
                            ></iframe>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '4px' }}></i>
                            <span style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: '1.5' }}>
                                Jl. Kuini No.79A, Ujung Gurun, Kec. Padang Bar., Kota Padang, Sumatera Barat.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Sitemap Section: Full Navbar Structure */}
                <div style={{ marginBottom: '3rem' }}>
                    <h4 className="footer-title">Sitemap</h4>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '3rem',
                    paddingBottom: '4rem'
                }}>
                    <div className="sitemap-col">
                        <h4 className="sitemap-title">Profil</h4>
                        <div className="sitemap-links">
                            <Link to="/profil/visi-misi">Visi dan Misi</Link>
                            <Link to="/profil/tugas-fungsi">Tugas dan Fungsi</Link>
                            <Link to="/profil/struktur">Struktur Organisasi</Link>
                            <Link to="/profil/lhkpn">LHKPN</Link>
                            <Link to="/profil/sejarah">Sejarah Singkat</Link>
                            <Link to="/profil/pejabat">Profil Pejabat</Link>
                        </div>
                    </div>

                    <div className="sitemap-col">
                        <h4 className="sitemap-title">Publikasi</h4>
                        <div className="sitemap-links">
                            <Link to="/publikasi/download">Unduh Data</Link>
                            <Link to="/publikasi/infografis">Infografis</Link>
                            <Link to="/publikasi/sop">SOP</Link>
                            <Link to="/ppid">Informasi Publik (PPID)</Link>
                        </div>
                    </div>

                    <div className="sitemap-col">
                        <h4 className="sitemap-title">Perencanaan</h4>
                        <div className="sitemap-links">
                            <Link to="/publikasi/rencana-strategis">Rencana Strategis</Link>
                            <Link to="/publikasi/rencana-kerja">Rencana Kerja</Link>
                            <Link to="/publikasi/rencana-kinerja-tahunan">Rencana Tahunan</Link>
                            <Link to="/publikasi/iku">IKU</Link>
                        </div>
                    </div>

                    <div className="sitemap-col">
                        <h4 className="sitemap-title">Kinerja</h4>
                        <div className="sitemap-links">
                            <Link to="/publikasi/laporan-kinerja-instansi-pemerintah">Laporan Kinerja</Link>
                            <Link to="/publikasi/perjanjian-kinerja">Perjanjian Kinerja</Link>
                            <Link to="/publikasi/renaksi-dan-realisasi-renaksi">Renaksi & Realisasi</Link>
                            <Link to="/publikasi/skp">SKP</Link>
                            <Link to="/publikasi/indikator-kinerja-individu">IKI</Link>
                        </div>
                    </div>

                    <div className="sitemap-col">
                        <h4 className="sitemap-title">Media</h4>
                        <div className="sitemap-links">
                            <Link to="/berita">Berita Terbaru</Link>
                            <Link to="/galeri">Galeri Foto</Link>
                            <Link to="/video">Galeri Video</Link>
                            <Link to="/pengumuman">Pengumuman</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.4 }}>
                    <p style={{ fontSize: '0.7rem', margin: 0, letterSpacing: '1px' }}>
                        &copy; {new Date().getFullYear()} KESBANGPOL SUMATERA BARAT. ALL RIGHTS RESERVED.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem' }}>Powered by Diskominfotik Sumbar</span>
                        <Link to="/login" style={{ fontSize: '0.7rem', color: 'white', textDecoration: 'none' }}>Admin Login</Link>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-title {
                    font-size: 0.85rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: white;
                    margin-bottom: 1.5rem;
                    position: relative;
                    padding-bottom: 0.5rem;
                    display: inline-block;
                }
                .footer-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 25px;
                    height: 2px;
                    background: var(--secondary);
                }
                .sitemap-title {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: var(--secondary);
                    margin-bottom: 1.25rem;
                }
                .sitemap-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                .sitemap-links a {
                    color: rgba(255,255,255,0.4);
                    text-decoration: none;
                    font-size: 0.8rem;
                    transition: all 0.3s ease;
                }
                .sitemap-links a:hover {
                    color: white;
                    padding-left: 5px;
                }
                .soc-btn {
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 50%;
                    color: rgba(255,255,255,0.6);
                    transition: all 0.3s ease;
                }
                .soc-btn:hover {
                    background: var(--secondary);
                    border-color: var(--secondary);
                    color: white;
                }
                @media (max-width: 768px) {
                    .footer-grid-v3, .sitemap-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
