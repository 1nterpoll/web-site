/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Plus, Heart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useCurrency } from '../contexts/CurrencyContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-square p-4 bg-gray-50 dark:bg-gray-900/50">
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <button 
          onClick={() => toggleWishlist(product)}
          className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-sm ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 dark:bg-gray-900/80 text-gray-500 dark:text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        {product.onSale && (
          <span className="absolute top-4 left-4 bg-tertiary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Акция
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Новинка
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-gray-500 dark:text-gray-400 uppercase text-[10px] font-bold tracking-widest">{product.brand}</span>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mt-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
          <span className="text-xs font-bold text-gray-900 dark:text-white">{product.rating}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewsCount})</span>
        </div>
        
        <div className="mb-4">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            product.stock === 'in_stock' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            product.stock === 'low_stock' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {product.stock === 'in_stock' ? 'В наличии' :
             product.stock === 'low_stock' ? 'Мало на складе' : 'Распродано'}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-black text-primary dark:text-blue-400">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <div className="relative group/cart-btn">
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.stock !== 'out_of_stock') {
                  addToCart(product);
                }
              }}
              whileTap={product.stock === 'out_of_stock' ? {} : { scale: 0.9 }}
              disabled={product.stock === 'out_of_stock'}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-lg ${
                product.stock === 'out_of_stock' 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none opacity-50'
                  : 'bg-primary dark:bg-blue-600 text-white hover:bg-primary-container shadow-primary/20'
              }`}
            >
              <Plus className="w-5 h-5" />
            </motion.button>
            {product.stock === 'out_of_stock' && (
              <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover/cart-btn:opacity-100 transition-opacity pointer-events-none z-10">
                Out of Stock
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
