import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Loading } from '../components/Loading';

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
    participants: 4,
    maxParticipants: 6,
    confirmed: true,
  },
  {
    id: '2',
    spaceName: 'Centro Esportivo',
    sport: 'Futevôlei',
    time: '20:00',
    duration: '1 hora',
    instructor: 'Maria Santos',
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163',
    participants: 3,
    maxParticipants: 4,
    confirmed: false,
  },
];

const MOCK_STUDENTS = {
  '1': [
    { id: '1', name: 'Lucas Jorge' },
    { id: '2', name: 'Gabriel Morais' },
    { id: '3', name: 'Maria Silva' },
    { id: '4', name: 'João Santos' },
  ],
  '2': [
    { id: '1', name: 'Bruno Costa' },
    { id: '2', name: 'Mariana Lima' },
    { id: '3', name: 'Rafael Torres' },
  ],
};

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

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Minhas Reservas</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aulas de Hoje</Text>
          {MOCK_TODAY_CLASSES.map((class_) => (
            <TouchableOpacity
              key={class_.id}
              style={styles.card}
              onPress={() => handleOpenStudentsList(class_)}
            >
              <Image
                source={{ uri: class_.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{class_.spaceName}</Text>
                <Text style={styles.sportName}>{class_.sport}</Text>
                <Text style={styles.instructorName}>
                  Professor: {class_.instructor}
                </Text>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{class_.time}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="hourglass-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{class_.duration}</Text>
                  </View>
                </View>
                <View style={styles.classFooter}>
                  <View style={styles.participantsContainer}>
                    <Ionicons name="people-outline" size={16} color="#666" />
                    <Text style={styles.participantsText}>
                      {class_.participants}/{class_.maxParticipants} alunos
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.confirmButton,
                      confirmedClasses.includes(class_.id) &&
                        styles.confirmedButton,
                    ]}
                    onPress={() => handleToggleConfirmation(class_)}
                  >
                    <Ionicons
                      name={
                        confirmedClasses.includes(class_.id)
                          ? 'close-circle-outline'
                          : 'checkmark-circle-outline'
                      }
                      size={20}
                      color={
                        confirmedClasses.includes(class_.id)
                          ? '#dc3545'
                          : '#1a73e8'
                      }
                    />
                    <Text
                      style={[
                        styles.confirmButtonText,
                        confirmedClasses.includes(class_.id) &&
                          styles.confirmedButtonText,
                      ]}
                    >
                      {confirmedClasses.includes(class_.id)
                        ? 'Retirar Presença'
                        : 'Confirmar Presença'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas Reservas</Text>
          {MOCK_RESERVATIONS.map((reservation) => (
            <TouchableOpacity key={reservation.id} style={styles.card}>
              <Image
                source={{ uri: reservation.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{reservation.spaceName}</Text>
                  <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() => handleOpenOptions(reservation)}
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.sportName}>{reservation.sport}</Text>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{reservation.date}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{reservation.time}</Text>
                  </View>
                </View>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <Ionicons name="hourglass-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>
                      {reservation.duration}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="people-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>
                      {reservation.people} pessoas
                    </Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <View style={styles.pricePerPersonTag}>
                    <Text style={styles.pricePerPersonText}>
                      R$ {reservation.pricePerPerson.toFixed(2)}/pessoa
                    </Text>
                  </View>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceText}>
                      R$ {reservation.price.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalHandle} />

            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleChangeReservation}
            >
              <Ionicons name="calendar-outline" size={24} color="#333" />
              <Text style={styles.modalOptionText}>Alterar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, styles.cancelOption]}
              onPress={handleCancelReservation}
            >
              <Ionicons name="close-circle-outline" size={24} color="#dc3545" />
              <Text style={[styles.modalOptionText, styles.cancelText]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModalView}>
            <View style={styles.confirmModalContent}>
              <Ionicons name="alert-circle-outline" size={48} color="#dc3545" />
              <Text style={styles.confirmModalTitle}>Cancelar Reserva</Text>
              <Text style={styles.confirmModalText}>
                Tem certeza que deseja cancelar esta reserva?
              </Text>
            </View>

            <View style={styles.confirmModalButtons}>
              <TouchableOpacity
                style={[
                  styles.confirmModalButton,
                  styles.confirmModalButtonCancel,
                ]}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.confirmModalButtonTextCancel}>Voltar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmModalButton,
                  styles.confirmModalButtonConfirm,
                ]}
                onPress={handleConfirmCancel}
              >
                <Text style={styles.confirmModalButtonTextConfirm}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={studentsModalVisible}
        onRequestClose={() => setStudentsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setStudentsModalVisible(false)}
        >
          <Pressable style={styles.studentsModalView}>
            <Pressable
              onPress={() => setStudentsModalVisible(false)}
              style={styles.modalHandleContainer}
            >
              <View style={styles.modalHandle} />
            </Pressable>

            <View style={styles.studentsModalHeader}>
              <Text style={styles.studentsModalTitle}>Lista de Presença</Text>
              <TouchableOpacity
                onPress={() => setStudentsModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {selectedClass && (
              <>
                <View style={styles.classInfo}>
                  <Text style={styles.classInfoTitle}>
                    {selectedClass.sport}
                  </Text>
                  <Text style={styles.classInfoDetails}>
                    {selectedClass.time} • {selectedClass.instructor}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.modalConfirmButton,
                      confirmedClasses.includes(selectedClass.id) &&
                        styles.modalConfirmedButton,
                    ]}
                    onPress={() => handleToggleConfirmation(selectedClass)}
                  >
                    <Ionicons
                      name={
                        confirmedClasses.includes(selectedClass.id)
                          ? 'close-circle-outline'
                          : 'checkmark-circle-outline'
                      }
                      size={20}
                      color={
                        confirmedClasses.includes(selectedClass.id)
                          ? '#dc3545'
                          : '#1a73e8'
                      }
                    />
                    <Text
                      style={[
                        styles.modalConfirmButtonText,
                        confirmedClasses.includes(selectedClass.id) &&
                          styles.modalConfirmedButtonText,
                      ]}
                    >
                      {confirmedClasses.includes(selectedClass.id)
                        ? 'Retirar Presença'
                        : 'Confirmar Presença'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.studentsListContainer}>
                  <ScrollView>
                    {Array.from({ length: selectedClass.maxParticipants }).map(
                      (_, index) => {
                        const student =
                          MOCK_STUDENTS[
                            selectedClass.id as keyof typeof MOCK_STUDENTS
                          ]?.[index];
                        return (
                          <View key={index} style={styles.studentItem}>
                            <Text style={styles.studentNumber}>
                              {index + 1}
                            </Text>
                            <Text
                              style={[
                                styles.studentName,
                                !student && styles.emptySlot,
                              ]}
                            >
                              {student?.name || '-'}
                            </Text>
                          </View>
                        );
                      }
                    )}
                  </ScrollView>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      <Loading visible={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 60,
    paddingHorizontal: 20,
    color: '#1a73e8',
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
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moreButton: {
    padding: 4,
  },
  sportName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  instructorName: {
    fontSize: 14,
    color: '#1a73e8',
    marginBottom: 12,
  },
  detailsContainer: {
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
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  pricePerPersonTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pricePerPersonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  priceTag: {
    alignSelf: 'flex-end',
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: '#1a73e8',
    fontSize: 16,
    fontWeight: '600',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 32,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  cancelOption: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelText: {
    color: '#dc3545',
  },
  confirmModalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignSelf: 'center',
  },
  confirmModalContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  confirmModalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  confirmModalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmModalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmModalButtonCancel: {
    backgroundColor: '#f5f5f5',
  },
  confirmModalButtonConfirm: {
    backgroundColor: '#dc3545',
  },
  confirmModalButtonTextCancel: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmModalButtonTextConfirm: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  participantsText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e8f0fe',
  },
  confirmedButton: {
    backgroundColor: '#ffebee',
  },
  confirmButtonText: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
  confirmedButtonText: {
    color: '#dc3545',
  },
  studentsModalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 32,
    height: '70%',
  },
  studentsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    marginTop: 8,
  },
  studentsList: {
    flexGrow: 1,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  studentNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a73e8',
    width: 24,
  },
  studentName: {
    fontSize: 16,
    color: '#333',
  },
  emptySlot: {
    color: '#999',
  },
  modalHandleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalConfirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e8f0fe',
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  modalConfirmedButton: {
    backgroundColor: '#ffebee',
  },
  modalConfirmButtonText: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
  modalConfirmedButtonText: {
    color: '#dc3545',
  },
});
