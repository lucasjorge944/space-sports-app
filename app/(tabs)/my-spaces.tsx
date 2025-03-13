import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { PageHeader } from '../components/PageHeader';
import { ClassCard } from '../components/ClassCard';
import { ReservationCard } from '../components/ReservationCard';
import { Ionicons } from '@expo/vector-icons';
import { SortOptionsModal } from '../components/SortOptionsModal';

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

export default function MySpacesScreen() {
  const [confirmedClasses, setConfirmedClasses] = React.useState<string[]>(
    MOCK_TODAY_CLASSES.filter((c) => c.confirmed).map((c) => c.id)
  );
  const [showSortModal, setShowSortModal] = React.useState(false);
  const [sortOption, setSortOption] = React.useState<
    'date' | 'price' | 'sport'
  >('date');

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
    <>
      <PageHeader
        title="Reservas"
        rightIcon="filter"
        onRightIconPress={() => setShowSortModal(true)}
      />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aulas de Hoje</Text>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Reservas</Text>
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
        </View>
      </ScrollView>

      <SortOptionsModal
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
        selectedOption={sortOption}
        onOptionSelect={setSortOption}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 18,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
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
  planText: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  studentsModalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    width: '100%',
  },
  modalHandleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  studentsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  studentsModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  classInfo: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  classInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  classInfoDetails: {
    fontSize: 14,
    color: '#666',
  },
  studentsListContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  studentNumberContainer: {
    width: 40,
    alignItems: 'center',
  },
  studentNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a73e8',
  },
  studentNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  studentName: {
    fontSize: 16,
    color: '#333',
  },
  emptySlot: {
    color: '#999',
  },
  currentUserName: {
    color: '#1a73e8',
    fontWeight: '700',
  },
  currentUserTag: {
    fontSize: 12,
    color: '#1a73e8',
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
  },
  sortOptionsContainer: {
    padding: 20,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  sortOptionSelected: {
    backgroundColor: '#1a73e8',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
  },
  sortOptionTextSelected: {
    color: '#fff',
  },
});
