import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';

const Ideologi = () => {
    return (
        <ProfileLayout title="Ideologi, Wawasan Kebangsaan, Ketahanan Ekonomi Sosial Budaya dan Agama" subtitle="Unit Kerja">
            <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    Bidang Ideologi, Wawasan Kebangsaan, Ketahanan Ekonomi, Sosial, Budaya, dan Agama mempunyai tugas melaksanakan perumusan kebijakan teknis, pengoordinasian, pelaksanaan, pemantauan, evaluasi dan pelaporan di bidang ideologi dan wawasan kebangsaan, ketahanan ekonomi, sosial, budaya dan agama.
                </p>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Sub Bidang:</h3>
                <ul style={{ paddingLeft: '2rem', marginBottom: '2rem' }}>
                    <li>Ideologi dan Wawasan Kebangsaan</li>
                    <li>Ketahanan Ekonomi, Sosial, Budaya dan Agama</li>
                </ul>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Tugas Pokok:</h3>
                <p>Menyelaraskan pemahaman ideologi Pancasila serta memperkuat wawasan kebangsaan di tengah masyarakat untuk menciptakan pertahanan sosial yang kuat menghadapi dinamika global.</p>
            </div>
        </ProfileLayout>
    );
};

export default Ideologi;
