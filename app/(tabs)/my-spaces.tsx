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
  },
  {
    id: '2',
    spaceName: 'Centro Esportivo',
    sport: 'Futevôlei',
    time: '20:00',
    duration: '1 hora',
    instructor: 'Maria Santos',
    image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163',
  },
];

export default function MySpacesScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedReservation, setSelectedReservation] = React.useState<
    null | (typeof MOCK_RESERVATIONS)[0]
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

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Minhas Reservas</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aulas de Hoje</Text>
          {MOCK_TODAY_CLASSES.map((class_) => (
            <View key={class_.id} style={styles.card}>
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
              </View>
            </View>
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
});
