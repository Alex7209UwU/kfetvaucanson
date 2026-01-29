import { useState, useEffect } from 'react';
import { Product, Member, Note, Music, Article, PlanningSlot, StockItem, CaisseData } from './types';
import { initialProducts, initialMembers, initialArticles } from './data/initialData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { HomePage } from './components/HomePage';
import { MDLPage } from './components/MDLPage';
import { VaucanSapPage } from './components/VaucanSapPage';
import { AdminPanel } from './components/AdminPanel';

const ADMIN_PASSWORD = 'kfetvox38';

type Page = 'home' | 'mdl' | 'vaucansap' | 'admin';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Navigate with transition effect
  const navigateTo = (page: Page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 150);
  };

  // Data state with localStorage persistence
  const [products, setProducts] = useLocalStorage<Product[]>('kfet-products', initialProducts);
  const [members, setMembers] = useLocalStorage<Member[]>('kfet-members', initialMembers);
  const [notes, setNotes] = useLocalStorage<Note[]>('kfet-notes', []);
  const [music, setMusic] = useLocalStorage<Music[]>('kfet-music', []);
  const [articles, setArticles] = useLocalStorage<Article[]>('kfet-articles', initialArticles);
  const [planning, setPlanning] = useLocalStorage<PlanningSlot[]>('kfet-planning', []);
  const [stocks, setStocks] = useLocalStorage<StockItem[]>('kfet-stocks', []);
  const [caisse, setCaisse] = useLocalStorage<CaisseData[]>('kfet-caisse', []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setCurrentPage('admin');
      setPassword('');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      setCurrentPage('admin');
    } else {
      setShowLoginModal(true);
    }
  };

  // Render admin panel if logged in and on admin page
  if (isLoggedIn && currentPage === 'admin') {
    return (
      <AdminPanel
        products={products}
        setProducts={setProducts}
        members={members}
        setMembers={setMembers}
        notes={notes}
        setNotes={setNotes}
        music={music}
        setMusic={setMusic}
        articles={articles}
        setArticles={setArticles}
        planning={planning}
        setPlanning={setPlanning}
        stocks={stocks}
        setStocks={setStocks}
        caisse={caisse}
        setCaisse={setCaisse}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="relative">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Administration</h2>
              <p className="text-gray-600 mt-1">Entrez le mot de passe pour accéder</p>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className={`w-full px-4 py-3 border rounded-lg mb-4 text-center text-lg ${
                loginError ? 'border-red-500 bg-red-50' : ''
              }`}
              placeholder="••••••••"
              autoFocus
            />
            {loginError && (
              <p className="text-red-600 text-sm text-center mb-4">Mot de passe incorrect</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setPassword('');
                  setLoginError(false);
                }}
                className="flex-1 px-4 py-3 border rounded-lg font-medium hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700"
              >
                Connexion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'home' && (
          <HomePage products={products} onNavigate={(page) => navigateTo(page as Page)} />
        )}
        {currentPage === 'mdl' && (
          <MDLPage articles={articles} onBack={() => navigateTo('home')} onNavigate={(page) => navigateTo(page as Page)} />
        )}
        {currentPage === 'vaucansap' && (
          <VaucanSapPage onBack={() => navigateTo('home')} />
        )}
      </div>

      {/* Footer */}
      {currentPage !== 'admin' && (
        <footer className="bg-gray-900 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-1">Vaucanson K'Fet</h3>
                <p className="text-gray-400 text-sm">© 2026 Vaucanson K'Fet - MDL</p>
              </div>
              <button
                onClick={handleAdminClick}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Administration
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
