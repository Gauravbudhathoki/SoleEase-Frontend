import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const brands = [
  {
    name: 'Adidas',
    description: 'Pushing boundaries through innovative sport performance technologies and iconic street style.',
    tag: 'Sport Performance',
    image: '/images/adidas.jpg',
    size: 'large',
  },
  {
    name: 'Puma',
    description: 'Blending fast-paced athletic heritage with contemporary fashion-forward designs.',
    tag: 'Athletic Heritage',
    image: '/images/puma.jpg',
    size: 'small',
  },
  {
    name: 'Reebok',
    description: 'Timeless heritage classics meets modern fitness innovation for everyday excellence.',
    tag: 'Heritage Classic',
    image: '/images/reebok.jpg',
    size: 'small',
  },
  {
    name: 'Nike',
    description: 'The vanguard of athletic achievement, delivering world-class engineering for every athlete.',
    tag: 'Elite Performance',
    image: '/images/nike.jpg',
    size: 'large',
  },
];

export default function BrandsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />

      <main className="max-w-6xl mx-auto w-full px-6 py-10 flex-1">
        <span className="text-xs tracking-[0.2em] uppercase text-amber-700 font-semibold">
          Engineering Excellence
        </span>
        <div className="flex items-end justify-between gap-4 mt-2">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">Our Brands</h1>
            <p className="text-stone-500 mt-2 max-w-2xl">
              Discover our curated portfolio of precision-engineered footwear families.
              Each brand within the SoleEase ecosystem is defined by a specific athletic
              discipline and uncompromising material integrity.
            </p>
          </div>
          <span className="text-xs text-stone-400 whitespace-nowrap hidden sm:block">
            Scroll to Explore ↓
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={`relative rounded-xl overflow-hidden bg-stone-100 flex flex-col ${
                brand.size === 'large' ? 'sm:row-span-1' : ''
              }`}
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-5 bg-white flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-stone-900">{brand.name}</h3>
                <p className="mt-1 text-sm text-stone-500 flex-1">{brand.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                    {brand.tag}
                  </span>
                  <Link
                    href={`/products?brand=${encodeURIComponent(brand.name)}`}
                    className="text-sm font-medium text-stone-900 hover:underline whitespace-nowrap"
                  >
                    Explore Collection →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <section className="bg-black text-white py-14 px-6 text-center">
        <h2 className="text-xl md:text-2xl font-bold">Can&apos;t decide on the right fit?</h2>
        <p className="mt-2 text-stone-400 text-sm max-w-md mx-auto">
          Use our AI-powered Shoe Finder to match your movement profile with the
          perfect brand family.
        </p>
        <button className="mt-6 px-6 py-3 rounded-md bg-amber-600 text-white text-sm font-semibold uppercase tracking-wide hover:bg-amber-700 transition-colors">
          Start Shoe Finder
        </button>
      </section>

      <Footer />
    </div>
  );
}