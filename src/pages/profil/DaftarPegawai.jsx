import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';

const DaftarPegawai = () => {
    const pegawais = [
        { nama: "Mursalim", jabatan: "Kepala Badan", nip: "197XXXXXXXXXXXXXXX" },
        { nama: "Adi Dharma, S.Sos", jabatan: "Sekretaris", nip: "197XXXXXXXXXXXXXXX" },
        { nama: "Zaharman, S.H.", jabatan: "Kabid Ideologi & Wawasan Kebangsaan", nip: "196XXXXXXXXXXXXXXX" },
        { nama: "Rafika Ikhtiari, S.Sos.", jabatan: "Kabid Politik Dalam Negeri", nip: "197XXXXXXXXXXXXXXX" },
        { nama: "Muzahar, S.Sos, M.Si", jabatan: "Kabid Ketahanan Eksosbud, Agama & Ormas", nip: "197XXXXXXXXXXXXXXX" },
        { nama: "Hendra Maidarwan, S.E.", jabatan: "Kabid Kewaspadaan Nasional & Penanganan Konflik", nip: "197XXXXXXXXXXXXXXX" },
    ];

    return (
        <ProfileLayout title="Daftar Pegawai" subtitle="Profil Lembaga">
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ background: 'var(--primary)', color: 'white' }}>
                            <th style={{ padding: '1.2rem', textAlign: 'left', borderRadius: '12px 0 0 0' }}>No</th>
                            <th style={{ padding: '1.2rem', textAlign: 'left' }}>Nama Lengkap</th>
                            <th style={{ padding: '1.2rem', textAlign: 'left' }}>Jabatan</th>
                            <th style={{ padding: '1.2rem', textAlign: 'left', borderRadius: '0 12px 0 0' }}>NIP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pegawais.map((p, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #eee', transition: 'var(--transition)' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f8fbfc'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                <td style={{ padding: '1.2rem' }}>{i + 1}</td>
                                <td style={{ padding: '1.2rem', fontWeight: '600', color: 'var(--primary)' }}>{p.nama}</td>
                                <td style={{ padding: '1.2rem' }}>{p.jabatan}</td>
                                <td style={{ padding: '1.2rem', color: 'var(--text-muted)' }}>{p.nip}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ProfileLayout>
    );
};

export default DaftarPegawai;
