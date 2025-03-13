import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '../components/PageHeader';
import { Tag } from '../components/Tag';
import {
  SortOptionsModal,
  SortOptionConfig,
} from '../components/SortOptionsModal';

const SORT_OPTIONS: SortOptionConfig[] = [
  {
    title: 'Ordenar padrão',
    value: 'default',
    icon: 'arrow-down-outline',
  },
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
  {
    title: 'Esporte',
    value: 'sport',
    icon: 'basketball-outline',
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
        rightIcon="filter"
        onRightIconPress={() => setShowSortModal(true)}
      />

      <ScrollView style={styles.container}>
        <View style={styles.spacesList}>
          {sortedSpaces.map((space) => (
            <TouchableOpacity
              key={space.id}
              style={styles.spaceCard}
              onPress={() => router.push(`/space/${space.id}`)}
            >
              <Image
                source={{ uri: space.image }}
                style={styles.spaceImage}
                resizeMode="cover"
              />
              <View style={styles.spaceInfo}>
                <View style={styles.spaceTitleRow}>
                  <Text style={styles.spaceName}>{space.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{space.rating}</Text>
                    <Text style={styles.reviewCount}>({space.reviews})</Text>
                  </View>
                </View>
                <Text style={styles.spaceDescription}>{space.description}</Text>
                <View style={styles.sportsTagsContainer}>
                  {space.sports.map((sport) => (
                    <Tag key={sport} label={sport} />
                  ))}
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>A partir de</Text>
                  <Text style={styles.price}>
                    R$ {space.price.toFixed(2)}/hora
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
  spacesList: {
    padding: 16,
  },
  spaceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  spaceImage: {
    width: '100%',
    height: 200,
  },
  spaceInfo: {
    padding: 16,
  },
  spaceTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spaceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  spaceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  sportsTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
});
