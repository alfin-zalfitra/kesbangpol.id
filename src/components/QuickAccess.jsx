import React from 'react';
import { useReveal } from '../hooks/useReveal';

const accessLinks = [
    {
        title: 'Portal Sumatera Barat',
        desc: 'Website Resmi Pemerintah Provinsi Sumatera Barat',
        link: '/services/portal-sumbar',
        icon: '🏙️'
    },
    {
        title: 'PPID Provinsi',
        desc: 'Portal Informasi Publik Provinsi Sumatera Barat',
        link: '/services/ppid',
        icon: 'ℹ️'
    },
    {
        title: 'JDIH Provinsi',
        desc: 'Website Resmi JDIH Provinsi Sumatera Barat',
        link: '/services/jdih',
        icon: '⚖️'
    },
    {
        title: 'CCTV Kota Padang',
        desc: 'Pantauan Langsung CCTV Kota Padang',
        link: '/services/cctv-padang',
        icon: '🎥'
    }
];

const QuickAccess = () => {
    const [ref, revealed] = useReveal();
    return (
        <section ref={ref} className="section" id="publik" style={{ background: 'var(--primary)', color: 'white' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }} className={`animate-up ${revealed ? 'revealed' : ''}`}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Layanan Cepat</h2>
                    <p style={{ opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>Akses cepat ke berbagai portal informasi dan layanan publik Provinsi Sumatera Barat.</p>
                </div>

                <div className="access-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {accessLinks.map((item, index) => (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" key={index} className={`access-card animate-up ${revealed ? 'revealed' : ''} reveal-delay-${index + 1}`} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '2rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'block'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{item.icon}</div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{item.desc}</p>
                            <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent)' }}>
                                Kunjungi Portal ↗
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickAccess;
