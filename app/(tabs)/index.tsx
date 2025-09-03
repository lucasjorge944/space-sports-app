import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { router } from 'expo-router';
import { PageHeader } from '../components/PageHeader';
import { SpaceCard } from '../components/SpaceCard';
import {
  SortOptionsModal,
  SortOptionConfig,
} from '../components/SortOptionsModal';
import { IconButton } from '../components/IconButton';
import { Loading } from '../components/Loading';

// Importações da nova arquitetura
import { getDIContainer } from '../infrastructure/di/DIContainer';
import { useSpaces } from '../presentation/hooks/useSpaces';
import { SpaceFilters } from '../domain/entities/Space';

const SORT_OPTIONS: SortOptionConfig[] = [
  {
    title: 'Avaliação',
    value: 'rating',
    icon: 'star-outline',
  },
  {
    title: 'Preço',
    value: 'price',
    icon: 'cash-outline',
  },
  {
    title: 'Nome',
    value: 'name',
    icon: 'text-outline',
  },
  {
    title: 'Distância',
    value: 'distance',
    icon: 'location-outline',
  },
];

export default function ExploreScreen() {
  const [showSortModal, setShowSortModal] = React.useState(false);
  const [sortOption, setSortOption] = React.useState<string>('rating');
  const [filters, setFilters] = React.useState<SpaceFilters>({});

  // Usa a nova arquitetura através do hook
  const diContainer = getDIContainer();
  const spaceController = diContainer.getSpaceController();
  const { spaces, loading, error, loadSpaces, loadSpacesByFilter, clearError } =
    useSpaces(spaceController);

  useEffect(() => {
    loadInitialSpaces();
  }, []);

  const loadInitialSpaces = async () => {
    try {
      await loadSpaces();
    } catch (err) {
      console.error('Erro ao carregar espaços iniciais:', err);
    }
  };

  const handleFilterChange = async (newFilters: SpaceFilters) => {
    setFilters(newFilters);
    try {
      await loadSpacesByFilter(newFilters);
    } catch (err) {
      console.error('Erro ao aplicar filtros:', err);
    }
  };

  const sortedSpaces = React.useMemo(() => {
    return [...spaces].sort((a, b) => {
      switch (sortOption) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [spaces, sortOption]);

  const handleRefresh = () => {
    clearError();
    if (Object.keys(filters).length > 0) {
      loadSpacesByFilter(filters);
    } else {
      loadSpaces();
    }
  };

  if (loading && spaces.length === 0) {
    return (
      <View style={styles.container}>
        <PageHeader title="Explorar" />
        <Loading visible={loading} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <PageHeader
        title="Explorar"
        buttons={
          <>
            <IconButton
              name="location-outline"
              color="#1a73e8"
              onPress={() => router.push('/(modals)/location')}
            />
            <IconButton
              name="filter"
              onPress={() => setShowSortModal(true)}
              color="#1a73e8"
            />
            <IconButton
              name="refresh-outline"
              onPress={handleRefresh}
              color="#1a73e8"
            />
          </>
        }
      />

      <ScrollView style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <IconButton
              name="refresh-outline"
              onPress={handleRefresh}
              color="#1a73e8"
            />
          </View>
        )}

        <View style={styles.spacesList}>
          <Text style={styles.containerTitle}>
            Espaços {spaces.length > 0 && `(${spaces.length})`}
          </Text>

          {loading && spaces.length > 0 && (
            <View style={styles.refreshingIndicator}>
              <Text style={styles.refreshingText}>Atualizando...</Text>
            </View>
          )}

          {sortedSpaces.length === 0 && !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {error
                  ? 'Erro ao carregar espaços'
                  : 'Nenhum espaço encontrado'}
              </Text>
            </View>
          ) : (
            sortedSpaces.map((space) => (
              <SpaceCard key={space.id} data={space} />
            ))
          )}
        </View>
      </ScrollView>

      <SortOptionsModal
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
        selectedOption={sortOption}
        onOptionSelect={setSortOption}
        options={SORT_OPTIONS}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  spacesList: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    flex: 1,
  },
  refreshingIndicator: {
    backgroundColor: '#e3f2fd',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  refreshingText: {
    color: '#1976d2',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});
