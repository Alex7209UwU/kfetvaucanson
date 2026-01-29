import { useState } from 'react';
import { Note } from '../../types';

interface NotesTabProps {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

export function NotesTab({ notes, setNotes }: NotesTabProps) {
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      content: newNote.trim(),
      date: new Date().toISOString(),
    };
    setNotes([note, ...notes]);
    setNewNote('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Colors for sticky notes
  const noteColors = [
    'from-yellow-100 to-yellow-200 border-yellow-300',
    'from-pink-100 to-pink-200 border-pink-300',
    'from-blue-100 to-blue-200 border-blue-300',
    'from-green-100 to-green-200 border-green-300',
    'from-purple-100 to-purple-200 border-purple-300',
    'from-orange-100 to-orange-200 border-orange-300',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">📝 Notes</h2>
        <p className="text-gray-500">Gardez une trace de toutes vos idées et rappels</p>
      </div>

      {/* Add Note */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-2xl">✏️</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Écrivez une nouvelle note... (appuyez sur Entrée pour plus de lignes)"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none transition-all"
              rows={4}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={addNote}
                disabled={!newNote.trim()}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-yellow-200 flex items-center gap-2"
              >
                <span>📌</span> Épingler la note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {notes.map((note, index) => (
          <div 
            key={note.id} 
            className={`bg-gradient-to-br ${noteColors[index % noteColors.length]} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border-2 relative group`}
            style={{
              transform: `rotate(${(index % 3 - 1) * 1}deg)`,
            }}
          >
            {/* Pin decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full shadow-md flex items-center justify-center">
              <div className="w-2 h-2 bg-red-300 rounded-full"></div>
            </div>
            
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed font-medium pt-2">{note.content}</p>
            <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-300/30">{formatDate(note.date)}</p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {notes.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl">
          <span className="text-6xl mb-4 block">📋</span>
          <p className="text-gray-500 text-lg">Aucune note pour le moment</p>
          <p className="text-gray-400 text-sm mt-2">Commencez à écrire vos idées !</p>
        </div>
      )}
    </div>
  );
}
