import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SpaceAmenitiesProps {
  amenities: string[];
  title?: string;
}

export function SpaceAmenities({
  amenities,
  title = 'Comodidades',
}: SpaceAmenitiesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.amenitiesList}>
        {amenities.map((amenity) => (
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
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
});
