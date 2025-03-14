import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from './BottomSheetModal';
import { Loading } from './Loading';
import { ScrollView } from 'react-native';

const MOCK_PLANS = [
  { frequency: '1x na semana', price: 240 },
  { frequency: '2x na semana', price: 360 },
  { frequency: '3x na semana', price: 420 },
  { frequency: 'Ilimitado', price: 480 },
];

interface PlanCardProps {
  data: {
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
}

export function PlanCard({ data }: PlanCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmStatusModalVisible, setConfirmStatusModalVisible] =
    useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [newPlan, setNewPlan] = useState<null | (typeof MOCK_PLANS)[0]>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        data.status === 'inactive' ? 'active' : 'inactive'
      );
    } finally {
      setIsLoading(false);
    }
  }, [data.status]);

  const handleWhatsAppContact = () => {
    const whatsappNumber = '5531999325905';
    const message = `Olá! Fiz uma matrícula para ${data.sport} na ${data.spaceName} e ainda não recebi contato.`;

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
      <TouchableOpacity
        style={[styles.card, data.status === 'inactive' && styles.inactiveCard]}
        onPress={() => setModalVisible(true)}
      >
        <View
          style={[
            styles.statusBadge,
            data.status === 'inactive'
              ? styles.inactiveBadge
              : data.status === 'pending'
              ? styles.pendingBadge
              : styles.activeBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              data.status === 'inactive'
                ? styles.inactiveStatusText
                : data.status === 'pending'
                ? styles.pendingStatusText
                : styles.activeStatusText,
            ]}
          >
            {data.status === 'inactive'
              ? 'Inativo'
              : data.status === 'pending'
              ? 'Pendente'
              : 'Ativo'}
          </Text>
        </View>

        <Image
          source={{ uri: data.image }}
          style={[
            styles.image,
            data.status === 'inactive' && styles.inactiveImage,
          ]}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                data.status === 'inactive' && styles.inactiveText,
              ]}
            >
              {data.spaceName}
            </Text>
          </View>

          <Text
            style={[
              styles.sport,
              data.status === 'inactive' && styles.inactiveText,
            ]}
          >
            {data.sport}
          </Text>

          <Text
            style={[
              styles.instructor,
              data.status === 'inactive' && styles.inactiveInstructor,
            ]}
          >
            {data.instructor}
          </Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={data.status === 'inactive' ? '#999' : '#666'}
              />
              <Text
                style={[
                  styles.detailText,
                  data.status === 'inactive' && styles.inactiveText,
                ]}
              >
                {data.schedule}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons
                name="time-outline"
                size={16}
                color={data.status === 'inactive' ? '#999' : '#666'}
              />
              <Text
                style={[
                  styles.detailText,
                  data.status === 'inactive' && styles.inactiveText,
                ]}
              >
                {data.time}
              </Text>
            </View>
          </View>

          <View style={styles.planContainer}>
            <View
              style={[
                styles.planTag,
                data.status === 'inactive' && styles.inactivePlanTag,
              ]}
            >
              <Text
                style={[
                  styles.planText,
                  data.status === 'inactive' && styles.inactivePlanText,
                ]}
              >
                {data.plan}
              </Text>
            </View>
            <Text
              style={[
                styles.planPrice,
                data.status === 'inactive' && styles.inactivePlanText,
              ]}
            >
              R$ {data.price.toFixed(2)}/mês
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <BottomSheetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        height={20}
        header={false}
      >
        {data.status === 'pending' ? (
          <>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false);
                setShowContactModal(true);
              }}
            >
              <Ionicons name="alert-circle-outline" size={24} color="#f57c00" />
              <Text style={styles.modalOptionText}>Não recebi contato</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false);
                setConfirmStatusModalVisible(true);
              }}
            >
              <Ionicons name="close-circle-outline" size={24} color="#c62828" />
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
                name={data.status === 'inactive' ? 'play' : 'pause'}
                size={24}
                color={data.status === 'inactive' ? '#2e7d32' : '#c62828'}
              />
              <Text style={styles.modalOptionText}>
                {data.status === 'inactive' ? 'Ativar Plano' : 'Pausar Plano'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </BottomSheetModal>

      <BottomSheetModal
        visible={planModalVisible}
        onClose={() => setPlanModalVisible(false)}
        height={50}
        title="Escolha um Plano"
      >
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
      </BottomSheetModal>

      <BottomSheetModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        height={40}
        header={false}
      >
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <View style={styles.confirmModalContent}>
            <Ionicons name="alert-circle-outline" size={48} color="#1a73e8" />
            <Text style={styles.confirmModalTitle}>Confirmar Mudança</Text>
            <Text style={styles.confirmModalText}>
              Deseja alterar seu plano atual?
            </Text>

            <View style={styles.planChangeDetails}>
              <View style={styles.planChangeItem}>
                <Text style={styles.planChangeLabel}>Plano Atual</Text>
                <Text style={styles.planChangePlan}>{data.plan}</Text>
                <Text style={styles.planChangePrice}>
                  R$ {data.price.toFixed(2)}/mês
                </Text>
              </View>

              <View style={styles.planChangeArrow}>
                <Ionicons name="arrow-forward" size={24} color="#666" />
              </View>

              <View style={styles.planChangeItem}>
                <Text style={styles.planChangeLabel}>Novo Plano</Text>
                <Text style={styles.planChangePlan}>{newPlan?.frequency}</Text>
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
              <Text style={styles.confirmModalButtonTextCancel}>Cancelar</Text>
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
      </BottomSheetModal>

      <BottomSheetModal
        visible={confirmStatusModalVisible}
        onClose={() => setConfirmStatusModalVisible(false)}
        height={45}
        header={false}
      >
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <View style={styles.confirmModalContent}>
            <Ionicons
              name="alert-circle-outline"
              size={48}
              color={data.status === 'inactive' ? '#2e7d32' : '#c62828'}
            />
            <Text style={styles.confirmModalTitle}>
              {data.status === 'inactive' ? 'Ativar Plano' : 'Inativar Plano'}
            </Text>
            <Text style={styles.confirmModalText}>
              {data.status === 'inactive'
                ? 'Que bom que você quer voltar! Deseja reativar este plano?'
                : 'Que pena... Tem certeza que deseja inativar este plano?'}
            </Text>

            <View style={styles.planStatusDetails}>
              <Text style={styles.planStatusName}>{data.sport}</Text>
              <Text style={styles.planStatusFrequency}>{data.plan}</Text>
              <Text style={styles.planStatusPrice}>
                R$ {data.price.toFixed(2)}/mês
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
              <Text style={styles.confirmModalButtonTextCancel}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.confirmModalButton,
                styles.confirmModalButtonConfirm,
                data.status === 'inactive'
                  ? styles.activateButton
                  : styles.deactivateButton,
              ]}
              onPress={handleConfirmStatusChange}
            >
              <Text style={styles.confirmModalButtonTextConfirm}>
                {data.status === 'inactive' ? 'Ativar' : 'Inativar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>

      <BottomSheetModal
        visible={showContactModal}
        onClose={() => setShowContactModal(false)}
        height={40}
        header={false}
      >
        <View style={styles.contactModalContent}>
          <View style={styles.contactIconContainer}>
            <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
          </View>

          <Text style={styles.contactModalTitle}>
            Entrar em contato via WhatsApp
          </Text>

          <Text style={styles.contactModalText}>
            Vamos te conectar a um dos professores para verificar o status da
            sua matrícula.
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
      </BottomSheetModal>

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
  inactiveCard: {
    opacity: 0.8,
  },
  image: {
    width: '100%',
    height: 150,
  },
  inactiveImage: {
    opacity: 0.5,
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
  moreButton: {
    padding: 4,
  },
  sport: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  instructor: {
    fontSize: 14,
    color: '#1a73e8',
    marginBottom: 12,
  },
  inactiveInstructor: {
    color: '#999',
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
  inactiveText: {
    color: '#999',
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
  inactivePlanTag: {
    backgroundColor: '#f5f5f5',
  },
  planText: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
  inactivePlanText: {
    color: '#999',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeBadge: {
    backgroundColor: '#e8f5e9',
  },
  pendingBadge: {
    backgroundColor: '#fff3e0',
  },
  inactiveBadge: {
    backgroundColor: '#f5f5f5',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeStatusText: {
    color: '#2e7d32',
  },
  pendingStatusText: {
    color: '#f57c00',
  },
  inactiveStatusText: {
    color: '#999',
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
  contactModalContent: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 0,
    paddingHorizontal: 16,
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
