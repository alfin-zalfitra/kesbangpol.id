import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';

const TugasFungsi = () => {
    return (
        <ProfileLayout title="Tugas dan Fungsi" subtitle="Profil Lembaga">
            <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Tugas Pokok</h2>
                <p style={{ marginBottom: '2rem' }}>
                    Badan Kesatuan Bangsa dan Politik mempunyai tugas membantu Gubernur dalam melaksanakan koordinasi, perumusan, dan pelaksanaan kebijakan di bidang kesatuan bangsa dan politik.
                </p>

                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Fungsi</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {[
                        "Perumusan kebijakan teknis di bidang kesatuan bangsa dan politik.",
                        "Pemberian dukungan atas penyelenggaraan pemerintahan daerah di bidang kesatuan bangsa dan politik.",
                        "Pembinaan dan pelaksanaan tugas di bidang ideologi, wawasan kebangsaan, dan karakter bangsa.",
                        "Koordinasi dan sinkronisasi pelaksanaan kebijakan di bidang politik dalam negeri.",
                        "Pelaksanaan pemantauan, evaluasi, dan pelaporan di bidang kewaspadaan nasional dan penanganan konflik.",
                        "Pelaksanaan administrasi kesekretariatan Badan Kesatuan Bangsa dan Politik."
                    ].map((item, index) => (
                        <div key={index} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                            <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>•</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </ProfileLayout>
    );
};

export default TugasFungsi;
