import { Product } from '../types';
import { useState, useEffect, useRef } from 'react';

interface HomePageProps {
  products: Product[];
  onNavigate: (page: string) => void;
}

// Images placeholder - à remplacer par de vraies photos
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
  snacks: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&q=80',
  cold: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=600&q=80',
  pastry: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
  team: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  lycee: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
  friperie: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  clothes: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80',
};

const getCategoryImage = (category: string) => {
  switch (category) {
    case 'Boissons Chaudes': return IMAGES.coffee;
    case 'Boissons Froides': return IMAGES.cold;
    case 'Pâtisseries': return IMAGES.pastry;
    case 'Snacks': return IMAGES.snacks;
    default: return IMAGES.coffee;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Boissons Chaudes': return '☕';
    case 'Boissons Froides': return '🥤';
    case 'Pâtisseries': return '🥐';
    case 'Snacks': return '🍫';
    default: return '☕';
  }
};

export function HomePage({ products, onNavigate }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('Boissons Chaudes');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const categories = ['Boissons Chaudes', 'Boissons Froides', 'Pâtisseries', 'Snacks'];

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(p => p.category === selectedCategory);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <img
            src={IMAGES.hero}
            alt="K'Fet Ambiance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        
        {/* Animated Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className={`relative text-center max-w-4xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/20">
              <span className="animate-bounce">☕</span>
              Lycée Vaucanson - Grenoble
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
            Vaucanson <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">K'Fet</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
            Votre pause gourmande au lycée. Boissons, snacks et viennoiseries à petits prix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToMenu}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-amber-500/30"
            >
              Voir la carte
              <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              onClick={() => onNavigate('mdl')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full text-lg font-semibold transition-all border border-white/30"
            >
              Découvrir la MDL
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-4 relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-orange-100/50 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              🍽️ Notre Carte
            </span>
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Saveurs & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Gourmandises</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Découvrez notre sélection de boissons chaudes, froides, snacks et pâtisseries à prix mini !
            </p>
          </div>

          {/* Category Image Banner */}
          <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden mb-8 shadow-2xl">
            <img
              src={getCategoryImage(selectedCategory)}
              alt={selectedCategory}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-center px-8 md:px-12">
              <div>
                <span className="text-5xl mb-4 block">{getCategoryIcon(selectedCategory)}</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white">{selectedCategory}</h3>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`group px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-200 scale-105'
                    : 'bg-white text-gray-700 hover:bg-amber-50 hover:shadow-md'
                }`}
              >
                <span className="text-xl">{getCategoryIcon(cat)}</span>
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">{getCategoryIcon(product.category)}</span>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    €
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{product.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                    {product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500">€</span>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-16">
                <span className="text-6xl mb-4 block">🔍</span>
                <p className="text-gray-500 text-lg">Aucun produit dans cette catégorie</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.team}
                  alt="L'équipe de la K'Fet"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Géré par les élèves</p>
                    <p className="text-sm text-gray-500">Pour les élèves</p>
                  </div>
                </div>
              </div>
              {/* Decorative Circles */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-200 rounded-full opacity-60 blur-xl"></div>
            </div>

            {/* Content Side */}
            <div>
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                ℹ️ Qui sommes-nous ?
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                La K'Fet du <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">lycée</span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                La K'Fet Vaucanson, c'est votre espace de pause au sein du lycée ! Gérée par la Maison des Lycéens, elle vous propose boissons chaudes, froides, snacks et viennoiseries à prix mini.
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Retrouvez-nous pendant les récréations pour une pause gourmande entre amis. Les bénéfices servent à financer les projets et événements de la MDL.
              </p>

              {/* Features */}
              <div className="space-y-4">
                {[
                  { icon: '🤝', title: 'Convivialité', desc: 'Un espace de détente géré par les élèves, pour les élèves', color: 'from-amber-50 to-orange-50' },
                  { icon: '💰', title: 'Petits prix', desc: 'Des produits accessibles à tous les budgets', color: 'from-green-50 to-emerald-50' },
                  { icon: '🏠', title: 'MDL', desc: 'Tous les bénéfices financent les projets de la Maison des Lycéens', color: 'from-purple-50 to-indigo-50' },
                ].map((item, i) => (
                  <div key={i} className={`bg-gradient-to-r ${item.color} rounded-2xl p-5 flex items-start gap-4 hover:shadow-lg transition-shadow`}>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MDL Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4 border border-white/20">
              🏛️ La Maison des Lycéens
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Rejoins la <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">MDL</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              La MDL est une association gérée par et pour les lycéens ! Elle permet d'organiser des événements, de financer des projets et d'améliorer la vie au lycée.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '👥', title: 'Par et pour les lycéens', desc: "Une association gérée par les élèves pour améliorer la vie au lycée", color: 'from-purple-500 to-indigo-600' },
              { icon: '🎉', title: 'Événements', desc: "Organisation de sorties, voyages scolaires et événements engagés", color: 'from-pink-500 to-rose-600' },
              { icon: '🎮', title: 'Clubs & Activités', desc: "Échecs, jeu de go, dessins et bien plus encore", color: 'from-indigo-500 to-violet-600' },
              { icon: '🛋️', title: 'Espace détente', desc: "Un lieu convivial pour se retrouver entre amis", color: 'from-violet-500 to-purple-600' },
            ].map((item, i) => (
              <div key={i} className="group bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/30 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('mdl')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-900 rounded-full text-lg font-bold transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              Découvrir la MDL
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Friperie Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
                👗 La Friperie du Lycée
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Découvre <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">Vaucan Sap</span>
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Une friperie pas chère gérée par la MDL ! Trouve des vêtements uniques et stylés tout en faisant un geste pour la planète.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '👗', title: 'Mode accessible', desc: "Des vêtements de qualité à petits prix" },
                  { icon: '💵', title: 'Prix mini', desc: "Tarifs adaptés aux lycéens" },
                  { icon: '🌍', title: 'Éco-responsable', desc: "Seconde vie aux vêtements" },
                  { icon: '✨', title: 'Pièces uniques', desc: "Crée ton propre style" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('vaucansap')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-teal-200"
              >
                Découvrir Vaucan Sap
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.friperie}
                  alt="Vaucan Sap Friperie"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-teal-700 rounded-full text-sm font-semibold">
                    À partir de 0.50€
                  </span>
                </div>
              </div>
              {/* Floating Image */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden shadow-xl hidden md:block">
                <img
                  src={IMAGES.clothes}
                  alt="Vêtements"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-200 rounded-full opacity-60 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              📍 Infos Pratiques
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Venez nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">rencontrer</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Address Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 text-center border border-amber-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">📍</span>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-4">Adresse</h3>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Lycée Vaucanson</strong><br />
                  27 Rue Anatole France<br />
                  38100 Grenoble
                </p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 text-center border border-green-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">🕐</span>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-4">Horaires</h3>
                <div className="space-y-3">
                  <div className="bg-white/60 rounded-xl p-3">
                    <p className="font-semibold text-gray-900">Matin</p>
                    <p className="text-gray-600">9h50 - 10h10</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-3">
                    <p className="font-semibold text-gray-900">Après-midi</p>
                    <p className="text-gray-600">15h20 - 15h40</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 text-center border border-blue-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">📧</span>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href="mailto:mdl.vaucanson38@gmail.com" className="block bg-white/60 rounded-xl p-3 hover:bg-white transition-colors">
                    <p className="text-gray-700 text-sm font-medium">mdl.vaucanson38@gmail.com</p>
                  </a>
                  <div className="bg-white/60 rounded-xl p-3">
                    <p className="text-blue-600 font-semibold">@MDL_Vaucanson</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
