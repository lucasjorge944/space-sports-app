import { SpaceContainer } from './containers/SpaceContainer';
import { BookingContainer } from './containers/BookingContainer';
import { EnrollmentContainer } from './containers/EnrollmentContainer';

/**
 * Container de Injeção de Dependência Principal
 * Organiza e fornece acesso aos módulos da aplicação
 * Implementa o padrão Singleton para garantir instâncias únicas
 */
export class DIContainer {
  private static instance: DIContainer;

  // Containers organizados por domínio
  private _spaceContainer: SpaceContainer | null = null;
  private _bookingContainer: BookingContainer | null = null;
  private _enrollmentContainer: EnrollmentContainer | null = null;

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

  // ===================================================================
  // CONTAINERS - Acesso organizado por domínio
  // ===================================================================

  /**
   * Obtém o container de Spaces
   */
  public get spaces(): SpaceContainer {
    if (!this._spaceContainer) {
      this._spaceContainer = new SpaceContainer();
    }
    return this._spaceContainer;
  }

  /**
   * Obtém o container de Bookings
   */
  public get bookings(): BookingContainer {
    if (!this._bookingContainer) {
      this._bookingContainer = new BookingContainer();
    }
    return this._bookingContainer;
  }

  /**
   * Obtém o container de Enrollments
   */
  public get enrollments(): EnrollmentContainer {
    if (!this._enrollmentContainer) {
      this._enrollmentContainer = new EnrollmentContainer();
    }
    return this._enrollmentContainer;
  }

  // ===================================================================
  // MÉTODOS DE CONVENIÊNCIA - Para manter compatibilidade
  // ===================================================================

  /**
   * @deprecated Use spaces.getSpaceController() instead
   */
  public getSpaceController() {
    return this.spaces.getSpaceController();
  }

  /**
   * @deprecated Use spaces.getGetSpacesUseCase() instead
   */
  public getGetSpacesUseCase() {
    return this.spaces.getGetSpacesUseCase();
  }

  /**
   * @deprecated Use spaces.getGetSpacesByFilterUseCase() instead
   */
  public getGetSpacesByFilterUseCase() {
    return this.spaces.getGetSpacesByFilterUseCase();
  }

  /**
   * @deprecated Use spaces.getGetSpaceByIdUseCase() instead
   */
  public getGetSpaceByIdUseCase() {
    return this.spaces.getGetSpaceByIdUseCase();
  }

  /**
   * Limpa todas as instâncias de todos os containers (útil para testes)
   */
  public reset(): void {
    this._spaceContainer?.reset();
    this._bookingContainer?.reset();
    this._enrollmentContainer?.reset();

    this._spaceContainer = null;
    this._bookingContainer = null;
    this._enrollmentContainer = null;
  }
}

/**
 * Factory function para facilitar o acesso ao container
 */
export const getDIContainer = (): DIContainer => DIContainer.getInstance();
