import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Planos Odontológicos | DentalCare360',
  description: 'Conheça nossos planos odontológicos com cobertura completa para você e sua família. Opções para todas as necessidades e orçamentos.',
  keywords: 'planos odontológicos, convênio dentista, plano dental, plano familiar, plano empresarial',
}

export default function PlanosPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Banner da página */}
      <section className="bg-blue-600 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Planos Odontológicos
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Cuidar da saúde bucal nunca foi tão acessível. Conheça nossos planos e escolha o ideal para você e sua família.
          </p>
        </div>
      </section>

      {/* Seção de planos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Escolha o Plano Ideal
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Oferecemos diferentes opções para atender às suas necessidades, com cobertura completa e preços acessíveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Básico */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:transform hover:scale-105">
              <div className="bg-blue-100 p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-800">Plano Básico</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">R$ 49,90</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Consultas de rotina</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Limpeza profissional</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Restaurações simples</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Radiografias</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Tratamento de canal</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Implantes dentários</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link 
                    href="/contato" 
                    className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-center transition-colors"
                  >
                    Contratar Plano
                  </Link>
                </div>
              </div>
            </div>

            {/* Plano Premium */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-blue-500 transform scale-105">
              <div className="bg-blue-600 p-6 text-center relative">
                <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-0 rotate-45">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold text-white">Plano Premium</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">R$ 89,90</span>
                  <span className="text-blue-100">/mês</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Consultas de rotina</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Limpeza profissional</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Restaurações</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Radiografias</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tratamento de canal</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Clareamento dental</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link 
                    href="/contato" 
                    className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center transition-colors"
                  >
                    Contratar Plano
                  </Link>
                </div>
              </div>
            </div>

            {/* Plano Família */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:transform hover:scale-105">
              <div className="bg-blue-100 p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-800">Plano Família</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">R$ 149,90</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Até 5 dependentes</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Todos os benefícios Premium</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ortodontia</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Implantes dentários</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Atendimento prioritário</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Descontos na loja</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link 
                    href="/contato" 
                    className="block w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-center transition-colors"
                  >
                    Contratar Plano
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de perguntas frequentes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tire suas dúvidas sobre nossos planos odontológicos.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Existe carência nos planos?</h3>
                <p className="text-gray-600">
                  Sim, nossos planos possuem carência de 30 dias para procedimentos básicos, 60 dias para procedimentos intermediários e 180 dias para procedimentos avançados. Consulte as condições completas no contrato.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Como funciona o plano família?</h3>
                <p className="text-gray-600">
                  O plano família permite incluir até 5 dependentes (cônjuge e filhos) com todos os benefícios do plano Premium. Todos os dependentes devem ser cadastrados no momento da contratação.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Posso trocar de plano?</h3>
                <p className="text-gray-600">
                  Sim, você pode fazer upgrade do seu plano a qualquer momento. Para downgrade, é necessário aguardar o período mínimo de 12 meses de contrato.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quais formas de pagamento são aceitas?</h3>
                <p className="text-gray-600">
                  Aceitamos pagamento via cartão de crédito, débito automático e boleto bancário. Oferecemos desconto de 5% para pagamento anual à vista.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para cuidar do seu sorriso?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Entre em contato conosco e contrate o plano ideal para você e sua família.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contato" 
              className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Fale Conosco
            </Link>
            <Link 
              href="/teleconsulta" 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Agende uma Teleconsulta
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
