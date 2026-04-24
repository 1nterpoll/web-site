/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Wallet, Package, Settings, Bell, LogOut, ChevronRight, Award, PlusCircle, ArrowUpRight, ArrowDownRight, MapPin, Truck, Calendar, X, Camera, Upload, Loader2, Check } from 'lucide-react';
import { TRANSACTIONS, ORDERS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';
import { useCurrency } from '../contexts/CurrencyContext';

export default function Profile() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = React.useState<'wallet' | 'orders' | 'profile'>('wallet');
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  
  const [isSaving, setIsSaving] = React.useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = React.useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);

  const handleSaveProfile = () => {
    setShowConfirmDialog(true);
  };

  const confirmSaveProfile = () => {
    setShowConfirmDialog(false);
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    }, 1000);
  };

  const user = {
    name: 'Александр Петров',
    email: 'alex.p@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop',
    points: 1250,
    membership: 'Gold Member'
  };

  const navItems = [
    { icon: Package, name: 'Мои заказы', id: 'orders' },
    { icon: Wallet, name: 'Кошелек', id: 'wallet' },
    { icon: User, name: 'Личные данные', id: 'profile' },
    { icon: LogOut, name: 'Выйти из системы', id: 'logout', dangerous: true },
  ];

  return (
    <div className="py-8 space-y-12 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-primary/20 p-1">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg border-2 border-white">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-4">
             <h1 className="text-4xl font-black text-gray-900 dark:text-white capitalize">{user.name}</h1>
             <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">{user.membership}</span>
          </div>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">{user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
             <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20">Изменить профиль</button>
             <button className="border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-400" /> Уведомления
             </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-3xl text-center min-w-[240px] border border-gray-200 dark:border-gray-600">
           <span className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] block mb-2">Бонусные баллы</span>
           <div className="text-5xl font-black text-primary dark:text-blue-400 mb-2">{user.points}</div>
           <button className="text-primary font-bold text-sm hover:underline flex items-center justify-center gap-1 w-full mt-2">
              Как потратить? <ChevronRight className="w-3 h-3" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-3 space-y-4">
           {navItems.map((nav, i) => (
             <button
               key={i}
               onClick={() => setActiveTab(nav.id as any)}
               className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all font-bold ${
                 (nav.id === activeTab) ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
               } ${nav.dangerous ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : ''}`}
             >
               <div className="flex items-center gap-4">
                 <nav.icon className={`w-5 h-5 ${(nav.id === activeTab) ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`} />
                 {nav.name}
               </div>
               {!nav.dangerous && <ChevronRight className="w-4 h-4 opacity-40" />}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="col-span-12 lg:col-span-9 space-y-12">
           <AnimatePresence mode="wait">
             {activeTab === 'wallet' ? (
               <motion.div
                 key="wallet"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-12"
               >
                 <section>
                    <div className="flex items-center justify-between mb-8">
                       <h2 className="text-3xl font-black text-gray-900 dark:text-white">Финансовая сводка</h2>
                       <button className="flex items-center gap-2 text-primary font-bold hover:underline">
                          Больше данных <ArrowUpRight className="w-4 h-4" />
                       </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-[32px] text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
                          <div className="relative z-10 space-y-8">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Доступный баланс</p>
                                    <p className="text-4xl font-black">{formatPrice(450)}</p>
                                 </div>
                                 <PlusCircle className="w-8 h-8" />
                              </div>
                              <div className="text-lg font-bold tracking-[0.3em]">**** **** **** 4821</div>
                              <div className="flex justify-between items-center text-sm font-bold">
                                 <span>АЛЕКСАНДР ПЕТРОВ</span>
                                 <span>12/26</span>
                              </div>
                          </div>
                          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                       </div>
                       <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[32px] p-8 flex flex-col justify-center gap-6">
                          <div className="flex items-center justify-between">
                             <span className="text-outline font-bold">Доход в этом месяце</span>
                             <span className="text-green-500 font-bold flex items-center gap-1 text-xs px-2 py-1 bg-green-50 rounded-lg">
                                +12% <ArrowUpRight className="w-3 h-3" />
                             </span>
                          </div>
                          <div className="text-4xl font-black text-gray-900 dark:text-white">{formatPrice(892.40)}</div>
                          <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                             <div className="h-full bg-primary w-2/3" />
                          </div>
                          <p className="text-xs text-outline font-medium tracking-wide">ВЫ ПОЛУЧИЛИ 4 БОНУСНЫХ КУПОНА</p>
                       </div>
                    </div>
                 </section>

                 <section>
                    <h2 className="text-2xl font-black mb-8 text-gray-900 dark:text-white">История транзакций</h2>
                    <div className="space-y-4">
                       {TRANSACTIONS.map((t) => (
                          <div key={t.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex items-center justify-between group hover:shadow-lg transition-all">
                             <div className="flex items-center gap-5">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.type === 'add' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                   {t.type === 'add' ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                                </div>
                                <div className="min-w-0">
                                   <h4 className="font-bold text-gray-900 dark:text-white leading-tight truncate">{t.title}</h4>
                                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.date} • ID: {t.id}</p>
                                </div>
                             </div>
                             <div className={`text-xl font-black ${t.type === 'add' ? 'text-green-600' : 'text-gray-900 dark:text-white'} shrink-0`}>
                                {t.type === 'add' ? '+' : '-'}{formatPrice(t.amount)}
                             </div>
                          </div>
                       ))}
                    </div>
                 </section>
               </motion.div>
             ) : activeTab === 'profile' ? (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[32px] p-8 md:p-12">
                    <h2 className="text-3xl font-black mb-10 text-gray-900 dark:text-white">Личные данные</h2>

                    {/* Avatar Upload */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                      <div className="relative group cursor-pointer">
                        <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-gray-100 dark:border-gray-700 p-1 relative">
                          <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-2xl group-hover:opacity-50 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-8 h-8 text-gray-900 dark:text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Фото профиля</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                          Загрузите изображение для вашего профиля. Рекомендуемый размер: 400x400. Максимальный размер файла: 2MB.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <label className="cursor-pointer bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary-container transition-all text-sm flex items-center gap-2 shadow-sm">
                            <Upload className="w-4 h-4" /> Загрузить
                            <input type="file" className="hidden" accept="image/png, image/jpeg" />
                          </label>
                          <button className="border border-gray-200 dark:border-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm text-gray-900 dark:text-white">
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Полное имя</label>
                          <input 
                            type="text" 
                            defaultValue={user.name}
                            className="w-full h-14 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Email адрес</label>
                          <input 
                            type="email" 
                            defaultValue={user.email}
                            className="w-full h-14 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Номер телефона</label>
                          <input 
                            type="tel" 
                            placeholder="+7 (___) ___-__-__" 
                            className="w-full h-14 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">Предпочитаемый способ связи</label>
                          <div className="relative">
                            <select className="w-full h-14 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer transition-all">
                              <option value="email">Email</option>
                              <option value="phone">Телефонный звонок</option>
                              <option value="sms">SMS</option>
                              <option value="telegram">Telegram</option>
                            </select>
                            <ChevronRight className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex justify-end border-t border-gray-100 dark:border-gray-700 pt-8">
                      <button 
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className={`px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${
                          showSaveSuccess 
                            ? 'bg-green-500 text-white shadow-green-500/20 hover:bg-green-600' 
                            : 'bg-primary text-white shadow-primary/20 hover:bg-primary-container disabled:opacity-70 disabled:cursor-not-allowed'
                        }`}
                      >
                        {isSaving ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Обновление...</>
                        ) : showSaveSuccess ? (
                          <><Check className="w-5 h-5" /> Сохранено</>
                        ) : (
                          'Сохранить изменения'
                        )}
                      </button>
                    </div>
                  </section>
                </motion.div>
             ) : (
               <motion.div
                 key="orders"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-12"
               >
                  <section>
                    <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Мои заказы</h2>
                    <div className="grid gap-6">
                      {ORDERS.map((order) => (
                        <div key={order.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 hover:shadow-lg transition-all">
                          <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex gap-4">
                              <div className="flex -space-x-4">
                                {order.items.slice(0, 3).map((img, i) => (
                                  <div key={i} className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-gray-900 p-2 border-2 border-white dark:border-gray-800 shadow-sm overflow-hidden">
                                    <img src={img} alt="" className="w-full h-full object-contain" />
                                  </div>
                                ))}
                                {order.items.length > 3 && (
                                  <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm text-xs font-black">
                                    +{order.items.length - 3}
                                  </div>
                                )}
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-black text-lg text-gray-900 dark:text-white">Заказ #{order.id}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{order.date}</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                  order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                  order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                                  'bg-orange-100 text-orange-600'
                                }`}>
                                  {order.status === 'delivered' ? 'Доставлено' :
                                   order.status === 'shipped' ? 'В пути' : 'В обработке'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end justify-between">
                              <div className="text-right">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Сумма</p>
                                <p className="text-2xl font-black text-primary dark:text-blue-400">{formatPrice(order.total)}</p>
                              </div>
                              <button 
                                onClick={() => setSelectedOrder(order)}
                                className="bg-gray-100 dark:bg-gray-700 px-6 py-2 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2 text-gray-900 dark:text-white"
                              >
                                Отследить <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Profile Save Confirmation Modal */}
      <AnimatePresence>
        {showConfirmDialog && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmDialog(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Сохранить изменения?</h3>
                <button 
                  onClick={() => setShowConfirmDialog(false)} 
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-8">
                Вы уверены, что хотите обновить свои личные данные? Эта операция необратима.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="px-6 py-3 rounded-xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  Отмена
                </button>
                <button
                  onClick={confirmSaveProfile}
                  className="px-6 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary-container transition-all shadow-lg shadow-primary/20"
                >
                  Сохранить
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order Tracking Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12 space-y-10 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-black mb-2 text-gray-900 dark:text-white">Отслеживание заказа</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Заказ #{selectedOrder.id} • {selectedOrder.items.length} товара</p>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-tertiary/10 hover:text-tertiary transition-all text-gray-900 dark:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl space-y-4 border border-gray-100 dark:border-gray-700">
                    <Truck className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Статус доставки</p>
                      <p className="font-black text-xl text-gray-900 dark:text-white">{selectedOrder.status === 'delivered' ? 'Доставлено' : 'В пути'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl space-y-4 border border-gray-100 dark:border-gray-700">
                    <Calendar className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Ожидаемая дата</p>
                      <p className="font-black text-xl text-gray-900 dark:text-white">{selectedOrder.estimatedDelivery || '-'}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl space-y-4 border border-gray-100 dark:border-gray-700">
                    <Package className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Трек-номер</p>
                      <p className="font-black text-xl text-gray-900 dark:text-white">{selectedOrder.trackingNumber || '-'}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Tracking Progress */}
                <div className="space-y-8">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">История статуса</h3>
                  <div className="space-y-2">
                    {selectedOrder.statusHistory?.map((step, i) => (
                      <div key={i} className="flex gap-6 relative group">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
                            step.completed ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                          }`}>
                            {step.completed ? <PlusCircle className="w-6 h-6 fill-current" /> : <div className="w-3 h-3 bg-current rounded-full" />}
                          </div>
                          {i < selectedOrder.statusHistory!.length - 1 && (
                            <div className={`w-0.5 flex-1 -mt-1 -mb-1 ${
                              step.completed && selectedOrder.statusHistory![i+1].completed ? 'bg-primary' : 'bg-gray-100 dark:bg-gray-800'
                            }`} />
                          )}
                        </div>
                        <div className="pb-8">
                          <p className={`font-black text-lg ${step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>{step.label}</p>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   {/* Map Visualization */}
                   <div className="col-span-full space-y-8">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">Карта доставки</h3>
                      <div className="relative aspect-[21/9] bg-gray-50 dark:bg-gray-800 rounded-[32px] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-inner">
                        {/* Simulated Map */}
                        <div className="absolute inset-0 p-8 flex items-center justify-center text-gray-300 dark:text-gray-600">
                           <svg viewBox="0 0 400 200" className="w-full h-full opacity-40">
                              <path d="M50,150 Q150,50 350,100" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8" />
                              <circle cx="50" cy="150" r="8" fill="currentColor" />
                              <circle cx="350" cy="100" r="8" fill="currentColor" />
                           </svg>
                           <motion.div 
                              animate={{ 
                                x: selectedOrder.status === 'delivered' ? 150 : 50, 
                                y: selectedOrder.status === 'delivered' ? -25 : 25 
                              }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                              className="absolute"
                           >
                              <div className="relative">
                                <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full" />
                                <div className="bg-primary text-white p-3 rounded-2xl shadow-xl border-4 border-white dark:border-gray-950 relative z-10">
                                   <Truck className="w-8 h-8" />
                                </div>
                              </div>
                           </motion.div>
 
                           <div className="absolute top-4 left-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                              Склад: Москва
                           </div>
                           <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                              Курьер в пути
                           </div>
                        </div>
 
                        {/* Map Pins */}
                        <div className="absolute left-[15%] bottom-[20%] text-primary">
                           <MapPin className="w-8 h-8 fill-current" />
                        </div>
                        <div className="absolute right-[15%] top-[20%] text-gray-400 dark:text-gray-600 opacity-40">
                           <MapPin className="w-8 h-8 fill-current" />
                        </div>
                      </div>
 
                      <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 flex items-center gap-6">
                        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                           <Truck className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                           <p className="font-black text-lg text-gray-900 dark:text-white">Нужна помощь с доставкой?</p>
                           <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Свяжитесь с курьерской службой поддержки 24/7</p>
                        </div>
                      </div>
                   </div>
                </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
