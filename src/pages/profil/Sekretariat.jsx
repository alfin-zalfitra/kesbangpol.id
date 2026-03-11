import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';

const Sekretariat = () => {
    return (
        <ProfileLayout title="Sekretariat" subtitle="Unit Kerja">
            <div style={{ color: 'var(--text-main)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                    Sekretariat mempunyai tugas melaksanakan pemberian pelayanan teknis dan administratif serta koordinasi pelaksanaan tugas di lingkungan Badan Kesatuan Bangsa dan Politik.
                </p>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Sub Bagian:</h3>
                <ul style={{ paddingLeft: '2rem', marginBottom: '2rem' }}>
                    <li>Sub Bagian Umum dan Kepegawaian</li>
                    <li>Sub Bagian Keuangan</li>
                    <li>Sub Bagian Perencanaan dan Evaluasi</li>
                </ul>
                <p>Sekretariat berperan sebagai tulang punggung administratif yang memastikan seluruh operasional badan berjalan lancar, tertata, dan sesuai dengan standar akuntansi serta manajemen kepegawaian negara.</p>
            </div>
        </ProfileLayout>
    );
};

export default Sekretariat;
