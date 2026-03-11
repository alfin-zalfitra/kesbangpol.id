import React from 'react';
import ProfileLayout from '../../components/ProfileLayout';

const Node = ({ title, subtitle, children, type = 'default' }) => (
    <div className={`org-container ${type}`}>
        <div className="org-node">
            <div className="org-node-content">
                <h4 className="org-node-title">{title}</h4>
                {subtitle && <p className="org-node-subtitle">{subtitle}</p>}
            </div>
            {children && <div className="org-connector-down"></div>}
        </div>
        {children && (
            <div className="org-children">
                {children}
            </div>
        )}
    </div>
);

const StrukturOrganisasi = () => {
    return (
        <ProfileLayout title="Struktur Organisasi" subtitle="Profil Lembaga">
            <div className="org-wrapper">
                <style>{`
                    .org-wrapper {
                        overflow-x: auto;
                        padding: 4rem 2rem;
                        background: #fbfcfd;
                        border-radius: 24px;
                        margin-top: 1rem;
                    }

                    .org-tree {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        min-width: 1200px;
                    }

                    .org-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        position: relative;
                        width: 100%;
                    }

                    .org-node {
                        background: white;
                        border-radius: 16px;
                        padding: 1.25rem;
                        box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
                        border: 1px solid rgba(0,0,0,0.05);
                        z-index: 2;
                        min-width: 240px;
                        max-width: 300px;
                        text-align: center;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        position: relative;
                    }

                    .org-node:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 20px 30px -10px rgba(10, 37, 64, 0.15);
                        border-color: var(--secondary);
                    }

                    .org-node::before {
                        content: '';
                        position: absolute;
                        top: -20px;
                        left: 50%;
                        width: 2px;
                        height: 20px;
                        background: #e2e8f0;
                        display: none;
                    }

                    .org-children > .org-container > .org-node::before {
                        display: block;
                    }

                    .org-node-title {
                        font-size: 0.9rem;
                        font-weight: 800;
                        color: var(--primary);
                        line-height: 1.3;
                        text-transform: uppercase;
                        letter-spacing: 0.02em;
                    }

                    .org-node-subtitle {
                        font-size: 0.75rem;
                        color: var(--text-muted);
                        margin-top: 0.5rem;
                        font-weight: 500;
                    }

                    .org-connector-down {
                        position: absolute;
                        bottom: -20px;
                        left: 50%;
                        width: 2px;
                        height: 20px;
                        background: #e2e8f0;
                        transform: translateX(-50%);
                    }

                    .org-children {
                        display: flex;
                        justify-content: center;
                        gap: 2rem;
                        padding-top: 20px;
                        position: relative;
                        width: 100%;
                    }

                    .org-children::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 50%;
                        width: 2px;
                        height: 20px;
                        background: #e2e8f0;
                        transform: translateX(-50%);
                        display: none;
                    }

                    .org-children::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 15%;
                        right: 15%;
                        height: 2px;
                        background: #e2e8f0;
                    }

                    .top-level > .org-children::after {
                        left: 25%;
                        right: 25%;
                    }

                    /* Specific Layout for Second Level */
                    .second-level-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10rem;
                        margin-bottom: 4rem;
                        position: relative;
                    }

                    .second-level-grid::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: calc(100% - 240px);
                        height: 2px;
                        background: #e2e8f0;
                        transform: translate(-50%, -50%);
                        z-index: 1;
                    }

                    .bidang-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 1.5rem;
                        width: 100%;
                        padding-top: 3rem;
                        position: relative;
                    }

                    .bidang-card {
                        background: white;
                        border-radius: 16px;
                        padding: 1.5rem;
                        border: 1px solid rgba(0,0,0,0.05);
                        box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        transition: all 0.3s ease;
                    }

                    .bidang-card:hover {
                        border-color: var(--secondary);
                        transform: translateY(-5px);
                    }

                    .bidang-header {
                        padding-bottom: 0.75rem;
                        border-bottom: 2px solid #f1f5f9;
                    }

                    .bidang-name {
                        font-size: 0.85rem;
                        font-weight: 800;
                        color: var(--primary);
                        line-height: 1.4;
                    }

                    .sub-bidang-list {
                        display: flex;
                        flex-direction: column;
                        gap: 0.75rem;
                    }

                    .sub-bidang-item {
                        font-size: 0.75rem;
                        color: var(--text-muted);
                        padding: 0.75rem;
                        background: #f8fafc;
                        border-radius: 10px;
                        border: 1px solid transparent;
                        transition: all 0.2s ease;
                        line-height: 1.4;
                    }

                    .sub-bidang-item:hover {
                        background: white;
                        border-color: #e2e8f0;
                        color: var(--secondary);
                    }

                    .sekretariat-subs {
                        display: flex;
                        gap: 1rem;
                        margin-top: 2rem;
                    }

                    .sekretariat-sub-node {
                        font-size: 0.75rem;
                        padding: 0.6rem 1rem;
                        background: #f1f5f9;
                        border-radius: 8px;
                        color: var(--primary);
                        font-weight: 600;
                        white-space: nowrap;
                    }

                    .main-connector {
                        width: 2px;
                        height: 60px;
                        background: #e2e8f0;
                        margin: 0 auto;
                    }
                `}</style>

                <div className="org-tree">
                    {/* Level 0: Head */}
                    <div className="org-node" style={{ background: 'var(--primary)', color: 'white', maxWidth: '400px' }}>
                        <h4 className="org-node-title" style={{ color: 'white' }}>Badan Kesatuan Bangsa dan Politik Provinsi</h4>
                        <p className="org-node-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>Provinsi Sumatera Barat</p>
                    </div>

                    <div className="main-connector"></div>

                    {/* Level 1: Fungsional & Sekretariat */}
                    <div className="second-level-grid">
                        <div className="org-node" style={{ borderStyle: 'dashed' }}>
                            <h4 className="org-node-title">Kelompok Jabatan Fungsional</h4>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className="org-node">
                                <h4 className="org-node-title">Sekretariat Badan</h4>
                            </div>
                            <div className="sekretariat-subs">
                                <span className="sekretariat-sub-node">Sub. Bagian Program & Anggaran</span>
                                <span className="sekretariat-sub-node">Sub. Bagian Keuangan</span>
                                <span className="sekretariat-sub-node">Sub. Bagian Umum & Kepegawaian</span>
                            </div>
                        </div>
                    </div>

                    <div className="main-connector" style={{ height: '40px' }}></div>

                    {/* Level 2: Bidang & Sub Bidang */}
                    <div className="bidang-grid">
                        {/* Bidang 1 */}
                        <div className="bidang-card">
                            <div className="bidang-header">
                                <h5 className="bidang-name">Bidang Ideologi, Wawasan Kebangsaan dan Karakter Bangsa</h5>
                            </div>
                            <div className="sub-bidang-list">
                                <div className="sub-bidang-item">Sub Bidang Ideologi dan Wawasan Kebangsaan</div>
                                <div className="sub-bidang-item">Sub Bidang Bela Negara dan Karakter Bangsa</div>
                            </div>
                        </div>

                        {/* Bidang 2 */}
                        <div className="bidang-card">
                            <div className="bidang-header">
                                <h5 className="bidang-name">Bidang Politik Dalam Negeri</h5>
                            </div>
                            <div className="sub-bidang-list">
                                <div className="sub-bidang-item">Sub Bidang Pendidikan Politik & Peningkatan Demokrasi</div>
                                <div className="sub-bidang-item">Sub Bidang Fasilitasi Kelembagaan Pemerintah, Perwakilan & Partai Politik</div>
                            </div>
                        </div>

                        {/* Bidang 3 */}
                        <div className="bidang-card">
                            <div className="bidang-header">
                                <h5 className="bidang-name">Bidang Ketahanan Ekonomi, Sosial, Budaya, Agama dan Ormas</h5>
                            </div>
                            <div className="sub-bidang-list">
                                <div className="sub-bidang-item">Sub Bidang Ketahanan Ekonomi, Sosial, Budaya dan Agama</div>
                                <div className="sub-bidang-item">Sub Bidang Organisasi Kemasyarakatan</div>
                            </div>
                        </div>

                        {/* Bidang 4 */}
                        <div className="bidang-card">
                            <div className="bidang-header">
                                <h5 className="bidang-name">Bidang Kewaspadaan Nasional dan Penanganan Konflik</h5>
                            </div>
                            <div className="sub-bidang-list">
                                <div className="sub-bidang-item">Sub Bidang Kewaspadaan Dini dan Kerjasama Intelijen</div>
                                <div className="sub-bidang-item">Sub Bidang Penanganan Konflik</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
};

export default StrukturOrganisasi;

