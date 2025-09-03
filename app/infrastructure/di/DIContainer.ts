import { SpaceRepository } from '../../domain/repositories/SpaceRepository';
import { GetSpacesUseCase } from '../../domain/usecases/GetSpacesUseCase';
import { GetSpacesByFilterUseCase } from '../../domain/usecases/GetSpacesByFilterUseCase';
import { GetSpaceByIdUseCase } from '../../domain/usecases/GetSpaceByIdUseCase';
import { FirestoreSpaceRepository } from '../repositories/FirestoreSpaceRepository';
import { SpaceController } from '../../presentation/controllers/SpaceController';

/**
 * Container de Injeção de Dependência
 * Configura e fornece todas as dependências da aplicação
 * Implementa o padrão Singleton para garantir instâncias únicas
 */
export class DIContainer {
  private static instance: DIContainer;

  // Repositórios
  private _spaceRepository: SpaceRepository | null = null;

  // Use Cases
  private _getSpacesUseCase: GetSpacesUseCase | null = null;
  private _getSpacesByFilterUseCase: GetSpacesByFilterUseCase | null = null;
  private _getSpaceByIdUseCase: GetSpaceByIdUseCase | null = null;

  // Controllers
  private _spaceController: SpaceController | null = null;

  private constructor() {}

  /**
   * Obtém a instância singleton do container
   */
  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  /**
   * Obtém o repositório de espaços
   */
  public getSpaceRepository(): SpaceRepository {
    if (!this._spaceRepository) {
      this._spaceRepository = new FirestoreSpaceRepository();
    }
    return this._spaceRepository;
  }

  /**
   * Obtém o caso de uso para buscar espaços
   */
  public getGetSpacesUseCase(): GetSpacesUseCase {
    if (!this._getSpacesUseCase) {
      this._getSpacesUseCase = new GetSpacesUseCase(this.getSpaceRepository());
    }
    return this._getSpacesUseCase;
  }

  /**
   * Obtém o caso de uso para buscar espaços com filtros
   */
  public getGetSpacesByFilterUseCase(): GetSpacesByFilterUseCase {
    if (!this._getSpacesByFilterUseCase) {
      this._getSpacesByFilterUseCase = new GetSpacesByFilterUseCase(
        this.getSpaceRepository()
      );
    }
    return this._getSpacesByFilterUseCase;
  }

  /**
   * Obtém o caso de uso para buscar espaço por ID
   */
  public getGetSpaceByIdUseCase(): GetSpaceByIdUseCase {
    if (!this._getSpaceByIdUseCase) {
      this._getSpaceByIdUseCase = new GetSpaceByIdUseCase(
        this.getSpaceRepository()
      );
    }
    return this._getSpaceByIdUseCase;
  }

  /**
   * Obtém o controller de espaços
   */
  public getSpaceController(): SpaceController {
    if (!this._spaceController) {
      this._spaceController = new SpaceController(
        this.getGetSpacesUseCase(),
        this.getGetSpacesByFilterUseCase(),
        this.getGetSpaceByIdUseCase()
      );
    }
    return this._spaceController;
  }

  /**
   * Limpa todas as instâncias (útil para testes)
   */
  public reset(): void {
    this._spaceRepository = null;
    this._getSpacesUseCase = null;
    this._getSpacesByFilterUseCase = null;
    this._getSpaceByIdUseCase = null;
    this._spaceController = null;
  }
}

/**
 * Factory function para facilitar o acesso ao container
 */
export const getDIContainer = (): DIContainer => DIContainer.getInstance();
