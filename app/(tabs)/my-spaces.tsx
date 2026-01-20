import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { ScrollView } from '@/components/ui/scroll-view';
import { PageHeader } from '../components/PageHeader';
import { ClassCard } from '../components/ClassCard';
import { ReservationCard } from '../components/ReservationCard';
import {
  SortOptionsModal,
  SortOptionConfig,
} from '../components/SortOptionsModal';
import { IconButton } from '../components/IconButton';

const MOCK_RESERVATIONS = [
  {
    id: '1',
    spaceName: 'Arena Sports',
    sport: 'Beach Tennis',
    date: '28/03/2024',
    time: '19:00',
    duration: '1 hora',
    price: 100,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6',
    holder: 'Lucas Jorge',
    people: 4,
    pricePerPerson: 25,
  },
  {
    id: '2',
    spaceName: 'Centro Esportivo',
    sport: 'Futevôlei',
    date: '01/04/2024',
    time: '18:00',
    duration: '2 horas',
    price: 90,
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163',
    holder: 'Lucas Jorge',
    people: 2,
    pricePerPerson: 45,
  },
];

const MOCK_TODAY_CLASSES = [
  {
    id: '1',
    spaceName: 'Arena Sports',
    sport: 'Beach Tennis',
    time: '19:00',
    duration: '1 hora',
    instructor: 'João Silva',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6',
    participants: 7,
    maxParticipants: 7,
    confirmed: true,
  },
  {
    id: '2',
    spaceName: 'Arena Sports',
    sport: 'Beach Tennis',
    time: '19:00',
    duration: '1 hora',
    instructor: 'João Silva',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6',
    participants: 3,
    maxParticipants: 6,
    confirmed: true,
  },
  {
    id: '3',
    spaceName: 'Centro Esportivo',
    sport: 'Futevôlei',
    time: '20:00',
    duration: '1 hora',
    instructor: 'Maria Santos',
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163',
    participants: 7,
    maxParticipants: 9,
    confirmed: false,
  },
];

const MOCK_STUDENTS = {
  '1': [
    { id: '1', name: 'Lucas Jorge' },
    { id: '2', name: 'Gabriel Morais' },
    { id: '3', name: 'Maria Silva' },
    { id: '4', name: 'João Santos' },
    { id: '5', name: 'Ana Paula' },
    { id: '6', name: 'Pedro Costa' },
    { id: '7', name: 'Carla Souza' },
  ],
  '2': [
    { id: '1', name: 'Lucas Jorge' },
    { id: '2', name: 'Mariana Lima' },
    { id: '3', name: 'Rafael Torres' },
  ],
  '3': [
    { id: '1', name: 'Lucas Jorge' },
    { id: '2', name: 'Felipe Santos' },
    { id: '3', name: 'Amanda Silva' },
    { id: '4', name: 'Bruno Costa' },
    { id: '5', name: 'Carolina Mendes' },
    { id: '6', name: 'Diego Oliveira' },
    { id: '7', name: 'Elena Martins' },
  ],
};

// Adicionar constante para o usuário atual
const CURRENT_USER = 'Lucas Jorge';

const SORT_OPTIONS: SortOptionConfig[] = [
  {
    title: 'Data',
    value: 'date',
    icon: 'calendar-outline',
  },
  {
    title: 'Preço',
    value: 'price',
    icon: 'cash-outline',
  },
  {
    title: 'Esporte',
    value: 'sport',
    icon: 'basketball-outline',
  },
];

export default function MySpacesScreen() {
  const [confirmedClasses, setConfirmedClasses] = React.useState<string[]>(
    MOCK_TODAY_CLASSES.filter((c) => c.confirmed).map((c) => c.id)
  );
  const [showSortModal, setShowSortModal] = React.useState(false);
  const [sortOption, setSortOption] = React.useState<string>('date');

  const sortedReservations = React.useMemo(() => {
    return [...MOCK_RESERVATIONS].sort((a, b) => {
      switch (sortOption) {
        case 'date':
          return (
            new Date(a.date.split('/').reverse().join('-')).getTime() -
            new Date(b.date.split('/').reverse().join('-')).getTime()
          );
        case 'price':
          return a.price - b.price;
        case 'sport':
          return a.sport.localeCompare(b.sport);
        default:
          return 0;
      }
    });
  }, [MOCK_RESERVATIONS, sortOption]);

  return (
    <Box className="flex-1 bg-gray-50">
      <PageHeader
        title="Reservas"
        buttons={
          <IconButton
            name="filter"
            onPress={() => setShowSortModal(true)}
            color="#1a73e8"
          />
        }
      />
      
      <ScrollView className="flex-1 pt-4">
        <VStack space="lg" className="pb-6">
          {/* Seção Aulas de Hoje */}
          <Box className="px-5">
            <Heading size="lg" className="text-gray-900 mb-4">
              Aulas de Hoje
            </Heading>
            <VStack space="md">
              {MOCK_TODAY_CLASSES.map((class_) => (
                <ClassCard
                  key={class_.id}
                  data={class_}
                  isConfirmed={confirmedClasses.includes(class_.id)}
                  currentUser={CURRENT_USER}
                  students={MOCK_STUDENTS[class_.id as keyof typeof MOCK_STUDENTS]}
                  onConfirmationSuccess={() => {
                    setConfirmedClasses((prev) =>
                      prev.includes(class_.id)
                        ? prev.filter((id) => id !== class_.id)
                        : [...prev, class_.id]
                    );
                  }}
                />
              ))}
            </VStack>
          </Box>

          {/* Seção Próximas Reservas */}
          <Box className="px-5">
            <Heading size="lg" className="text-gray-900 mb-4">
              Próximas Reservas
            </Heading>
            <VStack space="md">
              {sortedReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  data={reservation}
                  onCancelSuccess={() => {
                    console.log('Reservation cancelled:', reservation.id);
                  }}
                  onChangeSuccess={() => {
                    console.log('Reservation changed:', reservation.id);
                  }}
                />
              ))}
            </VStack>
          </Box>
        </VStack>
      </ScrollView>

      <SortOptionsModal
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
        selectedOption={sortOption}
        onOptionSelect={setSortOption}
        options={SORT_OPTIONS}
      />
    </Box>
  );
}

