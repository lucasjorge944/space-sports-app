import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PlanCardProps {
  data: {
    id: string;
    spaceName: string;
    sport: string;
    schedule: string;
    time: string;
    plan: string;
    price: number;
    image: string;
    instructor: string;
    status: 'active' | 'inactive' | 'pending';
    pendingMessage?: string;
  };
  onMorePress: () => void;
}

export function PlanCard({ data, onMorePress }: PlanCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, data.status === 'inactive' && styles.inactiveCard]}
    >
      <View
        style={[
          styles.statusBadge,
          data.status === 'inactive'
            ? styles.inactiveBadge
            : data.status === 'pending'
            ? styles.pendingBadge
            : styles.activeBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            data.status === 'inactive'
              ? styles.inactiveStatusText
              : data.status === 'pending'
              ? styles.pendingStatusText
              : styles.activeStatusText,
          ]}
        >
          {data.status === 'inactive'
            ? 'Inativo'
            : data.status === 'pending'
            ? 'Pendente'
            : 'Ativo'}
        </Text>
      </View>

      <Image
        source={{ uri: data.image }}
        style={[
          styles.image,
          data.status === 'inactive' && styles.inactiveImage,
        ]}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              data.status === 'inactive' && styles.inactiveText,
            ]}
          >
            {data.spaceName}
          </Text>
          <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={data.status === 'inactive' ? '#999' : '#666'}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.sport,
            data.status === 'inactive' && styles.inactiveText,
          ]}
        >
          {data.sport}
        </Text>

        <Text
          style={[
            styles.instructor,
            data.status === 'inactive' && styles.inactiveInstructor,
          ]}
        >
          {data.instructor}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={data.status === 'inactive' ? '#999' : '#666'}
            />
            <Text
              style={[
                styles.detailText,
                data.status === 'inactive' && styles.inactiveText,
              ]}
            >
              {data.schedule}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons
              name="time-outline"
              size={16}
              color={data.status === 'inactive' ? '#999' : '#666'}
            />
            <Text
              style={[
                styles.detailText,
                data.status === 'inactive' && styles.inactiveText,
              ]}
            >
              {data.time}
            </Text>
          </View>
        </View>

        <View style={styles.planContainer}>
          <View
            style={[
              styles.planTag,
              data.status === 'inactive' && styles.inactivePlanTag,
            ]}
          >
            <Text
              style={[
                styles.planText,
                data.status === 'inactive' && styles.inactivePlanText,
              ]}
            >
              {data.plan}
            </Text>
          </View>
          <Text
            style={[
              styles.planPrice,
              data.status === 'inactive' && styles.inactivePlanText,
            ]}
          >
            R$ {data.price.toFixed(2)}/mês
          </Text>
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
  inactiveCard: {
    opacity: 0.8,
  },
  image: {
    width: '100%',
    height: 150,
  },
  inactiveImage: {
    opacity: 0.5,
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
  moreButton: {
    padding: 4,
  },
  sport: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  instructor: {
    fontSize: 14,
    color: '#1a73e8',
    marginBottom: 12,
  },
  inactiveInstructor: {
    color: '#999',
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
  inactiveText: {
    color: '#999',
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
  inactivePlanTag: {
    backgroundColor: '#f5f5f5',
  },
  planText: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
  inactivePlanText: {
    color: '#999',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeBadge: {
    backgroundColor: '#e8f5e9',
  },
  pendingBadge: {
    backgroundColor: '#fff3e0',
  },
  inactiveBadge: {
    backgroundColor: '#f5f5f5',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeStatusText: {
    color: '#2e7d32',
  },
  pendingStatusText: {
    color: '#f57c00',
  },
  inactiveStatusText: {
    color: '#999',
  },
});
