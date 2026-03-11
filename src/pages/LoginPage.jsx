import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Login Berhasil!');
        navigate('/admin');
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif",
            backgroundImage: 'linear-gradient(rgba(10, 37, 64, 0.4), rgba(10, 37, 64, 0.4)), url("/hero-bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            padding: '2rem'
        }}>
            <div style={{
                background: 'white',
                width: '100%',
                maxWidth: '420px',
                padding: '2.5rem 3rem',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Red Accent Bar */}
                <div style={{
                    width: '50px',
                    height: '5px',
                    background: '#c8102e',
                    marginBottom: '2rem',
                    borderRadius: '3px'
                }}></div>

                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0a2540', marginBottom: '0.8rem', letterSpacing: '-1.2px' }}>
                        Akses Admin
                    </h1>
                    <p style={{ color: '#4f566b', fontSize: '0.9rem', lineHeight: '1.5', fontWeight: '400' }}>
                        Silakan masukkan kredensial Anda untuk masuk ke sistem.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: '#0a2540', fontWeight: '700', fontSize: '0.8rem', marginBottom: '0.6rem', letterSpacing: '0.5px' }}>USERNAME</label>
                        <input
                            type="text"
                            placeholder="Masukkan username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1.2rem',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                background: '#f8fafc',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'all 0.2s ease',
                                color: '#1a1f36'
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', color: '#0a2540', fontWeight: '700', fontSize: '0.8rem', marginBottom: '0.6rem', letterSpacing: '0.5px' }}>PASSWORD</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.2rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    background: '#f8fafc',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    color: '#1a1f36'
                                }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem'
                                }}
                            >
                                {showPassword ? '🐵' : '🙈'}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ accentColor: '#c8102e', width: '16px', height: '16px' }} /> Ingat saya
                        </label>
                        <a href="#" style={{ color: '#c8102e', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none' }}>Lupa sandi?</a>
                    </div>

                    <button type="submit" style={{
                        width: '100%',
                        padding: '1.1rem',
                        borderRadius: '14px',
                        background: '#0a2540',
                        color: 'white',
                        border: 'none',
                        fontWeight: '800',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.8rem',
                        boxShadow: '0 10px 25px rgba(10, 37, 64, 0.2)',
                        transition: 'all 0.3s ease'
                    }}>
                        MASUK SEKARANG ➜
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link to="/" style={{ color: '#64748b', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none' }}>
                        Kembali ke Halaman Publik
                    </Link>
                </div>

                <div style={{
                    marginTop: '2.5rem',
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontSize: '0.8rem'
                }}>
                    <p>© 2026 Anak Magang UPI YPTK Padang. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
