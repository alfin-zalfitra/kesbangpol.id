import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serviceLinks } from '../data/links';

const RedirectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const targetUrl = serviceLinks[id];

        if (targetUrl) {
            // Log if needed
            console.log(`Redirecting to: ${targetUrl}`);
            // Small timeout to show it's working or just direct redirect
            window.location.href = targetUrl;
        } else {
            // Not found, go home
            console.warn(`Link ID "${id}" not found.`);
            navigate('/', { replace: true });
        }
    }, [id, navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--primary)',
            color: 'white',
            fontFamily: 'inherit'
        }}>
            <div style={{
                width: '50px',
                height: '50px',
                border: '3px solid rgba(255, 255, 255, 0.1)',
                borderTop: '3px solid var(--accent)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '1.5rem'
            }} />
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Mengarahkan Anda ke halaman...</h2>
            <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Mohon tunggu sebentar.</p>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default RedirectPage;
