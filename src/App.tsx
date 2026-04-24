/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import SearchResults from './pages/SearchResults';
import { WishlistProvider } from './contexts/WishlistContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import ChatSupport from './components/ChatSupport';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-surface transition-colors duration-200">
      <Navbar />
      <main className="flex-grow pt-32 sm:pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <ChatSupport />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <WishlistProvider>
        <CurrencyProvider>
          <AppContent />
        </CurrencyProvider>
      </WishlistProvider>
    </Router>
  );
}

