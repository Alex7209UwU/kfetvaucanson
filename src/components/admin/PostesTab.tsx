import { useState } from 'react';
import { Member } from '../../types';
import { ConfirmDialog } from '../ConfirmDialog';

interface PostesTabProps {
  members: Member[];
  setMembers: (members: Member[]) => void;
}

const roles = ['Président', 'Vice-Président', 'Trésorier', 'Trésorier Adjoint', 'Secrétaire', 'Secrétaire Adjoint', 'Responsable Vente', 'Membre'];

export function PostesTab({ members, setMembers }: PostesTabProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Membre');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const addMember = () => {
    if (!newName.trim()) return;
    const newMember: Member = {
      id: Date.now().toString(),
      name: newName.trim(),
      role: newRole,
    };
    setMembers([...members, newMember]);
    setNewName('');
    setNewRole('Membre');
    setShowAddForm(false);
  };

  const deleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
    setDeleteConfirm(null);
  };

  const getMemberToDelete = () => members.find(m => m.id === deleteConfirm);

  const startEdit = (member: Member) => {
    setEditingId(member.id);
    setEditName(member.name);
    setEditRole(member.role);
  };

  const saveEdit = () => {
    if (!editName.trim() || !editingId) return;
    setMembers(members.map(m =>
      m.id === editingId ? { ...m, name: editName.trim(), role: editRole } : m
    ));
    setEditingId(null);
  };

  const sortedMembers = [...members].sort((a, b) => {
    const aIndex = roles.indexOf(a.role);
    const bIndex = roles.indexOf(b.role);
    return aIndex - bIndex;
  });

  const getRoleStyle = (role: string) => {
    switch (role) {
      case 'Président': return { bg: 'from-amber-400 to-orange-500', badge: 'bg-amber-100 text-amber-800', icon: '👑' };
      case 'Vice-Président': return { bg: 'from-orange-400 to-red-500', badge: 'bg-orange-100 text-orange-800', icon: '⭐' };
      case 'Trésorier': return { bg: 'from-green-400 to-emerald-500', badge: 'bg-green-100 text-green-800', icon: '💰' };
      case 'Trésorier Adjoint': return { bg: 'from-emerald-400 to-teal-500', badge: 'bg-emerald-100 text-emerald-800', icon: '💵' };
      case 'Secrétaire': return { bg: 'from-blue-400 to-indigo-500', badge: 'bg-blue-100 text-blue-800', icon: '📋' };
      case 'Secrétaire Adjoint': return { bg: 'from-cyan-400 to-blue-500', badge: 'bg-cyan-100 text-cyan-800', icon: '📝' };
      case 'Responsable Vente': return { bg: 'from-purple-400 to-pink-500', badge: 'bg-purple-100 text-purple-800', icon: '🛒' };
      default: return { bg: 'from-gray-400 to-gray-500', badge: 'bg-gray-100 text-gray-800', icon: '👤' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Équipe MDL</h2>
          <p className="text-gray-500">{members.length} membres dans l'équipe</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <span>➕</span> Ajouter une personne
        </button>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900">Nouveau membre</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Ex: Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Poste</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{getRoleStyle(role).icon} {role}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={addMember}
                  disabled={!newName.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sortedMembers.map(member => {
          const style = getRoleStyle(member.role);
          
          return (
            <div 
              key={member.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              {editingId === member.id ? (
                <div className="p-5 space-y-4">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-purple-500"
                    placeholder="Nom"
                  />
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-purple-500"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm hover:bg-gray-50 font-medium"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={saveEdit}
                      className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 font-medium"
                    >
                      Sauver
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${style.bg}`}></div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${style.bg} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(member)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(member.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{member.name}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${style.badge}`}>
                      <span>{style.icon}</span>
                      {member.role}
                    </span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {members.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl">
          <span className="text-6xl mb-4 block">👥</span>
          <p className="text-gray-500 text-lg">Aucun membre dans l'équipe</p>
          <p className="text-gray-400 text-sm mt-2">Ajoutez votre premier membre !</p>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && getMemberToDelete() && (
        <ConfirmDialog
          title="Supprimer ce membre ?"
          message={`Voulez-vous vraiment supprimer ${getMemberToDelete()?.name} de l'équipe ?`}
          confirmText="Supprimer"
          onConfirm={() => deleteMember(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
          type="danger"
        />
      )}
    </div>
  );
}
