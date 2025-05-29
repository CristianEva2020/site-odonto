"use client"

import React, { useState } from 'react';
import { useCart } from '@/components/cart/CartContext';
import { useAuth, Address, OrderItem } from '@/components/auth/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Componente de etapa do checkout
interface CheckoutStepProps {
  title: string;
  number: number;
  isActive: boolean;
  isCompleted: boolean;
}

const CheckoutStep: React.FC<CheckoutStepProps> = ({ title, number, isActive, isCompleted }) => {
  return (
    <div className={`flex items-center ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
        isActive ? 'bg-blue-100 border-2 border-blue-600' : 
        isCompleted ? 'bg-green-100 border-2 border-green-600' : 
        'bg-gray-100 border-2 border-gray-300'
      }`}>
        {isCompleted ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <span>{number}</span>
        )}
      </div>
      <span className={`font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
};

// Função para gerar ID único
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Componente principal de checkout
const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  // Manipulador de mudança de campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manipulador de seleção de endereço
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    
    if (user && user.addresses) {
      const address = user.addresses.find(addr => addr.id === addressId);
      if (address) {
        setFormData(prev => ({
          ...prev,
          address: address.street,
          number: address.number,
          complement: address.complement || '',
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode
        }));
      }
    }
  };

  // Manipulador de envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Gerar ID de pedido aleatório
      const newOrderId = generateId();
      setOrderId(newOrderId);
      
      // Criar objeto de endereço
      const shippingAddress: Address = {
        id: selectedAddress || generateId(),
        street: formData.address,
        number: formData.number,
        complement: formData.complement || undefined,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        isDefault: false
      };
      
      // Criar itens do pedido
      const orderItems: OrderItem[] = items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.discountPrice || item.product.price
      }));
      
      // Se o usuário estiver autenticado, adicionar o pedido ao histórico
      if (isAuthenticated && user) {
        try {
          // Em um cenário real, enviaríamos os dados para o backend
          // Para fins de demonstração, vamos simular a adição do pedido ao usuário
          
          // Obter usuários do localStorage
          const storedUsers = localStorage.getItem('users');
          let users = storedUsers ? JSON.parse(storedUsers) : [];
          
          // Encontrar o usuário atual
          const userIndex = users.findIndex((u: any) => u.id === user.id);
          
          if (userIndex !== -1) {
            // Criar novo pedido
            const newOrder = {
              id: newOrderId,
              date: new Date().toISOString(),
              status: 'pending',
              items: orderItems,
              total: total,
              shippingAddress,
              paymentMethod: formData.paymentMethod
            };
            
            // Adicionar pedido ao usuário
            const updatedUser = { ...users[userIndex] };
            updatedUser.orders = [...(updatedUser.orders || []), newOrder];
            
            // Atualizar usuário na lista
            users[userIndex] = updatedUser;
            
            // Salvar no localStorage
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            console.log('Pedido adicionado ao histórico do usuário:', newOrder);
          }
        } catch (error) {
          console.error('Erro ao adicionar pedido ao histórico:', error);
        }
      }
      
      setOrderComplete(true);
      
      // Limpar o carrinho após finalizar o pedido
      clearCart();
    }
  };

  // Voltar para a etapa anterior
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Se não houver itens no carrinho e o pedido não estiver completo, redirecionar para a loja
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Seu carrinho está vazio</h3>
          <p className="mt-1 text-gray-500">Adicione produtos ao seu carrinho antes de finalizar a compra</p>
          <div className="mt-6">
            <Link
              href="/loja"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Se o pedido estiver completo, mostrar tela de confirmação
  if (orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Pedido realizado com sucesso!</h3>
          <p className="mt-1 text-gray-500">
            Seu pedido #{orderId.substring(0, 8)} foi confirmado e será processado em breve.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Um e-mail de confirmação foi enviado para {formData.email}.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              href="/loja"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Continuar comprando
            </Link>
            {isAuthenticated && (
              <Link
                href="/cliente/pedidos"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Ver meus pedidos
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>
      
      {/* Etapas do checkout */}
      <div className="flex justify-between mb-8 border-b pb-4">
        <CheckoutStep 
          title="Informações Pessoais" 
          number={1} 
          isActive={currentStep === 1} 
          isCompleted={currentStep > 1} 
        />
        <CheckoutStep 
          title="Endereço de Entrega" 
          number={2} 
          isActive={currentStep === 2} 
          isCompleted={currentStep > 2} 
        />
        <CheckoutStep 
          title="Pagamento" 
          number={3} 
          isActive={currentStep === 3} 
          isCompleted={false} 
        />
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        {/* Formulário de checkout */}
        <form onSubmit={handleSubmit} className="lg:col-span-7">
          {/* Etapa 1: Informações Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Informações Pessoais</h2>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Já tem uma conta?{' '}
                    <Link href="/cliente/login" className="text-blue-600 hover:text-blue-500">
                      Faça login
                    </Link>{' '}
                    para um checkout mais rápido e para acompanhar seus pedidos.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Etapa 2: Endereço de Entrega */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Endereço de Entrega</h2>
              
              {/* Mostrar endereços salvos se o usuário estiver autenticado */}
              {isAuthenticated && user?.addresses && user.addresses.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Endereços salvos</h3>
                  <div className="space-y-3">
                    {user.addresses.map((address) => (
                      <div 
                        key={address.id} 
                        className={`border rounded-md p-4 cursor-pointer ${
                          selectedAddress === address.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => handleAddressSelect(address.id)}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            checked={selectedAddress === address.id}
                            onChange={() => handleAddressSelect(address.id)}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {address.street}, {address.number}
                              {address.complement && `, ${address.complement}`}
                            </p>
                            <p className="text-sm text-gray-500">
                              {address.neighborhood}, {address.city} - {address.state}
                            </p>
                            <p className="text-sm text-gray-500">CEP: {address.zipCode}</p>
                            {address.isDefault && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                                Endereço padrão
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Ou preencha um novo endereço abaixo:</p>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Rua/Avenida
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                    Número
                  </label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="complement" className="block text-sm font-medium text-gray-700">
                    Complemento (opcional)
                  </label>
                  <input
                    type="text"
                    id="complement"
                    name="complement"
                    value={formData.complement}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                    Bairro
                  </label>
                  <input
                    type="text"
                    id="neighborhood"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Selecione...</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {isAuthenticated && (
                <div className="flex items-center mt-4">
                  <input
                    id="saveAddress"
                    name="saveAddress"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="saveAddress" className="ml-2 block text-sm text-gray-900">
                    Salvar este endereço para futuras compras
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Etapa 3: Pagamento */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Informações de Pagamento</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de pagamento
                </label>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="credit" className="ml-3 block text-sm font-medium text-gray-700">
                      Cartão de crédito
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      value="debit"
                      checked={formData.paymentMethod === 'debit'}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="debit" className="ml-3 block text-sm font-medium text-gray-700">
                      Cartão de débito
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="pix"
                      name="paymentMethod"
                      type="radio"
                      value="pix"
                      checked={formData.paymentMethod === 'pix'}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="pix" className="ml-3 block text-sm font-medium text-gray-700">
                      PIX
                    </label>
                  </div>
                </div>
              </div>

              {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Número do cartão
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required={formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit'}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                      Nome no cartão
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required={formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit'}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                        Data de validade
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/AA"
                        required={formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit'}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cardCvv"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        placeholder="123"
                        required={formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit'}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'pix' && (
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-sm text-gray-700 mb-4">
                    Ao finalizar o pedido, você receberá um QR Code para pagamento via PIX.
                  </p>
                  <div className="flex items-center justify-center p-4 bg-white rounded-md border border-gray-200">
                    <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Voltar
              </button>
            ) : (
              <div></div>
            )}
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {currentStep < 3 ? 'Continuar' : 'Finalizar Pedido'}
            </button>
          </div>
        </form>

        {/* Resumo do pedido */}
        <div className="mt-10 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Resumo do pedido</h2>
            
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.product.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <h3>{item.product.name}</h3>
                          <p className="ml-4">
                            R$ {((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Quantidade: {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between text-sm text-gray-600">
                <p>Subtotal</p>
                <p>R$ {total.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <p>Frete</p>
                <p>Grátis</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 mt-4 pt-4 border-t border-gray-200">
                <p>Total</p>
                <p>R$ {total.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-500 mt-2">
                Ao finalizar sua compra, você concorda com nossos{' '}
                <Link href="/termos" className="text-blue-600 hover:text-blue-500">
                  Termos de Serviço
                </Link>{' '}
                e{' '}
                <Link href="/privacidade" className="text-blue-600 hover:text-blue-500">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
