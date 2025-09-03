import { Space } from '../entities/Space';
import { SpaceRepository } from '../repositories/SpaceRepository';

/**
 * Caso de uso para buscar um espaço por ID
 * Contém a lógica de negócio para recuperar um espaço específico
 */
export class GetSpaceByIdUseCase {
  constructor(private spaceRepository: SpaceRepository) {}

  /**
   * Executa a busca de um espaço por ID
   */
  async execute(id: string): Promise<Space> {
    try {
      // Valida o ID
      this.validateId(id);

      const space = await this.spaceRepository.findById(id);

      if (!space) {
        throw new Error('Espaço não encontrado');
      }

      // Aplica regras de negócio se necessário
      return this.applyBusinessRules(space);
    } catch (error) {
      console.error('Erro ao buscar espaço por ID:', error);
      throw error;
    }
  }

  /**
   * Valida o ID recebido
   */
  private validateId(id: string): void {
    if (!id || id.trim() === '') {
      throw new Error('ID do espaço é obrigatório');
    }
  }

  /**
   * Aplica regras de negócio ao espaço
   */
  private applyBusinessRules(space: Space): Space {
    // Aqui poderia aplicar regras como:
    // - Verificar se o espaço está ativo
    // - Calcular disponibilidade
    // - Aplicar descontos baseados em regras de negócio

    return space;
  }
}
