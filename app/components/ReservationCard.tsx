import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OptionModalType, OptionsModal } from './OptionsModal';
import { ConfirmationModal } from './ConfirmationModal';
import { Loading } from './Loading';

interface ReservationCardProps {
  data: {
    id: string;
    spaceName: string;
    sport: string;
    date: string;
    time: string;
    duration: string;
    price: number;
    image: string;
    holder: string;
    people: number;
    pricePerPerson: number;
  };
  onCancelSuccess?: () => void;
  onChangeSuccess?: () => void;
}

export function ReservationCard({
  data,
  onCancelSuccess,
  onChangeSuccess,
}: ReservationCardProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeReservation = useCallback(() => {
    // Implementar lógica de alteração
    setModalVisible(false);
    onChangeSuccess?.();
  }, [onChangeSuccess]);

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
      onCancelSuccess?.();
    } finally {
      setIsLoading(false);
    }
  }, [onCancelSuccess]);

  const handleSelectOption = useCallback(
    (option: OptionModalType) => {
      if (option.label === 'Alterar') {
        handleChangeReservation();
      } else if (option.label === 'Cancelar') {
        handleCancelReservation();
      }
    },
    [handleChangeReservation, handleCancelReservation]
  );

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
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={{ uri: data.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.spaceName}</Text>
          </View>

          <Text style={styles.sport}>{data.sport}</Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{data.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{data.time}</Text>
            </View>
          </View>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Ionicons name="hourglass-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{data.duration}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{data.people} pessoas</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.pricePerPersonTag}>
              <Text style={styles.pricePerPersonText}>
                R$ {data.pricePerPerson.toFixed(2)}/pessoa
              </Text>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>R$ {data.price.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

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

      <Loading visible={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
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
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sport: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  details: {
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
    fontWeight: '600',
  },
  priceTag: {
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
});
