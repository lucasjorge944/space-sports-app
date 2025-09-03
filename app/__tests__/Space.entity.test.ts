/**
 * Testes para a entidade Space
 * Testa a lógica de negócio da entidade
 */

import { Space } from '../domain/entities/Space';

describe('Space Entity', () => {
  let space: Space;

  beforeEach(() => {
    space = new Space(
      '1',
      'Arena Sports',
      'Quadra de Beach Tennis e Vôlei',
      'Rua A, 123, São Paulo',
      ['Beach Tennis', 'Vôlei', 'Futevôlei'],
      ['image1.jpg', 'image2.jpg'],
      100,
      4.8,
      { open: '08:00', close: '22:00' },
      { latitude: -23.5505, longitude: -46.6333 }
    );
  });

  describe('hasSport', () => {
    it('deve retornar true para esporte que o espaço oferece', () => {
      expect(space.hasSport('Beach Tennis')).toBe(true);
      expect(space.hasSport('Vôlei')).toBe(true);
      expect(space.hasSport('Futevôlei')).toBe(true);
    });

    it('deve retornar false para esporte que o espaço não oferece', () => {
      expect(space.hasSport('Futebol')).toBe(false);
      expect(space.hasSport('Basquete')).toBe(false);
      expect(space.hasSport('Tênis')).toBe(false);
    });

    it('deve ser case sensitive', () => {
      expect(space.hasSport('beach tennis')).toBe(false);
      expect(space.hasSport('BEACH TENNIS')).toBe(false);
    });
  });

  describe('isPriceInRange', () => {
    it('deve retornar true quando preço está no range', () => {
      expect(space.isPriceInRange(50, 150)).toBe(true);
      expect(space.isPriceInRange(100, 200)).toBe(true);
      expect(space.isPriceInRange(0, 100)).toBe(true);
    });

    it('deve retornar false quando preço está fora do range', () => {
      expect(space.isPriceInRange(150, 200)).toBe(false);
      expect(space.isPriceInRange(0, 50)).toBe(false);
    });

    it('deve funcionar com apenas preço mínimo', () => {
      expect(space.isPriceInRange(50)).toBe(true);
      expect(space.isPriceInRange(150)).toBe(false);
    });

    it('deve funcionar com apenas preço máximo', () => {
      expect(space.isPriceInRange(undefined, 150)).toBe(true);
      expect(space.isPriceInRange(undefined, 50)).toBe(false);
    });

    it('deve retornar true quando não há filtros de preço', () => {
      expect(space.isPriceInRange()).toBe(true);
    });
  });

  describe('hasMinimumRating', () => {
    it('deve retornar true quando rating atende ao mínimo', () => {
      expect(space.hasMinimumRating(4.0)).toBe(true);
      expect(space.hasMinimumRating(4.8)).toBe(true);
      expect(space.hasMinimumRating(3.0)).toBe(true);
    });

    it('deve retornar false quando rating não atende ao mínimo', () => {
      expect(space.hasMinimumRating(5.0)).toBe(false);
      expect(space.hasMinimumRating(4.9)).toBe(false);
    });
  });

  describe('isOpenAt', () => {
    it('deve retornar true para horários dentro do funcionamento', () => {
      expect(space.isOpenAt('08:00')).toBe(true);
      expect(space.isOpenAt('15:30')).toBe(true);
      expect(space.isOpenAt('22:00')).toBe(true);
    });

    it('deve retornar false para horários fora do funcionamento', () => {
      expect(space.isOpenAt('07:59')).toBe(false);
      expect(space.isOpenAt('22:01')).toBe(false);
      expect(space.isOpenAt('02:00')).toBe(false);
    });
  });

  describe('fromData', () => {
    it('deve criar Space a partir de dados brutos', () => {
      const data = {
        id: '2',
        name: 'Test Space',
        description: 'Test Description',
        address: 'Test Address',
        sports: ['Test Sport'],
        images: ['test.jpg'],
        price: 50,
        rating: 3.5,
        openingHours: { open: '09:00', close: '21:00' },
        coordinates: { latitude: -23.0, longitude: -46.0 },
      };

      const space = Space.fromData(data);

      expect(space.id).toBe('2');
      expect(space.name).toBe('Test Space');
      expect(space.price).toBe(50);
      expect(space.rating).toBe(3.5);
    });

    it('deve usar valores padrão para campos opcionais', () => {
      const data = {
        id: '3',
        name: 'Minimal Space',
        description: 'Description',
        address: 'Address',
      };

      const space = Space.fromData(data);

      expect(space.sports).toEqual([]);
      expect(space.images).toEqual([]);
      expect(space.price).toBe(0);
      expect(space.rating).toBe(0);
      expect(space.openingHours).toEqual({ open: '00:00', close: '23:59' });
      expect(space.coordinates).toEqual({ latitude: 0, longitude: 0 });
    });
  });

  describe('toData', () => {
    it('deve converter Space para objeto plano', () => {
      const data = space.toData();

      expect(data).toEqual({
        id: '1',
        name: 'Arena Sports',
        description: 'Quadra de Beach Tennis e Vôlei',
        address: 'Rua A, 123, São Paulo',
        sports: ['Beach Tennis', 'Vôlei', 'Futevôlei'],
        images: ['image1.jpg', 'image2.jpg'],
        price: 100,
        rating: 4.8,
        openingHours: { open: '08:00', close: '22:00' },
        coordinates: { latitude: -23.5505, longitude: -46.6333 },
      });
    });

    it('deve ser reversível com fromData', () => {
      const data = space.toData();
      const recreatedSpace = Space.fromData(data);

      expect(recreatedSpace.id).toBe(space.id);
      expect(recreatedSpace.name).toBe(space.name);
      expect(recreatedSpace.price).toBe(space.price);
      expect(recreatedSpace.rating).toBe(space.rating);
    });
  });
});
