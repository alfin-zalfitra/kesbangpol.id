import React, { useState, useEffect } from 'react';
import '../styles/AccessibilityMenu.css';

const translations = {
    id: {
        title: "MENU AKSESIBILITAS",
        voiceMode: "Mode Pembaca Suara",
        voiceDesc: "Klik elemen untuk membacakan teks (Bahasa Indonesia).",
        textSize: "Ukuran Teks",
        lineHeight: "Jarak Baris",
        letterSpacing: "Spasi Antar Huruf",
        letterNormal: "Normal",
        letterMedium: "Sedang",
        letterLarge: "Lebar",
        visualAdjustment: "PENYESUAIAN VISUAL",
        boldText: "Teks Tebal",
        highlightLinks: "Sorot Link",
        monochrome: "Monokrom",
        highContrast: "Kontras Tinggi",
        largeCursor: "Kursor Besar",
        stopAnimations: "Jeda Animasi",
        reset: "Kembalikan Default",
        langLabel: "Bahasa Menu"
    },
    en: {
        title: "ACCESSIBILITY MENU",
        voiceMode: "Voice Reader Mode",
        voiceDesc: "Click elements to read the text (Indonesian voice).",
        textSize: "Text Size",
        lineHeight: "Line Height",
        letterSpacing: "Letter Spacing",
        letterNormal: "Normal",
        letterMedium: "Medium",
        letterLarge: "Wide",
        visualAdjustment: "VISUAL ADJUSTMENTS",
        boldText: "Bold Text",
        highlightLinks: "Highlight Links",
        monochrome: "Monochrome",
        highContrast: "High Contrast",
        largeCursor: "Large Cursor",
        stopAnimations: "Pause Animations",
        reset: "Reset Defaults",
        langLabel: "Menu Language"
    },
    min: {
        title: "MENU AKSESIBILITAS",
        voiceMode: "Mode Pembaco Suaro",
        voiceDesc: "Klik elemen untuak membacoan teks (Bahasa Indonesia).",
        textSize: "Ukuran Teks",
        lineHeight: "Jarak Barih",
        letterSpacing: "Spasi Antar Hurup",
        letterNormal: "Biaso",
        letterMedium: "Sadang",
        letterLarge: "Leba",
        visualAdjustment: "PANGRANCANGAN VISUAL",
        boldText: "Teks Taba",
        highlightLinks: "Sorot Link",
        monochrome: "Monokrom",
        highContrast: "Kontras Tinggi",
        largeCursor: "Kursor Gadang",
        stopAnimations: "Baranti Animasi",
        reset: "Baliakan asal",
        langLabel: "Bahaso Menu"
    }
};

const AccessibilityMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState('id');
    const [voiceMode, setVoiceMode] = useState(false);
    const [fontSize, setFontSize] = useState(100);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [textSpacing, setTextSpacing] = useState('normal');
    const [textAlign, setTextAlign] = useState('left');
    const [isBold, setIsBold] = useState(false);
    const [highlightLinks, setHighlightLinks] = useState(false);
    const [isMonochrome, setIsMonochrome] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [largeCursor, setLargeCursor] = useState(false);
    const [stopAnimations, setStopAnimations] = useState(false);
    const [hideImages, setHideImages] = useState(false);

    const t = translations[lang];

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        root.style.fontSize = `${fontSize}%`;
        body.style.lineHeight = lineHeight;

        if (textSpacing === 'small') body.style.letterSpacing = '1px';
        else if (textSpacing === 'medium') body.style.letterSpacing = '2px';
        else if (textSpacing === 'large') body.style.letterSpacing = '3px';
        else body.style.letterSpacing = 'normal';

        body.style.textAlign = textAlign;
        body.style.fontWeight = isBold ? 'bold' : 'normal';

        const handleSpeech = (e) => {
            if (!voiceMode) return;
            window.speechSynthesis.cancel();
            const target = e.target;
            const textToSpeak = target.innerText || target.getAttribute('aria-label') || target.alt;

            if (textToSpeak && ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'A', 'BUTTON', 'SPAN', 'LI'].includes(target.tagName)) {
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = 'id-ID';
                utterance.rate = 1.0;
                window.speechSynthesis.speak(utterance);
            }
        };

        if (voiceMode) {
            document.addEventListener('mouseover', handleSpeech);
            document.addEventListener('focusin', handleSpeech);
        }

        const applyClass = (condition, className) => {
            if (condition) body.classList.add(className);
            else body.classList.remove(className);
        };

        applyClass(highlightLinks, 'acc-highlight-links');
        applyClass(isMonochrome, 'acc-monochrome');
        applyClass(highContrast, 'acc-high-contrast');
        applyClass(largeCursor, 'acc-large-cursor');
        applyClass(stopAnimations, 'acc-stop-animations');
        applyClass(hideImages, 'acc-hide-images');

        return () => {
            document.removeEventListener('mouseover', handleSpeech);
            document.removeEventListener('focusin', handleSpeech);
            window.speechSynthesis.cancel();
        };

    }, [fontSize, lineHeight, textSpacing, textAlign, isBold, highlightLinks, isMonochrome, highContrast, largeCursor, stopAnimations, hideImages, voiceMode]);

    const resetSettings = () => {
        setVoiceMode(false);
        setFontSize(100);
        setLineHeight(1.5);
        setTextSpacing('normal');
        setTextAlign('left');
        setIsBold(false);
        setHighlightLinks(false);
        setIsMonochrome(false);
        setHighContrast(false);
        setLargeCursor(false);
        setStopAnimations(false);
        setHideImages(false);
    };

    return (
        <div className={`accessibility-system ${isOpen ? 'show-panel' : ''}`}>
            {/* Toggle Button */}
            <button className="acc-trigger" onClick={() => setIsOpen(true)} title={t.title}>
                <i className="fas fa-universal-access"></i>
            </button>

            {/* Main Panel Overlay */}
            <div className="acc-overlay" onClick={() => setIsOpen(false)}></div>

            <div className="acc-modal">
                <div className="acc-header">
                    <div>
                        <h2>{t.title}</h2>
                        <div className="acc-header-line"></div>
                    </div>
                    <button className="acc-close" onClick={() => setIsOpen(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="acc-body">
                    {/* Language Selector */}
                    <div className="acc-card">
                        <div className="acc-label-mini" style={{ marginBottom: '10px' }}>
                            <i className="fas fa-globe"></i>
                            <span>{t.langLabel}</span>
                        </div>
                        <div className="acc-tab-group">
                            <button className={lang === 'id' ? 'active' : ''} onClick={() => setLang('id')}>Indo</button>
                            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>Eng</button>
                            <button className={lang === 'min' ? 'active' : ''} onClick={() => setLang('min')}>Minang</button>
                        </div>
                    </div>

                    {/* Voice Mode */}
                    <div className="acc-card">
                        <div className="acc-row">
                            <div className="acc-label">
                                <i className="fas fa-volume-up"></i>
                                <span>{t.voiceMode}</span>
                            </div>
                            <div className={`acc-toggle-modern ${voiceMode ? 'on' : ''}`} onClick={() => setVoiceMode(!voiceMode)}>
                                <div className="toggle-dot"></div>
                            </div>
                        </div>
                        <p className="acc-desc">{t.voiceDesc}</p>
                    </div>

                    {/* Text Settings Grid */}
                    <div className="acc-grid">
                        <div className="acc-card compact">
                            <div className="acc-label-mini">
                                <i className="fas fa-font"></i>
                                <span>{t.textSize}</span>
                            </div>
                            <div className="acc-control-modern">
                                <button onClick={() => setFontSize(prev => Math.max(80, prev - 10))}><i className="fas fa-minus"></i></button>
                                <span>{fontSize}%</span>
                                <button onClick={() => setFontSize(prev => Math.min(200, prev + 10))}><i className="fas fa-plus"></i></button>
                            </div>
                        </div>

                        <div className="acc-card compact">
                            <div className="acc-label-mini">
                                <i className="fas fa-arrows-alt-v"></i>
                                <span>{t.lineHeight}</span>
                            </div>
                            <div className="acc-control-modern">
                                <button onClick={() => setLineHeight(prev => Math.max(1, prev - 0.25))}><i className="fas fa-minus"></i></button>
                                <span>{lineHeight}x</span>
                                <button onClick={() => setLineHeight(prev => Math.min(3, prev + 0.25))}><i className="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>

                    {/* Text Spacing */}
                    <div className="acc-card">
                        <div className="acc-label-mini" style={{ marginBottom: '10px' }}>
                            <i className="fas fa-arrows-alt-h"></i>
                            <span>{t.letterSpacing}</span>
                        </div>
                        <div className="acc-tab-group">
                            <button className={textSpacing === 'normal' ? 'active' : ''} onClick={() => setTextSpacing('normal')}>{t.letterNormal}</button>
                            <button className={textSpacing === 'medium' ? 'active' : ''} onClick={() => setTextSpacing('medium')}>{t.letterMedium}</button>
                            <button className={textSpacing === 'large' ? 'active' : ''} onClick={() => setTextSpacing('large')}>{t.letterLarge}</button>
                        </div>
                    </div>

                    {/* Quick Toggles Section */}
                    <div className="acc-section-title">{t.visualAdjustment}</div>
                    <div className="acc-toggles-grid">
                        {[
                            { icon: 'fa-bold', label: t.boldText, state: isBold, set: setIsBold },
                            { icon: 'fa-external-link-alt', label: t.highlightLinks, state: highlightLinks, set: setHighlightLinks },
                            { icon: 'fa-tint-slash', label: t.monochrome, state: isMonochrome, set: setIsMonochrome },
                            { icon: 'fa-adjust', label: t.highContrast, state: highContrast, set: setHighContrast },
                            { icon: 'fa-mouse-pointer', label: t.largeCursor, state: largeCursor, set: setLargeCursor },
                            { icon: 'fa-stop-circle', label: t.stopAnimations, state: stopAnimations, set: setStopAnimations },
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                className={`acc-quick-btn ${item.state ? 'active' : ''}`}
                                onClick={() => item.set(!item.state)}
                            >
                                <i className={`fas ${item.icon}`}></i>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="acc-footer">
                    <button className="acc-btn-reset" onClick={resetSettings}>
                        <i className="fas fa-undo-alt"></i> {t.reset}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityMenu;

