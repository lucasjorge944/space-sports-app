import React, { useState } from 'react';
import { Image, Dimensions, ScrollView as RNScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Share } from 'lucide-react-native';
import { SpaceAmenities } from '../components/SpaceAmenities';
import { SpaceSchedule } from '../components/SpaceSchedule';
import { SpaceBasicInfo } from '../components/SpaceBasicInfo';
import { SpaceServices } from '../components/SpaceServices';
import { SpaceReviews } from '../components/SpaceReviews';

const MOCK_SPACE = {
  id: '1',
  name: 'Arena Sports',
  description:
    'O melhor complexo esportivo da região, com quadras profissionais de Beach Tennis e Vôlei de Praia.',
  rating: 4.8,
  reviews: 128,
  image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6',
  sports: ['Beach Tennis', 'Vôlei'],
  address: 'Av. das Palmeiras, 1000 - Jardim das Flores',
  distance: '2.5km',
  hourlyPrices: [
    { hours: 1, price: 100 },
    { hours: 2, price: 180 },
    { hours: 3, price: 250 },
  ],
  classPlans: [
    { frequency: '1x/sem', price: 240 },
    { frequency: '2x/sem', price: 360 },
    { frequency: 'Ilimitado', price: 480 },
    { frequency: 'Experimental', price: 0 },
  ],
  amenities: [
    'Estacionamento',
    'Vestiário',
    'Chuveiros',
    'Lanchonete',
    'Wi-Fi',
  ],
  schedule: {
    weekdays: '06:00 - 22:00',
    weekends: '08:00 - 20:00',
  },
  photos: [
    'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6',
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8',
    'https://images.unsplash.com/photo-1577412647305-991150c7d163',
  ],
  reviewsUsers: [
    {
      id: '1',
      userName: 'João Silva',
      rating: 5,
      date: '2024-03-15',
      comment:
        'Excelente estrutura! As quadras são muito bem cuidadas e o atendimento é ótimo.',
      userAvatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    },
    {
      id: '2',
      userName: 'Maria Santos',
      rating: 4,
      date: '2024-03-10',
      comment:
        'Ótimo local para praticar Beach Tennis. Só faltou um pouco mais de sombra na área de descanso.',
      userAvatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      id: '3',
      userName: 'Pedro Costa',
      rating: 5,
      date: '2024-03-05',
      comment:
        'Ambiente familiar e muito agradável. Professores muito atenciosos!',
      userAvatar:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
    },
  ],
};

export default function SpaceDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <Box className="flex-1 bg-white">
      {/* Header flutuante */}
      <Box className="absolute top-0 left-0 right-0 z-10">
        <Box className="pt-12 pb-4 px-5">
          <HStack className="justify-between">
            <Pressable 
              onPress={() => router.back()}
              className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"
            >
              <Icon as={ArrowLeft} size="lg" className="text-white" />
            </Pressable>
            
            <Pressable 
              onPress={() => {}}
              className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"
            >
              <Icon as={Share} size="lg" className="text-white" />
            </Pressable>
          </HStack>
        </Box>
      </Box>

      <ScrollView className="flex-1">
        {/* Carrossel de imagens */}
        <Box className="h-80">
          <RNScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {MOCK_SPACE.photos.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo }}
                style={{
                  width: Dimensions.get('window').width,
                  height: 320,
                }}
                resizeMode="cover"
              />
            ))}
          </RNScrollView>
        </Box>

        {/* Conteúdo */}
        <VStack className="p-5" space="lg">
          <SpaceBasicInfo
            name={MOCK_SPACE.name}
            rating={MOCK_SPACE.rating}
            reviews={MOCK_SPACE.reviews}
            address={MOCK_SPACE.address}
            distance={MOCK_SPACE.distance}
            description={MOCK_SPACE.description}
            sports={MOCK_SPACE.sports}
          />

          <SpaceSchedule schedule={MOCK_SPACE.schedule} />

          <SpaceAmenities amenities={MOCK_SPACE.amenities} />

          <SpaceServices
            hourlyPrices={MOCK_SPACE.hourlyPrices}
            classPlans={MOCK_SPACE.classPlans}
            spaceName={MOCK_SPACE.name}
            sports={MOCK_SPACE.sports}
          />

          <SpaceReviews
            rating={MOCK_SPACE.rating}
            reviews={MOCK_SPACE.reviewsUsers}
          />
        </VStack>
      </ScrollView>
    </Box>
  );
}

