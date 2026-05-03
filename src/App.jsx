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
import CategoryPage from './pages/CategoryPage';
import AnnouncementPage from './pages/AnnouncementPage';
import MediaPage from './pages/MediaPage';
import ContactPage from './pages/ContactPage';
import PPIDPage from './pages/PPIDPage';
import PPIDDetail from './pages/PPIDDetail';
import RedirectPage from './pages/RedirectPage';
import NewsDetail from './pages/user/news/detail';
import NewsIndex from './pages/user/news/index';
import AgendaDetail from './pages/user/agenda/detail';
import AgendaIndex from './pages/user/agenda/index';
import GalleryDetail from './pages/user/gallery/detail';
import GalleryIndex from './pages/user/gallery/index';
import VideoDetail from './pages/user/video/detail';
import VideoIndex from './pages/user/video/index';
import PublicationIndex from './pages/user/publikasi/PublicationIndex';
import PublicationDetail from './pages/user/publikasi/detail';
import StaticPage from './pages/user/halamanStatis/StaticPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AccessibilityMenu from './components/AccessibilityMenu';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => (
  <>
    <TopBar />
    <Navbar />
    <Hero />
    <main>
      <QuickAccess />
      <VisiMisi />
      <News />
      <Agenda />
      <Gallery />
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
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <Router>
      <ScrollToHash />
      <div className="app app-ready">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Static Pages from API */}
          <Route path="/profil/visi-misi" element={<StaticPage slug="visi-misi" />} />
          <Route path="/profil/tugas-fungsi" element={<StaticPage slug="tugas-dan-fungsi" />} />
          <Route path="/profil/struktur" element={<StaticPage slug="struktur-organisasi" />} />
          <Route path="/profil/lhkpn" element={<StaticPage slug="lhkpn" />} />
          <Route path="/profil/sejarah" element={<StaticPage slug="sejarah-singkat" />} />
          <Route path="/profil/pejabat" element={<StaticPage slug="profil-pejabat" />} />
          <Route path="/ppid" element={<PPIDPage />} />
          <Route path="/ppid/:sub" element={<PPIDPage />} />
          <Route path="/ppid/:sub/:id" element={<PPIDPage />} />
          <Route path="/ppid/detail/:id" element={<PPIDDetail />} />
          <Route path="/kontak" element={<ContactPage />} />
          
          {/* Dynamic Category Pages */}
          <Route path="/berita" element={<NewsIndex />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          
          {/* News Detail */}
          <Route path="/berita-detail/:slug" element={<NewsDetail />} />
          <Route path="/berita-lengkap" element={<NewsIndex />} />

          {/* Agenda */}
          <Route path="/agenda" element={<AgendaIndex />} />
          <Route path="/agenda-detail/:slug" element={<AgendaDetail />} />
          <Route path="/agenda-lengkap" element={<AgendaIndex />} />

          {/* Gallery */}
          <Route path="/galeri" element={<GalleryIndex />} />
          <Route path="/galeri-detail/:slug" element={<GalleryDetail />} />
          <Route path="/galeri-lengkap" element={<GalleryIndex />} />

          {/* Video */}
          <Route path="/video" element={<VideoIndex />} />
          <Route path="/video-detail/:slug" element={<VideoDetail />} />
          
          {/* Publication / Kategori Dinamis */}
          <Route path="/publikasi/:category" element={<PublicationIndex />} />
          <Route path="/publikasi-detail/:category/:slug" element={<PublicationDetail />} />
          
          {/* Special Pages */}
          <Route path="/pengumuman" element={<AnnouncementPage />} />
          <Route path="/media/video" element={<MediaPage type="video" />} />
          <Route path="/kontak" element={<ContactPage />} />
          
          {/* Fallbacks */}
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/services/:id" element={<RedirectPage />} />
        </Routes>
        <AccessibilityMenu />
      </div>
    </Router>
  );
}

export default App;
