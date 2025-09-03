import { Space, SpaceFilters } from '../entities/Space';
import { SpaceRepository } from '../repositories/SpaceRepository';

/**
 * Caso de uso para buscar espaços com filtros
 * Contém a lógica de negócio para filtrar espaços
 */
export class GetSpacesByFilterUseCase {
  constructor(private spaceRepository: SpaceRepository) {}

  /**
   * Executa a busca de espaços com filtros aplicados
   */
  async execute(filters: SpaceFilters): Promise<Space[]> {
    try {
      // Valida os filtros
      this.validateFilters(filters);

      const spaces = await this.spaceRepository.findByFilters(filters);

      // Aplica regras de negócio específicas para filtros
      return this.applyFilterBusinessRules(spaces, filters);
    } catch (error) {
      console.error('Erro ao buscar espaços com filtros:', error);
      throw new Error(
        'Não foi possível carregar os espaços com os filtros aplicados'
      );
    }
  }

  /**
   * Valida os filtros recebidos
   */
  private validateFilters(filters: SpaceFilters): void {
    if (filters.minPrice !== undefined && filters.minPrice < 0) {
      throw new Error('Preço mínimo não pode ser negativo');
    }

    if (filters.maxPrice !== undefined && filters.maxPrice < 0) {
      throw new Error('Preço máximo não pode ser negativo');
    }

    if (
      filters.minPrice !== undefined &&
      filters.maxPrice !== undefined &&
      filters.minPrice > filters.maxPrice
    ) {
      throw new Error('Preço mínimo não pode ser maior que o preço máximo');
    }

    if (
      filters.rating !== undefined &&
      (filters.rating < 0 || filters.rating > 5)
    ) {
      throw new Error('Rating deve estar entre 0 e 5');
    }
  }

  /**
   * Aplica regras de negócio específicas para filtros
   */
  private applyFilterBusinessRules(
    spaces: Space[],
    filters: SpaceFilters
  ): Space[] {
    let filteredSpaces = [...spaces];

    // Se tem filtro de esporte, prioriza espaços que oferecem mais esportes similares
    if (filters.sport) {
      filteredSpaces = this.prioritizeSimilarSports(
        filteredSpaces,
        filters.sport
      );
    }

    // Aplica boost para espaços com alta avaliação
    if (filters.rating) {
      filteredSpaces = this.applyRatingBoost(filteredSpaces);
    }

    return filteredSpaces;
  }

  /**
   * Prioriza espaços com esportes similares
   */
  private prioritizeSimilarSports(
    spaces: Space[],
    targetSport: string
  ): Space[] {
    return spaces.sort((a, b) => {
      const aHasTarget = a.hasSport(targetSport);
      const bHasTarget = b.hasSport(targetSport);

      if (aHasTarget && !bHasTarget) return -1;
      if (!aHasTarget && bHasTarget) return 1;

      // Se ambos têm o esporte, prioriza por rating
      return b.rating - a.rating;
    });
  }

  /**
   * Aplica boost para espaços com alta avaliação
   */
  private applyRatingBoost(spaces: Space[]): Space[] {
    return spaces.sort((a, b) => {
      // Boost para espaços com rating acima de 4.5
      const aBoost = a.rating >= 4.5 ? 0.5 : 0;
      const bBoost = b.rating >= 4.5 ? 0.5 : 0;

      return b.rating + bBoost - (a.rating + aBoost);
    });
  }
}
