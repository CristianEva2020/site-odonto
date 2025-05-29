"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definição do tipo de usuário
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: Address[];
  orders?: Order[];
};

// Definição do tipo de endereço
export type Address = {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
};

// Definição do tipo de pedido
export type Order = {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  items: OrderItem[];
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
};

// Definição do tipo de item de pedido
export type OrderItem = {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
};

// Interface do contexto de autenticação
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<boolean>;
  updateAddress: (address: Address) => Promise<boolean>;
  removeAddress: (addressId: string) => Promise<boolean>;
  setDefaultAddress: (addressId: string) => Promise<boolean>;
}

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Props do provedor de autenticação
interface AuthProviderProps {
  children: ReactNode;
}

// Função para gerar ID único
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Provedor do contexto de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar usuário do localStorage quando o componente montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        setUser(null);
      }
    }
    setIsLoading(false);
    setIsInitialized(true);
  }, []);

  // Salvar usuário no localStorage quando mudar
  useEffect(() => {
    if (isInitialized && user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user, isInitialized]);

  // Login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em um cenário real, verificaríamos as credenciais no backend
      // Para fins de demonstração, vamos verificar se o usuário existe no localStorage
      const storedUsers = localStorage.getItem('users');
      let users: User[] = [];
      
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }
      
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser) {
        // Em um cenário real, verificaríamos a senha com hash
        // Para fins de demonstração, consideramos o login bem-sucedido
        setUser(foundUser);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Registro
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em um cenário real, enviaríamos os dados para o backend
      // Para fins de demonstração, vamos armazenar no localStorage
      const storedUsers = localStorage.getItem('users');
      let users: User[] = [];
      
      if (storedUsers) {
        users = JSON.parse(storedUsers);
      }
      
      // Verificar se o e-mail já está em uso
      if (users.some(u => u.email === email)) {
        setIsLoading(false);
        return false;
      }
      
      // Criar novo usuário
      const newUser: User = {
        id: generateId(),
        name,
        email,
        addresses: [],
        orders: []
      };
      
      // Adicionar à lista de usuários
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Definir usuário atual
      setUser(newUser);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Atualizar perfil
  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar usuário
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Atualizar na lista de usuários
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        let users: User[] = JSON.parse(storedUsers);
        users = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Adicionar endereço
  const addAddress = async (address: Omit<Address, 'id'>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Criar novo endereço
      const newAddress: Address = {
        ...address,
        id: generateId()
      };
      
      // Se for o primeiro endereço ou marcado como padrão, definir como padrão
      if (!user.addresses || user.addresses.length === 0 || newAddress.isDefault) {
        // Marcar todos os outros como não padrão
        if (user.addresses) {
          user.addresses = user.addresses.map(addr => ({
            ...addr,
            isDefault: false
          }));
        }
        newAddress.isDefault = true;
      }
      
      // Adicionar à lista de endereços
      const updatedUser = {
        ...user,
        addresses: [...(user.addresses || []), newAddress]
      };
      
      setUser(updatedUser);
      
      // Atualizar na lista de usuários
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        let users: User[] = JSON.parse(storedUsers);
        users = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Add address error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Atualizar endereço
  const updateAddress = async (address: Address): Promise<boolean> => {
    if (!user || !user.addresses) return false;
    
    setIsLoading(true);
    
    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Se o endereço for definido como padrão, atualizar os outros
      let updatedAddresses = [...user.addresses];
      
      if (address.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          isDefault: addr.id === address.id
        }));
      } else {
        // Garantir que pelo menos um endereço seja padrão
        const hasDefaultAddress = updatedAddresses.some(addr => addr.id !== address.id && addr.isDefault);
        
        if (!hasDefaultAddress) {
          // Se não houver outro endereço padrão, manter este como padrão
          address.isDefault = true;
        }
        
        updatedAddresses = updatedAddresses.map(addr => 
          addr.id === address.id ? address : addr
        );
      }
      
      // Atualizar usuário
      const updatedUser = {
        ...user,
        addresses: updatedAddresses
      };
      
      setUser(updatedUser);
      
      // Atualizar na lista de usuários
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        let users: User[] = JSON.parse(storedUsers);
        users = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Update address error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Remover endereço
  const removeAddress = async (addressId: string): Promise<boolean> => {
    if (!user || !user.addresses) return false;
    
    setIsLoading(true);
    
    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar se o endereço a ser removido é o padrão
      const addressToRemove = user.addresses.find(addr => addr.id === addressId);
      const isRemovingDefault = addressToRemove?.isDefault;
      
      // Remover endereço
      let updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
      
      // Se removeu o endereço padrão e ainda há outros endereços, definir o primeiro como padrão
      if (isRemovingDefault && updatedAddresses.length > 0) {
        updatedAddresses = updatedAddresses.map((addr, index) => ({
          ...addr,
          isDefault: index === 0
        }));
      }
      
      // Atualizar usuário
      const updatedUser = {
        ...user,
        addresses: updatedAddresses
      };
      
      setUser(updatedUser);
      
      // Atualizar na lista de usuários
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        let users: User[] = JSON.parse(storedUsers);
        users = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Remove address error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Definir endereço padrão
  const setDefaultAddress = async (addressId: string): Promise<boolean> => {
    if (!user || !user.addresses) return false;
    
    setIsLoading(true);
    
    try {
      // Simulação de chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar endereços
      const updatedAddresses = user.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }));
      
      // Atualizar usuário
      const updatedUser = {
        ...user,
        addresses: updatedAddresses
      };
      
      setUser(updatedUser);
      
      // Atualizar na lista de usuários
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        let users: User[] = JSON.parse(storedUsers);
        users = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Set default address error:', error);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
      addAddress,
      updateAddress,
      removeAddress,
      setDefaultAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};
