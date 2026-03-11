import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';

const VisiMisiPage = () => {
    return (
        <ProfileLayout title="Visi dan Misi" subtitle="Profil Lembaga">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>VISI</h2>
                    <p style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontStyle: 'italic', background: 'var(--surface)', padding: '2rem', borderRadius: '16px', borderLeft: '8px solid var(--secondary)' }}>
                        "Menjadi lembaga yang dipercaya dalam memantapkan kesadaran akan hak dan kewajiban bela negara serta memperkokoh persatuan dan kesatuan bangsa dalam wadah NKRI."
                    </p>
                </div>

                <div>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center', fontSize: '2.5rem' }}>MISI</h2>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {[
                            "Mewujudkan kondisi kemantapan persatuan dan kesatuan bangsa.",
                            "Meningkatkan kesadaran masyarakat akan nilai-nilai luhur budaya bangsa.",
                            "Mengembangkan sistem politik yang demokratis dan beretika.",
                            "Meningkatkan kualitas pelayanan administrasi kesatuan bangsa dan politik.",
                            "Menumbuhkembangkan semangat bela negara dan patriotisme bagi seluruh elemen masyarakat."
                        ].map((item, index) => (
                            <div key={index} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #eee' }}>
                                <div style={{ minWidth: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {index + 1}
                                </div>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginTop: '0.4rem' }}>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
};

export default VisiMisiPage;
