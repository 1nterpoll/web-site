/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = React.useState(searchParams.get('category') || 'all');
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState({ min: '', max: '' });

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const allBrands = React.useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.brand))), []);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const categoryMatch = selectedCategory === 'all' || p.category === CATEGORIES.find(c => c.id === selectedCategory)?.name;
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    
    // Use price instead of oldPrice for filtering, fallback to 0 if not set.
    const productPrice = p.price || 0;
    const minPriceMatch = priceRange.min === '' || productPrice >= Number(priceRange.min);
    const maxPriceMatch = priceRange.max === '' || productPrice <= Number(priceRange.max);
    
    return categoryMatch && brandMatch && minPriceMatch && maxPriceMatch;
  });

  return (
    <div className="flex gap-12 py-8">
      {/* Sidebar Filters */}
      <aside className="w-64 space-y-10 shrink-0 sticky top-32 h-fit">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-black">Фильтры</h2>
          {(selectedCategory !== 'all' || selectedBrands.length > 0 || priceRange.min !== '' || priceRange.max !== '') && (
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrands([]);
                setPriceRange({ min: '', max: '' });
              }}
              className="text-sm font-bold text-gray-500 hover:text-primary transition-colors"
            >
              Сбросить
            </button>
          )}
        </div>
        <section>
          <h3 className="text-xl font-black mb-6 text-black">Категории</h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold ${
                selectedCategory === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Все товары
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold ${
                  selectedCategory === cat.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-black">Фильтры</h3>
            <SlidersHorizontal className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-900 block mb-4">Цена</label>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    placeholder="От $0" 
                    className="w-full h-10 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20" 
                  />
                  <span className="text-gray-400 dark:text-gray-600">—</span>
                  <input 
                    type="number" 
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    placeholder="До $500" 
                    className="w-full h-10 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-900 block mb-4">Бренды</label>
              <div className="space-y-3">
                {allBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-5 h-5 rounded-lg border-gray-300 dark:border-gray-600 text-primary focus:ring-primary bg-transparent" 
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>
      </aside>

      {/* Product Grid Area */}
      <main className="flex-1 space-y-8">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Link to="/" className="text-gray-900 hover:text-primary">Главная</Link>
            <ChevronRight className="w-3 h-3 text-gray-900" />
            <span className="text-gray-900">Каталог</span>
          </nav>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-900">Сортировка:</span>
            <select className="bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-primary-container outline-none text-gray-900 dark:text-white cursor-pointer">
              <option>Сначала популярные</option>
              <option>Сначала новые</option>
              <option>Сначала дешевые</option>
              <option>Сначала дорогие</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <Filter className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4 opacity-20" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">К сожалению, ничего не найдено.</p>
          </div>
        )}

        <div className="pt-12 flex justify-center">
          <button className="px-12 py-4 bg-white border-2 border-primary text-primary rounded-2xl font-bold hover:bg-primary hover:text-white transition-all active:scale-95">
            Загрузить еще
          </button>
        </div>
      </main>
    </div>
  );
}
