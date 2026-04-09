import type { Stock } from '../types';

interface Props {
  stock: Stock;
  onDelete: (id: number) => void;
  onCopy: (url: string) => void;
}

export function StockItem({ stock, onDelete, onCopy }: Props) {
  return (
    <li className="stock-item">
      <button
        className="stock-item__title"
        onClick={() => onCopy(stock.url)}
        title={stock.url}
      >
        {stock.title}
      </button>
      <button
        className="stock-item__delete"
        onClick={() => onDelete(stock.id)}
        aria-label="削除"
      >
        ×
      </button>
    </li>
  );
}
