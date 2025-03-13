import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';
import { TextAreaInput } from '../components/TextAreaInput';
import { IconButton } from '../components/IconButton';
import { SpaceAmenities } from '../components/SpaceAmenities';
import { SpaceSchedule } from '../components/SpaceSchedule';
import { SpaceBasicInfo } from '../components/SpaceBasicInfo';
import { SpaceServices } from '../components/SpaceServices';
import { SpaceReviews } from '../components/SpaceReviews';

const MOCK_SPACE = {
  id: '1',
  name: 'Arena Sports',
  description:
    'O melhor complexo esportivo da região, com quadras profissionais de Beach Tennis e Vôlei de Praia.',
  rating: 4.8,
  reviews: 128,
  image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6',
  sports: ['Beach Tennis', 'Vôlei'],
  address: 'Av. das Palmeiras, 1000 - Jardim das Flores',
  distance: '2.5km',
  hourlyPrices: [
    { hours: 1, price: 100 },
    { hours: 2, price: 180 },
    { hours: 3, price: 250 },
  ],
  classPlans: [
    { frequency: '1x/sem', price: 240 },
    { frequency: '2x/sem', price: 360 },
    { frequency: 'Ilimitado', price: 480 },
    { frequency: 'Experimental', price: 0 },
  ],
  amenities: [
    'Estacionamento',
    'Vestiário',
    'Chuveiros',
    'Lanchonete',
    'Wi-Fi',
  ],
  schedule: {
    weekdays: '06:00 - 22:00',
    weekends: '08:00 - 20:00',
  },
  photos: [
    'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6',
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
    'https://images.unsplash.com/photo-1577412647305-991150c7d163',
  ],
  reviewsUsers: [
    {
      id: '1',
      userName: 'João Silva',
      rating: 5,
      date: '2024-03-15',
      comment:
        'Excelente estrutura! As quadras são muito bem cuidadas e o atendimento é ótimo.',
      userAvatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    },
    {
      id: '2',
      userName: 'Maria Santos',
      rating: 4,
      date: '2024-03-10',
      comment:
        'Ótimo local para praticar Beach Tennis. Só faltou um pouco mais de sombra na área de descanso.',
      userAvatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      id: '3',
      userName: 'Pedro Costa',
      rating: 5,
      date: '2024-03-05',
      comment:
        'Ambiente familiar e muito agradável. Professores muito atenciosos!',
      userAvatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
    },
  ],
};

export default function SpaceDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          name="arrow-back"
          onPress={() => router.back()}
          color="#666"
        />
        <IconButton name="share-outline" onPress={() => {}} color="#666" />
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageCarousel}
      >
        {MOCK_SPACE.photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <SpaceBasicInfo
          name={MOCK_SPACE.name}
          rating={MOCK_SPACE.rating}
          reviews={MOCK_SPACE.reviews}
          address={MOCK_SPACE.address}
          distance={MOCK_SPACE.distance}
          description={MOCK_SPACE.description}
          sports={MOCK_SPACE.sports}
        />

        <SpaceSchedule schedule={MOCK_SPACE.schedule} />

        <SpaceAmenities amenities={MOCK_SPACE.amenities} />

        <SpaceServices
          hourlyPrices={MOCK_SPACE.hourlyPrices}
          classPlans={MOCK_SPACE.classPlans}
          spaceName={MOCK_SPACE.name}
          sports={MOCK_SPACE.sports}
        />

        <SpaceReviews
          rating={MOCK_SPACE.rating}
          reviews={MOCK_SPACE.reviewsUsers}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCarousel: {
    height: 300,
  },
  coverImage: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  content: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 16,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  sportTag: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sportText: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
  scheduleContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scheduleDay: {
    fontSize: 14,
    color: '#666',
  },
  scheduleTime: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  servicesContainer: {
    marginBottom: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#1a73e8',
  },
  pricesContainer: {
    gap: 12,
  },
  priceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  hours: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  plansContainer: {
    gap: 12,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  planFrequency: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  reviewsContainer: {
    marginBottom: 24,
  },
  reviewsSummary: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingBig: {
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 8,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666',
  },
  reviewsList: {
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  addReviewButton: {
    marginBottom: 20,
  },
  reviewForm: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  reviewFormTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
  },
  ratingInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 100,
    marginBottom: 16,
  },
  reviewFormButtons: {
    flexDirection: 'row',
    gap: 12,
  },
});
