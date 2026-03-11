import React from 'react';

const WhatsAppBot = () => {
    return (
        <a
            href="/services/wa-bot"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                width: '60px',
                height: '60px',
                background: '#25d366',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                zIndex: 9999,
                fontSize: '2rem',
                textDecoration: 'none',
                transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        >
            <span style={{ color: 'white' }}>💬</span>
        </a>
    );
};

export default WhatsAppBot;
