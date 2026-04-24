/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CATEGORIES, PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import * as Icons from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const getIcon = (name: string) => {
  const Icon = (Icons as any)[name];
  return Icon ? <Icon className="w-6 h-6" /> : null;
};

export default function Home() {
  const bestsellers = PRODUCTS.filter(p => p.isBestseller);
  const navigate = useNavigate();

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner */}
      <section className="relative h-[540px] rounded-3xl overflow-hidden group">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/50 to-transparent z-10" 
        />
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPI2U3kp7K9m6e0YbU3R0O5eRZYxCLEUntdDWj9qso22MKyCbP8SwJr0CBJkCh7aCvo_CnK0rpEMnc0kRdAk3ai0pikac2xbqvg6UqOoGoIySVX5OwhdYXeTkT9cdc7H5NX3fOjXRql_Qk440Uyt-pDzxDIn_B0jeZT8lHS8uGxWY2ywweYlgFinElqxsKI_xdHNS6nIgqeDcmMB7nx0iop8RK7BFoGr2VxhQEDDs41yrNPtyPRE5PYhPQpyGKbIEKmTtpe4B6QXj4"
          alt="Kids playing"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-16 max-w-2xl">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-secondary-container text-on-secondary-fixed text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-6 uppercase tracking-[0.2em]"
          >
            Новый сезон
          </motion.span>
          <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="text-6xl font-black text-white mb-6 leading-tight"
          >
            Создайте их мир с чудесами
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-10 leading-relaxed font-medium"
          >
            Откройте для себя нашу коллекцию развивающих игрушек и премиальной одежды для маленьких исследователей.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <Link to="/catalog" className="bg-white text-primary px-10 py-4 rounded-2xl font-bold hover:bg-surface-container-low transition-all active:scale-95 shadow-xl shadow-black/10">
              В магазин
            </Link>
            <button className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all active:scale-95">
              Смотреть тренды
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black tracking-tight text-gray-900">Поиск по категориям</h2>
          <Link to="/catalog" className="text-primary font-bold hover:underline">Смотреть все</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              onClick={() => navigate(`/catalog?category=${cat.id}`)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all group cursor-pointer text-center hover:shadow-lg"
            >
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-colors">
                <span className="text-primary group-hover:text-white transition-colors">
                  {getIcon(cat.icon)}
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Icons.Star className="w-7 h-7 text-secondary fill-secondary" />
          <h2 className="text-3xl font-black tracking-tight text-gray-900">Хиты продаж</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner - New Style */}
      <section className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-12 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-5xl font-black mb-6 leading-tight text-gray-900 dark:text-white">Муслиновый уют для самых маленьких</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Новая коллекция одежды из 100% натурального муслина. Только мягкость и комфорт.</p>
          <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-container transition-all">
            Смотреть коллекцию
          </button>
        </div>
        <div className="relative w-[400px] h-full flex items-center justify-center">
            <img 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMNtETnQujelI6zTzn2YrBpEp5tmHlRnJq_Mn2SXFE_4EYBELmnO0MhG59oaq-qE9xflRguajZ9P6Pzhzr5qA7NEV_oePnmJhs_BU-GF2eyZeyz3NcVILSCDyUPVV7AItWF2-YaSvo4ypJfRlnC14hytHivj5hfBo_Fg9rntgd3nK1KPeAIkieczb4Y9h_dSzhrnghPIqpTv8muz5i2I9n3VcGvWca6SZkvTnpL3R5NvlNhqkzJGM3bscpHaDhJpCDyUdoHcYFdCWw" 
               alt="Muslin collection"
               className="rounded-2xl shadow-2xl relative z-10 rotate-3 transition-transform hover:rotate-0 duration-500"
            />
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
        </div>
      </section>
    </div>
  );
}
