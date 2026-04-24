/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EXCHANGE_RATES, CurrencyCode } from '../constants';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInUsd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('selectedCurrency');
    return (saved as CurrencyCode) || 'USD';
  });

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('selectedCurrency', code);
  };

  const formatPrice = (priceInUsd: number) => {
    const { rate, symbol } = EXCHANGE_RATES[currency];
    const converted = priceInUsd * rate;
    
    // Format based on currency type
    if (currency === 'USD') {
      return `${symbol}${converted.toFixed(2)}`;
    }
    return `${Math.round(converted).toLocaleString()} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
