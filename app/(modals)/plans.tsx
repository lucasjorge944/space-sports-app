import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Loading } from '../components/Loading';

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

const MOCK_PLANS = [
  { frequency: '1x na semana', price: 240 },
  { frequency: '2x na semana', price: 360 },
  { frequency: '3x na semana', price: 420 },
  { frequency: 'Ilimitado', price: 480 },
];

export default function PlansScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [planModalVisible, setPlanModalVisible] = React.useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
  const [confirmStatusModalVisible, setConfirmStatusModalVisible] =
    React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<Plan | null>(null);
  const [newPlan, setNewPlan] = React.useState<null | (typeof MOCK_PLANS)[0]>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleOpenOptions = useCallback((plan: Plan) => {
    setSelectedPlan(plan);
    setModalVisible(true);
  }, []);

  const handleChangePlan = useCallback(() => {
    setModalVisible(false);
    setPlanModalVisible(true);
  }, []);

  const handleToggleStatus = useCallback(() => {
    setModalVisible(false);
    setConfirmStatusModalVisible(true);
  }, []);

  const handleSelectNewPlan = useCallback((plan: (typeof MOCK_PLANS)[0]) => {
    setNewPlan(plan);
    setPlanModalVisible(false);
    setConfirmModalVisible(true);
  }, []);

  const handleConfirmPlanChange = useCallback(async () => {
    setConfirmModalVisible(false);
    setIsLoading(true);

    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Implementar lógica de mudança de plano
      console.log('Confirmada troca para:', newPlan);
    } finally {
      setIsLoading(false);
    }
  }, [newPlan]);

  const handleConfirmStatusChange = useCallback(async () => {
    setConfirmStatusModalVisible(false);
    setIsLoading(true);

    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Implementar lógica de ativação/inativação
      console.log(
        'Status alterado para:',
        selectedPlan?.status === 'inactive' ? 'active' : 'inactive'
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedPlan?.status]);

  const handleWhatsAppContact = () => {
    const whatsappNumber = '5531999325905';
    const message = `Olá! Fiz uma matrícula para ${selectedPlan?.sport} na ${selectedPlan?.spaceName} e ainda não recebi contato.`;

    // Tentar primeiro o deep link do WhatsApp
    const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;

    // URL alternativa para web/desktop
    const webWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          // Se não suportar o deep link, tenta a URL web
          return Linking.openURL(webWhatsappUrl);
        }
      })
      .catch((err) => {
        console.log('Erro ao abrir WhatsApp:', err);
        // Se falhar, tenta a URL web como fallback
        Linking.openURL(webWhatsappUrl).catch((webErr) => {
          console.log('Erro ao abrir WhatsApp web:', webErr);
        });
      });
  };

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
                class_.status === 'pending' && styles.pendingPlanCard,
              ]}
              onPress={() => handleOpenOptions(class_)}
            >
              <View
                style={[
                  styles.statusBadge,
                  class_.status === 'inactive'
                    ? styles.inactiveBadge
                    : class_.status === 'pending'
                    ? styles.pendingBadge
                    : styles.activeBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    class_.status === 'inactive'
                      ? styles.inactiveStatusText
                      : class_.status === 'pending'
                      ? styles.pendingStatusText
                      : styles.activeStatusText,
                  ]}
                >
                  {class_.status === 'inactive'
                    ? 'Inativo'
                    : class_.status === 'pending'
                    ? 'Pendente'
                    : 'Ativo'}
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

            {selectedPlan?.status === 'pending' ? (
              <>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setModalVisible(false);
                    setShowContactModal(true);
                  }}
                >
                  <Ionicons
                    name="alert-circle-outline"
                    size={24}
                    color="#f57c00"
                  />
                  <Text style={styles.modalOptionText}>Não recebi contato</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setModalVisible(false);
                    setConfirmStatusModalVisible(true);
                  }}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={24}
                    color="#c62828"
                  />
                  <Text style={styles.modalOptionText}>Cancelar matrícula</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleChangePlan}
                >
                  <Ionicons name="swap-horizontal" size={24} color="#1a73e8" />
                  <Text style={styles.modalOptionText}>Trocar de Plano</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleToggleStatus}
                >
                  <Ionicons
                    name={
                      selectedPlan?.status === 'inactive' ? 'play' : 'pause'
                    }
                    size={24}
                    color={
                      selectedPlan?.status === 'inactive'
                        ? '#2e7d32'
                        : '#c62828'
                    }
                  />
                  <Text style={styles.modalOptionText}>
                    {selectedPlan?.status === 'inactive'
                      ? 'Ativar Plano'
                      : 'Pausar Plano'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Pressable>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={planModalVisible}
        onRequestClose={() => setPlanModalVisible(false)}
      >
        <View style={styles.planModalOverlay}>
          <View style={styles.planModalView}>
            <View style={styles.planModalHeader}>
              <Text style={styles.planModalTitle}>Escolha um Plano</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setPlanModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.plansList}>
              {MOCK_PLANS.map((plan, index) => (
                <TouchableOpacity
                  key={plan.frequency}
                  style={[
                    styles.planOption,
                    index < MOCK_PLANS.length - 1 && styles.planOptionBorder,
                  ]}
                  onPress={() => handleSelectNewPlan(plan)}
                >
                  <View>
                    <Text style={styles.planFrequency}>{plan.frequency}</Text>
                    <Text style={styles.planDescription}>
                      Acesso{' '}
                      {plan.frequency === 'Ilimitado'
                        ? 'ilimitado'
                        : `${plan.frequency.split('x')[0]} vez${
                            plan.frequency.startsWith('1') ? '' : 'es'
                          } por semana`}
                    </Text>
                  </View>
                  <View style={styles.planPriceContainer}>
                    <Text style={styles.planPrice}>R$ {plan.price}</Text>
                    <Text style={styles.planPriceLabel}>/mês</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
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
              <Ionicons name="alert-circle-outline" size={48} color="#1a73e8" />
              <Text style={styles.confirmModalTitle}>Confirmar Mudança</Text>
              <Text style={styles.confirmModalText}>
                Deseja alterar seu plano atual?
              </Text>

              <View style={styles.planChangeDetails}>
                <View style={styles.planChangeItem}>
                  <Text style={styles.planChangeLabel}>Plano Atual</Text>
                  <Text style={styles.planChangePlan}>
                    {selectedPlan?.plan}
                  </Text>
                  <Text style={styles.planChangePrice}>
                    R$ {selectedPlan?.price.toFixed(2)}/mês
                  </Text>
                </View>

                <View style={styles.planChangeArrow}>
                  <Ionicons name="arrow-forward" size={24} color="#666" />
                </View>

                <View style={styles.planChangeItem}>
                  <Text style={styles.planChangeLabel}>Novo Plano</Text>
                  <Text style={styles.planChangePlan}>
                    {newPlan?.frequency}
                  </Text>
                  <Text style={styles.planChangePrice}>
                    R$ {newPlan?.price.toFixed(2)}/mês
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.confirmModalButtons}>
              <TouchableOpacity
                style={[
                  styles.confirmModalButton,
                  styles.confirmModalButtonCancel,
                ]}
                onPress={() => setConfirmModalVisible(false)}
              >
                <Text style={styles.confirmModalButtonTextCancel}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmModalButton,
                  styles.confirmModalButtonConfirm,
                ]}
                onPress={handleConfirmPlanChange}
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
        animationType="fade"
        transparent={true}
        visible={confirmStatusModalVisible}
        onRequestClose={() => setConfirmStatusModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModalView}>
            <View style={styles.confirmModalContent}>
              <Ionicons
                name="alert-circle-outline"
                size={48}
                color={
                  selectedPlan?.status === 'inactive' ? '#2e7d32' : '#c62828'
                }
              />
              <Text style={styles.confirmModalTitle}>
                {selectedPlan?.status === 'inactive'
                  ? 'Ativar Plano'
                  : 'Inativar Plano'}
              </Text>
              <Text style={styles.confirmModalText}>
                {selectedPlan?.status === 'inactive'
                  ? 'Que bom que você quer voltar! Deseja reativar este plano?'
                  : 'Que pena... Tem certeza que deseja inativar este plano?'}
              </Text>

              <View style={styles.planStatusDetails}>
                <Text style={styles.planStatusName}>{selectedPlan?.sport}</Text>
                <Text style={styles.planStatusFrequency}>
                  {selectedPlan?.plan}
                </Text>
                <Text style={styles.planStatusPrice}>
                  R$ {selectedPlan?.price.toFixed(2)}/mês
                </Text>
              </View>
            </View>

            <View style={styles.confirmModalButtons}>
              <TouchableOpacity
                style={[
                  styles.confirmModalButton,
                  styles.confirmModalButtonCancel,
                ]}
                onPress={() => setConfirmStatusModalVisible(false)}
              >
                <Text style={styles.confirmModalButtonTextCancel}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmModalButton,
                  styles.confirmModalButtonConfirm,
                  selectedPlan?.status === 'inactive'
                    ? styles.activateButton
                    : styles.deactivateButton,
                ]}
                onPress={handleConfirmStatusChange}
              >
                <Text style={styles.confirmModalButtonTextConfirm}>
                  {selectedPlan?.status === 'inactive' ? 'Ativar' : 'Inativar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showContactModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowContactModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowContactModal(false)}
        >
          <View style={styles.contactModalView}>
            <View style={styles.modalHandle} />

            <View style={styles.contactModalContent}>
              <View style={styles.contactIconContainer}>
                <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
              </View>

              <Text style={styles.contactModalTitle}>
                Entrar em contato via WhatsApp
              </Text>

              <Text style={styles.contactModalText}>
                Vamos te conectar a um dos professores para verificar o status
                da sua matrícula.
              </Text>

              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() => {
                  handleWhatsAppContact();
                  setShowContactModal(false);
                }}
              >
                <Ionicons name="logo-whatsapp" size={24} color="#fff" />
                <Text style={styles.whatsappButtonText}>Abrir WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  planModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  planModalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  planModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  planModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  plansList: {
    padding: 16,
  },
  planOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  planOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  planFrequency: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
  },
  planPriceContainer: {
    alignItems: 'flex-end',
  },
  planPriceLabel: {
    fontSize: 14,
    color: '#666',
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
    marginBottom: 24,
  },
  planChangeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  planChangeItem: {
    alignItems: 'center',
    flex: 1,
  },
  planChangeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  planChangePlan: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  planChangePrice: {
    fontSize: 14,
    color: '#1a73e8',
    fontWeight: '500',
  },
  planChangeArrow: {
    paddingHorizontal: 16,
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
    backgroundColor: '#1a73e8',
  },
  confirmModalButtonTextCancel: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmModalButtonTextConfirm: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  planStatusDetails: {
    alignItems: 'center',
    marginTop: 16,
  },
  planStatusName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  planStatusFrequency: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  planStatusPrice: {
    fontSize: 16,
    color: '#1a73e8',
    fontWeight: '500',
  },
  activateButton: {
    backgroundColor: '#2e7d32',
  },
  deactivateButton: {
    backgroundColor: '#c62828',
  },
  pendingPlanCard: {
    borderColor: '#f57c00',
  },
  pendingBadge: {
    backgroundColor: '#fff3e0',
    borderColor: '#f57c00',
    borderWidth: 1,
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pendingStatusText: {
    color: '#f57c00',
    fontSize: 12,
    fontWeight: '500',
  },
  confirmModalButtonAlert: {
    backgroundColor: '#f57c00',
  },
  confirmModalButtonDanger: {
    backgroundColor: '#c62828',
  },
  contactModalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  contactModalContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  contactIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e6f3eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  contactModalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    gap: 8,
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
