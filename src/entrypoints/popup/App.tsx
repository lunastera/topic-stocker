import { useState, useEffect } from 'react';
import { useStocks } from '../../hooks/useStocks';
import { StockItem } from '../../components/StockItem';

export default function App() {
  const { stocks, addStock, removeStock } = useStocks();
  const [toast, setToast] = useState('');

  const handleStock = async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tab?.url || !tab?.title) return;
    await addStock(tab.title, tab.url);
  };

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setToast('URLをコピーしました');
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="popup">
      <header className="popup__header">
        <h1 className="popup__title">話題ストッカー</h1>
        <button className="popup__stock-btn" onClick={handleStock}>
          ストック
        </button>
      </header>

      <main className="popup__body">
        {stocks.length === 0 ? (
          <p className="popup__empty">ストックがありません</p>
        ) : (
          <ul className="stock-list">
            {stocks.map((stock) => (
              <StockItem
                key={stock.id}
                stock={stock}
                onDelete={removeStock}
                onCopy={handleCopy}
              />
            ))}
          </ul>
        )}
      </main>

      {toast && <div className="popup__toast">{toast}</div>}
    </div>
  );
}
