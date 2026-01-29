import { useState } from 'react';
import { Product, StockItem, CaisseData } from '../../types';
import { getWeekKey, formatWeekDisplay, addWeeks } from '../../utils/dateUtils';

interface AdminSubPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  stocks: StockItem[];
  setStocks: (stocks: StockItem[]) => void;
  caisse: CaisseData[];
  setCaisse: (caisse: CaisseData[]) => void;
}

const categories = ['Boissons Chaudes', 'Boissons Froides', 'Pâtisseries', 'Snacks'];
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

const categoryIcons: Record<string, string> = {
  'Boissons Chaudes': '☕',
  'Boissons Froides': '🥤',
  'Pâtisseries': '🥐',
  'Snacks': '🍫',
};

export function AdminSubPanel({ products, setProducts, stocks, setStocks, caisse, setCaisse }: AdminSubPanelProps) {
  const [activeTab, setActiveTab] = useState<'produits' | 'stocks' | 'caisse'>('produits');
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekKey = getWeekKey(currentDate);

  // Product form state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState(categories[0]);
  const [productPrice, setProductPrice] = useState('');
  const [productNote, setProductNote] = useState('');

  const addProduct = () => {
    if (!productName.trim() || !productPrice) return;
    const product: Product = {
      id: Date.now().toString(),
      name: productName.trim(),
      category: productCategory,
      price: parseFloat(productPrice),
      note: productNote,
    };
    setProducts([...products, product]);
    setProductName('');
    setProductPrice('');
    setProductNote('');
    setShowAddProduct(false);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Stock functions
  const getStock = (productId: string): number => {
    const stock = stocks.find(s => s.productId === productId && s.week === weekKey);
    return stock?.quantity || 0;
  };

  const updateStock = (productId: string, quantity: number) => {
    const existing = stocks.find(s => s.productId === productId && s.week === weekKey);
    if (existing) {
      setStocks(stocks.map(s =>
        s.productId === productId && s.week === weekKey ? { ...s, quantity } : s
      ));
    } else {
      setStocks([...stocks, { productId, week: weekKey, quantity }]);
    }
  };

  // Caisse functions
  const getCaisse = (day: string): { especes: number; bancaire: number } => {
    const data = caisse.find(c => c.week === weekKey && c.day === day);
    return { especes: data?.especes || 0, bancaire: data?.bancaire || 0 };
  };

  const updateCaisse = (day: string, field: 'especes' | 'bancaire', value: number) => {
    const existing = caisse.find(c => c.week === weekKey && c.day === day);
    if (existing) {
      setCaisse(caisse.map(c =>
        c.week === weekKey && c.day === day ? { ...c, [field]: value } : c
      ));
    } else {
      setCaisse([...caisse, { week: weekKey, day, especes: field === 'especes' ? value : 0, bancaire: field === 'bancaire' ? value : 0 }]);
    }
  };

  const getTotalEspeces = () => days.reduce((sum, day) => sum + getCaisse(day).especes, 0);
  const getTotalBancaire = () => days.reduce((sum, day) => sum + getCaisse(day).bancaire, 0);

  const goToToday = () => setCurrentDate(new Date());
  const prevWeek = () => setCurrentDate(addWeeks(currentDate, -1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  const tabs = [
    { id: 'produits' as const, label: 'Produits', icon: '📦', color: 'from-amber-500 to-orange-500' },
    { id: 'stocks' as const, label: 'Stocks', icon: '📊', color: 'from-blue-500 to-cyan-500' },
    { id: 'caisse' as const, label: 'Caisse', icon: '💰', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Produits */}
      {activeTab === 'produits' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900">📦 Gestion des produits</h2>
              <p className="text-gray-500">{products.length} produits dans le catalogue</p>
            </div>
            <button
              onClick={() => setShowAddProduct(true)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg flex items-center gap-2"
            >
              <span>➕</span> Ajouter un produit
            </button>
          </div>

          {showAddProduct && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">Nouveau produit</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500"
                      placeholder="Ex: Coca-Cola"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{categoryIcons[cat]} {cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prix (€)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500"
                      placeholder="1.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Note (optionnel)</label>
                    <input
                      type="text"
                      value={productNote}
                      onChange={(e) => setProductNote(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500"
                      placeholder="Ex: Nouveau !"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => setShowAddProduct(false)} 
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button 
                      onClick={addProduct} 
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products by Category */}
          {categories.map(category => {
            const categoryProducts = products.filter(p => p.category === category);
            if (categoryProducts.length === 0) return null;
            
            return (
              <div key={category} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b flex items-center gap-3">
                  <span className="text-2xl">{categoryIcons[category]}</span>
                  <h3 className="font-bold text-gray-900">{category}</h3>
                  <span className="text-sm text-gray-500">({categoryProducts.length})</span>
                </div>
                <div className="divide-y">
                  {categoryProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                        <span className="text-xl">{categoryIcons[product.category]}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        {product.note && <p className="text-sm text-gray-500">{product.note}</p>}
                      </div>
                      <span className="text-lg font-bold text-amber-600">{product.price.toFixed(2)} €</span>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stocks */}
      {activeTab === 'stocks' && (
        <div className="space-y-6">
          {/* Week Navigation */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <button onClick={prevWeek} className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-xl text-gray-900">📊 {formatWeekDisplay(weekKey)}</h3>
              <button onClick={goToToday} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl text-sm font-semibold">
                Aujourd'hui
              </button>
            </div>
            <button onClick={nextWeek} className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Stock Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => {
              const quantity = getStock(product.id);
              const isLow = quantity < 5;
              const isEmpty = quantity === 0;
              
              return (
                <div 
                  key={product.id} 
                  className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all ${
                    isEmpty ? 'border-red-300 bg-red-50' : isLow ? 'border-orange-300 bg-orange-50' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                        <span className="text-xl">{categoryIcons[product.category]}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    {isEmpty && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold">RUPTURE</span>}
                    {isLow && !isEmpty && <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-bold">FAIBLE</span>}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateStock(product.id, Math.max(0, quantity - 1))}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center font-bold text-xl transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => updateStock(product.id, parseInt(e.target.value) || 0)}
                      className={`flex-1 px-4 py-2 border-2 rounded-xl text-center text-xl font-bold ${
                        isEmpty ? 'border-red-300 bg-red-50' : isLow ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                      }`}
                    />
                    <button
                      onClick={() => updateStock(product.id, quantity + 1)}
                      className="w-10 h-10 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl flex items-center justify-center font-bold text-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Caisse */}
      {activeTab === 'caisse' && (
        <div className="space-y-6">
          {/* Week Navigation */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <button onClick={prevWeek} className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-xl text-gray-900">💰 {formatWeekDisplay(weekKey)}</h3>
              <button onClick={goToToday} className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-semibold">
                Aujourd'hui
              </button>
            </div>
            <button onClick={nextWeek} className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Daily Caisse */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {days.map(day => {
              const data = getCaisse(day);
              const total = data.especes + data.bancaire;
              return (
                <div key={day} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4 text-center text-lg">{day}</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                        <span>💵</span> Espèces
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={data.especes || ''}
                        onChange={(e) => updateCaisse(day, 'especes', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-center font-bold focus:border-green-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                        <span>💳</span> Bancaire
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={data.bancaire || ''}
                        onChange={(e) => updateCaisse(day, 'bancaire', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-center font-bold focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="pt-3 border-t-2 border-dashed border-gray-200">
                      <p className="text-center">
                        <span className="text-sm text-gray-500">Total:</span>
                        <span className="block text-xl font-black text-amber-600">{total.toFixed(2)} €</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-center text-white shadow-xl shadow-green-200">
              <p className="text-green-100 mb-2 flex items-center justify-center gap-2">
                <span>💵</span> Total Espèces
              </p>
              <p className="text-4xl font-black">{getTotalEspeces().toFixed(2)} €</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-center text-white shadow-xl shadow-blue-200">
              <p className="text-blue-100 mb-2 flex items-center justify-center gap-2">
                <span>💳</span> Total Bancaire
              </p>
              <p className="text-4xl font-black">{getTotalBancaire().toFixed(2)} €</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-center text-white shadow-xl shadow-amber-200">
              <p className="text-amber-100 mb-2 flex items-center justify-center gap-2">
                <span>🏆</span> Total Semaine
              </p>
              <p className="text-4xl font-black">{(getTotalEspeces() + getTotalBancaire()).toFixed(2)} €</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
