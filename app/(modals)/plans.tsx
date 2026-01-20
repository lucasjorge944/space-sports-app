import React from 'react';
import { Stack } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { ScrollView } from '@/components/ui/scroll-view';
import { PlanCard } from '../components/PlanCard';
import { PageHeader } from '../components/PageHeader';
import { IconButton } from '../components/IconButton';

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
    <Box className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      <PageHeader
        title="Planos"
        buttons={<IconButton name="filter" color="#1a73e8" />}
        showBackButton
      />
      
      <ScrollView className="flex-1">
        <VStack className="p-5" space="md">
          {MOCK_CLASSES.map((plan) => (
            <PlanCard key={plan.id} data={plan} />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}
