import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Tag } from './Tag';

interface SpaceCardProps {
  data: {
    id: string;
    name: string;
    description: string;
    rating: number;
    reviews: number;
    image: string;
    sports: string[];
    price: number;
  };
}

export function SpaceCard({ data }: SpaceCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/space/${data.id}`)}
    >
      <Image
        source={{ uri: data.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{data.rating}</Text>
            <Text style={styles.reviewCount}>({data.reviews})</Text>
          </View>
        </View>
        <Text style={styles.description}>{data.description}</Text>
        <View style={styles.sportsTagsContainer}>
          {data.sports.map((sport) => (
            <Tag key={sport} label={sport} />
          ))}
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>A partir de</Text>
          <Text style={styles.price}>R$ {data.price.toFixed(2)}/hora</Text>
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
    height: 200,
  },
  info: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
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
  description: {
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
