import { Space, SpaceFilters } from '../entities/Space';
import { SpaceRepository } from '../repositories/SpaceRepository';

/**
 * Caso de uso para buscar espaços
 * Contém a lógica de negócio para recuperar espaços
 */
export class GetSpacesUseCase {
  constructor(private spaceRepository: SpaceRepository) {}

  /**
   * Executa a busca de todos os espaços
   */
  async execute(): Promise<Space[]> {
    try {
      const spaces = await this.spaceRepository.findAll();

      // Aplica regras de negócio se necessário
      // Ex: filtrar espaços inativos, ordenar por relevância, etc.
      return this.applyBusinessRules(spaces);
    } catch (error) {
      console.error('Erro ao buscar espaços:', error);
      throw new Error('Não foi possível carregar os espaços');
    }
  }

  /**
   * Aplica regras de negócio aos espaços
   */
  private applyBusinessRules(spaces: Space[]): Space[] {
    return spaces;
    // Filtra espaços com rating muito baixo
    const filteredSpaces = spaces.filter((space) => space.rating >= 1.0);

    // Ordena por rating por padrão
    return filteredSpaces.sort((a, b) => b.rating - a.rating);
  }
}
