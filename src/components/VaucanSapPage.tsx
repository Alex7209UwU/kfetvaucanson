interface VaucanSapPageProps {
  onBack: () => void;
}

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  clothes1: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80',
  clothes2: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80',
  vintage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  rack: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80',
};

export function VaucanSapPage({ onBack }: VaucanSapPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 font-semibold group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à l'accueil
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Vaucan Sap"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 via-cyan-900/70 to-emerald-900/80"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/20 mb-6">
            <span className="animate-bounce">👕</span>
            Friperie Éco-responsable
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Vaucan <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Sap</span>
          </h1>
          <p className="text-xl text-white/90 font-light">La friperie pas chère du lycée, gérée par la MDL</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Qu'est-ce que c'est */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
              ❓ C'est quoi ?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Qu'est-ce que c'est ?</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              Vaucan Sap est une friperie étudiante créée et gérée par la Maison des Lycéens. Notre mission ? Rendre la mode accessible à tous les lycéens tout en adoptant une démarche éco-responsable.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Que tu cherches un jean vintage, un pull original ou des accessoires tendance, tu trouveras forcément ton bonheur chez Vaucan Sap !
            </p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={IMAGES.clothes1}
                  alt="Vêtements"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover"
                />
                <img
                  src={IMAGES.rack}
                  alt="Portant"
                  className="rounded-2xl shadow-xl w-full h-32 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src={IMAGES.clothes2}
                  alt="Vêtements"
                  className="rounded-2xl shadow-xl w-full h-32 object-cover"
                />
                <img
                  src={IMAGES.vintage}
                  alt="Vintage"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover"
                />
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-full font-bold shadow-xl">
              À partir de 0.50€ 🏷️
            </div>
          </div>
        </section>

        {/* Pourquoi Vaucan Sap */}
        <section className="bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">Pourquoi Vaucan Sap ?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '👗', title: 'Mode accessible', desc: 'À petits prix pour tous les lycéens' },
                { icon: '✨', title: 'Pièces uniques', desc: 'Pour créer ton propre style' },
                { icon: '🌍', title: 'Éco-responsable', desc: 'Seconde vie aux vêtements' },
                { icon: '💝', title: 'Solidaire', desc: 'Bénéfices pour les projets Vaucan Sap' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Infos Pratiques */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">ℹ️</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900">Infos pratiques</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Où nous trouver ?</h3>
              <p className="text-gray-600">Au sein du lycée Vaucanson, à la K'Fet</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">🕐</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Horaires</h3>
              <p className="text-gray-600">Récréations du <strong>lundi</strong> et <strong>mercredi</strong></p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Prix</h3>
              <p className="text-gray-600">À partir de <strong>50 centimes</strong></p>
            </div>
          </div>
        </section>

        {/* Dons */}
        <section className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
          <div className="absolute inset-0 opacity-20">
            <img
              src={IMAGES.clothes1}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/30">
                <span className="text-4xl">🎁</span>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Tu as des vêtements à donner ?</h2>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  Si tu as des vêtements en bon état que tu ne portes plus, n'hésite pas à les apporter chez Vaucan Sap ! Tu permettras à d'autres lycéens de se faire plaisir tout en soutenant les projets de Vaucan Sap.
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white font-semibold">
                  <span>📧</span>
                  Contacte la MDL pour plus d'infos sur les dons
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-teal-900 to-cyan-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-black mb-2">Vaucan Sap</h3>
          <p className="text-teal-200 text-lg">Friperie - Maison des Lycéens Vaucanson</p>
          <div className="mt-6 flex justify-center gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
              <span>♻️</span> Éco-responsable
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
              <span>💰</span> Prix mini
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
