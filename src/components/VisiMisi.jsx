import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

const VisiMisi = () => {
    const [ref1, revealed1] = useReveal();
    const [ref2, revealed2] = useReveal();

    return (
        <section className="section" id="profil">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                <div ref={ref1} className={`animate-up ${revealed1 ? 'revealed' : ''}`} style={{ position: 'relative' }}>
                    <div style={{
                        width: '100%',
                        height: '450px',
                        background: 'url("/office.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '24px',
                        boxShadow: 'var(--shadow-lg)'
                    }}></div>
                    <div className="glass" style={{
                        position: 'absolute',
                        bottom: '-20px',
                        right: '-20px',
                        padding: '2rem',
                        borderRadius: '16px',
                        maxWidth: '250px',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Indeks Persatuan</h4>
                        <div style={{ height: '8px', width: '100%', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: '92%', background: 'var(--secondary)' }}></div>
                        </div>
                        <span style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>92.4% Meningkat dari tahun lalu</span>
                    </div>
                </div>

                <div ref={ref2} className={`animate-up ${revealed2 ? 'revealed' : ''}`}>
                    <span style={{ color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>Tentang Kami</span>
                    <h2 style={{ fontSize: '2.5rem', margin: '1rem 0 1.5rem', color: 'var(--primary)', lineHeight: '1.2' }}>Visi & Misi Kesbangpol</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Menjadi lembaga yang dipercaya dalam memantapkan kesadaran akan hak dan kewajiban bela negara serta memperkokoh persatuan dan kesatuan bangsa dalam wadah NKRI.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }} className={`animate-up ${revealed2 ? 'revealed' : ''} reveal-delay-1`}>
                        <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>1</div>
                        <p style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Mewujudkan kondisi kemantapan persatuan dan kesatuan bangsa.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }} className={`animate-up ${revealed2 ? 'revealed' : ''} reveal-delay-2`}>
                        <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>2</div>
                        <p style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Meningkatkan kesadaran masyarakat akan nilai-nilai luhur budaya bangsa.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }} className={`animate-up ${revealed2 ? 'revealed' : ''} reveal-delay-3`}>
                        <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>3</div>
                        <p style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Mengembangkan sistem politik yang demokratis and beretika.</p>
                    </div>

                    <div className={`animate-up ${revealed2 ? 'revealed' : ''} reveal-delay-4`} style={{ marginTop: '2.5rem' }}>
                        <Link to="/kontak" className="btn btn-primary" style={{ gap: '0.75rem' }}>
                            Lihat Profil & Kontak
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisiMisi;
