import { Product, Member, Article } from '../types';

export const initialProducts: Product[] = [
  { id: '1', name: 'Chocolat Chaud', category: 'Boissons Chaudes', price: 0.70, note: '' },
  { id: '2', name: 'Thé', category: 'Boissons Chaudes', price: 0.50, note: '' },
  { id: '3', name: 'Café allongé', category: 'Boissons Chaudes', price: 0.50, note: '' },
  { id: '4', name: 'Café court', category: 'Boissons Chaudes', price: 0.50, note: '' },
  { id: '5', name: 'Snikers', category: 'Snacks', price: 1.00, note: '' },
  { id: '6', name: 'Oasis Pomme Cassis', category: 'Boissons Froides', price: 1.00, note: '' },
  { id: '7', name: 'Bibi Fruit', category: 'Snacks', price: 1.00, note: '' },
  { id: '8', name: 'Coca-Cola Zero', category: 'Boissons Froides', price: 1.00, note: '' },
  { id: '9', name: 'Kinder Bueno White', category: 'Snacks', price: 1.50, note: '' },
  { id: '10', name: 'Mars', category: 'Snacks', price: 1.00, note: '' },
  { id: '11', name: 'Lipton Framboise', category: 'Boissons Froides', price: 1.00, note: '' },
  { id: '12', name: 'Coca-Cola Original', category: 'Boissons Froides', price: 1.00, note: '' },
  { id: '13', name: 'Kinder Bueno Original', category: 'Snacks', price: 1.50, note: '' },
  { id: '14', name: 'Coca Cherry', category: 'Boissons Froides', price: 1.50, note: '' },
];

export const initialMembers: Member[] = [
  { id: '1', name: 'Maël Humeau', role: 'Président' },
  { id: '2', name: 'Anakin Elis-Villenave', role: 'Vice-Président' },
  { id: '3', name: 'Jonah', role: 'Trésorier' },
  { id: '4', name: 'Làila', role: 'Responsable Vente' },
  { id: '5', name: 'Noa Dewasmes', role: 'Secrétaire' },
  { id: '6', name: 'Alexis Ailhas-Giroud', role: 'Secrétaire Adjoint' },
  { id: '7', name: 'Félix Topin', role: 'Trésorier Adjoint' },
  { id: '8', name: 'Eldenn Levièvre', role: 'Membre' },
  { id: '9', name: 'Timothe Senzani', role: 'Membre' },
  { id: '10', name: 'Alexis Vartagnan', role: 'Membre' },
  { id: '11', name: 'Jonathan Perriard', role: 'Membre' },
  { id: '12', name: 'Nolan Delrieu', role: 'Membre' },
  { id: '13', name: 'Lilou Liauzu', role: 'Membre' },
  { id: '14', name: 'Tom Régent-Dufour', role: 'Membre' },
];

export const initialArticles: Article[] = [
  { id: '1', title: 'Archive 1', content: 'Contenu archive 1', date: '2026-01-12', week: '2026-01-12' },
  { id: '2', title: 'Archive 2', content: 'Contenu archive 2', date: '2025-12-15', week: '2025-12-15' },
  { id: '3', title: 'Archive 3', content: 'Contenu archive 3', date: '2025-12-08', week: '2025-12-08' },
];

export const categories = ['Boissons Chaudes', 'Boissons Froides', 'Pâtisseries', 'Snacks'];

export const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

export const tasks = ['Comptes', 'Poubelles', 'Nettoyage'];
