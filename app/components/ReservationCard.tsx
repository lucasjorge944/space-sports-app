import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReservationCardProps {
  data: {
    id: string;
    spaceName: string;
    sport: string;
    date: string;
    time: string;
    duration: string;
    price: number;
    image: string;
    people: number;
    pricePerPerson: number;
  };
  onMorePress: () => void;
}

export function ReservationCard({ data, onMorePress }: ReservationCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onMorePress}>
      <Image
        source={{ uri: data.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.spaceName}</Text>
        </View>

        <Text style={styles.sport}>{data.sport}</Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{data.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{data.time}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="hourglass-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{data.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{data.people} pessoas</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.pricePerPersonTag}>
            <Text style={styles.pricePerPersonText}>
              R$ {data.pricePerPerson.toFixed(2)}/pessoa
            </Text>
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>R$ {data.price.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sport: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  details: {
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
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  pricePerPersonTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pricePerPersonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  priceTag: {
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
});
