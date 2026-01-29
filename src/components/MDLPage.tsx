import { useState } from 'react';
import { Article } from '../types';
import { formatDateShort, getWeekKey, formatWeekDisplay } from '../utils/dateUtils';

interface MDLPageProps {
  articles: Article[];
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80',
  kfet: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  team: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  events: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
};

export function MDLPage({ articles, onBack, onNavigate }: MDLPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const currentWeek = getWeekKey(new Date());
  const currentWeekArticles = articles.filter(a => a.week === currentWeek);
  const archiveArticles = articles.filter(a => a.week !== currentWeek).slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold group"
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
            alt="MDL"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-indigo-900/70 to-violet-900/80"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/20 mb-6">
            <span className="animate-pulse">🏛️</span>
            Association Lycéenne
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            La Maison des <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Lycéens</span>
          </h1>
          <p className="text-xl text-white/90 font-light">Une association gérée par et pour les lycéens !</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Qu'est-ce que c'est */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              ❓ Présentation
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Qu'est-ce que c'est ?</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              La MDL est une association gérée par et pour les lycéens ! Elle permet d'organiser des événements, de financer des projets et d'améliorer la vie au lycée.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl blur-2xl opacity-30"></div>
            <img
              src={IMAGES.team}
              alt="L'équipe MDL"
              className="relative rounded-3xl shadow-2xl w-full h-72 object-cover"
            />
          </div>
        </section>

        {/* La K'Fet */}
        <section className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={IMAGES.kfet}
              alt="La K'Fet"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 to-orange-900/70"></div>
          </div>
          <div className="relative p-8 md:p-12 lg:p-16">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4 border border-white/20">
              ☕ Espace Gourmand
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">La K'Fet</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl leading-relaxed">
              La K'Fet, un endroit fait pour que les élèves tout autant que le personnel du lycée puissent se détendre autour d'un café ou d'un soda avec de quoi se restaurer.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-900 rounded-full font-bold transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <span>🍽️</span> Voir le menu
            </button>
          </div>
        </section>

        {/* Nos Projets */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900">Nos Projets</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🛋️', text: "Mise en place d'un espace détente" },
              { icon: '✈️', text: "Financement de sorties et voyages scolaires" },
              { icon: '♟️', text: "Accueil club : jeux d'échecs, jeu de go, dessins, etc." },
              { icon: '📢', text: "Organisation d'événements engagés au sein du lycée" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <span className="text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi nous rejoindre */}
        <section className="bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")' }}></div>
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">Pourquoi nous rejoindre ?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { num: '01', text: "Pour participer activement à la vie du lycée" },
                { num: '02', text: "Pour proposer et concrétiser tes propres idées" },
                { num: '03', text: "Pour rencontrer d'autres élèves motivés et engagés" },
                { num: '04', text: "Pour vivre une expérience associative unique et enrichissante" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                  <span className="text-4xl font-black text-white/30">{item.num}</span>
                  <span className="text-white/90 font-medium mt-2">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projets - Financement */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900">Financement de Projets</h2>
          </div>
          
          <p className="text-gray-600 mb-6 text-lg">
            Vous êtes un club du lycée ou vous portez un projet pour le lycée ? La Maison des Lycéens (MDL) peut vous aider à financer votre projet.
          </p>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
            <p className="text-gray-700 mb-4 font-medium">
              Pour cela, il vous suffit de remplir le dossier de candidature puis de :
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">📄</span>
                <span className="text-gray-600">le déposer en vie scolaire</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">📧</span>
                <span className="text-gray-600">ou l'envoyer par mail à : <a href="mailto:mdl.vaucanson38@gmail.com" className="text-purple-600 font-semibold hover:underline">mdl.vaucanson38@gmail.com</a></span>
              </li>
            </ul>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            Les candidatures seront ensuite étudiées par l'équipe de la MDL et du CVL, qui décideront du montant de l'aide financière accordée.
          </p>
        </section>

        {/* Actualités */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">📰</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900">Actualités</h2>
          </div>
          
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              {formatWeekDisplay(currentWeek)}
            </h3>
            {currentWeekArticles.length > 0 ? (
              <div className="grid gap-4">
                {currentWeekArticles.map(article => (
                  <div 
                    key={article.id} 
                    className="border-l-4 pl-6 py-6 px-6 rounded-2xl hover:shadow-lg transition-shadow"
                    style={{ 
                      borderColor: article.color || '#8b5cf6',
                      backgroundColor: article.backgroundColor || '#ffffff',
                    }}
                  >
                    {article.images && article.images.length > 0 ? (
                      <div className={`mb-4 ${article.images.length > 1 ? 'grid grid-cols-2 gap-2' : ''}`}>
                        {article.images.slice(0, 4).map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${article.title} - ${idx + 1}`}
                            className={`w-full object-cover rounded-xl ${article.images!.length === 1 ? 'h-48' : 'h-32'}`}
                          />
                        ))}
                      </div>
                    ) : article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                    )}
                    <h4 
                      className="font-bold text-lg"
                      style={{ color: article.titleColor || '#111827' }}
                    >
                      {article.title}
                    </h4>
                    <p 
                      className="mt-2 whitespace-pre-wrap"
                      style={{ color: article.textColor || '#374151' }}
                    >
                      {article.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <span className="text-5xl mb-4 block">📭</span>
                <p className="text-gray-500 italic">Aucun article pour cette semaine.</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span>📚</span> Archives
            </h3>
            {archiveArticles.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {archiveArticles.map(article => (
                  <div 
                    key={article.id} 
                    onClick={() => setSelectedArticle(article)}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 hover:shadow-md cursor-pointer transition-all group"
                  >
                    <span className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-purple-100">
                      📄
                    </span>
                    <div>
                      <p className="text-gray-900 font-medium text-sm">{article.title}</p>
                      <p className="text-gray-500 text-xs">{formatDateShort(article.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center py-8">Aucune archive disponible.</p>
            )}

            {/* Article Detail Modal */}
            {selectedArticle && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedArticle(null)}>
                <div 
                  className="rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" 
                  style={{ backgroundColor: selectedArticle.backgroundColor || '#ffffff' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-500">{formatDateShort(selectedArticle.date)}</span>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {selectedArticle.images && selectedArticle.images.length > 0 ? (
                    <div className={`mb-6 ${selectedArticle.images.length > 1 ? 'grid grid-cols-2 gap-3' : ''}`}>
                      {selectedArticle.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${selectedArticle.title} - ${idx + 1}`}
                          className={`w-full object-cover rounded-2xl ${selectedArticle.images!.length === 1 ? 'h-64' : 'h-40'}`}
                        />
                      ))}
                    </div>
                  ) : selectedArticle.image && (
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      className="w-full h-64 object-cover rounded-2xl mb-6"
                    />
                  )}
                  <div 
                    className="border-l-4 pl-4"
                    style={{ borderColor: selectedArticle.color || '#8b5cf6' }}
                  >
                    <h3 
                      className="text-2xl font-black mb-4"
                      style={{ color: selectedArticle.titleColor || '#111827' }}
                    >
                      {selectedArticle.title}
                    </h3>
                    <p 
                      className="whitespace-pre-wrap leading-relaxed"
                      style={{ color: selectedArticle.textColor || '#374151' }}
                    >
                      {selectedArticle.content}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">Maison des Lycéens Vaucanson</h3>
          <p className="text-purple-200">Ensemble, améliorons la vie au lycée !</p>
        </div>
      </footer>
    </div>
  );
}
