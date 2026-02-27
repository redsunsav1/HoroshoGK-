import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/layout';
import { AdminLayout } from './components/admin/AdminLayout';

// Pages
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { ProjectDetailPage } from './pages/projects/ProjectDetailPage';
import { AboutPage } from './pages/about/AboutPage';
import { TeamPage } from './pages/about/TeamPage';
import { VacancyPage } from './pages/about/VacancyPage';
import { AchievementsPage } from './pages/about/AchievementsPage';
import { BuyPage } from './pages/buy/BuyPage';
import { IpotekaPage } from './pages/buy/IpotekaPage';
import { RassrochkaPage } from './pages/buy/RassrochkaPage';
import { TradeInPage } from './pages/buy/TradeInPage';
import { MatkapitalPage } from './pages/buy/MatkapitalPage';
import { SocialSupportPage } from './pages/buy/SocialSupportPage';
import { AkciiPage } from './pages/buy/AkciiPage';
import { SvoPage } from './pages/buy/SvoPage';
import { NewsPage } from './pages/news/NewsPage';
import { NewsDetailPage } from './pages/news/NewsDetailPage';
import { ContactsPage } from './pages/ContactsPage';
import { FaqPage } from './pages/FaqPage';
import { InvestorsPage } from './pages/InvestorsPage';
export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Public Routes with Layout */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />

          {/* Projects */}
          <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
          <Route path="/projects/:slug" element={<Layout><ProjectDetailPage /></Layout>} />

          {/* About */}
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/about/team" element={<Layout><TeamPage /></Layout>} />
          <Route path="/about/vacancy" element={<Layout><VacancyPage /></Layout>} />
          <Route path="/about/achievements" element={<Layout><AchievementsPage /></Layout>} />

          {/* Buy */}
          <Route path="/buy" element={<Layout><BuyPage /></Layout>} />
          <Route path="/buy/ipoteka" element={<Layout><IpotekaPage /></Layout>} />
          <Route path="/buy/rassrochka" element={<Layout><RassrochkaPage /></Layout>} />
          <Route path="/buy/trade-in" element={<Layout><TradeInPage /></Layout>} />
          <Route path="/buy/materinskiy-kapital" element={<Layout><MatkapitalPage /></Layout>} />
          <Route path="/buy/social-support" element={<Layout><SocialSupportPage /></Layout>} />
          <Route path="/buy/akcii" element={<Layout><AkciiPage /></Layout>} />
          <Route path="/buy/svo" element={<Layout><SvoPage /></Layout>} />

          {/* News */}
          <Route path="/news" element={<Layout><NewsPage /></Layout>} />
          <Route path="/news/:slug" element={<Layout><NewsDetailPage /></Layout>} />

          {/* Contacts & FAQ */}
          <Route path="/contacts" element={<Layout><ContactsPage /></Layout>} />
          <Route path="/faq" element={<Layout><FaqPage /></Layout>} />

          {/* Investors */}
          <Route path="/investors" element={<Layout><InvestorsPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
