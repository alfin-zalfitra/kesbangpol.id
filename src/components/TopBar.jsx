import React, { useState, useEffect } from 'react';

const TopBar = () => {
    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState({ temp: '--', condition: 'Memuat...', icon: '⌛' });
    const [location, setLocation] = useState('Sedang memuat lokasi...');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        const fetchWeatherData = async (lat, lon, label) => {
            try {
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
                const weatherData = await weatherRes.json();

                const temp = Math.round(weatherData.current_weather.temperature);
                const code = weatherData.current_weather.weathercode;

                let condition = 'Cerah';
                let icon = '☀️';

                if (code === 0) {
                    condition = 'Cerah'; icon = '☀️';
                } else if (code >= 1 && code <= 3) {
                    condition = 'Cerah Berawan'; icon = '🌤️';
                } else if (code >= 45 && code <= 48) {
                    condition = 'Berawan'; icon = '☁️';
                } else if (code >= 51 && code <= 55) {
                    condition = 'Gerimis'; icon = '🌦️';
                } else if (code >= 61 && code <= 86) {
                    condition = 'Hujan'; icon = '🌧️';
                } else if (code >= 95) {
                    condition = 'Badai Petir'; icon = '⛈️';
                }

                setWeather({ temp, condition, icon });
                if (label) setLocation(label);
            } catch (error) {
                console.error('Weather error:', error);
            }
        };

        const getFullLocation = async () => {
            // Default location as fallback
            const defaultLat = -1.3521;
            const defaultLon = 100.5732;
            const defaultLabel = 'Pesisir Selatan, Sumatera Barat';

            const tryIpLocation = async () => {
                try {
                    // Using a more CORS-friendly service or a simpler fallback
                    const locRes = await fetch('https://ipinfo.io/json?token='); // Use free tier or similar
                    if (!locRes.ok) throw new Error('IP lookup failed');
                    const locData = await locRes.json();
                    const [lat, lon] = locData.loc.split(',');
                    return { lat, lon, label: `${locData.city}, ${locData.region}` };
                } catch (e) {
                    try {
                        const locRes2 = await fetch('https://api.db-ip.com/v2/free/self');
                        const locData2 = await locRes2.json();
                        return { lat: defaultLat, lon: defaultLon, label: `${locData2.city || 'Padang'}, ${locData2.stateProv || 'Sumatera Barat'}` };
                    } catch (e2) {
                        return { lat: defaultLat, lon: defaultLon, label: defaultLabel };
                    }
                }
            };

            if ("geolocation" in navigator) {
                // Check if permission was already denied to avoid console spam
                navigator.permissions && navigator.permissions.query({ name: 'geolocation' }).then(result => {
                    if (result.state === 'denied') {
                        tryIpLocation().then(loc => fetchWeatherData(loc.lat, loc.lon, loc.label));
                        return;
                    }
                    
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            try {
                                const revRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                                const revData = await revRes.json();
                                const city = revData.address.city || revData.address.town || revData.address.village || 'Lokasi Terdeteksi';
                                fetchWeatherData(latitude, longitude, `${city}, ${revData.address.state || 'Sumatera Barat'}`);
                            } catch (e) {
                                fetchWeatherData(latitude, longitude, defaultLabel);
                            }
                        },
                        async () => {
                            const loc = await tryIpLocation();
                            fetchWeatherData(loc.lat, loc.lon, loc.label);
                        },
                        { timeout: 5000 }
                    );
                }).catch(() => {
                    // Fallback for browsers that don't support permissions.query
                    tryIpLocation().then(loc => fetchWeatherData(loc.lat, loc.lon, loc.label));
                });
            } else {
                const loc = await tryIpLocation();
                fetchWeatherData(loc.lat, loc.lon, loc.label);
            }
        };

        getFullLocation();
        const weatherInterval = setInterval(getFullLocation, 1800000); // Update every 30 mins

        return () => {
            clearInterval(timer);
            clearInterval(weatherInterval);
        };
    }, []);

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    };

    return (
        <div className="top-bar" style={{
            background: 'var(--primary)',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.75rem',
            padding: '0.6rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            zIndex: 1001,
            fontWeight: '500'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <i className="far fa-calendar-alt" style={{ color: 'var(--secondary)' }}></i>
                        <span>{formatDate(time)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: 'var(--secondary)' }}></i>
                        <span>{location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <i className={`fas ${weather.condition.includes('Hujan') ? 'fa-cloud-showers-heavy' : weather.condition.includes('Awan') ? 'fa-cloud-sun' : 'fa-sun'}`} style={{ color: 'var(--secondary)' }}></i>
                        <span>{weather.temp}°C {weather.condition}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <a href="https://mail.sumbarprov.go.id" target="_blank" rel="noopener noreferrer" className="top-bar-link">
                        <i className="far fa-envelope" style={{ marginRight: '0.4rem' }}></i> Email Dinas
                    </a>
                    <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }}></span>
                    <a href="https://www.lapor.go.id" target="_blank" rel="noopener noreferrer" className="top-bar-link">
                        <i className="fas fa-bullhorn" style={{ marginRight: '0.4rem' }}></i> Lapor!
                    </a>
                    <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }}></span>
                    <a href="/ppid" className="top-bar-link ppid-highlight">
                        <i className="fas fa-info-circle" style={{ marginRight: '0.4rem' }}></i> PPID
                    </a>
                </div>
            </div>
            <style>{`
                .top-bar-link {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                }
                .top-bar-link:hover {
                    color: white;
                }
                .ppid-highlight {
                    color: var(--secondary) !important;
                    font-weight: 700;
                }
                .ppid-highlight:hover {
                    opacity: 0.8;
                }
                @media (max-width: 992px) {
                    .top-bar { display: none; }
                }
            `}</style>
        </div>
    );
};

export default TopBar;
