"use client"

import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/components/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Redirecionar para o perfil se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/cliente/perfil');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          DentalCare360
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
