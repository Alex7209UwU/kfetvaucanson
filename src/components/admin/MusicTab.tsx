import { useState } from 'react';
import { Music } from '../../types';

interface MusicTabProps {
  music: Music[];
  setMusic: (music: Music[]) => void;
}

export function MusicTab({ music, setMusic }: MusicTabProps) {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');

  const addMusic = () => {
    if (!artist.trim() || !title.trim()) return;
    const newMusic: Music = {
      id: Date.now().toString(),
      artist: artist.trim(),
      title: title.trim(),
    };
    setMusic([...music, newMusic]);
    setArtist('');
    setTitle('');
  };

  const deleteMusic = (id: string) => {
    setMusic(music.filter(m => m.id !== id));
  };

  // Random gradient colors for album art placeholders
  const gradients = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-teal-500 to-blue-500',
    'from-amber-500 to-orange-500',
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">🎵 Playlist K'Fet</h2>
          <p className="text-gray-500">{music.length} morceaux dans la playlist</p>
        </div>
      </div>

      {/* Add Music */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-1">
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎧</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Ajouter un morceau</h3>
              <p className="text-gray-500 text-sm">Enrichissez la playlist de la K'Fet</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">🎤 Artiste</label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Nom de l'artiste"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">🎵 Titre</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre de la chanson"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && addMusic()}
              />
            </div>
          </div>
          <button
            onClick={addMusic}
            disabled={!artist.trim() || !title.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-200 flex items-center gap-2"
          >
            <span>➕</span> Ajouter à la playlist
          </button>
        </div>
      </div>

      {/* Playlist */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-xl">
              <span className="text-3xl">🎶</span>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">PLAYLIST</p>
              <h3 className="text-2xl font-black">K'Fet Vibes</h3>
              <p className="text-gray-400 text-sm">{music.length} titres</p>
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="divide-y divide-gray-100">
          {music.map((item, index) => (
            <div 
              key={item.id} 
              className="flex items-center gap-4 p-4 hover:bg-gray-50 group transition-colors"
            >
              <span className="w-8 text-center text-gray-400 font-medium group-hover:hidden">
                {index + 1}
              </span>
              <span className="w-8 text-center hidden group-hover:block">
                <span className="text-lg">▶️</span>
              </span>
              
              {/* Album Art Placeholder */}
              <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}>
                <span className="text-white text-lg">🎵</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{item.title}</p>
                <p className="text-gray-500 text-sm truncate">{item.artist}</p>
              </div>
              
              <button
                onClick={() => deleteMusic(item.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {music.length === 0 && (
          <div className="p-12 text-center">
            <span className="text-6xl mb-4 block">🎧</span>
            <p className="text-gray-500 text-lg">La playlist est vide</p>
            <p className="text-gray-400 text-sm mt-2">Ajoutez vos morceaux préférés !</p>
          </div>
        )}
      </div>
    </div>
  );
}
