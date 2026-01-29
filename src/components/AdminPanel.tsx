import { useState } from 'react';
import { Product, Member, Note, Music, Article, PlanningSlot, StockItem, CaisseData } from '../types';
import { PlanningTab } from './admin/PlanningTab';
import { PostesTab } from './admin/PostesTab';
import { NotesTab } from './admin/NotesTab';
import { MusicTab } from './admin/MusicTab';
import { ArticlesTab } from './admin/ArticlesTab';
import { AdminSubPanel } from './admin/AdminSubPanel';

interface AdminPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  members: Member[];
  setMembers: (members: Member[]) => void;
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  music: Music[];
  setMusic: (music: Music[]) => void;
  articles: Article[];
  setArticles: (articles: Article[]) => void;
  planning: PlanningSlot[];
  setPlanning: (planning: PlanningSlot[]) => void;
  stocks: StockItem[];
  setStocks: (stocks: StockItem[]) => void;
  caisse: CaisseData[];
  setCaisse: (caisse: CaisseData[]) => void;
  onLogout: () => void;
}

type Tab = 'planning' | 'postes' | 'notes' | 'music' | 'articles' | 'admin';

const ADMIN_PASSWORD = 'vaucansonkfet38';

export function AdminPanel({
  products, setProducts,
  members, setMembers,
  notes, setNotes,
  music, setMusic,
  articles, setArticles,
  planning, setPlanning,
  stocks, setStocks,
  caisse, setCaisse,
  onLogout,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('planning');
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);

  const handleAdminAccess = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminUnlocked(true);
      setAdminError(false);
    } else {
      setAdminError(true);
    }
  };

  const tabs: { id: Tab; label: string; icon: string; color: string }[] = [
    { id: 'planning', label: 'Planning', icon: '📅', color: 'from-blue-500 to-cyan-500' },
    { id: 'postes', label: 'Postes', icon: '👥', color: 'from-purple-500 to-pink-500' },
    { id: 'notes', label: 'Notes', icon: '📝', color: 'from-yellow-500 to-orange-500' },
    { id: 'music', label: 'Music', icon: '🎵', color: 'from-green-500 to-teal-500' },
    { id: 'articles', label: 'Articles', icon: '📰', color: 'from-indigo-500 to-purple-500' },
    { id: 'admin', label: 'Admin', icon: '⚙️', color: 'from-red-500 to-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200">
              <span className="text-white text-2xl">☕</span>
            </div>
            <div>
              <h1 className="font-black text-xl text-gray-900">Administration K'Fet</h1>
              <p className="text-sm text-gray-500">Maison des Lycéens Vaucanson</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-5 py-2.5 text-gray-600 hover:text-white hover:bg-red-500 rounded-xl font-semibold transition-all flex items-center gap-2 border-2 border-gray-200 hover:border-red-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b shadow-sm sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-2.5 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.id === 'admin' && !adminUnlocked && (
                  <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'planning' && (
          <PlanningTab members={members} planning={planning} setPlanning={setPlanning} />
        )}
        {activeTab === 'postes' && (
          <PostesTab members={members} setMembers={setMembers} />
        )}
        {activeTab === 'notes' && (
          <NotesTab notes={notes} setNotes={setNotes} />
        )}
        {activeTab === 'music' && (
          <MusicTab music={music} setMusic={setMusic} />
        )}
        {activeTab === 'articles' && (
          <ArticlesTab articles={articles} setArticles={setArticles} />
        )}
        {activeTab === 'admin' && (
          adminUnlocked ? (
            <AdminSubPanel
              products={products}
              setProducts={setProducts}
              stocks={stocks}
              setStocks={setStocks}
              caisse={caisse}
              setCaisse={setCaisse}
            />
          ) : (
            <div className="max-w-md mx-auto mt-12">
              <div className="bg-white rounded-3xl p-10 shadow-xl text-center border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-200">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Zone Sécurisée</h2>
                <p className="text-gray-500 mb-8">Entrez le mot de passe administrateur pour accéder à la gestion des produits, stocks et caisse.</p>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminAccess()}
                  className={`w-full px-5 py-4 border-2 rounded-xl mb-4 text-center text-lg font-medium transition-all ${
                    adminError ? 'border-red-500 bg-red-50 shake' : 'border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  }`}
                  placeholder="••••••••"
                />
                {adminError && (
                  <p className="text-red-600 text-sm mb-4 font-medium">❌ Mot de passe incorrect</p>
                )}
                <button
                  onClick={handleAdminAccess}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-rose-700 transition-all shadow-lg shadow-red-200"
                >
                  🔓 Accéder
                </button>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
