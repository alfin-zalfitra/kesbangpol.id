import React from 'react';
import ProfileLayout from '../components/ProfileLayout';

const ContactPage = () => {
    return (
        <ProfileLayout 
            title="Kontak Kami" 
            subtitle="Hubungi kami untuk informasi lebih lanjut dan layanan pengaduan"
            theme="light"
        >
            <div style={{ background: '#ffffff', minHeight: '100vh', padding: '4rem 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        
                        {/* Info Kontak */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ animation: 'fadeInLeft 0.6s ease-out' }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1.5rem' }}>Mari Terhubung</h2>
                                <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                    Kami siap melayani pertanyaan, saran, maupun pengaduan Anda terkait layanan Kesatuan Bangsa dan Politik Provinsi Sumatera Barat.
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.2rem', flexShrink: 0 }}>
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '800', color: 'var(--primary)', marginBottom: '0.3rem' }}>Lokasi Kantor</h4>
                                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Jl. Rasuna Said No. 79, Padang, Sumatera Barat</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.2rem', flexShrink: 0 }}>
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '800', color: 'var(--primary)', marginBottom: '0.3rem' }}>Email</h4>
                                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>kesbangpol@sumbarprov.go.id</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', fontSize: '1.2rem', flexShrink: 0 }}>
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '800', color: 'var(--primary)', marginBottom: '0.3rem' }}>Telepon</h4>
                                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>(0751) 32133</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                {['facebook-f', 'instagram', 'twitter', 'youtube'].map((icon, idx) => (
                                    <a key={idx} href="#" style={{
                                        width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary)', color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s ease'
                                    }} className="social-btn">
                                        <i className={`fab fa-${icon}`}></i>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Form Kontak */}
                        <div style={{ 
                            background: '#ffffff', padding: '3rem', borderRadius: '32px', 
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)', border: '1px solid #f1f5f9',
                            animation: 'fadeInRight 0.6s ease-out'
                        }}>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nama Lengkap</label>
                                        <input type="text" placeholder="Masukkan nama..." style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Alamat Email</label>
                                        <input type="email" placeholder="email@contoh.com" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Subjek</label>
                                    <input type="text" placeholder="Tujuan pesan..." style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Pesan Anda</label>
                                    <textarea rows="5" placeholder="Tuliskan pesan atau saran Anda di sini..." style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none', resize: 'none' }}></textarea>
                                </div>
                                <button style={{
                                    background: 'var(--primary)', color: 'white', padding: '1.2rem', borderRadius: '16px',
                                    fontWeight: '800', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 20px -5px rgba(7, 29, 51, 0.2)'
                                }} className="submit-btn">Kirim Pesan Sekarang <i className="fas fa-paper-plane" style={{ marginLeft: '0.5rem' }}></i></button>
                            </form>
                        </div>
                    </div>

                    {/* Google Maps */}
                    <div style={{ marginTop: '5rem', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.28827982269!2d100.35824557434771!3d-0.9338304990571617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b94f0f0f0f0f%3A0x0f0f0f0f0f0f0f0f!2sKantor%20Kesatuan%20Bangsa%20dan%20Politik%20Provinsi%20Sumbar!5e0!3m2!1sid!2sid!4v1714488000000!5m2!1sid!2sid" 
                            width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
                .social-btn:hover { transform: translateY(-5px); background: var(--secondary) !important; }
                .submit-btn:hover { background: var(--secondary) !important; transform: translateY(-3px); }
            `}</style>
        </ProfileLayout>
    );
};

export default ContactPage;
