/**
 * Testes para GetSpacesUseCase
 * Demonstra como testar casos de uso isoladamente
 */

import { Space } from '../domain/entities/Space';
import { SpaceRepository } from '../domain/repositories/SpaceRepository';
import { GetSpacesUseCase } from '../domain/usecases/GetSpacesUseCase';

// Mock simplificado do repositório
const createMockRepository = (spaces: Space[]): SpaceRepository => ({
  findAll: jest.fn().mockResolvedValue(spaces),
  findByFilters: jest.fn(),
  findById: jest.fn(),
  findNearby: jest.fn(),
  findBySport: jest.fn(),
  findAllSorted: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('GetSpacesUseCase', () => {
  let mockRepository: SpaceRepository;
  let useCase: GetSpacesUseCase;

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
      'Espaço com Rating Baixo',
      'Descrição',
      'Rua B, 456',
      ['Futebol'],
      ['image2.jpg'],
      50,
      0.5, // Rating muito baixo
      { open: '07:00', close: '23:00' },
      { latitude: -23.5489, longitude: -46.6388 }
    ),
    new Space(
      '3',
      'Centro Esportivo',
      'Quadras múltiplas',
      'Rua C, 789',
      ['Futevôlei', 'Beach Tennis'],
      ['image3.jpg'],
      80,
      4.2,
      { open: '06:00', close: '22:00' },
      { latitude: -23.54, longitude: -46.63 }
    ),
  ];

  beforeEach(() => {
    mockRepository = createMockRepository(mockSpaces);
    useCase = new GetSpacesUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('deve chamar o repositório para buscar espaços', async () => {
      await useCase.execute();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('deve retornar espaços sem aplicar regras de negócio', async () => {
      const result = await useCase.execute();

      // Verifica se está ordenado por rating (decrescente)
      expect(result[0].rating).toBe(4.8); // Espaço com rating muito baixo
      expect(result[1].rating).toBe(0.5); // Espaço com rating muito baixo
      expect(result[2].rating).toBe(4.2); // Centro Esportivo
      // Espaço com rating 0.5 deve ser filtrado
      expect(result).toHaveLength(3);
    });

    it('deve retornar espaços ordenados por rating', async () => {
      const result = await useCase.execute();

      // Verifica se está ordenado por rating (decrescente)
      expect(result[0].rating).toBe(4.8); // Arena Sports
      expect(result[1].rating).toBe(4.2); // Centro Esportivo
      // Espaço com rating 0.5 deve ser filtrado
      expect(result).toHaveLength(2);
    });

    it('deve filtrar espaços com rating muito baixo', async () => {
      const result = await useCase.execute();

      // Espaço com rating 0.5 não deve aparecer no resultado
      const lowRatingSpace = result.find((space) => space.rating === 0.5);
      expect(lowRatingSpace).toBeUndefined();
    });

    it('deve aplicar regras de negócio corretamente', async () => {
      const result = await useCase.execute();

      // Todos os espaços retornados devem ter rating >= 1.0
      result.forEach((space) => {
        expect(space.rating).toBeGreaterThanOrEqual(1.0);
      });

      // Deve estar ordenado por rating (decrescente)
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i].rating).toBeGreaterThanOrEqual(result[i + 1].rating);
      }
    });

    it('deve propagar erros do repositório', async () => {
      const errorMessage = 'Erro de conexão';
      mockRepository.findAll = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await expect(useCase.execute()).rejects.toThrow(
        'Não foi possível carregar os espaços'
      );
    });

    it('deve lidar com lista vazia', async () => {
      mockRepository.findAll = jest.fn().mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result).toEqual([]);
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
