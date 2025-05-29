"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definição do tipo de produto
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

// Definição do tipo de item do carrinho
export type CartItem = {
  product: Product;
  quantity: number;
};

// Interface do contexto do carrinho
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

// Criação do contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Props do provedor do carrinho
interface CartProviderProps {
  children: ReactNode;
}

// Provedor do contexto do carrinho
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar carrinho do localStorage quando o componente montar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        setItems([]);
      }
    }
    setIsInitialized(true);
  }, []);

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // Adicionar item ao carrinho
  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Se o item já existe, atualize a quantidade
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Se o item não existe, adicione-o
        return [...prevItems, { product, quantity }];
      }
    });
    
    // Abrir o carrinho quando um item é adicionado
    setIsOpen(true);
  };

  // Remover item do carrinho
  const removeItem = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Atualizar quantidade de um item
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Limpar o carrinho
  const clearCart = () => {
    setItems([]);
  };

  // Calcular o número total de itens no carrinho
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Calcular o valor total do carrinho
  const total = items.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  // Abrir o carrinho
  const openCart = () => setIsOpen(true);
  
  // Fechar o carrinho
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      total,
      isOpen,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
