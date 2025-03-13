import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CustomButton } from './CustomButton';
import { Tabs } from './Tabs';

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

  const tabs = [
    { key: 'reserve', label: 'Reservar Espaço' },
    { key: 'classes', label: 'Aulas' },
  ];

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
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={(tab) => setSelectedTab(tab as 'reserve' | 'classes')}
      />

      {selectedTab === 'reserve' ? (
        <View style={styles.pricesContainer}>
          {hourlyPrices.map((price) => (
            <View key={price.hours} style={styles.priceCard}>
              <Text style={styles.hours}>
                {price.hours} horas{price.hours > 1 ? 's' : ''}
              </Text>
              <Text style={styles.price}>R$ {price.price.toFixed(2)}</Text>
              <CustomButton
                title="Reservar"
                variant="primary"
                size="small"
                onPress={() => handleOpenBooking(price)}
              />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.plansContainer}>
          {classPlans.map((plan) => (
            <View key={plan.frequency} style={styles.planCard}>
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
            </View>
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
