import Link from 'next/link';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group flex flex-col rounded-xl border border-stone-200 bg-white overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="aspect-square bg-stone-100 flex items-center justify-center text-stone-400 text-sm">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          'No image'
        )}
      </div>

      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-amber-700 font-semibold">
          {product.brand}
        </span>
        <h3 className="text-stone-900 font-medium leading-snug group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-lg font-semibold text-stone-900">
            ${product.price.toFixed(2)}
          </span>
          {product.stock === 0 && (
            <span className="text-xs text-red-600 font-medium">Out of stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}
