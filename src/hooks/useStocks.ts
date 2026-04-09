import { useState, useEffect } from 'react';
import { storage } from 'wxt/utils/storage';
import type { Stock } from '../types';

const stocksStorage = storage.defineItem<Stock[]>('local:stocks', {
  defaultValue: [],
});

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    stocksStorage.getValue().then(setStocks);
    return stocksStorage.watch((newValue) => {
      setStocks(newValue ?? []);
    });
  }, []);

  const addStock = async (title: string, url: string) => {
    const current = await stocksStorage.getValue();
    const newStock: Stock = {
      id: Date.now(),
      title,
      url,
      savedAt: new Date().toISOString(),
    };
    await stocksStorage.setValue([newStock, ...current]);
  };

  const removeStock = async (id: number) => {
    const current = await stocksStorage.getValue();
    await stocksStorage.setValue(current.filter((s) => s.id !== id));
  };

  return { stocks, addStock, removeStock };
}
