import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Loja Online | DentalCare360',
  description: 'Produtos odontológicos de alta qualidade para cuidados bucais diários. Escovas, cremes dentais, fios e acessórios com entrega para todo Brasil.',
  keywords: 'produtos odontológicos, escova dental, creme dental, fio dental, enxaguante bucal, clareador dental',
}

// Tipo para produtos
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Lista de produtos
const products: Product[] = [
  {
    id: 1,
    name: "Escova Dental Profissional",
    description: "Escova com cerdas macias e cabo ergonômico para uma limpeza eficiente e confortável.",
    price: 29.90,
    image: "/images/product-placeholder.jpg",
    category: "Higiene",
    isBestSeller: true
  },
  {
    id: 2,
    name: "Creme Dental Branqueador",
    description: "Creme dental com fórmula branqueadora que remove manchas e fortalece o esmalte.",
    price: 24.90,
    discountPrice: 19.90,
    image: "/images/product-placeholder.jpg",
    category: "Higiene"
  },
  {
    id: 3,
    name: "Kit Clareador Dental",
    description: "Kit completo para clareamento dental caseiro com moldeiras e gel clareador.",
    price: 149.90,
    image: "/images/product-placeholder.jpg",
    category: "Clareamento",
    isNew: true
  },
  {
    id: 4,
    name: "Fio Dental Premium",
    description: "Fio dental de alta qualidade com tecnologia antideslizante e sabor de menta.",
    price: 15.90,
    image: "/images/product-placeholder.jpg",
    category: "Higiene"
  },
  {
    id: 5,
    name: "Enxaguante Bucal Antisséptico",
    description: "Enxaguante bucal que combate bactérias e proporciona hálito fresco por até 12 horas.",
    price: 32.90,
    discountPrice: 27.90,
    image: "/images/product-placeholder.jpg",
    category: "Higiene",
    isBestSeller: true
  },
  {
    id: 6,
    name: "Escova Interdental",
    description: "Conjunto de escovas interdentais para limpeza eficiente entre os dentes.",
    price: 19.90,
    image: "/images/product-placeholder.jpg",
    category: "Higiene"
  },
  {
    id: 7,
    name: "Irrigador Oral Portátil",
    description: "Irrigador oral portátil recarregável para limpeza profunda entre os dentes.",
    price: 199.90,
    discountPrice: 179.90,
    image: "/images/product-placeholder.jpg",
    category: "Equipamentos",
    isNew: true
  },
  {
    id: 8,
    name: "Protetor Bucal para Bruxismo",
    description: "Protetor bucal noturno para prevenção de desgaste dental causado pelo bruxismo.",
    price: 89.90,
    image: "/images/product-placeholder.jpg",
    category: "Proteção"
  }
];

export default function LojaPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Banner da página */}
      <section className="bg-blue-600 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Loja Online
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Produtos odontológicos de alta qualidade para cuidados bucais diários. Entrega para todo Brasil.
          </p>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium">
              Todos
            </button>
            <button className="bg-white text-gray-700 hover:bg-blue-100 px-6 py-2 rounded-full font-medium transition-colors">
              Higiene
            </button>
            <button className="bg-white text-gray-700 hover:bg-blue-100 px-6 py-2 rounded-full font-medium transition-colors">
              Clareamento
            </button>
            <button className="bg-white text-gray-700 hover:bg-blue-100 px-6 py-2 rounded-full font-medium transition-colors">
              Equipamentos
            </button>
            <button className="bg-white text-gray-700 hover:bg-blue-100 px-6 py-2 rounded-full font-medium transition-colors">
              Proteção
            </button>
          </div>
        </div>
      </section>

      {/* Lista de produtos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
                <div className="relative">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">Imagem do Produto</span>
                  </div>
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      NOVO
                    </div>
                  )}
                  {product.isBestSeller && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      MAIS VENDIDO
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.discountPrice ? (
                        <div className="flex items-center">
                          <span className="text-gray-400 line-through text-sm mr-2">R$ {product.price.toFixed(2)}</span>
                          <span className="text-blue-600 font-bold">R$ {product.discountPrice.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-blue-600 font-bold">R$ {product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informações de compra */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pagamento Seguro</h3>
              <p className="text-gray-600">
                Aceitamos diversas formas de pagamento com total segurança.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Entrega para Todo Brasil</h3>
              <p className="text-gray-600">
                Enviamos para todos os estados com rastreamento em tempo real.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Garantia de Qualidade</h3>
              <p className="text-gray-600">
                Todos os produtos são certificados e possuem garantia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Assine e Economize
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Receba produtos odontológicos mensalmente e ganhe até 20% de desconto.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/planos" 
              className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Conhecer Planos
            </Link>
            <Link 
              href="/contato" 
              className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
