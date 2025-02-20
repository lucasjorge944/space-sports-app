import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
    { frequency: '1x na semana', price: 240 },
    { frequency: '2x na semana', price: 360 },
    { frequency: 'Ilimitado', price: 480 },
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
};

export default function SpaceDetailsScreen() {
  const [selectedTab, setSelectedTab] = useState<'reserve' | 'classes'>(
    'reserve'
  );
  const { id } = useLocalSearchParams();

  const handleOpenBooking = (price: { hours: number; price: number }) => {
    router.push({
      pathname: '/booking',
      params: {
        hours: price.hours,
        price: price.price,
        spaceName: MOCK_SPACE.name,
        sports: MOCK_SPACE.sports.join(','),
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#fff" />
        </TouchableOpacity>
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{MOCK_SPACE.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{MOCK_SPACE.rating}</Text>
            <Text style={styles.reviews}>({MOCK_SPACE.reviews})</Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#666" />
          <Text style={styles.address}>{MOCK_SPACE.address}</Text>
          <Text style={styles.distance}>• {MOCK_SPACE.distance}</Text>
        </View>

        <Text style={styles.description}>{MOCK_SPACE.description}</Text>

        <View style={styles.sportsContainer}>
          {MOCK_SPACE.sports.map((sport) => (
            <View key={sport} style={styles.sportTag}>
              <Text style={styles.sportText}>{sport}</Text>
            </View>
          ))}
        </View>

        <View style={styles.scheduleContainer}>
          <Text style={styles.sectionTitle}>Horário de Funcionamento</Text>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Segunda à Sexta</Text>
            <Text style={styles.scheduleTime}>
              {MOCK_SPACE.schedule.weekdays}
            </Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleDay}>Sábado e Domingo</Text>
            <Text style={styles.scheduleTime}>
              {MOCK_SPACE.schedule.weekends}
            </Text>
          </View>
        </View>

        <View style={styles.amenitiesContainer}>
          <Text style={styles.sectionTitle}>Comodidades</Text>
          <View style={styles.amenitiesList}>
            {MOCK_SPACE.amenities.map((amenity) => (
              <View key={amenity} style={styles.amenityItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#1a73e8"
                />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'reserve' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('reserve')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'reserve' && styles.activeTabText,
                ]}
              >
                Reservar Espaço
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'classes' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('classes')}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === 'classes' && styles.activeTabText,
                ]}
              >
                Aulas
              </Text>
            </TouchableOpacity>
          </View>

          {selectedTab === 'reserve' ? (
            <View style={styles.pricesContainer}>
              {MOCK_SPACE.hourlyPrices.map((price) => (
                <TouchableOpacity key={price.hours} style={styles.priceCard}>
                  <Text style={styles.hours}>
                    {price.hours} hora{price.hours > 1 ? 's' : ''}
                  </Text>
                  <Text style={styles.price}>R$ {price.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.reserveButton}
                    onPress={() => handleOpenBooking(price)}
                  >
                    <Text style={styles.reserveButtonText}>Reservar</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.plansContainer}>
              {MOCK_SPACE.classPlans.map((plan) => (
                <TouchableOpacity key={plan.frequency} style={styles.planCard}>
                  <Text style={styles.planFrequency}>{plan.frequency}</Text>
                  <Text style={styles.planPrice}>
                    R$ {plan.price.toFixed(2)}/mês
                  </Text>
                  <TouchableOpacity style={styles.enrollButton}>
                    <Text style={styles.enrollButtonText}>Matricular</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
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
  amenitiesContainer: {
    marginBottom: 24,
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '45%',
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
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
  reserveButton: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
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
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  enrollButton: {
    backgroundColor: '#1a73e8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
