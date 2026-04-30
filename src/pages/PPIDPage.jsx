import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import Loader from '../components/Loader';

const PPIDPage = () => {
    const { sub, id } = useParams();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const ID_INSTANSI = 38; // ID Kesbangpol

    useEffect(() => {
        const fetchBaseData = async () => {
            setLoading(true);
            try {
                const catRes = await fetch('/api-ppid/category');
                const catResult = await catRes.json();
                const catData = catResult.result || catResult.data || [];
                setCategories(catData);

                if (sub === 'category' && id) {
                    setSelectedCategory(id);
                } else {
                    setSelectedCategory('all');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBaseData();
        window.scrollTo(0, 0);
    }, [sub, id]);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true);
            setCurrentPage(1); 
            try {
                let finalData = [];
                
                if (selectedCategory === 'all') {
                    // Jika "Semua", ambil data dari semua kategori utama (1, 2, 3)
                    const categoryIds = [1, 2, 3];
                    const promises = categoryIds.map(catId => 
                        fetch(`/api-ppid/cluster-data?id_instansi=${ID_INSTANSI}&id_category=${catId}`)
                        .then(res => res.json())
                        .then(res => Array.isArray(res) ? res : (res.data || []))
                        .catch(() => [])
                    );
                    const results = await Promise.all(promises);
                    finalData = results.flat();
                } else {
                    const response = await fetch(`/api-ppid/cluster-data?id_instansi=${ID_INSTANSI}&id_category=${selectedCategory}`);
                    const result = await response.json();
                    finalData = Array.isArray(result) ? result : (result.data || []);
                }

                // Urutkan berdasarkan tahun terbaru
                finalData.sort((a, b) => (b.tahun || 0) - (a.tahun || 0));
                setData(finalData);
            } catch (err) {
                console.error(err);
                setData([]);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, [selectedCategory]);

    const getActiveCategoryName = () => {
        if (selectedCategory === 'all') return 'Semua Informasi Publik';
        const cat = categories.find(c => c.id == selectedCategory);
        return cat ? cat.nama_kategori : 'Informasi Publik';
    };

    // Pagination Logic
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        const contentTop = document.getElementById('ppid-content-top');
        if (contentTop) contentTop.scrollIntoView({ behavior: 'smooth' });
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pageNumbers.map((num, i) => (
            <button
                key={i}
                onClick={() => typeof num === 'number' && paginate(num)}
                style={{
                    width: '45px', height: '45px', borderRadius: '12px', border: '1px solid',
                    borderColor: currentPage === num ? 'var(--secondary)' : '#e2e8f0',
                    background: currentPage === num ? 'var(--secondary)' : 'white',
                    color: currentPage === num ? 'white' : 'var(--text-main)',
                    fontWeight: '700', cursor: typeof num === 'number' ? 'pointer' : 'default',
                    transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
            >
                {num}
            </button>
        ));
    };

    if (loading) return <Loader />;

    return (
        <ProfileLayout 
            title={getActiveCategoryName()} 
            subtitle={selectedCategory === 'all' ? "Daftar Informasi Publik (DIP) Keseluruhan Kesbangpol" : `Layanan Transparansi: ${getActiveCategoryName()}`}
            theme="light"
        >
            <div id="ppid-content-top" style={{ background: '#ffffff', minHeight: '80vh' }}>
                
                {/* Category Selection Pills */}
                <div style={{ 
                    display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '1.5rem 0',
                    marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', scrollbarWidth: 'none'
                }}>
                    <button
                        onClick={() => setSelectedCategory('all')}
                        style={{
                            padding: '0.75rem 1.8rem', borderRadius: '100px', border: '1px solid',
                            borderColor: selectedCategory === 'all' ? 'var(--primary)' : '#e2e8f0',
                            background: selectedCategory === 'all' ? 'var(--primary)' : 'white',
                            color: selectedCategory === 'all' ? 'white' : '#64748b',
                            cursor: 'pointer', fontWeight: '700', whiteSpace: 'nowrap', transition: 'all 0.3s ease',
                            boxShadow: selectedCategory === 'all' ? '0 10px 20px rgba(7, 29, 51, 0.15)' : 'none'
                        }}
                    >
                        Semua Informasi
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '0.75rem 1.8rem', borderRadius: '100px', border: '1px solid',
                                borderColor: selectedCategory == cat.id ? 'var(--primary)' : '#e2e8f0',
                                background: selectedCategory == cat.id ? 'var(--primary)' : 'white',
                                color: selectedCategory == cat.id ? 'white' : '#64748b',
                                cursor: 'pointer', fontWeight: '700', whiteSpace: 'nowrap', transition: 'all 0.3s ease',
                                boxShadow: selectedCategory == cat.id ? '0 10px 20px rgba(7, 29, 51, 0.15)' : 'none'
                            }}
                        >
                            {cat.nama_kategori}
                        </button>
                    ))}
                </div>

                {/* Document Grid */}
                <div style={{ minHeight: '400px' }}>
                    {loadingData ? (
                        <div style={{ textAlign: 'center', padding: '5rem' }}>
                            <div className="ppid-spinner"></div>
                            <p style={{ marginTop: '1.5rem', color: '#94a3b8', fontWeight: '600' }}>Menyusun Daftar Informasi...</p>
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
                                {currentItems.length > 0 ? currentItems.map((item, index) => (
                                    <div key={index} className="ppid-doc-card-premium" style={{
                                        padding: '2.5rem', background: 'white', borderRadius: '28px', border: '1px solid #f1f5f9',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
                                        gap: '1.5rem', transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div className="icon-ppid" style={{ 
                                                width: '55px', height: '55px', background: '#f8fafc', 
                                                borderRadius: '16px', display: 'flex', alignItems: 'center', 
                                                justifyContent: 'center', color: 'var(--primary)', fontSize: '1.4rem' 
                                            }}>
                                                <i className="far fa-file-alt"></i>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', display: 'block', textTransform: 'uppercase' }}>Tahun</span>
                                                <span style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--primary)' }}>{item.tahun || '2023'}</span>
                                            </div>
                                        </div>

                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontWeight: '800', color: 'var(--primary)', lineHeight: '1.5', fontSize: '1.15rem', marginBottom: '0.75rem' }}>
                                                {item.title_content || item.judul}
                                            </h4>
                                            {item.penanggung_jawab && (
                                                <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: '700', marginBottom: '1.25rem' }}>
                                                    PJ: {item.penanggung_jawab}
                                                </p>
                                            )}
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                                                <span style={{ 
                                                    fontSize: '0.65rem', color: 'white', 
                                                    background: item.id_category == 3 ? '#3b82f6' : item.id_category == 1 ? '#f97316' : '#10b981',
                                                    padding: '0.4rem 0.8rem', borderRadius: '8px', fontWeight: '800', textTransform: 'uppercase'
                                                }}>
                                                    {item.title_category || 'PPID'}
                                                </span>
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>
                                                    <i className="far fa-eye" style={{ marginRight: '0.3rem' }}></i> {item.hits || 0} Dilihat
                                                </span>
                                            </div>
                                        </div>

                                        <a href={item.downloads || item.link_download} target="_blank" rel="noopener noreferrer" style={{
                                            background: 'var(--primary)', color: 'white', padding: '1.1rem', borderRadius: '16px',
                                            textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '0.9rem', 
                                            transition: 'all 0.3s ease', boxShadow: '0 10px 20px -5px rgba(7, 29, 51, 0.2)'
                                        }} className="dl-btn-ppid">Unduh Dokumen <i className="fas fa-download" style={{ marginLeft: '0.5rem' }}></i></a>
                                    </div>
                                )) : (
                                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '8rem 2rem', background: '#f8fafc', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                                        <i className="fas fa-folder-open" style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.1 }}></i>
                                        <h3 style={{ color: 'var(--primary)', fontWeight: '800' }}>Belum Ada Dokumen</h3>
                                        <p style={{ color: '#64748b' }}>Informasi untuk kategori ini belum tersedia atau sedang diperbarui.</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination UI */}
                            {totalPages > 1 && (
                                <div style={{ 
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    gap: '0.75rem', marginTop: '5rem', paddingBottom: '3rem'
                                }}>
                                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={{
                                            padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0',
                                            background: 'white', color: 'var(--primary)', fontWeight: '800', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                            opacity: currentPage === 1 ? 0.5 : 1, transition: 'all 0.3s ease'
                                        }}> <i className="fas fa-chevron-left"></i>
                                    </button>
                                    {renderPageNumbers()}
                                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={{
                                            padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0',
                                            background: 'white', color: 'var(--primary)', fontWeight: '800', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                            opacity: currentPage === totalPages ? 0.5 : 1, transition: 'all 0.3s ease'
                                        }}> <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <style>{`
                .ppid-doc-card-premium:hover { transform: translateY(-12px); border-color: var(--secondary); box-shadow: 0 30px 60px -12px rgba(0,0,0,0.1); }
                .ppid-doc-card-premium:hover .icon-ppid { background: var(--primary); color: white; transform: scale(1.1) rotate(-5deg); }
                .dl-btn-ppid:hover { background: var(--secondary) !important; transform: scale(1.02); }
                .ppid-spinner { width: 45px; height: 45px; border: 4px solid #f1f5f9; border-top: 4px solid var(--secondary); border-radius: 50%; animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; margin: 0 auto; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </ProfileLayout>
    );
};

export default PPIDPage;
