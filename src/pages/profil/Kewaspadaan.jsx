import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';

const Kewaspadaan = () => {
    return (
        <ProfileLayout title="Kewaspadaan Nasional dan Penanganan Konflik" subtitle="Unit Kerja">
            <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    Bidang Kewaspadaan Nasional dan Penanganan Konflik mempunyai tugas melaksanakan perumusan kebijakan teknis, pengoordinasian, pelaksanaan, pemantauan, evaluasi dan pelaporan di bidang kewaspadaan nasional, penanganan konflik dan kerja sama intelijen keamanan.
                </p>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Fungsi:</h3>
                <ul style={{ paddingLeft: '2rem', marginBottom: '2rem' }}>
                    <li>Penyelenggaraan deteksi dini dan cegah dini potensi ancaman keamanan.</li>
                    <li>Koordinasi penanganan konflik sosial secara terpadu.</li>
                    <li>Pemantauan situasi daerah dan kerja sama intelijen.</li>
                </ul>
            </div>
        </ProfileLayout>
    );
};

export default Kewaspadaan;
