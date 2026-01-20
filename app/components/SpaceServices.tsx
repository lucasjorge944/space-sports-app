import React, { useState } from 'react';
import { router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';

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
    <VStack space="md">
      {/* Tabs customizadas */}
      <Box className="bg-gray-100 rounded-lg p-1">
        <HStack space="xs">
          <Pressable
            onPress={() => setSelectedTab('reserve')}
            className={`flex-1 py-3 px-4 rounded-md ${
              selectedTab === 'reserve'
                ? 'bg-white shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              size="md"
              className={`text-center font-medium ${
                selectedTab === 'reserve'
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Reservar Espaço
            </Text>
          </Pressable>
          
          <Pressable
            onPress={() => setSelectedTab('classes')}
            className={`flex-1 py-3 px-4 rounded-md ${
              selectedTab === 'classes'
                ? 'bg-white shadow-sm'
                : 'bg-transparent'
            }`}
          >
            <Text
              size="md"
              className={`text-center font-medium ${
                selectedTab === 'classes'
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Aulas
            </Text>
          </Pressable>
        </HStack>
      </Box>

      {/* Conteúdo das tabs */}
      {selectedTab === 'reserve' ? (
        <VStack space="sm">
          {hourlyPrices.map((price) => (
            <Box
              key={price.hours}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <HStack className="justify-between items-center">
                <VStack className="flex-1">
                  <Text size="md" className="text-gray-900 font-medium">
                    {price.hours} hora{price.hours > 1 ? 's' : ''}
                  </Text>
                  <Text size="lg" className="text-blue-600 font-bold">
                    R$ {price.price.toFixed(2)}
                  </Text>
                </VStack>
                
                <Button
                  size="sm"
                  action="primary"
                  onPress={() => handleOpenBooking(price)}
                  className="bg-blue-600"
                >
                  <ButtonText className="text-white font-medium">
                    Reservar
                  </ButtonText>
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      ) : (
        <VStack space="sm">
          {classPlans.map((plan) => (
            <Box
              key={plan.frequency}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <HStack className="justify-between items-center">
                <VStack className="flex-1">
                  <Text size="md" className="text-gray-900 font-medium">
                    {plan.frequency}
                  </Text>
                  <Text size="lg" className="text-blue-600 font-bold">
                    {plan.price > 0
                      ? `R$ ${plan.price.toFixed(2)}/mês`
                      : 'Gratuito'}
                  </Text>
                </VStack>
                
                <Button
                  size="sm"
                  action="primary"
                  onPress={() => handleOpenEnrollment(plan)}
                  className="bg-blue-600"
                >
                  <ButtonText className="text-white font-medium">
                    Matricular
                  </ButtonText>
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
}

