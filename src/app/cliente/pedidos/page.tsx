"use client"

import React from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/cliente/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Carregando...</p>
      </div>
    );
  }
  
  if (!user) {
    return null; // Será redirecionado pelo useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
          <Link
            href="/cliente/perfil"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar ao perfil
          </Link>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Histórico de Pedidos</h2>
            <p className="mt-1 text-sm text-gray-500">Acompanhe todos os seus pedidos realizados</p>
          </div>
          <div className="border-t border-gray-200">
            {user.orders && user.orders.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {user.orders.map((order) => (
                  <li key={order.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-900">
                          Pedido #{order.id.substring(0, 8)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Data: {new Date(order.date).toLocaleDateString('pt-BR')}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                              order.status === 'canceled' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'}`}
                          >
                            {order.status === 'delivered' ? 'Entregue' : 
                             order.status === 'shipped' ? 'Enviado' : 
                             order.status === 'processing' ? 'Em processamento' : 
                             order.status === 'canceled' ? 'Cancelado' : 
                             'Pendente'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium text-gray-900">
                          R$ {order.total.toFixed(2).replace('.', ',')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                        </p>
                        <Link
                          href={`/cliente/pedidos/${order.id}`}
                          className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          Ver detalhes
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-12 sm:px-6 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum pedido encontrado</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Você ainda não realizou nenhum pedido em nossa loja.
                </p>
                <div className="mt-6">
                  <Link
                    href="/loja"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Ir para a loja
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
