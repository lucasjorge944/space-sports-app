import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Loading } from '../components/Loading';
import { PageHeader } from '../components/PageHeader';
import { AttendanceListModal } from '../components/AttendanceListModal';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { OptionModalType, OptionsModal } from '../components/OptionsModal';
import { ClassCard } from '../components/ClassCard';
import { ReservationCard } from '../components/ReservationCard';

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
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedReservation, setSelectedReservation] = React.useState<
    null | (typeof MOCK_RESERVATIONS)[0]
  >(null);
  const [confirmedClasses, setConfirmedClasses] = React.useState<string[]>(
    MOCK_TODAY_CLASSES.filter((c) => c.confirmed).map((c) => c.id)
  );
  const [studentsModalVisible, setStudentsModalVisible] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState<
    null | (typeof MOCK_TODAY_CLASSES)[0]
  >(null);

  const handleOpenOptions = useCallback(
    (reservation: (typeof MOCK_RESERVATIONS)[0]) => {
      setSelectedReservation(reservation);
      setModalVisible(true);
    },
    []
  );

  const handleChangeReservation = useCallback(() => {
    // Implementar lógica de alteração
    setModalVisible(false);
  }, []);

  const handleCancelReservation = useCallback(() => {
    setModalVisible(false);
    setConfirmModalVisible(true);
  }, []);

  const handleConfirmCancel = useCallback(async () => {
    setConfirmModalVisible(false);
    setIsLoading(true);

    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Implementar lógica de cancelamento aqui
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggleConfirmation = useCallback(
    async (class_: (typeof MOCK_TODAY_CLASSES)[0]) => {
      setIsLoading(true);
      try {
        // Simular chamada à API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setConfirmedClasses((prev) =>
          prev.includes(class_.id)
            ? prev.filter((id) => id !== class_.id)
            : [...prev, class_.id]
        );

        // Abrir lista de presença após confirmar/retirar presença
        setSelectedClass(class_);
        setStudentsModalVisible(true);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleOpenStudentsList = useCallback(
    (class_: (typeof MOCK_TODAY_CLASSES)[0]) => {
      setSelectedClass(class_);
      setStudentsModalVisible(true);
    },
    []
  );

  const handleSelectOption = useCallback((option: OptionModalType) => {
    if (option.label === 'Alterar') {
      handleChangeReservation();
    } else if (option.label === 'Cancelar') {
      handleCancelReservation();
    }
  }, []);

  const reservationOptions = [
    {
      icon: 'calendar-outline',
      label: 'Alterar',
    },
    {
      icon: 'close-circle-outline',
      label: 'Cancelar',
      variant: 'danger',
      showSeparator: true,
    },
  ] as OptionModalType[];

  return (
    <>
      <PageHeader
        title="Reservas"
        rightIcon="filter"
        onRightIconPress={() => console.log('Filter pressed')}
      />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aulas de Hoje</Text>
          {MOCK_TODAY_CLASSES.map((class_) => (
            <ClassCard
              key={class_.id}
              data={class_}
              isConfirmed={confirmedClasses.includes(class_.id)}
              onPress={() => handleOpenStudentsList(class_)}
              onToggleConfirmation={() => handleToggleConfirmation(class_)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Reservas</Text>
          {MOCK_RESERVATIONS.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              data={reservation}
              onMorePress={() => handleOpenOptions(reservation)}
            />
          ))}
        </View>
      </ScrollView>

      <OptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={reservationOptions}
        onSelectOption={handleSelectOption}
      />

      <ConfirmationModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={handleConfirmCancel}
        title="Cancelar Reserva"
        message="Tem certeza que deseja cancelar esta reserva?"
        confirmText="Confirmar"
        cancelText="Voltar"
        icon={{ name: 'alert-circle-outline', color: '#dc3545' }}
        confirmButtonStyle="danger"
      />

      <AttendanceListModal
        visible={studentsModalVisible}
        onClose={() => setStudentsModalVisible(false)}
        classData={selectedClass}
        students={
          selectedClass
            ? MOCK_STUDENTS[selectedClass.id as keyof typeof MOCK_STUDENTS]
            : []
        }
        currentUser={CURRENT_USER}
        isConfirmed={
          selectedClass ? confirmedClasses.includes(selectedClass.id) : false
        }
        onToggleConfirmation={() =>
          selectedClass && handleToggleConfirmation(selectedClass)
        }
      />

      <Loading visible={isLoading} />
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
});
