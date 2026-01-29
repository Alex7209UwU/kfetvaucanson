export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  note: string;
  image?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
}

export interface Note {
  id: string;
  content: string;
  date: string;
}

export interface Music {
  id: string;
  artist: string;
  title: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  week: string;
  image?: string;
  color?: string;
  textColor?: string;
  images?: string[];
  titleColor?: string;
  backgroundColor?: string;
}

export interface PlanningSlot {
  id: string;
  week: string;
  day: string;
  period: 'matin' | 'apres-midi';
  members: { id: string; name: string; present: boolean }[];
  tasks: { name: string; assignedTo: string }[];
}

export interface StockItem {
  productId: string;
  week: string;
  quantity: number;
}

export interface CaisseData {
  week: string;
  day: string;
  especes: number;
  bancaire: number;
}
