import { Space, SpaceFilters } from '../../domain/entities/Space';
import { GetSpacesUseCase } from '../../domain/usecases/GetSpacesUseCase';
import { GetSpacesByFilterUseCase } from '../../domain/usecases/GetSpacesByFilterUseCase';
import { GetSpaceByIdUseCase } from '../../domain/usecases/GetSpaceByIdUseCase';

/**
 * Controller para gerenciar operações relacionadas a Spaces
 * Conecta a UI aos casos de uso, formatando dados para apresentação
 */
export class SpaceController {
  constructor(
    private getSpacesUseCase: GetSpacesUseCase,
    private getSpacesByFilterUseCase: GetSpacesByFilterUseCase,
    private getSpaceByIdUseCase: GetSpaceByIdUseCase
  ) {}

  /**
   * Busca todos os espaços e formata para apresentação
   */
  async getAllSpaces(): Promise<SpaceViewModel[]> {
    try {
      const spaces = await this.getSpacesUseCase.execute();
      return spaces.map((space) => this.toViewModel(space));
    } catch (error) {
      console.error('Erro no controller ao buscar espaços:', error);
      throw error;
    }
  }

  /**
   * Busca espaços com filtros e formata para apresentação
   */
  async getSpacesByFilter(filters: SpaceFilters): Promise<SpaceViewModel[]> {
    try {
      const spaces = await this.getSpacesByFilterUseCase.execute(filters);
      return spaces.map((space) => this.toViewModel(space));
    } catch (error) {
      console.error('Erro no controller ao buscar espaços com filtros:', error);
      throw error;
    }
  }

  /**
   * Busca um espaço por ID e formata para apresentação
   */
  async getSpaceById(id: string): Promise<SpaceViewModel> {
    try {
      const space = await this.getSpaceByIdUseCase.execute(id);
      return this.toViewModel(space);
    } catch (error) {
      console.error('Erro no controller ao buscar espaço por ID:', error);
      throw error;
    }
  }

  /**
   * Converte a entidade Space para ViewModel (formato da UI)
   */
  private toViewModel(space: Space): SpaceViewModel {
    return {
      id: space.id,
      name: space.name,
      description: space.description,
      address: space.address,
      sports: space.sports,
      image: space.images[0] || '', // Primeira imagem ou string vazia
      images: space.images,
      price: space.price,
      rating: space.rating,
      reviews: 0, // Poderia vir de outra fonte de dados
      openingHours: space.openingHours,
      coordinates: space.coordinates,
      // Campos calculados para a UI
      formattedPrice: `R$ ${space.price.toFixed(2)}`,
      formattedRating: space.rating.toFixed(1),
      sportsText: space.sports.join(', '),
      isOpen: space.isOpenAt(this.getCurrentTime()),
    };
  }

  /**
   * Obtém o horário atual formatado
   */
  private getCurrentTime(): string {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }
}

/**
 * ViewModel para apresentação de Space na UI
 * Contém dados formatados e campos calculados para a interface
 */
export interface SpaceViewModel {
  id: string;
  name: string;
  description: string;
  address: string;
  sports: string[];
  image: string; // Imagem principal
  images: string[];
  price: number;
  rating: number;
  reviews: number;
  openingHours: {
    open: string;
    close: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  // Campos formatados para UI
  formattedPrice: string;
  formattedRating: string;
  sportsText: string;
  isOpen: boolean;
}
