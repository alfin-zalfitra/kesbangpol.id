import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="kontak">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2 style={{ letterSpacing: '2px', fontWeight: '900' }}>KESBANGPOL</h2>
                        <p>Badan Kesatuan Bangsa dan Politik berkomitmen memberikan pelayanan terbaik demi menjaga kedaulatan dan persatuan bangsa Indonesia.</p>
                    </div>

                    <div className="footer-links">
                        <h3>Layanan IT</h3>
                        <ul>
                            <li><a href="#">E-Ormas</a></li>
                            <li><a href="#">SIPA</a></li>
                            <li><a href="/services/lapor" target="_blank" rel="noopener noreferrer">Pelaporan Online</a></li>
                            <li><a href="#">Data Statistik</a></li>
                        </ul>
                    </div>
                    <div className="footer-links" style={{ textAlign: 'center' }}>
                        <h3>Kontak Kami</h3>
                        <p style={{ fontSize: '0.95rem', opacity: '0.7', marginBottom: '1rem' }}>
                            Jl. Kuini No.79A, Ujung Gurun, <br />
                            Kec. Padang Barat, Kota Padang, <br />
                            Sumatera Barat.
                        </p>

                        <p style={{ fontSize: '0.95rem', opacity: '0.7' }}>
                            Email: kesbangpol.sumbar@gmail.com<br />
                            Telp: (0751) 31554<br />
                            WhatsApp: +62 811-6601-234
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                            <a href="/services/fb-kesbangpol" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.597 1.325-1.326V1.326C24 .597 23.403 0 22.675 0z" /></svg>
                            </a>
                            <a href="/services/ig-kesbangpol" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="/services/yt-kesbangpol" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163c-.272-1.022-1.074-1.826-2.094-2.098C19.558 3.6 12 3.6 12 3.6s-7.558 0-9.404.465C1.576 4.337.774 5.141.502 6.163 0 8.01 0 11.875 0 11.875s0 3.865.502 5.712c.272 1.022 1.074 1.826 2.094 2.098 1.846.465 9.404.465 9.404.465s7.558 0 9.404-.465c1.02-.272 1.822-1.076 2.094-2.098.502-1.847.502-5.712.502-5.712s0-3.865-.502-5.712zM9.545 15.111V8.639L15.3 11.875l-5.755 3.236z" /></svg>
                            </a>
                        </div>
                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                            <Link to="/login" className="btn" style={{
                                padding: '0.4rem 1rem',
                                fontSize: '0.75rem',
                                borderRadius: '6px',
                                background: 'var(--secondary)',
                                color: 'var(--white)',
                                boxShadow: '0 4px 12px rgba(200, 16, 46, 0.3)'
                            }}>
                                Login Admin
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} DISKOMINFOTIK SUMBAR  . All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
