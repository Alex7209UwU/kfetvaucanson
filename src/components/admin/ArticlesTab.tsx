import { useState, useRef } from 'react';
import { Article } from '../../types';
import { getWeekKey, formatWeekDisplay, formatDateShort } from '../../utils/dateUtils';
import { ConfirmDialog } from '../ConfirmDialog';

interface ArticlesTabProps {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
}

const backgroundColorOptions = [
  { name: 'Blanc', value: '#ffffff' },
  { name: 'Gris clair', value: '#f3f4f6' },
  { name: 'Violet clair', value: '#ede9fe' },
  { name: 'Bleu clair', value: '#dbeafe' },
  { name: 'Vert clair', value: '#d1fae5' },
  { name: 'Jaune clair', value: '#fef3c7' },
  { name: 'Rose clair', value: '#fce7f3' },
  { name: 'Orange clair', value: '#ffedd5' },
];

const accentColorOptions = [
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Bleu', value: '#3b82f6' },
  { name: 'Vert', value: '#10b981' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Rose', value: '#ec4899' },
  { name: 'Rouge', value: '#ef4444' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Indigo', value: '#6366f1' },
];

const textColorOptions = [
  { name: 'Noir', value: '#111827' },
  { name: 'Gris foncé', value: '#374151' },
  { name: 'Gris', value: '#6b7280' },
  { name: 'Blanc', value: '#ffffff' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Bleu', value: '#2563eb' },
  { name: 'Vert', value: '#059669' },
  { name: 'Rouge', value: '#dc2626' },
];

const titleColorOptions = [
  { name: 'Noir', value: '#111827' },
  { name: 'Gris foncé', value: '#374151' },
  { name: 'Blanc', value: '#ffffff' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Bleu', value: '#2563eb' },
  { name: 'Vert', value: '#059669' },
  { name: 'Orange', value: '#d97706' },
  { name: 'Rose', value: '#db2777' },
];

export function ArticlesTab({ articles, setArticles }: ArticlesTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [color, setColor] = useState('#8b5cf6');
  const [textColor, setTextColor] = useState('#374151');
  const [titleColor, setTitleColor] = useState('#111827');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'images'>('content');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImages(prev => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addImageFromUrl = () => {
    if (imageUrl.trim()) {
      setImages(prev => [...prev, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addArticle = () => {
    if (!title.trim() || !content.trim()) return;
    const today = new Date();
    const article: Article = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      date: today.toISOString().split('T')[0],
      week: getWeekKey(today),
      image: images[0],
      images: images,
      color: color,
      textColor: textColor,
      titleColor: titleColor,
      backgroundColor: backgroundColor,
    };
    setArticles([article, ...articles]);
    resetForm();
    setShowAddForm(false);
  };

  const deleteArticle = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
    setDeleteConfirm(null);
  };

  const getArticleToDelete = () => articles.find(a => a.id === deleteConfirm);

  const startEdit = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setContent(article.content);
    setImages(article.images || (article.image ? [article.image] : []));
    setColor(article.color || '#8b5cf6');
    setTextColor(article.textColor || '#374151');
    setTitleColor(article.titleColor || '#111827');
    setBackgroundColor(article.backgroundColor || '#ffffff');
    setActiveTab('content');
  };

  const saveEdit = () => {
    if (!editingId || !title.trim() || !content.trim()) return;
    setArticles(articles.map(a =>
      a.id === editingId 
        ? { 
            ...a, 
            title: title.trim(), 
            content: content.trim(), 
            image: images[0],
            images: images,
            color,
            textColor,
            titleColor,
            backgroundColor,
          } 
        : a
    ));
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImages([]);
    setImageUrl('');
    setColor('#8b5cf6');
    setTextColor('#374151');
    setTitleColor('#111827');
    setBackgroundColor('#ffffff');
    setShowAddForm(false);
    setActiveTab('content');
  };

  // Group articles by week
  const groupedArticles = articles.reduce((acc, article) => {
    const week = article.week;
    if (!acc[week]) acc[week] = [];
    acc[week].push(article);
    return acc;
  }, {} as Record<string, Article[]>);

  const sortedWeeks = Object.keys(groupedArticles).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Articles MDL</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <span>✍️</span> Nouvel article
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingId) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-2xl font-black text-gray-900">
                {editingId ? '✏️ Modifier l\'article' : '✨ Nouvel article'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab('content')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'content' 
                    ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50/50' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                📝 Contenu
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'images' 
                    ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50/50' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                🖼️ Images {images.length > 0 && <span className="ml-2 px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">{images.length}</span>}
              </button>
              <button
                onClick={() => setActiveTab('style')}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'style' 
                    ? 'text-amber-600 border-b-2 border-amber-500 bg-amber-50/50' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                🎨 Style
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📌 Titre de l'article</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-lg"
                      placeholder="Ex: Nouvelle vente de gâteaux !"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Contenu</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none transition-all font-sans"
                      rows={10}
                      placeholder="Écrivez le contenu de votre article ici...

Vous pouvez utiliser des paragraphes en sautant des lignes.

• Utilisez des puces pour les listes
• Comme ceci"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Conseil : Sautez des lignes pour créer des paragraphes
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'images' && (
                <div className="space-y-6">
                  {/* Upload from PC */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">📁 Ajouter depuis votre PC</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-amber-500 hover:bg-amber-50/50 transition-all cursor-pointer group"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
                        <svg className="w-8 h-8 text-gray-400 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">Cliquez pour sélectionner des images</p>
                      <p className="text-gray-400 text-sm mt-1">ou glissez-déposez vos fichiers ici</p>
                      <p className="text-xs text-gray-400 mt-3">PNG, JPG, GIF • Max 5 Mo</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Or URL */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">ou</span>
                    </div>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">🔗 Ajouter depuis une URL</label>
                    <div className="flex gap-3">
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="https://example.com/image.jpg"
                        onKeyDown={(e) => e.key === 'Enter' && addImageFromUrl()}
                      />
                      <button
                        onClick={addImageFromUrl}
                        disabled={!imageUrl.trim()}
                        className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>

                  {/* Images Preview */}
                  {images.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        🖼️ Images ajoutées ({images.length})
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((img, index) => (
                          <div key={index} className="relative group aspect-video rounded-xl overflow-hidden bg-gray-100">
                            <img
                              src={img}
                              alt={`Image ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23f3f4f6" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12">Erreur</text></svg>';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              {index === 0 && (
                                <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-lg">Image principale</span>
                              )}
                              <button
                                onClick={() => removeImage(index)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                            {index === 0 && (
                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-lg font-semibold">
                                  ⭐ Principale
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        💡 La première image sera utilisée comme image principale de l'article
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'style' && (
                <div className="space-y-8">
                  {/* Accent Color */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">🎨 Couleur d'accent (bordure)</label>
                    <div className="flex flex-wrap gap-3">
                      {accentColorOptions.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setColor(c.value)}
                          className={`relative w-12 h-12 rounded-xl transition-all transform hover:scale-110 ${
                            color === c.value ? 'ring-4 ring-offset-2 ring-gray-300 scale-110' : ''
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        >
                          {color === c.value && (
                            <svg className="w-6 h-6 text-white absolute inset-0 m-auto drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Background Color */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">🖼️ Couleur de fond</label>
                    <div className="flex flex-wrap gap-3">
                      {backgroundColorOptions.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setBackgroundColor(c.value)}
                          className={`relative w-12 h-12 rounded-xl transition-all transform hover:scale-110 border-2 ${
                            backgroundColor === c.value ? 'ring-4 ring-offset-2 ring-gray-300 scale-110 border-gray-400' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        >
                          {backgroundColor === c.value && (
                            <svg className="w-6 h-6 text-gray-600 absolute inset-0 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title Color */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">📌 Couleur du titre</label>
                    <div className="flex flex-wrap gap-3">
                      {titleColorOptions.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setTitleColor(c.value)}
                          className={`relative w-12 h-12 rounded-xl transition-all transform hover:scale-110 border-2 ${
                            titleColor === c.value ? 'ring-4 ring-offset-2 ring-gray-300 scale-110 border-gray-400' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        >
                          {titleColor === c.value && (
                            <svg className={`w-6 h-6 absolute inset-0 m-auto ${c.value === '#ffffff' ? 'text-gray-600' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Color */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">📝 Couleur du texte</label>
                    <div className="flex flex-wrap gap-3">
                      {textColorOptions.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setTextColor(c.value)}
                          className={`relative w-12 h-12 rounded-xl transition-all transform hover:scale-110 border-2 ${
                            textColor === c.value ? 'ring-4 ring-offset-2 ring-gray-300 scale-110 border-gray-400' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        >
                          {textColor === c.value && (
                            <svg className={`w-6 h-6 absolute inset-0 m-auto ${c.value === '#ffffff' ? 'text-gray-600' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-500 mb-4">👁️ Aperçu de l'article</p>
                    <div 
                      className="border-l-4 pl-4 py-4 rounded-r-xl shadow-sm"
                      style={{ 
                        borderColor: color,
                        backgroundColor: backgroundColor,
                      }}
                    >
                      {images.length > 0 && (
                        <img
                          src={images[0]}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg mb-3"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <h4 
                        className="font-bold text-lg"
                        style={{ color: titleColor }}
                      >
                        {title || 'Titre de l\'article'}
                      </h4>
                      <p 
                        className="mt-2 text-sm whitespace-pre-wrap"
                        style={{ color: textColor }}
                      >
                        {content || 'Contenu de l\'article...'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex gap-4 p-6 border-t border-gray-100 bg-gray-50">
              <button
                onClick={resetForm}
                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-100 font-semibold transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={editingId ? saveEdit : addArticle}
                disabled={!title.trim() || !content.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {editingId ? (
                  <>💾 Sauvegarder</>
                ) : (
                  <>🚀 Publier</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-10">
        {sortedWeeks.map(week => (
          <div key={week}>
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-3">
              <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
              {formatWeekDisplay(week)}
            </h3>
            <div className="space-y-4">
              {groupedArticles[week].map(article => (
                <div 
                  key={article.id} 
                  className="rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
                  style={{ backgroundColor: article.backgroundColor || '#ffffff' }}
                >
                  <div 
                    className="h-2"
                    style={{ backgroundColor: article.color || '#8b5cf6' }}
                  ></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
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
                          className="font-bold text-xl mb-2"
                          style={{ color: article.titleColor || '#111827' }}
                        >
                          {article.title}
                        </h4>
                        <p 
                          className="whitespace-pre-wrap"
                          style={{ color: article.textColor || '#374151' }}
                        >
                          {article.content}
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                          <span className="text-sm text-gray-400">{formatDateShort(article.date)}</span>
                          <span 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: article.color || '#8b5cf6' }}
                          ></span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => startEdit(article)}
                          className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(article.id)}
                          className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl">
            <span className="text-6xl mb-4 block">📝</span>
            <p className="text-gray-500 text-lg">Aucun article publié</p>
            <p className="text-gray-400 text-sm mt-2">Cliquez sur "Nouvel article" pour commencer</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && getArticleToDelete() && (
        <ConfirmDialog
          title="Supprimer cet article ?"
          message={`Voulez-vous vraiment supprimer "${getArticleToDelete()?.title}" ?`}
          confirmText="Supprimer"
          onConfirm={() => deleteArticle(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
          type="danger"
        />
      )}
    </div>
  );
}
