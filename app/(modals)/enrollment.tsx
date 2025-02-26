import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Loading } from '../components/Loading';

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

  const EXPERIENCE_LEVELS = [
    'Nunca joguei',
    'Já joguei algumas vezes',
    'Já treinei ou treino a algum tempo',
    'Já treino tem um bom tempo',
  ];

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

      <ScrollView style={styles.content}>
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
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Esporte</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowSportPicker(true)}
            >
              <Text style={styles.selectButtonText}>{selectedSport}</Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Nível de Experiência */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nível de Experiência</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowExperiencePicker(true)}
            >
              <Text style={styles.selectButtonText}>{experienceLevel}</Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Detalhes da Experiência */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Detalhes da Experiência</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Conte um pouco mais sobre sua experiência com o esporte..."
              placeholderTextColor="#999"
              value={experienceDetails}
              onChangeText={setExperienceDetails}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
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
            <Text style={styles.receiptSubtitle}>
              Sua matrícula foi solicitada com sucesso
            </Text>

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
                <Text style={styles.receiptLabel}>Experiência</Text>
                <Text style={styles.receiptValue}>{experienceLevel}</Text>
              </View>
              {experienceDetails && (
                <View style={styles.receiptDetailsText}>
                  <Text style={styles.receiptLabel}>Detalhes</Text>
                  <Text style={styles.receiptDetailsValue}>
                    {experienceDetails}
                  </Text>
                </View>
              )}
              <View style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Valor Mensal</Text>
                <Text style={styles.receiptValue}>R$ {price.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.receiptButtons}>
              <TouchableOpacity
                style={[styles.button, styles.shareButton]}
                onPress={handleShare}
              >
                <View style={styles.buttonContent}>
                  <Ionicons name="share-social" size={24} color="#fff" />
                  <Text style={styles.primaryButtonText}>Compartilhar</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => {
                  setShowReceipt(false);
                  router.back();
                }}
              >
                <Text style={styles.primaryButtonText}>Concluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Loading visible={isLoading} message="Confirmando matrícula..." />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  selectButtonText: {
    fontSize: 16,
    color: '#333',
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  receiptDetailsText: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  receiptDetailsValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
});
