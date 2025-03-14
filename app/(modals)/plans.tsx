import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { PlanCard } from '../components/PlanCard';
import { PageHeader } from '../components/PageHeader';

// Definir o tipo do plano
type Plan = {
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

// Atualizar o MOCK_CLASSES para incluir um plano pendente
const MOCK_CLASSES: Plan[] = [
  {
    id: '2',
    spaceName: 'Arena Sports',
    sport: 'Futevôlei',
    schedule: 'Segunda, Quarta e Sexta',
    time: '18:00 - 19:00',
    plan: '3x na semana',
    price: 420,
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163',
    instructor: 'Prof. Goiano',
    status: 'active',
  },
  {
    id: '3',
    spaceName: 'Arena Sports',
    sport: 'Beach Tennis',
    schedule: 'Segunda e Quarta',
    time: '19:00 - 20:00',
    plan: '2x na semana',
    price: 360,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
    instructor: 'Prof. Rafael Silva',
    status: 'pending',
    pendingMessage: 'Aguardando confirmação do professor',
  },
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
    status: 'inactive',
  },
];

export default function PlansScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <PageHeader title="Planos" rightIcon="filter" showBackButton />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          {MOCK_CLASSES.map((class_) => (
            <PlanCard key={class_.id} data={class_} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
