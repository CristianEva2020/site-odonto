"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Definição do tipo para os serviços
type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

// Array de serviços odontológicos
const services: Service[] = [
  {
    id: 1,
    title: "Implantes Dentários",
    description: "Recupere seu sorriso com implantes de alta qualidade e tecnologia avançada.",
    icon: "/images/implant-icon.svg",
    link: "/servicos/implantes"
  },
  {
    id: 2,
    title: "Ortodontia",
    description: "Alinhamento perfeito com aparelhos modernos e tratamentos personalizados.",
    icon: "/images/ortho-icon.svg",
    link: "/servicos/ortodontia"
  },
  {
    id: 3,
    title: "Clareamento Dental",
    description: "Dentes mais brancos e brilhantes com procedimentos seguros e eficazes.",
    icon: "/images/whitening-icon.svg",
    link: "/servicos/clareamento"
  },
  {
    id: 4,
    title: "Odontopediatria",
    description: "Cuidados especiais para a saúde bucal das crianças em um ambiente acolhedor.",
    icon: "/images/pediatric-icon.svg",
    link: "/servicos/odontopediatria"
  }
];

export default function ServicesHighlight() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white" id="servicos">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nossos Serviços Especializados
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Oferecemos tratamentos odontológicos completos com profissionais especializados e tecnologia de ponta para cuidar do seu sorriso.
          </p>
        </div>

        {/* Grid de serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`bg-white rounded-lg shadow-lg p-6 transition-all duration-300 transform ${
                hoveredService === service.id ? 'scale-105 shadow-xl' : ''
              }`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
                  {/* Fallback para ícones SVG não disponíveis */}
                  <div className="text-blue-500 text-2xl font-bold">
                    {service.title.charAt(0)}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {service.description}
              </p>
              <div className="text-center">
                <Link 
                  href={service.link}
                  className="inline-block text-blue-500 hover:text-blue-700 font-medium transition-colors"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA abaixo dos serviços */}
        <div className="mt-12 text-center">
          <Link 
            href="/servicos"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center"
          >
            Ver todos os serviços
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
