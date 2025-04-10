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
import { getSpaces } from '../services/firestore';

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

const MOCK_SPACES = [
  {
    id: '1',
    name: 'Arena Sports',
    description: 'Quadras de Beach Tennis e Vôlei',
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6',
    sports: ['Beach Tennis', 'Vôlei'],
    price: 100,
  },
  {
    id: '2',
    name: 'Centro Esportivo',
    description: 'Quadras de Futevôlei e Beach Tennis',
    rating: 4.5,
    reviews: 96,
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163',
    sports: ['Futevôlei', 'Beach Tennis'],
    price: 90,
  },
  {
    id: '3',
    name: 'Beach Sports',
    description: 'Aulas e quadras de Beach Tennis',
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
    sports: ['Beach Tennis'],
    price: 110,
  },
];

export default function ExploreScreen() {
  const [showSortModal, setShowSortModal] = React.useState(false);
  const [sortOption, setSortOption] = React.useState<string>('rating');

  useEffect(() => {
    loadSpaces();
  }, []);

  const loadSpaces = async () => {
    try {
      const spacesData = await getSpaces();
      console.log(spacesData);
    } catch (err) {
      console.error('Error loading spaces:', err);
    } finally {
    }
  };

  const sortedSpaces = React.useMemo(() => {
    return [...MOCK_SPACES].sort((a, b) => {
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
  }, [sortOption]);

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
          </>
        }
      />

      <ScrollView style={styles.container}>
        <View style={styles.spacesList}>
          <Text style={styles.containerTitle}>Espaços</Text>
          {sortedSpaces.map((space) => (
            <SpaceCard key={space.id} data={space} />
          ))}
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
});
