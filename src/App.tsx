/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BlogArticle, QUOTE_CATEGORIES } from './data/importNowData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ImportJourney } from './components/ImportJourney';
import { ProductCategories } from './components/ProductCategories';
import { ShanghaiOffice } from './components/ShanghaiOffice';
import { ChinaTrips } from './components/ChinaTrips';
import { CompletedProjects } from './components/CompletedProjects';
import { Testimonials } from './components/Testimonials';
import { BlogSection } from './components/BlogSection';
import { ArticleModal } from './components/ArticleModal';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState<string>(QUOTE_CATEGORIES[0]);
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  const handleOpenArticle = (article: BlogArticle) => {
    setActiveArticle(article);
    setArticleModalOpen(true);
  };

  const handleOpenAllArticles = () => {
    setActiveArticle(null);
    setArticleModalOpen(true);
  };

  const handleCloseModal = () => {
    setArticleModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#0B132B]">
      {/* 1. Navigation Bar */}
      <Navbar />

      <main>
        {/* 2. Hero Section with Headline, 3D Trade Globe, Statistics & Route Marquee */}
        <Hero />

        {/* 3. Six Service Cards */}
        <Services />

        {/* 4. Six-Step Importing Process with 3D Container Ship Voyage */}
        <ImportJourney />

        {/* 5. Product Categories (Six Chinese Manufacturing Hubs) */}
        <ProductCategories onSelectCategory={setSelectedQuoteCategory} />

        {/* 6. China Office Information & Shanghai Business Licence */}
        <ShanghaiOffice />

        {/* 7. China Business Trips (Canton Fair) */}
        <ChinaTrips
          onSelectTripQuote={() =>
            setSelectedQuoteCategory('China business trip / Canton Fair')
          }
        />

        {/* 8. Completed Projects */}
        <CompletedProjects />

        {/* 9. Customer Testimonials */}
        <Testimonials />

        {/* 10. Blog / Import Guides Section */}
        <BlogSection
          onOpenArticle={handleOpenArticle}
          onOpenAllArticles={handleOpenAllArticles}
        />

        {/* 11. FAQ Section */}
        <FaqSection />

        {/* 12. Contact & Quotation Form */}
        <ContactSection
          selectedCategory={selectedQuoteCategory}
          onCategoryChange={setSelectedQuoteCategory}
        />
      </main>

      {/* 13. Footer & Floating WhatsApp Button */}
      <Footer
        onOpenArticle={handleOpenArticle}
        onOpenAllArticles={handleOpenAllArticles}
      />

      {/* Interactive Import Guides Reader Modal */}
      <ArticleModal
        isOpen={articleModalOpen}
        article={activeArticle}
        onClose={handleCloseModal}
        onSelectArticle={setActiveArticle}
      />
    </div>
  );
}
