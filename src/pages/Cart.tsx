/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PRODUCTS } from '../constants';
import { Minus, Plus, Trash2, ArrowRight, Lock, Verified, History, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../contexts/CurrencyContext';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

export default function Cart() {
  const { formatPrice } = useCurrency();
  const { cartItems, updateQuantity, removeItem, isGiftWrap, setIsGiftWrap, giftMessage, setGiftMessage } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const giftWrapPrice = 5.00;
  const shipping = 12.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax + (isGiftWrap ? giftWrapPrice : 0);

  return (
    <div className="py-8 min-h-screen" id="cart">
      <header className="mb-12 px-4 md:px-0">
        <h1 className="text-5xl font-black text-black mb-4">Ваша корзина</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          {cartItems.length > 0 ? `У вас ${cartItems.length} товара в корзине.` : 'Ваша корзина пуста.'}
        </p>
      </header>

      {cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-blue-500/5 dark:shadow-none rounded-[40px] py-20 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/5 dark:from-blue-500/10 to-transparent" />
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/40 rounded-[32px] flex items-center justify-center mx-auto mb-8 rotate-6 shadow-xl relative z-10">
              <svg className="w-12 h-12 text-blue-500 dark:text-blue-400 -rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="relative z-10 max-w-md mx-auto space-y-3">
              <h2 className="text-3xl font-black text-white tracking-tight">В корзине пока пусто</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                Похоже, вы еще ничего не добавили в корзину. Отправляйтесь в каталог, чтобы найти идеальные товары для вашего малыша!
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-black text-black">Возможно, вас заинтересует</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-12 gap-12">
        {/* Cart List */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 flex items-center gap-8 group hover:shadow-lg transition-all"
            >
              <div className="w-24 h-24 bg-gray-50 dark:bg-gray-700 rounded-2xl p-2 shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
              </div>
              
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-black uppercase text-secondary-container dark:text-blue-400 tracking-widest">{item.category}</span>
                <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{item.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.brand}</p>
                
                <div className="flex items-center gap-8 mt-4">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden p-1 border border-gray-200 dark:border-gray-700">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-gray-900 dark:text-white transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="w-10 text-center font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg text-gray-900 dark:text-white transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="flex items-center gap-2 text-tertiary dark:text-tertiary hover:text-rose-500 font-bold text-xs hover:underline">
                    <Trash2 className="w-4 h-4" /> Удалить
                  </button>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xl font-black text-primary dark:text-blue-400">{formatPrice(item.price * item.quantity)}</span>
                {item.quantity > 1 && (
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mt-1">{formatPrice(item.price)} за шт.</p>
                )}
              </div>
            </motion.div>
          ))}

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-8 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 font-medium">Вам осталось всего <span className="font-black text-primary dark:text-blue-400">{formatPrice(Math.max(0, 100 - subtotal))}</span> до <span className="font-black text-gray-900 dark:text-white">бесплатной доставки!</span></p>
            <Link to="/catalog" className="text-primary dark:text-blue-400 font-black flex items-center gap-2 hover:underline">
              Продолжить покупки <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-span-12 lg:col-span-4 space-y-8 sticky top-32 h-fit">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-black mb-8 text-white">Итого к оплате</h2>
            <div className="space-y-4 mb-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={isGiftWrap}
                    onChange={() => setIsGiftWrap(!isGiftWrap)}
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors ${isGiftWrap ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isGiftWrap ? 'translate-x-6' : ''}`} />
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-sm">Упаковать как подарок (+ {formatPrice(giftWrapPrice)})</span>
              </label>

              <AnimatePresence>
                {isGiftWrap && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, height: 0 }}
                    animate={{ opacity: 1, scale: 1, height: 'auto' }}
                    exit={{ opacity: 0, scale: 0.95, height: 0 }}
                    className="overflow-hidden"
                  >
                    <textarea
                      placeholder="Напишите текст для поздравительной открытки..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full h-24 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-sm font-bold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none mt-2"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-center text-gray-900 dark:text-gray-200">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Подытог</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-900 dark:text-gray-200">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Доставка</span>
                <span className="font-bold">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-900 dark:text-gray-200">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Налоги (8%)</span>
                <span className="font-bold">{formatPrice(tax)}</span>
              </div>
              {isGiftWrap && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex justify-between items-center text-gray-900 dark:text-gray-200"
                >
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Подарочная упаковка</span>
                  <span className="font-bold">{formatPrice(giftWrapPrice)}</span>
                </motion.div>
              )}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-gray-900 dark:text-white">
                <span className="font-bold">Итого</span>
                <span className="text-3xl font-black text-primary dark:text-blue-400">{formatPrice(total)}</span>
              </div>
            </div>

            <button className="w-full h-16 bg-primary dark:bg-blue-600 text-white rounded-2xl font-black hover:bg-primary-container transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/20">
              Оформить заказ
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500 text-xs mt-6">
              <Lock className="w-3.5 h-3.5 fill-current" />
              Безопасное SSL шифрование
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
            <h4 className="font-black mb-4 text-gray-900 dark:text-white">У вас есть промокод?</h4>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="КОД15" 
                className="flex-1 h-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm font-bold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 outline-none focus:ring-2 focus:ring-primary/20" 
              />
              <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 rounded-xl font-bold hover:opacity-90 transition-opacity">OK</button>
            </div>
          </div>

          <div className="flex justify-around opacity-60 px-4 text-gray-900 dark:text-white">
            <div className="flex flex-col items-center gap-1">
              <Verified className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Качество</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <History className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">30 Дней</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Headphones className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">24/7</span>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
