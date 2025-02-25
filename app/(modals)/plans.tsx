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
import { Stack } from 'expo-router';

const MOCK_CLASSES = [
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
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<
    null | (typeof MOCK_CLASSES)[0]
  >(null);

  const handleOpenOptions = useCallback((plan: (typeof MOCK_CLASSES)[0]) => {
    setSelectedPlan(plan);
    setModalVisible(true);
  }, []);

  const handleChangePlan = useCallback(() => {
    // Implementar lógica de alteração
    setModalVisible(false);
  }, []);

  const handleToggleStatus = useCallback(() => {
    // Implementar lógica de ativação/inativação
    setModalVisible(false);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Meus Planos',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#f5f5f5' },
          headerBackTitle: 'Voltar',
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planos</Text>
          {MOCK_CLASSES.map((class_) => (
            <TouchableOpacity
              key={class_.id}
              style={[
                styles.card,
                class_.status === 'inactive' && styles.inactiveCard,
              ]}
            >
              <View
                style={[
                  styles.statusBadge,
                  class_.status === 'inactive'
                    ? styles.inactiveBadge
                    : styles.activeBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    class_.status === 'inactive'
                      ? styles.inactiveStatusText
                      : styles.activeStatusText,
                  ]}
                >
                  {class_.status === 'inactive' ? 'Inativo' : 'Ativo'}
                </Text>
              </View>
              <Image
                source={{ uri: class_.image }}
                style={[
                  styles.cardImage,
                  class_.status === 'inactive' && styles.inactiveImage,
                ]}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text
                    style={[
                      styles.cardTitle,
                      class_.status === 'inactive' && styles.inactiveText,
                    ]}
                  >
                    {class_.spaceName}
                  </Text>
                  <TouchableOpacity
                    style={styles.moreButton}
                    onPress={() => handleOpenOptions(class_)}
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={24}
                      color={class_.status === 'inactive' ? '#999' : '#666'}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={[
                    styles.sportName,
                    class_.status === 'inactive' && styles.inactiveText,
                  ]}
                >
                  {class_.sport}
                </Text>
                <Text
                  style={[
                    styles.instructorName,
                    class_.status === 'inactive' && styles.inactiveInstructor,
                  ]}
                >
                  {class_.instructor}
                </Text>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={class_.status === 'inactive' ? '#999' : '#666'}
                    />
                    <Text
                      style={[
                        styles.detailText,
                        class_.status === 'inactive' && styles.inactiveText,
                      ]}
                    >
                      {class_.schedule}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={class_.status === 'inactive' ? '#999' : '#666'}
                    />
                    <Text
                      style={[
                        styles.detailText,
                        class_.status === 'inactive' && styles.inactiveText,
                      ]}
                    >
                      {class_.time}
                    </Text>
                  </View>
                </View>
                <View style={styles.planContainer}>
                  <View
                    style={[
                      styles.planTag,
                      class_.status === 'inactive' && styles.inactivePlanTag,
                    ]}
                  >
                    <Text
                      style={[
                        styles.planText,
                        class_.status === 'inactive' && styles.inactivePlanText,
                      ]}
                    >
                      {class_.plan}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.planPrice,
                      class_.status === 'inactive' && styles.inactivePlanText,
                    ]}
                  >
                    R$ {class_.price.toFixed(2)}/mês
                  </Text>
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

            {selectedPlan?.status === 'active' && (
              <>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleChangePlan}
                >
                  <Ionicons name="sync-outline" size={24} color="#333" />
                  <Text style={styles.modalOptionText}>Mudar Plano</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalOption, styles.toggleOption]}
                  onPress={handleToggleStatus}
                >
                  <Ionicons
                    name="pause-circle-outline"
                    size={24}
                    color="#c62828"
                  />
                  <Text style={[styles.modalOptionText, { color: '#c62828' }]}>
                    Inativar Plano
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {selectedPlan?.status === 'inactive' && (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleToggleStatus}
              >
                <Ionicons
                  name="play-circle-outline"
                  size={24}
                  color="#2e7d32"
                />
                <Text style={[styles.modalOptionText, { color: '#2e7d32' }]}>
                  Ativar Plano
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </Modal>
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
  inactiveCard: {
    opacity: 0.8,
  },
  inactiveImage: {
    opacity: 0.6,
  },
  inactiveText: {
    color: '#999',
  },
  inactiveInstructor: {
    color: '#999',
  },
  inactivePlanTag: {
    backgroundColor: '#f5f5f5',
  },
  inactivePlanText: {
    color: '#999',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  activeBadge: {
    backgroundColor: '#e8f5e9',
  },
  inactiveBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeStatusText: {
    color: '#2e7d32',
  },
  inactiveStatusText: {
    color: '#c62828',
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
  toggleOption: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});
