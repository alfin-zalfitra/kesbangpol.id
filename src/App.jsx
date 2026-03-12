import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import News from './components/News';
import Footer from './components/Footer';
import VisiMisi from './components/VisiMisi';
import Agenda from './components/Agenda';
import Gallery from './components/Gallery';
import QuickAccess from './components/QuickAccess';
import WhatsAppBot from './components/WhatsAppBot';
import Loader from './components/Loader';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AllNewsPage from './pages/AllNewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import AllAgendaPage from './pages/AllAgendaPage';
import AgendaDetailPage from './pages/AgendaDetailPage';
import AllGalleryPage from './pages/AllGalleryPage';
import GalleryDetailPage from './pages/GalleryDetailPage';
import ProfilePage from './pages/ProfilePage';
import KataSambutan from './pages/profil/KataSambutan';
import VisiMisiPage from './pages/profil/VisiMisiPage';
import Ideologi from './pages/profil/Ideologi';
import Politik from './pages/profil/Politik';
import Kewaspadaan from './pages/profil/Kewaspadaan';
import Sekretariat from './pages/profil/Sekretariat';
import TugasFungsi from './pages/profil/TugasFungsi';
import DaftarPegawai from './pages/profil/DaftarPegawai';
import StrukturOrganisasi from './pages/profil/StrukturOrganisasi';
import RedirectPage from './pages/RedirectPage';
import AccessibilityMenu from './components/AccessibilityMenu';

const HomePage = () => (
  <>
    <TopBar />
    <Navbar />
    <Hero />
    <main>
      <VisiMisi />
      <News />
      <Agenda />
      <Gallery />
      <QuickAccess />
    </main>
    <Footer />
    <WhatsAppBot />
  </>
);

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="app app-ready">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/berita-lengkap" element={<AllNewsPage />} />
          <Route path="/berita-detail/:id" element={<NewsDetailPage />} />
          <Route path="/agenda-lengkap" element={<AllAgendaPage />} />
          <Route path="/agenda-detail/:id" element={<AgendaDetailPage />} />
          <Route path="/galeri-lengkap" element={<AllGalleryPage />} />
          <Route path="/galeri-detail/:id" element={<GalleryDetailPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/profil/sambutan" element={<KataSambutan />} />
          <Route path="/profil/visi-misi" element={<VisiMisiPage />} />
          <Route path="/profil/unit-kerja/ideologi" element={<Ideologi />} />
          <Route path="/profil/unit-kerja/politik" element={<Politik />} />
          <Route path="/profil/unit-kerja/kewaspadaan" element={<Kewaspadaan />} />
          <Route path="/profil/unit-kerja/sekretariat" element={<Sekretariat />} />
          <Route path="/profil/tugas-fungsi" element={<TugasFungsi />} />
          <Route path="/profil/pegawai" element={<DaftarPegawai />} />
          <Route path="/profil/struktur" element={<StrukturOrganisasi />} />
          <Route path="/services/:id" element={<RedirectPage />} />
        </Routes>
        <AccessibilityMenu />
      </div>
    </Router>
  );
}

export default App;
