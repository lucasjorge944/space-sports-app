import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { ScrollView } from '@/components/ui/scroll-view';
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { RefreshCw, AlertCircle } from 'lucide-react-native';
import { PageHeader } from '../components/PageHeader';
import { SpaceCard } from '../components/SpaceCard';
import {
  SortOptionsModal,
  SortOptionConfig,
} from '../components/SortOptionsModal';
import { IconButton } from '../components/IconButton';
import { Loading } from '../components/Loading';
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

  const diContainer = getDIContainer();
  const spaceController = diContainer.spaces.getSpaceController();
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
      <Box className="flex-1 bg-gray-50">
        <PageHeader title="Explorar" />
        <Loading visible={loading} />
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-gray-50">
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

      <ScrollView className="flex-1">
        <VStack className="p-5" space="md">
          {/* Alert de erro */}
          {error && (
            <Alert action="error" className="bg-red-50 border border-red-200">
              <AlertIcon as={AlertCircle} className="text-red-600" />
              <VStack className="flex-1">
                <AlertText className="text-red-800 font-medium">
                  {error}
                </AlertText>
              </VStack>
              <Button
                size="sm"
                variant="outline"
                action="secondary"
                onPress={handleRefresh}
                className="ml-2"
              >
                <Icon as={RefreshCw} size="sm" className="text-red-600" />
              </Button>
            </Alert>
          )}

          {/* Título da seção */}
          <VStack space="sm">
            <Heading size="lg" className="text-gray-900">
              Espaços {spaces.length > 0 && `(${spaces.length})`}
            </Heading>

            {/* Indicador de atualização */}
            {loading && spaces.length > 0 && (
              <Box className="bg-blue-50 p-2 rounded-md">
                <Text size="sm" className="text-blue-700 text-center">
                  Atualizando...
                </Text>
              </Box>
            )}
          </VStack>

          {/* Lista de espaços ou estado vazio */}
          {sortedSpaces.length === 0 && !loading ? (
            <Box className="items-center py-16">
              <Text size="md" className="text-gray-500 text-center">
                {error
                  ? 'Erro ao carregar espaços'
                  : 'Nenhum espaço encontrado'}
              </Text>
            </Box>
          ) : (
            <VStack space="md">
              {sortedSpaces.map((space) => (
                <SpaceCard key={space.id} data={space} />
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>

      <SortOptionsModal
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
        selectedOption={sortOption}
        onOptionSelect={setSortOption}
        options={SORT_OPTIONS}
      />
    </Box>
  );
}

