import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Space {
  id: string;
  name: string;
  description: string;
  address: string;
  sports: string[];
  images: string[];
  price: number;
  rating: number;
  openingHours: {
    open: string;
    close: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export async function getSpaces(): Promise<Space[]> {
  try {
    const spacesRef = collection(db, 'spaces');
    const spacesSnapshot = await getDocs(spacesRef);

    return spacesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Space[];
  } catch (error) {
    console.error('Error fetching spaces:', error);
    throw error;
  }
}

export async function getSpacesByFilter(filters: {
  sport?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}) {
  try {
    let spacesQuery = collection(db, 'spaces');
    const conditions = [];

    if (filters.sport) {
      conditions.push(where('sports', 'array-contains', filters.sport));
    }

    if (filters.minPrice !== undefined) {
      conditions.push(where('price', '>=', filters.minPrice));
    }

    if (filters.maxPrice !== undefined) {
      conditions.push(where('price', '<=', filters.maxPrice));
    }

    if (filters.rating !== undefined) {
      conditions.push(where('rating', '>=', filters.rating));
    }

    const q = query(
      spacesQuery,
      ...conditions,
      orderBy('rating', 'desc'),
      limit(20)
    );
    const spacesSnapshot = await getDocs(q);

    return spacesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Space[];
  } catch (error) {
    console.error('Error fetching filtered spaces:', error);
    throw error;
  }
}
