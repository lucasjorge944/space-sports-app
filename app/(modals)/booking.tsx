import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

// Criar array de horários disponíveis
const AVAILABLE_HOURS = Array.from({ length: 18 }, (_, i) => {
  const hour = i + 6; // Começa às 6h
  return {
    label: `${hour.toString().padStart(2, '0')}:00`,
    value: `${hour.toString().padStart(2, '0')}:00`,
  };
});

export default function BookingScreen() {
  const params = useLocalSearchParams();
  const spaceName = params.spaceName as string;
  const hours = Number(params.hours);
  const price = Number(params.price);

  // Definir as opções de esporte fixas
  const SPORTS_OPTIONS = [
    { label: 'Futvolei', value: 'futvolei' },
    { label: 'Volei', value: 'volei' },
    { label: 'Beach Tennis', value: 'beach-tennis' },
  ];

  const [date, setDate] = useState(new Date());
  const [sport, setSport] = useState(SPORTS_OPTIONS[0].value);
  const [people, setPeople] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_HOURS[0].value);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const peopleOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = () => {
    console.log('Dados da reserva:', {
      spaceName,
      hours,
      price,
      date,
      time: selectedTime,
      sport,
      people,
    });
    router.back();
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  // Função para formatar a data para o formato do calendário
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Função para converter string do calendário para Date
  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleDateSelect = (day: any) => {
    setDate(parseDate(day.dateString));
    setShowCalendar(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fazer Reserva</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Informações do Espaço */}
        <View style={styles.spaceInfo}>
          <Text style={styles.spaceName}>{spaceName}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.duration}>
              {hours} hora{hours > 1 ? 's' : ''}
            </Text>
            <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          {/* Data */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowCalendar(true)}
            >
              <Text>{date.toLocaleDateString('pt-BR')}</Text>
              <Ionicons name="calendar-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Hora */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hora</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text>{selectedTime}</Text>
              <Ionicons name="time-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Esporte */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Esporte</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={sport}
                onValueChange={(value) => setSport(value)}
                style={styles.picker}
              >
                {SPORTS_OPTIONS.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Quantidade de Pessoas */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantidade de Pessoas</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={people}
                onValueChange={(value) => setPeople(value)}
                style={styles.picker}
              >
                {peopleOptions.map((n) => (
                  <Picker.Item key={n} label={n.toString()} value={n} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botões */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.confirmText}>Confirmar Reserva</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Selecione a Data</Text>
              <TouchableOpacity
                onPress={() => setShowCalendar(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Calendar
              current={formatDate(date)}
              minDate={formatDate(new Date())}
              onDayPress={handleDateSelect}
              markedDates={{
                [formatDate(date)]: {
                  selected: true,
                  selectedColor: '#1a73e8',
                },
              }}
              theme={{
                todayTextColor: '#1a73e8',
                selectedDayBackgroundColor: '#1a73e8',
                selectedDayTextColor: '#ffffff',
                arrowColor: '#1a73e8',
                monthTextColor: '#333',
                textDayFontWeight: '400',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '500',
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Selecione o Horário</Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.timePickerContainer}>
              {AVAILABLE_HOURS.map((hour) => (
                <TouchableOpacity
                  key={hour.value}
                  style={[
                    styles.timeOption,
                    selectedTime === hour.value && styles.timeOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedTime(hour.value);
                    setShowTimePicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.timeOptionText,
                      selectedTime === hour.value &&
                        styles.timeOptionTextSelected,
                    ]}
                  >
                    {hour.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
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
  duration: {
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
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  confirmButton: {
    backgroundColor: '#1a73e8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 360,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  timePickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timeOption: {
    width: '30%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    alignItems: 'center',
  },
  timeOptionSelected: {
    backgroundColor: '#1a73e8',
    borderColor: '#1a73e8',
  },
  timeOptionText: {
    fontSize: 16,
    color: '#333',
  },
  timeOptionTextSelected: {
    color: '#fff',
  },
});
