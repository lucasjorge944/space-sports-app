import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SpaceBasicInfoProps {
  name: string;
  rating: number;
  reviews: number;
  address: string;
  distance: string;
  description: string;
  sports: string[];
}

export function SpaceBasicInfo({
  name,
  rating,
  reviews,
  address,
  distance,
  description,
  sports,
}: SpaceBasicInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.reviews}>({reviews})</Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.distance}>• {distance}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.sportsContainer}>
        {sports.map((sport) => (
          <View key={sport} style={styles.sportTag}>
            <Text style={styles.sportText}>{sport}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
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
});
