import { Space, SpaceFilters } from '../entities/Space';

/**
 * Interface do repositório de Spaces
 * Define o contrato para persistência de dados de espaços esportivos
 * Não conhece detalhes de implementação (Firestore, API REST, etc.)
 */
export interface SpaceRepository {
  /**
   * Busca todos os espaços
   */
  findAll(): Promise<Space[]>;

  /**
   * Busca espaços com filtros aplicados
   */
  findByFilters(filters: SpaceFilters): Promise<Space[]>;

  /**
   * Busca um espaço por ID
   */
  findById(id: string): Promise<Space | null>;

  /**
   * Busca espaços próximos a uma coordenada
   */
  findNearby(
    latitude: number,
    longitude: number,
    radiusKm: number
  ): Promise<Space[]>;

  /**
   * Busca espaços por esporte específico
   */
  findBySport(sport: string): Promise<Space[]>;

  /**
   * Busca espaços ordenados por critério
   */
  findAllSorted(
    sortBy: 'rating' | 'price' | 'name',
    order: 'asc' | 'desc'
  ): Promise<Space[]>;

  /**
   * Cria um novo espaço
   */
  create(space: Omit<Space, 'id'>): Promise<Space>;

  /**
   * Atualiza um espaço existente
   */
  update(id: string, space: Partial<Space>): Promise<Space>;

  /**
   * Remove um espaço
   */
  delete(id: string): Promise<void>;
}
