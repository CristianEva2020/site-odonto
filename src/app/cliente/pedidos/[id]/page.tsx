"use client"

import React, { useState, useEffect } from 'react';
import { useAuth, Order } from '@/components/auth/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderDetailPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  
  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/cliente/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  // Buscar o pedido específico
  useEffect(() => {
    if (user && user.orders && params.id) {
      const orderId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundOrder = user.orders.find(o => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        // Pedido não encontrado
        router.push('/cliente/pedidos');
      }
    }
  }, [user, params.id, router]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Carregando...</p>
      </div>
    );
  }
  
  if (!user || !order) {
    return null; // Será redirecionado pelo useEffect
  }
  
  // Formatar status para exibição
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'delivered':
        return { text: 'Entregue', classes: 'bg-green-100 text-green-800' };
      case 'shipped':
        return { text: 'Enviado', classes: 'bg-blue-100 text-blue-800' };
      case 'processing':
        return { text: 'Em processamento', classes: 'bg-yellow-100 text-yellow-800' };
      case 'canceled':
        return { text: 'Cancelado', classes: 'bg-red-100 text-red-800' };
      default:
        return { text: 'Pendente', classes: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const statusDisplay = getStatusDisplay(order.status);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Detalhes do Pedido</h1>
          <Link
            href="/cliente/pedidos"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar aos pedidos
          </Link>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Pedido #{order.id.substring(0, 8)}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Realizado em {new Date(order.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusDisplay.classes}`}>
              {statusDisplay.text}
            </span>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Método de pagamento</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.paymentMethod}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Endereço de entrega</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p>{order.shippingAddress.street}, {order.shippingAddress.number}</p>
                  {order.shippingAddress.complement && <p>{order.shippingAddress.complement}</p>}
                  <p>{order.shippingAddress.neighborhood}, {order.shippingAddress.city} - {order.shippingAddress.state}</p>
                  <p>CEP: {order.shippingAddress.zipCode}</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Itens do Pedido</h2>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <li key={item.productId} className="px-4 py-4 sm:px-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                      <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-sm text-gray-500">
                        R$ {item.price.toFixed(2).replace('.', ',')} cada
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>R$ {order.total.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <p>Frete</p>
              <p>Grátis</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
              <p>Total</p>
              <p>R$ {order.total.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link
            href="/cliente/pedidos"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar aos pedidos
          </Link>
          <Link
            href="/loja"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
