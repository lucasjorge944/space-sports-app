import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
} from 'firebase/firestore';

import { db } from '../../config/firebase';
import { Space, SpaceFilters } from '../../domain/entities/Space';
import { SpaceRepository } from '../../domain/repositories/SpaceRepository';

/**
 * Implementação concreta do repositório usando Firestore
 * Conhece os detalhes de implementação do Firebase/Firestore
 */
export class FirestoreSpaceRepository implements SpaceRepository {
  private readonly collectionName = 'spaces';

  async findAll(): Promise<Space[]> {
    try {
      const spacesRef = collection(db, this.collectionName);
      const snapshot = await getDocs(spacesRef);

      return snapshot.docs.map((doc) =>
        Space.fromData({ id: doc.id, ...doc.data() })
      );
    } catch (error) {
      console.error('Erro no Firestore ao buscar todos os espaços:', error);
      throw new Error('Falha na comunicação com o banco de dados');
    }
  }

  async findByFilters(filters: SpaceFilters): Promise<Space[]> {
    try {
      const spacesRef = collection(db, this.collectionName);
      const constraints: QueryConstraint[] = [];

      // Aplica filtros como constraints do Firestore
      if (filters.sport) {
        constraints.push(where('sports', 'array-contains', filters.sport));
      }

      if (filters.minPrice !== undefined) {
        constraints.push(where('price', '>=', filters.minPrice));
      }

      if (filters.maxPrice !== undefined) {
        constraints.push(where('price', '<=', filters.maxPrice));
      }

      if (filters.rating !== undefined) {
        constraints.push(where('rating', '>=', filters.rating));
      }

      // Adiciona ordenação e limite
      constraints.push(orderBy('rating', 'desc'));
      constraints.push(limit(20));

      const q = query(spacesRef, ...constraints);
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) =>
        Space.fromData({ id: doc.id, ...doc.data() })
      );
    } catch (error) {
      console.error('Erro no Firestore ao buscar espaços com filtros:', error);
      throw new Error('Falha na comunicação com o banco de dados');
    }
  }

  async findById(id: string): Promise<Space | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      return Space.fromData({ id: docSnap.id, ...docSnap.data() });
    } catch (error) {
      console.error('Erro no Firestore ao buscar espaço por ID:', error);
      throw new Error('Falha na comunicação com o banco de dados');
    }
  }

  async findNearby(
    latitude: number,
    longitude: number,
    radiusKm: number
  ): Promise<Space[]> {
    try {
      // Implementação simplificada - em produção usaria geohashing ou GeoFirestore
      const spacesRef = collection(db, this.collectionName);
      const snapshot = await getDocs(spacesRef);

      const spaces = snapshot.docs.map((doc) =>
        Space.fromData({ id: doc.id, ...doc.data() })
      );

      // Filtra por distância (cálculo simples)
      return spaces.filter((space) => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          space.coordinates.latitude,
          space.coordinates.longitude
        );
        return distance <= radiusKm;
      });
    } catch (error) {
      console.error('Erro no Firestore ao buscar espaços próximos:', error);
      throw new Error('Falha na comunicação com o banco de dados');
    }
  }

  async findBySport(sport: string): Promise<Space[]> {
    try {
      const spacesRef = collection(db, this.collectionName);
      const q = query(
        spacesRef,
        where('sports', 'array-contains', sport),
        orderBy('rating', 'desc'),
        limit(20)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) =>
        Space.fromData({ id: doc.id, ...doc.data() })
      );
    } catch (error) {
      console.error('Erro no Firestore ao buscar espaços por esporte:', error);
      throw new Error('Falha na comunicação com o banco de dados');
    }
  }

  async findAllSorted(
    sortBy: 'rating' | 'price' | 'name',
    order: 'asc' | 'desc'
  ): Promise<Space[]> {
    try {
      const spacesRef = collection(db, this.collectionName);
      const q = query(spacesRef, orderBy(sortBy, order), limit(50));

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) =>
        Space.fromData({ id: doc.id, ...doc.data() })
      );
    } catch (error) {
      console.error('Erro no Firestore ao buscar espaços ordenados:', error);
      throw new Error('Falha na comunicação com o banco de dados');
    }
  }

  async create(spaceData: Omit<Space, 'id'>): Promise<Space> {
    try {
      const spacesRef = collection(db, this.collectionName);
      const docRef = await addDoc(spacesRef, {
        name: spaceData.name,
        description: spaceData.description,
        address: spaceData.address,
        sports: spaceData.sports,
        images: spaceData.images,
        price: spaceData.price,
        rating: spaceData.rating,
        openingHours: spaceData.openingHours,
        coordinates: spaceData.coordinates,
      });

      return Space.fromData({ id: docRef.id, ...spaceData });
    } catch (error) {
      console.error('Erro no Firestore ao criar espaço:', error);
      throw new Error('Falha na comunicação com o banco de dados');
    }
  }

  async update(id: string, spaceData: Partial<Space>): Promise<Space> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, spaceData);

      // Busca o documento atualizado
      const updatedSpace = await this.findById(id);
      if (!updatedSpace) {
        throw new Error('Espaço não encontrado após atualização');
      }

      return updatedSpace;
    } catch (error) {
      console.error('Erro no Firestore ao atualizar espaço:', error);
      throw new Error('Falha na comunicação com o banco de dados');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro no Firestore ao deletar espaço:', error);
      throw new Error('Falha na comunicação com o banco de dados');
    }
  }

  /**
   * Calcula a distância entre duas coordenadas em quilômetros
   * Usando a fórmula de Haversine
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
