// Exemplo de módulo para Enrollments
// Aqui você adicionaria as dependências relacionadas a matrículas

/**
 * Container de Injeção de Dependência para Enrollments
 * Contém todas as dependências relacionadas a matrículas
 */
export class EnrollmentContainer {
  // Repositórios
  // private _enrollmentRepository: EnrollmentRepository | null = null;

  // Use Cases
  // private _createEnrollmentUseCase: CreateEnrollmentUseCase | null = null;
  // private _getEnrollmentsUseCase: GetEnrollmentsUseCase | null = null;
  // private _cancelEnrollmentUseCase: CancelEnrollmentUseCase | null = null;

  // Controllers
  // private _enrollmentController: EnrollmentController | null = null;

  /**
   * Exemplo de método para repositório de enrollments
   */
  // public getEnrollmentRepository(): EnrollmentRepository {
  //   if (!this._enrollmentRepository) {
  //     this._enrollmentRepository = new FirestoreEnrollmentRepository();
  //   }
  //   return this._enrollmentRepository;
  // }

  /**
   * Exemplo de método para use case de criar enrollment
   */
  // public getCreateEnrollmentUseCase(): CreateEnrollmentUseCase {
  //   if (!this._createEnrollmentUseCase) {
  //     this._createEnrollmentUseCase = new CreateEnrollmentUseCase(
  //       this.getEnrollmentRepository()
  //     );
  //   }
  //   return this._createEnrollmentUseCase;
  // }

  /**
   * Exemplo de método para controller de enrollments
   */
  // public getEnrollmentController(): EnrollmentController {
  //   if (!this._enrollmentController) {
  //     this._enrollmentController = new EnrollmentController(
  //       this.getCreateEnrollmentUseCase(),
  //       this.getGetEnrollmentsUseCase(),
  //       this.getCancelEnrollmentUseCase()
  //     );
  //   }
  //   return this._enrollmentController;
  // }

  /**
   * Limpa todas as instâncias do container
   */
  public reset(): void {
    // this._enrollmentRepository = null;
    // this._createEnrollmentUseCase = null;
    // this._getEnrollmentsUseCase = null;
    // this._cancelEnrollmentUseCase = null;
    // this._enrollmentController = null;
  }
}
