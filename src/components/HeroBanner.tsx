"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animação de fade-in quando o componente é montado
    setIsVisible(true);
    
    // Registrar visualização do banner para métricas
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_banner', {
        'event_category': 'engagement',
        'event_label': 'hero_banner'
      });
    }
  }, []);

  const handleCtaClick = (ctaType: string) => {
    // Registrar cliques nos CTAs para métricas
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        'event_category': 'cta',
        'event_label': ctaType
      });
    }
  };

  return (
    <section 
      className={`relative w-full h-[600px] md:h-[650px] overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="Banner principal - Clínica Odontológica DentalCare360"
    >
      {/* Imagem de fundo otimizada */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-dental.jpg" 
          alt="Clínica odontológica moderna com equipamentos de última geração e ambiente acolhedor" 
          fill 
          priority
          sizes="100vw"
          quality={90}
          className="object-cover brightness-[0.85]"
        />
      </div>
      
      {/* Conteúdo sobreposto com estrutura semântica para SEO */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Sorrisos saudáveis para toda a família
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8">
            Cuidamos da sua saúde bucal com tecnologia avançada e profissionais especializados em São Paulo.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/agendar" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              onClick={() => handleCtaClick('agendar_consulta')}
              aria-label="Agendar uma consulta odontológica"
            >
              Agendar Consulta
            </Link>
            <Link 
              href="/servicos" 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              onClick={() => handleCtaClick('ver_servicos')}
              aria-label="Conhecer nossos serviços odontológicos"
            >
              Nossos Serviços
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
