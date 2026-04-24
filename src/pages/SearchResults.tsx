/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Search, ChevronRight, Inbox } from 'lucide-react';
import { motion } from 'motion/react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = PRODUCTS.filter((product) => {
    const searchStr = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  return (
    <div className="py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
        <Link to="/" className="text-gray-900 hover:text-primary">Главная</Link>
        <ChevronRight className="w-3 h-3 text-gray-900" />
        <span className="text-gray-900">Результаты поиска</span>
      </nav>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-900">
          {query ? `Результаты по запросу "${query}"` : 'Все товары'}
        </h1>
        <span className="text-gray-900 font-bold">{results.length} товаров найдено</span>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 bg-white dark:bg-gray-900 rounded-[40px] shadow-2xl shadow-indigo-500/5 dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10" />
          <div className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-[32px] flex items-center justify-center shadow-xl rotate-3 relative z-10">
             <Inbox className="w-12 h-12 text-primary dark:text-blue-400 -rotate-3" />
          </div>
          <div className="max-w-md space-y-3 relative z-10">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Не смогли найти</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              К сожалению, по запросу <span className="font-bold text-gray-900 dark:text-white">"{query}"</span> ничего не нашлось. Попробуйте использовать более общие термины или загляните в наш каталог, там много интересного!
            </p>
          </div>
          <Link 
            to="/catalog" 
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl active:scale-95 relative z-10"
          >
            Перейти в каталог <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      )}

      {/* Suggested Search Terms */}
      {results.length === 0 && (
        <div className="space-y-4">
          <h3 className="font-black text-lg text-gray-900 dark:text-white">Популярные запросы:</h3>
          <div className="flex flex-wrap gap-3">
            {['LEGO', 'Робот', 'Коляска', 'Игрушки'].map((term) => (
              <Link
                key={term}
                to={`/search?q=${term}`}
                className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-bold hover:border-primary hover:text-primary transition-all text-gray-900 dark:text-white"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
