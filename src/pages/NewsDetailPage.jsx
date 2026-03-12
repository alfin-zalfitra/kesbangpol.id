import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NewsDetailPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        const initialNews = [
            { id: 1, date: '5 Maret 2026', title: 'Bangkit dari Bencara, Safari Ramadhan Pemprov Sumbar Tebar Semangat Pemulihan di Matua', image: '/news1.png', category: 'BERITA UTAMA', content: 'Gubernur Sumatera Barat beserta jajaran melakukan kunjungan Safari Ramadhan ke wilayah Matua. Kunjungan ini bertujuan untuk memberikan semangat pemulihan pasca bencana yang melanda wilayah tersebut beberapa waktu lalu. Dalam sambutannya, Gubernur menekankan pentingnya gotong royong dan kesabaran dalam menghadapi cobaan, serta memastikan pemerintah hadir untuk membantu proses rekonstruksi.' },
            { id: 2, date: '5 Maret 2026', title: 'Refleksi Satu Tahun Kepemimpinan Mahyeldi - Vasko', image: '/news1.png', category: 'BERITA UTAMA', content: 'Satu tahun telah berlalu sejak kepemimpinan Mahyeldi - Vasko dimulai di Sumatera Barat. Berbagai capaian dan tantangan telah dilalui. Laporan ini merangkum perkembangan di berbagai sektor mulai dari ekonomi, infrastruktur, hingga sosial budaya. Fokus utama tetap pada peningkatan kesejahteraan masyarakat dan pemerataan pembangunan di seluruh kabupaten/kota.' },
            { id: 3, date: '5 Maret 2026', title: 'Safari Ramadhan di Nagari Campago, Pemprov Sumbar Tegaskan Komitmen Pembangunan...', image: '/gallery1.png', category: 'BERITA UTAMA', content: 'Tim Safari Ramadhan Provinsi Sumatera Barat menyambangi Nagari Campago untuk berdialog langsung dengan tokoh masyarakat dan warga setempat. Pemerintah menegaskan akan terus memprioritaskan pembangunan infrastruktur pedesaan guna memperlancar arus logistik dan meningkatkan ekonomi warga nagari.' },
            { id: 4, date: '5 Maret 2026', title: 'Gubernur Mahyeldi Serahkan Bantuan Bedah Rumah Rp25 Juta untuk Warga Paninggahan, Solok', image: '/gallery3.png', category: 'BERITA UTAMA', content: 'Melalui program bedah rumah, Gubernur Mahyeldi menyerahkan bantuan secara simbolis kepada keluarga kurang mampu di Paninggahan, Solok. Bantuan senilai Rp25 juta ini diharapkan dapat memberikan tempat tinggal yang lebih layak dan sehat bagi penerimanya.' },
            { id: 5, date: '4 Maret 2026', title: 'Rapat Koordinasi Persiapan Pilkada Serentak 2026 di Sumatera Barat', image: '/gallery2.png', category: 'POLITIK', content: 'Badan Kesbangpol Sumatera Barat menyelenggarakan rapat koordinasi bersama KPU dan Bawaslu guna mematangkan persiapan Pilkada Serentak 2026. Aspek keamanan, pemutakhiran data pemilih, dan netralitas ASN menjadi poin utama pembahasan dalam pertemuan strategis ini.' },
            { id: 6, date: '3 Maret 2026', title: 'Sosialisasi Bahaya Narkoba bagi Generasi Muda di Kota Padang', image: '/gallery1.png', category: 'KEAMANAN', content: 'Kesbangpol bekerjasama dengan BNN melakukan sosialisasi intensif ke sekolah-sekolah di Padang. Mengingat ancaman narkoba yang semakin nyata, edukasi dini dianggap sebagai tameng paling efektif untuk melindungi generasi muda dari pengaruh negatif zat terlarang.' }
        ];

        try {
            const storedNews = JSON.parse(localStorage.getItem('news_data') || '[]');
            const allNews = [...storedNews, ...initialNews];
            const foundNews = allNews.find(n => n.id === parseInt(id));
            setNews(foundNews || initialNews[0]);
        } catch (error) {
            setNews(initialNews.find(n => n.id === parseInt(id)) || initialNews[0]);
        }

        window.scrollTo(0, 0);
    }, [id]);

    if (!news) return null;

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <TopBar />
            <Navbar />

            <main style={{ paddingTop: '100px' }}>
                <div className="container" style={{ paddingBottom: '5rem' }}>
                    <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Beranda</Link>
                        <span style={{ color: 'var(--text-muted)' }}>/</span>
                        <Link to="/berita-lengkap" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Berita</Link>
                        <span style={{ color: 'var(--text-muted)' }}>/</span>
                        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Detail Berita</span>
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className="animate-up revealed">
                            <Link to="/berita-lengkap" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--primary)',
                                textDecoration: 'none',
                                fontWeight: '600',
                                marginBottom: '2rem',
                                opacity: 0.7,
                                transition: '0.3s'
                            }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
                                ← Kembali ke Semua Berita
                            </Link>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.4rem 1rem',
                                    backgroundColor: '#0ea5e9',
                                    color: 'white',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    marginBottom: '1rem'
                                }}>
                                    {news.category}
                                </span>

                                <h1 style={{
                                    fontSize: '2.8rem',
                                    color: '#0f172a',
                                    fontWeight: '800',
                                    lineHeight: '1.2',
                                    marginBottom: '1.5rem',
                                    letterSpacing: '-0.02em'
                                }}>
                                    {news.title}
                                </h1>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    color: '#64748b',
                                    fontSize: '0.95rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        📅 <span>{news.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        👤 <span>Admin Kesbangpol</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
                                marginBottom: '3rem',
                                height: '420px',
                                width: '100%'
                            }}>
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                            </div>

                            <article style={{
                                color: '#334155',
                                lineHeight: '1.8',
                                fontSize: '1.25rem',
                                marginBottom: '4rem'
                            }}>
                                <p style={{ marginBottom: '1.5rem', fontWeight: '400' }}>
                                    {news.content || 'Konten berita lengkap sedang dalam proses pembaruan. Silakan kembali lagi nanti untuk informasi selengkapnya.'}
                                </p>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Pemerintah Provinsi Sumatera Barat melalui Badan Kesbangpol berkomitmen untuk terus memberikan pelayanan informasi yang transparan dan akuntabel kepada seluruh lapisan masyarakat.
                                </p>
                                <div style={{
                                    padding: '2rem',
                                    borderLeft: '4px solid #0ea5e9',
                                    backgroundColor: '#f8fafc',
                                    borderRadius: '0 16px 16px 0',
                                    margin: '3rem 0',
                                    fontStyle: 'italic',
                                    color: '#475569'
                                }}>
                                    "Keterbukaan informasi adalah kunci dari kepercayaan publik terhadap institusi pemerintah. Kami berupaya setiap hari untuk mencapai standar tersebut."
                                </div>
                                <p>
                                    Sumatera Barat terus berkomitmen untuk memperkuat transparansi dan komunikasi publik melalui berbagai platform media resmi. Ikuti terus perkembangan informasi terbaru hanya di website resmi Badan Kesbangpol.
                                </p>
                            </article>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '3rem' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Bagikan Berita:</span>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button style={{ border: 'none', background: '#e2e8f0', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>f</button>
                                        <button style={{ border: 'none', background: '#e2e8f0', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>t</button>
                                        <button style={{ border: 'none', background: '#e2e8f0', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}>w</button>
                                    </div>
                                </div>
                                <Link to="/berita-lengkap" className="btn btn-primary">
                                    Lihat Berita Lainnya
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NewsDetailPage;
