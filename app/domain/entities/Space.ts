/**
 * Entidade de domínio Space
 * Representa um espaço esportivo no domínio da aplicação
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface OpeningHours {
  open: string;
  close: string;
}

export interface SpaceFilters {
  sport?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

export class Space {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly address: string,
    public readonly sports: string[],
    public readonly images: string[],
    public readonly price: number,
    public readonly rating: number,
    public readonly openingHours: OpeningHours,
    public readonly coordinates: Coordinates
  ) {}

  /**
   * Verifica se o espaço oferece um esporte específico
   */
  hasSport(sport: string): boolean {
    return this.sports.includes(sport);
  }

  /**
   * Verifica se o preço está dentro de um range
   */
  isPriceInRange(minPrice?: number, maxPrice?: number): boolean {
    if (minPrice !== undefined && this.price < minPrice) return false;
    if (maxPrice !== undefined && this.price > maxPrice) return false;
    return true;
  }

  /**
   * Verifica se o rating atende ao mínimo
   */
  hasMinimumRating(minRating: number): boolean {
    return this.rating >= minRating;
  }

  /**
   * Verifica se o espaço está aberto em um horário específico
   */
  isOpenAt(time: string): boolean {
    return time >= this.openingHours.open && time <= this.openingHours.close;
  }

  /**
   * Factory method para criar Space a partir de dados brutos
   */
  static fromData(data: any): Space {
    return new Space(
      data.id,
      data.name,
      data.description,
      data.address,
      data.sports || [],
      data.images || [],
      data.price || 0,
      data.rating || 0,
      data.openingHours || { open: '00:00', close: '23:59' },
      data.coordinates || { latitude: 0, longitude: 0 }
    );
  }

  /**
   * Converte para objeto plano para persistência
   */
  toData(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      address: this.address,
      sports: this.sports,
      images: this.images,
      price: this.price,
      rating: this.rating,
      openingHours: this.openingHours,
      coordinates: this.coordinates,
    };
  }
}
