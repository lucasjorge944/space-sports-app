import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_RESERVATIONS = [
  {
    id: '1',
    spaceName: 'Arena Sports',
    sport: 'Beach Tennis',
    date: '28 Fev',
    time: '19:00 - 20:00',
    price: 100,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6',
  },
  {
    id: '2',
    spaceName: 'Centro Esportivo',
    sport: 'Futevôlei',
    date: '01 Mar',
    time: '18:00 - 19:00',
    price: 90,
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163',
  },
];

const MOCK_CLASSES = [
  {
    id: '1',
    spaceName: 'Beach Sports',
    sport: 'Beach Tennis',
    schedule: 'Terças e Quintas',
    time: '19:00 - 20:00',
    plan: '2x na semana',
    price: 360,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
    instructor: 'Prof. Rafael Silva',
  },
];

export default function MySpacesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Minhas Reservas</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas Reservas</Text>
        {MOCK_RESERVATIONS.map((reservation) => (
          <TouchableOpacity key={reservation.id} style={styles.card}>
            <Image
              source={{ uri: reservation.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{reservation.spaceName}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <Text style={styles.sportName}>{reservation.sport}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{reservation.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{reservation.time}</Text>
                </View>
              </View>
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>
                  R$ {reservation.price.toFixed(2)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>Minhas Aulas</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aulas Inscritas</Text>
        {MOCK_CLASSES.map((class_) => (
          <TouchableOpacity key={class_.id} style={styles.card}>
            <Image
              source={{ uri: class_.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{class_.spaceName}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-horizontal" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <Text style={styles.sportName}>{class_.sport}</Text>
              <Text style={styles.instructorName}>{class_.instructor}</Text>
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{class_.schedule}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{class_.time}</Text>
                </View>
              </View>
              <View style={styles.planContainer}>
                <View style={styles.planTag}>
                  <Text style={styles.planText}>{class_.plan}</Text>
                </View>
                <Text style={styles.planPrice}>
                  R$ {class_.price.toFixed(2)}/mês
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 60,
    paddingHorizontal: 20,
    color: '#1a73e8',
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  card: {
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
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moreButton: {
    padding: 4,
  },
  sportName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  instructorName: {
    fontSize: 14,
    color: '#1a73e8',
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  priceTag: {
    alignSelf: 'flex-end',
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: '#1a73e8',
    fontSize: 16,
    fontWeight: '600',
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  planTag: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  planText: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
});