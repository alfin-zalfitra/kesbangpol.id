import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import Loader from '../components/Loader';

const PPIDPage = () => {
    const { sub, id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
            setSearchQuery('');
            try {
                let finalData = [];

                if (selectedCategory === 'all') {
                    const categoryIds = [1, 2, 3, 6];
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

    // Reset page when search changes
    useEffect(() => { setCurrentPage(1); }, [searchQuery]);

    const getActiveCategoryName = () => {
        if (selectedCategory === 'all') return 'Semua Informasi Publik';
        const cat = categories.find(c => c.id == selectedCategory);
        return cat ? cat.nama_kategori : 'Informasi Publik';
    };

    // Filter
    const filteredData = data.filter(item =>
        (item.title_content || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        const contentTop = document.getElementById('ppid-content-top');
        if (contentTop) contentTop.scrollIntoView({ behavior: 'smooth' });
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 7) {
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
                    width: '42px', height: '42px', borderRadius: '10px', border: '1px solid',
                    borderColor: currentPage === num ? 'var(--secondary)' : '#e2e8f0',
                    background: currentPage === num ? 'var(--secondary)' : 'white',
                    color: currentPage === num ? 'white' : 'var(--text-main)',
                    fontWeight: '700', cursor: typeof num === 'number' ? 'pointer' : 'default',
                    transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem'
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
            subtitle="Daftar Informasi Publik (DIP) - Kesbangpol Provinsi Sumatera Barat"
            theme="light"
        >
            <div id="ppid-content-top" style={{ background: '#ffffff', minHeight: '80vh' }}>

                {/* Category Filter Pills */}
                <div style={{
                    display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '1.5rem 0',
                    marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', scrollbarWidth: 'none'
                }}>
                    <button
                        onClick={() => setSelectedCategory('all')}
                        style={{
                            padding: '0.7rem 1.6rem', borderRadius: '100px', border: '1px solid',
                            borderColor: selectedCategory === 'all' ? 'var(--primary)' : '#e2e8f0',
                            background: selectedCategory === 'all' ? 'var(--primary)' : 'white',
                            color: selectedCategory === 'all' ? 'white' : '#64748b',
                            cursor: 'pointer', fontWeight: '700', whiteSpace: 'nowrap', transition: 'all 0.3s ease',
                            fontSize: '0.9rem'
                        }}
                    >
                        Semua Informasi
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '0.7rem 1.6rem', borderRadius: '100px', border: '1px solid',
                                borderColor: selectedCategory == cat.id ? 'var(--primary)' : '#e2e8f0',
                                background: selectedCategory == cat.id ? 'var(--primary)' : 'white',
                                color: selectedCategory == cat.id ? 'white' : '#64748b',
                                cursor: 'pointer', fontWeight: '700', whiteSpace: 'nowrap', transition: 'all 0.3s ease',
                                fontSize: '0.9rem'
                            }}
                        >
                            {cat.nama_kategori}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div style={{ position: 'relative', maxWidth: '500px', marginBottom: '2rem' }}>
                    <i className="fas fa-search" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                    <input
                        type="text"
                        placeholder="Cari dokumen informasi publik..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%', padding: '0.9rem 1.25rem 0.9rem 3rem',
                            borderRadius: '12px', border: '1px solid #e2e8f0',
                            fontSize: '0.95rem', outline: 'none', transition: 'all 0.3s ease',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--secondary)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.08)'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>

                {/* Table */}
                <div style={{ minHeight: '400px' }}>
                    {loadingData ? (
                        <div style={{ textAlign: 'center', padding: '5rem' }}>
                            <div className="ppid-spinner"></div>
                            <p style={{ marginTop: '1.5rem', color: '#94a3b8', fontWeight: '600' }}>Memuat Daftar Informasi...</p>
                        </div>
                    ) : filteredData.length > 0 ? (
                        <>
                            <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                            <th style={{ padding: '14px 16px', textAlign: 'center', color: '#64748b', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', width: '4%' }}>No</th>
                                            <th style={{ padding: '14px 16px', textAlign: 'left', color: '#64748b', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', width: '30%' }}>Informasi / Dokumen</th>
                                            <th style={{ padding: '14px 16px', textAlign: 'left', color: '#64748b', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', width: '18%' }}>Sub Kategori</th>
                                            <th style={{ padding: '14px 16px', textAlign: 'left', color: '#64748b', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', width: '14%' }}>Penanggung Jawab</th>
                                            <th style={{ padding: '14px 16px', textAlign: 'center', color: '#64748b', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', width: '11%' }}>Waktu & Tempat</th>
                                            <th style={{ padding: '14px 16px', textAlign: 'center', color: '#64748b', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', width: '9%' }}>Jangka Waktu</th>
                                            <th style={{ padding: '14px 16px', textAlign: 'center', color: '#64748b', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', width: '7%' }}>Status</th>
                                            <th style={{ padding: '14px 16px', textAlign: 'center', color: '#64748b', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', width: '7%' }}>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={index}
                                                style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.2s', background: 'white' }}
                                                onMouseOver={(e) => e.currentTarget.style.background = '#fafafa'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                                            >
                                                <td style={{ padding: '14px 16px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>
                                                    {indexOfFirstItem + index + 1}
                                                </td>
                                                <td style={{ padding: '14px 16px' }}>
                                                    <Link
                                                        to={`/ppid/detail/${item.id_content}`}
                                                        style={{ fontWeight: '700', color: 'var(--primary)', lineHeight: '1.4', display: 'block', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                                                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                                                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                                    >
                                                        {item.title_content || 'Dokumen Tanpa Judul'}
                                                    </Link>
                                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <span><i className="far fa-calendar-alt" style={{ marginRight: '4px' }}></i>{item.created ? new Date(item.created).toLocaleDateString('id-ID') : '-'}</span>
                                                        <span><i className="fas fa-eye" style={{ marginRight: '3px' }}></i>{item.hits || 0} dilihat</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '14px 16px', color: '#475569', fontSize: '0.82rem', lineHeight: '1.4' }}>
                                                    {item.title_sub_category || '-'}
                                                </td>
                                                <td style={{ padding: '14px 16px', color: '#475569', fontSize: '0.85rem', fontWeight: '500' }}>
                                                    {item.penanggung_jawab || '-'}
                                                </td>
                                                <td style={{ padding: '14px 16px', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>
                                                    {item.tgl_dan_tempat || item.tahun || '-'}
                                                </td>
                                                <td style={{ padding: '14px 16px', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>
                                                    {item.jangka_waktu || '-'}
                                                </td>
                                                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                    <span style={{
                                                        background: item.nm_status === 'Publish' ? '#dcfce7' : '#f1f5f9',
                                                        color: item.nm_status === 'Publish' ? '#16a34a' : '#64748b',
                                                        padding: '4px 10px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: '700'
                                                    }}>
                                                        {item.nm_status || 'Draft'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                                        <Link
                                                            to={`/ppid/detail/${item.id_content}`}
                                                            style={{ background: '#f1f5f9', color: 'var(--primary)', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s' }}
                                                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
                                                            onMouseOut={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = 'var(--primary)'; }}
                                                        >
                                                            <i className="fas fa-eye"></i> Detail
                                                        </Link>
                                                        {item.downloads && (
                                                            <a href={item.downloads} target="_blank" rel="noopener noreferrer"
                                                                style={{ background: 'var(--secondary)', color: 'white', padding: '6px 12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s' }}
                                                                onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
                                                                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                                                            >
                                                                <i className="fas fa-download"></i>
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Info + Pagination */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>
                                    Menampilkan {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredData.length)} dari {filteredData.length} dokumen
                                </p>

                                {totalPages > 1 && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={{
                                            padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0',
                                            background: 'white', color: 'var(--primary)', fontWeight: '800',
                                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                            opacity: currentPage === 1 ? 0.4 : 1, transition: 'all 0.3s ease'
                                        }}>
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                        {renderPageNumbers()}
                                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={{
                                            padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0',
                                            background: 'white', color: 'var(--primary)', fontWeight: '800',
                                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                            opacity: currentPage === totalPages ? 0.4 : 1, transition: 'all 0.3s ease'
                                        }}>
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '8rem 2rem', background: '#f8fafc', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                            <i className="fas fa-folder-open" style={{ fontSize: '4rem', marginBottom: '1.5rem', color: '#cbd5e1' }}></i>
                            <h3 style={{ color: 'var(--primary)', fontWeight: '800', marginBottom: '0.5rem' }}>Belum Ada Dokumen</h3>
                            <p style={{ color: '#64748b' }}>
                                {searchQuery ? `Tidak ada hasil untuk "${searchQuery}"` : 'Informasi untuk kategori ini belum tersedia.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .ppid-spinner { width: 45px; height: 45px; border: 4px solid #f1f5f9; border-top: 4px solid var(--secondary); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </ProfileLayout>
    );
};

export default PPIDPage;
