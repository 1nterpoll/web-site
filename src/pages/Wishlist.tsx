/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="py-8 min-h-screen">
      <header className="mb-12">
        <h1 className="text-5xl font-black text-black mb-4 tracking-tight">Избранное</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          {wishlist.length === 0 
            ? 'Здесь будут товары, которые вам понравились.' 
            : `У вас ${wishlist.length} сохраненных товаров.`}
        </p>
      </header>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-rose-500/5 dark:shadow-none rounded-[40px] py-28 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-rose-500/5 to-transparent" />
          <div className="w-28 h-28 bg-rose-100 dark:bg-rose-900/30 rounded-[36px] flex items-center justify-center mx-auto mb-10 rotate-6 shadow-xl relative z-10">
            <Heart className="w-14 h-14 text-rose-500 dark:text-rose-400 -rotate-6 fill-rose-500/20" />
          </div>
          <div className="relative z-10 max-w-md mx-auto space-y-4 mb-10">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Ничего не отложено</h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Собирайте здесь игрушки, которые вам понравились. Так вы сможете легко сравнить их и сделать лучший выбор для вашего ребенка.
            </p>
          </div>
          <Link 
            to="/catalog" 
            className="inline-flex items-center gap-3 bg-rose-500 text-white px-12 py-5 rounded-2xl font-black hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20 active:scale-95 relative z-10"
          >
            Искать сокровища <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      )}

      {/* Featured Recommendations if Empty (Optional) */}
      {wishlist.length === 0 && (
         <section className="mt-24">
            <h3 className="text-2xl font-black mb-8 text-gray-900 dark:text-white">Посмотрите эти новинки</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 opacity-60">
                {/* We could use real products here, but let's keep it simple for now or show first 4 */}
            </div>
         </section>
      )}
    </div>
  );
}
