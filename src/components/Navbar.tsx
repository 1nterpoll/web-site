/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingCart, User, Search, Sun, Moon, Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { EXCHANGE_RATES, CurrencyCode } from '../constants';

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { currency, setCurrency } = useCurrency();
  const [isDark, setIsDark] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Категории', href: '/catalog' },
    { name: 'Бренды', href: '/catalog?focus=brands' },
    { name: 'Акции', href: '/catalog?promo=true' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between py-4 sm:h-20 sm:py-0">
        <div className="flex items-center gap-4 sm:gap-12">
          <Link to="/" className="text-2xl font-black text-primary dark:text-blue-400 tracking-tight">
            KidsMarket
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium transition-colors hover:text-primary-container ${
                  location.pathname === link.href ? 'text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full sm:flex-1 max-w-md mt-4 sm:mt-0 sm:mx-8 order-last sm:order-none">
          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-primary w-5 h-5 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск..."
              className="w-full h-11 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:ring-2 focus:ring-primary-container font-medium text-sm transition-all text-gray-900 dark:text-white"
            />
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <div className="flex items-center text-sm font-bold text-gray-600 dark:text-gray-400">
            <span className="text-primary">RU</span>
            <span className="mx-1 text-gray-400 dark:text-gray-500">/</span>
            <button className="hover:text-primary">EN</button>
          </div>

          <div className="flex bg-gray-50 dark:bg-gray-800 rounded-xl p-1 gap-0.5">
            {(Object.keys(EXCHANGE_RATES) as CurrencyCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                  currency === code
                    ? 'bg-white dark:bg-gray-700 text-primary shadow-sm scale-110 z-10'
                    : 'text-gray-400 dark:text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link to="/wishlist" className="relative text-gray-600 dark:text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-secondary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <User className="w-5 h-5" />
          </Link>

          <Link to="/cart" className="relative text-gray-600 dark:text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-1 right-1 bg-tertiary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              3
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
