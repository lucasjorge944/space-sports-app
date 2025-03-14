import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Share,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Loading } from '../components/Loading';
import { SelectInput } from '../components/SelectInput';
import { TextAreaInput } from '../components/TextAreaInput';
import { CustomButton } from '../components/CustomButton';

export default function EnrollmentScreen() {
  const params = useLocalSearchParams();
  const spaceName = params.spaceName as string;
  const frequency = params.frequency as string;
  const price = Number(params.price);
  const sports = (params.sports as string).split(',');

  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const [showSportPicker, setShowSportPicker] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState('Nunca joguei');
  const [showExperiencePicker, setShowExperiencePicker] = useState(false);
  const [experienceDetails, setExperienceDetails] = useState('');
  const [selectedShift, setSelectedShift] = useState('Manhã');
  const [showShiftPicker, setShowShiftPicker] = useState(false);

  const EXPERIENCE_LEVELS = [
    'Nunca joguei',
    'Já joguei algumas vezes',
    'Já treinei ou treino a algum tempo',
    'Já treino tem um bom tempo',
  ];

  const SHIFTS = ['Manhã', 'Tarde', 'Noite'];

  const scrollViewRef = useRef<ScrollView>(null);

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simular uma chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowReceipt(true);
  };

  const handleShare = async () => {
    try {
      const message =
        `🏋️‍♂️ Matrícula solicitada!\n\n` +
        `📍 Local: ${spaceName}\n` +
        `🎾 Esporte: ${selectedSport}\n` +
        `📅 Plano: ${frequency}\n` +
        `⏰ Turno: ${selectedShift}\n` +
        `💪 Experiência: ${experienceLevel}\n` +
        (experienceDetails ? `📝 Detalhes: ${experienceDetails}\n` : '') +
        `💰 Valor mensal: R$ ${price.toFixed(2)}`;

      await Share.share({
        message,
        title: 'Compartilhar Matrícula',
      });

      setShowReceipt(false);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextAreaFocus = () => {
    // Pequeno delay para garantir que o teclado já esteja aberto
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
      // Adicionar um padding extra temporário para garantir que o input fique bem visível
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: 1000, // Valor alto para garantir que role até o final
          animated: true,
        });
      }
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fazer Matrícula</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Informações do Espaço */}
          <View style={styles.spaceInfo}>
            <Text style={styles.spaceName}>{spaceName}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.frequency}>{frequency}</Text>
              <Text style={styles.price}>R$ {price.toFixed(2)}/mês</Text>
            </View>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            {/* Esporte */}
            <SelectInput
              label="Esporte"
              value={selectedSport}
              onPress={() => setShowSportPicker(true)}
            />

            {/* Nível de Experiência */}
            <SelectInput
              label="Nível de Experiência"
              value={experienceLevel}
              onPress={() => setShowExperiencePicker(true)}
            />

            {/* Turno Preferido */}
            <SelectInput
              label="Turno Preferido"
              value={selectedShift}
              onPress={() => setShowShiftPicker(true)}
            />

            {/* Detalhes da Experiência */}
            <TextAreaInput
              label="Detalhes da Experiência"
              value={experienceDetails}
              onChangeText={setExperienceDetails}
              placeholder="Conte um pouco mais sobre sua experiência com o esporte..."
              onFocus={handleTextAreaFocus}
            />
          </View>
        </ScrollView>

        {/* Botão de Confirmar */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.primaryButtonText}>Confirmar Matrícula</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Sport Picker Modal */}
      <Modal
        visible={showSportPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSportPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione o Esporte</Text>
              <TouchableOpacity onPress={() => setShowSportPicker(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {sports.map((sport) => (
              <TouchableOpacity
                key={sport}
                style={[
                  styles.sportOption,
                  selectedSport === sport && styles.selectedSportOption,
                ]}
                onPress={() => {
                  setSelectedSport(sport);
                  setShowSportPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.sportOptionText,
                    selectedSport === sport && styles.selectedSportOptionText,
                  ]}
                >
                  {sport}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Experience Picker Modal */}
      <Modal
        visible={showExperiencePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowExperiencePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nível de Experiência</Text>
              <TouchableOpacity onPress={() => setShowExperiencePicker(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {EXPERIENCE_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.sportOption,
                  experienceLevel === level && styles.selectedSportOption,
                ]}
                onPress={() => {
                  setExperienceLevel(level);
                  setShowExperiencePicker(false);
                }}
              >
                <Text
                  style={[
                    styles.sportOptionText,
                    experienceLevel === level && styles.selectedSportOptionText,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Shift Picker Modal */}
      <Modal
        visible={showShiftPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowShiftPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione o Turno</Text>
              <TouchableOpacity onPress={() => setShowShiftPicker(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {SHIFTS.map((shift) => (
              <TouchableOpacity
                key={shift}
                style={[
                  styles.sportOption,
                  selectedShift === shift && styles.selectedSportOption,
                ]}
                onPress={() => {
                  setSelectedShift(shift);
                  setShowShiftPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.sportOptionText,
                    selectedShift === shift && styles.selectedSportOptionText,
                  ]}
                >
                  {shift}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Receipt Modal */}
      <Modal
        visible={showReceipt}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowReceipt(false);
          router.back();
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.receiptContent}>
            <View style={styles.successIconContainer}>
              <View style={styles.successIconCircle}>
                <Ionicons name="checkmark" size={48} color="#fff" />
              </View>
            </View>

            <Text style={styles.receiptTitle}>Matrícula Solicitada!</Text>

            <View style={styles.contactMessage}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="#1a73e8"
              />
              <Text style={styles.contactMessageText}>
                Um professor entrará em contato em breve para agendar sua
                primeira aula e passar todas as informações necessárias.
              </Text>
            </View>

            <View style={styles.receiptDetails}>
              <View style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Local</Text>
                <Text style={styles.receiptValue}>{spaceName}</Text>
              </View>
              <View style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Esporte</Text>
                <Text style={styles.receiptValue}>{selectedSport}</Text>
              </View>
              <View style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Plano</Text>
                <Text style={styles.receiptValue}>{frequency}</Text>
              </View>
              <View style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Turno Preferido</Text>
                <Text style={styles.receiptValue}>{selectedShift}</Text>
              </View>
              <View style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Experiência</Text>
                <Text style={styles.receiptValue}>{experienceLevel}</Text>
              </View>
              <View style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Valor Mensal</Text>
                <Text style={styles.receiptValue}>R$ {price.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.receiptButtons}>
              <CustomButton
                title="Compartilhar"
                variant="success"
                size="large"
                icon={<Ionicons name="share-social" size={24} color="#fff" />}
                onPress={handleShare}
              />
              <CustomButton
                title="Concluir"
                variant="primary"
                size="large"
                onPress={() => {
                  setShowReceipt(false);
                  router.back();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Loading visible={isLoading} message="Solicitando matrícula..." />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  spaceInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  spaceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frequency: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  form: {
    padding: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#1a73e8',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sportOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedSportOption: {
    backgroundColor: '#1a73e8',
    borderColor: '#1a73e8',
  },
  sportOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedSportOptionText: {
    color: '#fff',
  },
  receiptContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  receiptSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  receiptDetails: {
    width: '100%',
    marginBottom: 24,
  },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  receiptLabel: {
    fontSize: 16,
    color: '#666',
  },
  receiptValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  receiptButtons: {
    width: '100%',
    gap: 12,
  },
  shareButton: {
    backgroundColor: '#25D366',
  },
  closeReceiptButton: {
    backgroundColor: '#1a73e8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactMessage: {
    flexDirection: 'row',
    backgroundColor: '#e8f0fe',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    gap: 12,
    alignItems: 'flex-start',
  },
  contactMessageText: {
    flex: 1,
    fontSize: 14,
    color: '#1a73e8',
    lineHeight: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
