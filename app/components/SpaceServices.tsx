import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CustomButton } from './CustomButton';

interface PriceOption {
  hours: number;
  price: number;
}

interface ClassPlan {
  frequency: string;
  price: number;
}

interface SpaceServicesProps {
  hourlyPrices: PriceOption[];
  classPlans: ClassPlan[];
  spaceName: string;
  sports: string[];
}

export function SpaceServices({
  hourlyPrices,
  classPlans,
  spaceName,
  sports,
}: SpaceServicesProps) {
  const [selectedTab, setSelectedTab] = useState<'reserve' | 'classes'>(
    'reserve'
  );

  const handleOpenBooking = (price: PriceOption) => {
    router.push({
      pathname: '/booking',
      params: {
        hours: price.hours,
        price: price.price,
        spaceName: spaceName,
        sports: sports.join(','),
      },
    });
  };

  const handleOpenEnrollment = (plan: ClassPlan) => {
    router.push({
      pathname: '/enrollment',
      params: {
        frequency: plan.frequency,
        price: plan.price,
        spaceName: spaceName,
        sports: sports.join(','),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'reserve' && styles.activeTab]}
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
          style={[styles.tab, selectedTab === 'classes' && styles.activeTab]}
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
          {hourlyPrices.map((price) => (
            <TouchableOpacity key={price.hours} style={styles.priceCard}>
              <Text style={styles.hours}>
                {price.hours} hora{price.hours > 1 ? 's' : ''}
              </Text>
              <Text style={styles.price}>R$ {price.price.toFixed(2)}</Text>
              <CustomButton
                title="Reservar"
                variant="primary"
                size="small"
                onPress={() => handleOpenBooking(price)}
              />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.plansContainer}>
          {classPlans.map((plan) => (
            <TouchableOpacity key={plan.frequency} style={styles.planCard}>
              <Text style={styles.planFrequency}>{plan.frequency}</Text>
              <Text style={styles.planPrice}>
                {plan.price > 0
                  ? `R$ ${plan.price.toFixed(2)}/mês`
                  : 'Gratuito'}
              </Text>
              <CustomButton
                title="Matricular"
                variant="primary"
                size="small"
                onPress={() => handleOpenEnrollment(plan)}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
