import React from 'react';

const accessLinks = [
    {
        title: 'Portal Sumatera Barat',
        desc: 'Website Resmi Pemerintah Provinsi Sumatera Barat',
        link: 'https://sumbarprov.go.id',
        icon: 'fas fa-city',
        color: '#2563eb'
    },
    {
        title: 'PPID Provinsi',
        desc: 'Portal Informasi Publik Provinsi Sumatera Barat',
        link: '/ppid',
        icon: 'fas fa-info-circle',
        color: '#f59e0b'
    },
    {
        title: 'JDIH Provinsi',
        desc: 'Jaringan Dokumentasi dan Informasi Hukum',
        link: 'https://jdih.sumbarprov.go.id',
        icon: 'fas fa-balance-scale',
        color: '#10b981'
    },
    {
        title: 'CCTV Kota Padang',
        desc: 'Pantauan Langsung CCTV Strategis Kota Padang',
        link: 'https://diskominfo.padang.go.id/cctv',
        icon: 'fas fa-video',
        color: '#ef4444'
    }
];

const QuickAccess = () => {
    return (
        <section className="section" id="publik" style={{ 
            background: '#ffffff', 
            padding: '3rem 0 5rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div 
                    data-aos="fade-up"
                    style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                >
                    <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '800', 
                        color: 'var(--secondary)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1.5px',
                        display: 'block',
                        marginBottom: '0.5rem'
                    }}>Akses Terintegrasi</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1rem' }}>Layanan Cepat</h2>
                    <div style={{ width: '40px', height: '3px', background: 'var(--secondary)', margin: '0 auto 1rem', borderRadius: '2px' }}></div>
                    <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Akses instan ke berbagai portal informasi dan layanan publik strategis Provinsi Sumatera Barat.
                    </p>
                </div>

                <div className="access-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {accessLinks.map((item, index) => (
                        <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            key={index} 
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="modern-access-card" 
                            style={{
                                background: '#fafafa',
                                padding: '1.75rem',
                                borderRadius: '20px',
                                border: '1px solid #f1f5f9',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                textDecoration: 'none'
                            }}
                        >
                            <div style={{ 
                                width: '45px', 
                                height: '45px', 
                                background: `${item.color}10`, 
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: item.color,
                                fontSize: '1.2rem',
                                transition: 'all 0.3s ease'
                            }} className="icon-box">
                                <i className={item.icon}></i>
                            </div>

                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.75rem', color: '#1e293b' }}>{item.title}</h3>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1.5rem' }}>{item.desc}</p>
                            
                            <div style={{ 
                                marginTop: 'auto', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.4rem', 
                                fontSize: '0.75rem', 
                                fontWeight: '800', 
                                color: 'var(--primary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Kunjungi <i className="fas fa-arrow-right" style={{ fontSize: '0.65rem', transition: 'transform 0.3s ease' }}></i>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
                .modern-access-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--secondary);
                    box-shadow: 0 20px 40px -12px rgba(0,0,0,0.08);
                }
                .modern-access-card:hover .icon-box {
                    background: var(--primary);
                    color: white;
                }
                .modern-access-card:hover .fa-arrow-right {
                    transform: translateX(4px);
                }
            `}</style>
        </section>
    );
};

export default QuickAccess;
