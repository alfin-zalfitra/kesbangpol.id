import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';

const Politik = () => {
    return (
        <ProfileLayout title="Politik Dalam Negeri dan Ormas" subtitle="Unit Kerja">
            <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    Bidang Politik Dalam Negeri dan Organisasi Kemasyarakatan mempunyai tugas melaksanakan perumusan kebijakan teknis, pengoordinasian, pelaksanaan, pemantauan, evaluasi dan pelaporan di bidang politik dalam negeri dan organisasi kemasyarakatan.
                </p>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Sub Bidang:</h3>
                <ul style={{ paddingLeft: '2rem', marginBottom: '2rem' }}>
                    <li>Politik Dalam Negeri</li>
                    <li>Organisasi Kemasyarakatan</li>
                </ul>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Fokus Utama:</h3>
                <p>Membina hubungan yang harmonis dengan berbagai organisasi kemasyarakatan (Ormas) serta memfasilitasi perkembangan politik domestik yang sehat dan demokratis sesuai dengan regulasi yang berlaku.</p>
            </div>
        </ProfileLayout>
    );
};

export default Politik;
