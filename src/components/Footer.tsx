/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Instagram, Mail, Phone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 text-sm py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">KidsMarket</Link>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
            Качественные товары для ваших малышей. От одежды до игрушек, мы обеспечиваем качество, которому доверяют родители.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Globe].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-primary transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-6">Магазин</h4>
          <ul className="space-y-3">
            {['Одежда', 'Игрушки', 'Кормление', 'Коляски'].map((item) => (
              <li key={item}>
                <Link to="/catalog" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-6">Поддержка</h4>
          <ul className="space-y-3">
            {['Доставка', 'Возвраты', 'Политика конфиденциальности', 'FAQ'].map((item) => (
              <li key={item}>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-6">Контакты</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4 text-primary" /> hello@kidsmarket.com
            </li>
            <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4 text-primary" /> +1 (234) 567-890
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 mt-12 border-t border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
        <p>© 2024 KidsMarket. Все права защищены.</p>
        <div className="flex gap-4">
          <span>Оплата: Visa, Mastercard, MIR</span>
        </div>
      </div>
    </footer>
  );
}
