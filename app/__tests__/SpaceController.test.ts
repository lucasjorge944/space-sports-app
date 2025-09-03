/**
 * Exemplo de teste unitário usando a nova arquitetura Clean
 * Demonstra como mockar dependências e testar isoladamente
 */

import { Space, SpaceFilters } from '../domain/entities/Space';
import { SpaceRepository } from '../domain/repositories/SpaceRepository';
import { GetSpacesUseCase } from '../domain/usecases/GetSpacesUseCase';
import { SpaceController } from '../presentation/controllers/SpaceController';

// Mock do repositório para testes
class MockSpaceRepository implements SpaceRepository {
  private spaces: Space[] = [];

  constructor(mockSpaces: Space[] = []) {
    this.spaces = mockSpaces;
  }

  async findAll(): Promise<Space[]> {
    return Promise.resolve(this.spaces);
  }

  async findByFilters(filters: SpaceFilters): Promise<Space[]> {
    let filtered = this.spaces;

    if (filters.sport) {
      filtered = filtered.filter((space) => space.hasSport(filters.sport!));
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((space) => space.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((space) => space.price <= filters.maxPrice!);
    }

    if (filters.rating !== undefined) {
      filtered = filtered.filter((space) => space.rating >= filters.rating!);
    }

    return Promise.resolve(filtered);
  }

  async findById(id: string): Promise<Space | null> {
    const space = this.spaces.find((s) => s.id === id);
    return Promise.resolve(space || null);
  }

  async findNearby(): Promise<Space[]> {
    return Promise.resolve(this.spaces);
  }

  async findBySport(sport: string): Promise<Space[]> {
    const filtered = this.spaces.filter((space) => space.hasSport(sport));
    return Promise.resolve(filtered);
  }

  async findAllSorted(): Promise<Space[]> {
    return Promise.resolve(this.spaces);
  }

  async create(): Promise<Space> {
    throw new Error('Not implemented in mock');
  }

  async update(): Promise<Space> {
    throw new Error('Not implemented in mock');
  }

  async delete(): Promise<void> {
    throw new Error('Not implemented in mock');
  }
}

describe('SpaceController', () => {
  let mockRepository: MockSpaceRepository;
  let getSpacesUseCase: GetSpacesUseCase;
  let controller: SpaceController;

  const mockSpaces = [
    new Space(
      '1',
      'Arena Sports',
      'Quadra de Beach Tennis',
      'Rua A, 123',
      ['Beach Tennis'],
      ['image1.jpg'],
      100,
      4.8,
      { open: '08:00', close: '22:00' },
      { latitude: -23.5505, longitude: -46.6333 }
    ),
    new Space(
      '2',
      'Centro Esportivo',
      'Quadras múltiplas',
      'Rua B, 456',
      ['Futevôlei', 'Beach Tennis'],
      ['image2.jpg'],
      80,
      4.2,
      { open: '07:00', close: '23:00' },
      { latitude: -23.5489, longitude: -46.6388 }
    ),
  ];

  beforeEach(() => {
    mockRepository = new MockSpaceRepository(mockSpaces);
    getSpacesUseCase = new GetSpacesUseCase(mockRepository);

    // Para este exemplo, vamos simplificar e usar apenas um use case
    controller = new SpaceController(
      getSpacesUseCase,
      // Em um teste real, criaríamos mocks para todos os use cases
      {} as any,
      {} as any
    );
  });

  describe('getAllSpaces', () => {
    it('deve retornar todos os espaços formatados como ViewModel', async () => {
      const result = await controller.getAllSpaces();

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: '1',
        name: 'Arena Sports',
        formattedPrice: 'R$ 100.00',
        formattedRating: '4.8',
        sportsText: 'Beach Tennis',
      });
    });

    it('deve aplicar regras de negócio (filtrar por rating baixo)', async () => {
      // Adiciona um espaço com rating muito baixo
      const lowRatingSpace = new Space(
        '3',
        'Espaço Ruim',
        'Descrição',
        'Endereço',
        ['Futebol'],
        [],
        50,
        0.5, // Rating muito baixo
        { open: '08:00', close: '18:00' },
        { latitude: 0, longitude: 0 }
      );

      mockRepository = new MockSpaceRepository([...mockSpaces, lowRatingSpace]);
      getSpacesUseCase = new GetSpacesUseCase(mockRepository);
      controller = new SpaceController(getSpacesUseCase, {} as any, {} as any);

      const result = await controller.getAllSpaces();

      // Deve filtrar o espaço com rating baixo (< 1.0)
      expect(result).toHaveLength(2);
      expect(result.find((s) => s.id === '3')).toBeUndefined();
    });
  });

  describe('Space entity', () => {
    it('deve verificar se tem um esporte específico', () => {
      const space = mockSpaces[1]; // Centro Esportivo

      expect(space.hasSport('Beach Tennis')).toBe(true);
      expect(space.hasSport('Futevôlei')).toBe(true);
      expect(space.hasSport('Futebol')).toBe(false);
    });

    it('deve verificar se o preço está no range', () => {
      const space = mockSpaces[0]; // Arena Sports - R$ 100

      expect(space.isPriceInRange(50, 150)).toBe(true);
      expect(space.isPriceInRange(120, 200)).toBe(false);
      expect(space.isPriceInRange(undefined, 80)).toBe(false);
    });
  });
});

// Exemplo de como rodar o teste:
// npm test -- SpaceController.test.ts
