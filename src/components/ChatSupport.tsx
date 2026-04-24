/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, CATEGORIES, ORDERS, TRANSACTIONS } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatSupport() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const systemInstruction = `
        Вы — виртуальный ассистент KidsMarket, премиального маркетплейса детских товаров.
        Ваша цель: помогать пользователям с вопросами о товарах, доставке и заказах.
        Будьте дружелюбны, профессиональны и кратки. Отвечайте на русском языке.

        Контекст магазина:
        Категории: ${CATEGORIES.map(c => c.name).join(', ')}
        Товары: ${JSON.stringify(PRODUCTS.map(p => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          price: p.price,
          category: p.category,
          description: p.description
        })))}
        Примеры заказов пользователя: ${JSON.stringify(ORDERS)}
        Финансовое резюме: ${JSON.stringify(TRANSACTIONS)}

        Если пользователь спрашивает о конкретном заказе (например, #ORD-001), используйте данные из списка заказов выше.
        Если пользователь спрашивает о доставке, сообщите, что бесплатная доставка действует при заказе от $100.
        Если о возврате — у нас действует 30-дневная политика возврата.
        Отвечайте кратко и по делу.
      `;

      // Simplified chat history for the prompt
      const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
      const prompt = `${systemInstruction}\n\nИстория чата:\n${history}\nUser: ${userMessage}\nAssistant:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const responseText = response.text || "Извините, я не смог обработать ваш запрос. Попробуйте еще раз.";
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Произошла ошибка при связи с сервером. Пожалуйста, попробуйте позже." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center z-50 hover:bg-primary-container transition-colors ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 bg-tertiary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
          AI
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl z-[60] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="p-6 bg-primary dark:bg-blue-700 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">Support.AI</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100 italic">Always here to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-gray-50 dark:bg-gray-950/50"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-200 dark:border-gray-600 max-w-[85%]">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-normal">
                    Привет! Я ваш помощник KidsMarket. Как я могу помочь вам сегодня?
                  </p>
                </div>
              </div>

              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    m.role === 'model' ? 'bg-primary/10 text-primary' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                  }`}>
                    {m.role === 'model' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm border max-w-[85%] ${
                    m.role === 'model' 
                      ? 'bg-gray-100 dark:bg-gray-700 rounded-tl-none border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100' 
                      : 'bg-primary text-white rounded-tr-none border-primary shadow-primary/10'
                  }`}>
                    <p className="text-sm font-medium leading-normal">{m.text}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl rounded-tl-none border border-gray-200 dark:border-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ваш вопрос..."
                  className="w-full h-14 pl-5 pr-14 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-primary-container font-medium text-sm transition-all text-gray-900 dark:text-white"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-container transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-center text-outline font-bold uppercase tracking-widest mt-4 opacity-50">
                Powered by Gemini Flash 3
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function User(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
