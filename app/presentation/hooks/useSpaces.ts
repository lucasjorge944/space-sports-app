import { useState, useEffect, useCallback } from 'react';
import {
  SpaceController,
  SpaceViewModel,
} from '../controllers/SpaceController';
import { SpaceFilters } from '../../domain/entities/Space';

/**
 * Hook personalizado para gerenciar estado de espaços na UI
 * Encapsula a lógica de carregamento e estado dos dados
 */
export function useSpaces(spaceController: SpaceController) {
  const [spaces, setSpaces] = useState<SpaceViewModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega todos os espaços
   */
  const loadSpaces = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const spacesData = await spaceController.getAllSpaces();
      setSpaces(spacesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao carregar espaços:', err);
    } finally {
      setLoading(false);
    }
  }, [spaceController]);

  /**
   * Carrega espaços com filtros
   */
  const loadSpacesByFilter = useCallback(
    async (filters: SpaceFilters) => {
      setLoading(true);
      setError(null);

      try {
        const spacesData = await spaceController.getSpacesByFilter(filters);
        setSpaces(spacesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao carregar espaços com filtros:', err);
      } finally {
        setLoading(false);
      }
    },
    [spaceController]
  );

  /**
   * Recarrega os espaços
   */
  const refresh = useCallback(() => {
    loadSpaces();
  }, [loadSpaces]);

  /**
   * Limpa os erros
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    spaces,
    loading,
    error,
    loadSpaces,
    loadSpacesByFilter,
    refresh,
    clearError,
  };
}

/**
 * Hook para gerenciar um espaço específico
 */
export function useSpace(
  spaceController: SpaceController,
  spaceId: string | null
) {
  const [space, setSpace] = useState<SpaceViewModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega um espaço específico
   */
  const loadSpace = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const spaceData = await spaceController.getSpaceById(id);
        setSpace(spaceData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao carregar espaço:', err);
      } finally {
        setLoading(false);
      }
    },
    [spaceController]
  );

  useEffect(() => {
    if (spaceId) {
      loadSpace(spaceId);
    }
  }, [spaceId, loadSpace]);

  /**
   * Recarrega o espaço
   */
  const refresh = useCallback(() => {
    if (spaceId) {
      loadSpace(spaceId);
    }
  }, [spaceId, loadSpace]);

  /**
   * Limpa os erros
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    space,
    loading,
    error,
    refresh,
    clearError,
  };
}
