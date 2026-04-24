/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, ChevronRight, User, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../contexts/WishlistContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { Review } from '../types';

export default function ProductDetail() {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [activeImage, setActiveImage] = React.useState(0);
  const [reviews, setReviews] = React.useState<Review[]>(product.reviews || []);
  const [newReview, setNewReview] = React.useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isWishlisted = isInWishlist(product.id);

  const similarProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        userName: 'Вы', // Current user placeholder
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="py-8 space-y-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
        <Link to="/" className="text-gray-900 hover:text-primary">Главная</Link>
        <ChevronRight className="w-3 h-3 text-gray-900" />
        <Link to="/catalog" className="text-gray-900 hover:text-primary">{product.category}</Link>
        <ChevronRight className="w-3 h-3 text-gray-900" />
        <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Info */}
      <div className="grid grid-cols-12 gap-12">
        {/* Left: Gallery */}
        <div className="col-span-12 lg:col-span-7 flex gap-6">
          <div className="flex flex-col gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-xl border-2 transition-all p-2 bg-white ${
                  activeImage === idx ? 'border-primary shadow-lg shadow-primary/10' : 'border-outline-variant/30 hover:border-primary/30'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-square bg-white dark:bg-gray-800 rounded-3xl border border-outline-variant/30 p-12 flex items-center justify-center relative overflow-hidden group">
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={activeImage}
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {product.isBestseller && (
              <span className="absolute top-6 right-6 bg-secondary-container text-on-secondary-fixed text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                ХИТ ПРОДАЖ
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
          <div className="mb-2">
            <span className="text-primary font-black uppercase tracking-widest text-sm">{product.brand}</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex text-secondary">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-secondary' : 'text-gray-300 dark:text-gray-600'}`}
                />
              ))}
            </div>
            <span className="text-gray-900 dark:text-white font-bold">{product.rating}</span>
            <span className="text-gray-500 dark:text-gray-400">({product.reviewsCount} отзывов)</span>
          </div>

          <div className="mb-10 flex items-baseline gap-4">
            <span className="text-4xl font-black text-primary dark:text-blue-400">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-xl text-outline line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="bg-tertiary/10 text-tertiary px-3 py-1 rounded-lg text-sm font-black">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full ${
              product.stock === 'in_stock' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
              product.stock === 'low_stock' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                product.stock === 'in_stock' ? 'bg-green-500' :
                product.stock === 'low_stock' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
              {product.stock === 'in_stock' ? 'В наличии' :
               product.stock === 'low_stock' ? 'Мало на складе' : 'Нет в наличии'}
            </span>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
            {product.specs && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">{key}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 mb-10">
            <button 
              disabled={product.stock === 'out_of_stock'}
              className={`flex-1 h-16 font-black rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl ${
                product.stock === 'out_of_stock'
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'
                  : 'bg-primary dark:bg-blue-600 text-white hover:bg-primary-container shadow-primary/30'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {product.stock === 'out_of_stock' ? 'Нет в наличии' : 'Добавить в корзину'}
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`w-16 h-16 border-2 transition-all active:scale-95 flex items-center justify-center rounded-2xl ${
                isWishlisted 
                  ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-200' 
                  : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary'
              }`}
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="space-y-4 pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <Truck className="w-5 h-5 text-primary" />
              <span className="font-medium">Бесплатная экспресс-доставка от {formatPrice(100)}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="font-medium">Гарантия качества 12 месяцев</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="grid grid-cols-12 gap-12 pt-12 border-t border-outline-variant/20">
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div>
            <h2 className="text-3xl font-black mb-2 text-gray-900">Отзывы покупателей</h2>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-black text-gray-900">{product.rating}</div>
              <div className="space-y-1">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-secondary' : 'text-gray-300 dark:text-gray-600'}`} />
                  ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">На основе {reviews.length} отзывов</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmitReview} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-[32px] border border-gray-100 dark:border-gray-700 space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Оставить отзыв</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Ваша оценка</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={`p-2 transition-all ${newReview.rating >= star ? 'text-secondary' : 'text-gray-300 dark:text-gray-600 hover:text-secondary'}`}
                  >
                    <Star className={`w-8 h-8 ${newReview.rating >= star ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Ваш комментарий</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Что вы думаете об этом товаре?"
                rows={4}
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !newReview.comment.trim()}
              className="w-full h-14 bg-primary text-white rounded-xl font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Send className="w-4 h-4" /> Отправить отзыв
                </>
              )}
            </button>
          </form>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-gray-900 border border-outline-variant/10 p-8 rounded-3xl space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700">
                        {review.userAvatar ? (
                          <img src={review.userAvatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{review.userName}</h4>
                        <div className="flex text-secondary mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-secondary' : 'text-gray-300 dark:text-gray-600'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{review.date}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 font-medium italic">Отзывов пока нет. Будьте первым!</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Similar Products (Existing Code) */}
      {similarProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-black mb-10 text-gray-900">Похожие товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
