"use client"

import React from 'react';
import Image from 'next/image';
import { CartItem as CartItemType, useCart } from './CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQuantity(product.id, parseInt(e.target.value));
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  const price = product.discountPrice || product.price;
  const subtotal = price * quantity;

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
            Sem imagem
          </div>
        )}
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.name}</h3>
            <p className="ml-4">R$ {subtotal.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">{product.category}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <div className="flex items-center">
            <label htmlFor={`quantity-${product.id}`} className="mr-2 text-gray-500">
              Qtd:
            </label>
            <select
              id={`quantity-${product.id}`}
              value={quantity}
              onChange={handleQuantityChange}
              className="rounded border border-gray-300 text-gray-900 text-sm py-1"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
