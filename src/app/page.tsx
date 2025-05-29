import HeroBanner from '@/components/HeroBanner'
import ServicesHighlight from '@/components/ServicesHighlight'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <ServicesHighlight />
      {/* Outras seções serão adicionadas aqui posteriormente */}
    </main>
  )
}
