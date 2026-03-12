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
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const revRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const revData = await revRes.json();
                        const city = revData.address.city || revData.address.town || revData.address.village || 'Lokasi Terdeteksi';
                        fetchWeatherData(latitude, longitude, `${city}, ${revData.address.state || 'Sumatera Barat'}`);
                    } catch (e) {
                        try {
                            const locRes = await fetch('https://ipapi.co/json/');
                            const locData = await locRes.json();
                            fetchWeatherData(latitude, longitude, `${locData.city || 'Padang'}, ${locData.region || 'Sumatera Barat'}`);
                        } catch (e2) {
                            fetchWeatherData(latitude, longitude, 'Pesisir Selatan, Sumatera Barat');
                        }
                    }
                }, async () => {
                    // Fallback to IP if geolocation is denied or fails
                    try {
                        const locRes = await fetch('https://ipapi.co/json/');
                        const locData = await locRes.json();
                        fetchWeatherData(locData.latitude, locData.longitude, `${locData.city}, ${locData.region}`);
                    } catch (e) {
                        fetchWeatherData(-0.9471, 100.4172, 'Padang, Sumatera Barat');
                    }
                });
            } else {
                // Fallback to IP if geolocation is not supported
                try {
                    const locRes = await fetch('https://ipapi.co/json/');
                    const locData = await locRes.json();
                    fetchWeatherData(locData.latitude, locData.longitude, `${locData.city}, ${locData.region}`);
                } catch (e) {
                    fetchWeatherData(-0.9471, 100.4172, 'Padang, Sumatera Barat');
                }
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
            background: '#071d33',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.8rem',
            padding: '0.5rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            zIndex: 1001
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <span>📅 {formatDate(time)}</span>
                    <span>📍 {location}</span>
                    <span>{weather.icon} {weather.temp}°C {weather.condition}</span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#" style={{ color: 'white' }}>Email Dinas</a>
                    <a href="/services/lapor" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Lapor!</a>
                    <a href="/services/ppid-info" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: '700' }}>PPID</a>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
