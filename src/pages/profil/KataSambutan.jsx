import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';

const KataSambutan = () => {
    return (
        <ProfileLayout title="Kata Sambutan" subtitle="Profil Lembaga">
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '350px',
                        height: '450px',
                        background: '#eee',
                        borderRadius: '20px',
                        margin: '0 auto',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-lg)',
                        border: '5px solid white'
                    }}>
                        {/* Placeholder for Head of Department image */}
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)' }}>
                            <span style={{ fontSize: '5rem' }}>👤</span>
                        </div>
                    </div>
                    <h3 style={{ marginTop: '1.5rem', color: 'var(--primary)' }}>Dr. Jefrinal Arifin, S.H., M.Si.</h3>
                    <p style={{ color: 'var(--secondary)', fontWeight: '700' }}>Kepala Badan</p>
                </div>
                <div style={{ flex: '2 1 450px', color: 'var(--text-main)', lineHeight: '1.8' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Assalamu'alaikum Wr. Wb.</h2>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Puji syukur kita panjatkan ke hadirat Allah SWT atas rahmat dan karunia-Nya, sehingga website resmi Badan Kesatuan Bangsa dan Politik Provinsi Sumatera Barat dapat hadir sebagai sarana informasi dan komunikasi bagi masyarakat.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Di era keterbukaan informasi publik ini, kami berkomitmen untuk menyediakan data yang akurat, transparan, dan akuntabel mengenai berbagai program serta kebijakan di bidang kesatuan bangsa dan politik. Tugas kami adalah menjaga kondusifitas daerah, memperkokoh persatuan, serta mendampingi proses demokrasi di Sumatera Barat.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Kami berharap melalui website ini, masyarakat dapat lebih mudah mengakses informasi mengenai layanan kami, serta ikut berpartisipasi dalam menjaga stabilitas dan keamanan di wilayah Sumatera Barat yang kita cintai.
                    </p>
                    <p>
                        Wassalamu'alaikum Wr. Wb.
                    </p>
                </div>
            </div>
        </ProfileLayout>
    );
};

export default KataSambutan;
