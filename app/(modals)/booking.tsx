import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function BookingScreen() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [sport, setSport] = useState('futebol');
  const [people, setPeople] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const sports = ['Futebol', 'Vôlei', 'Basquete', 'Tênis'];
  const peopleOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = () => {
    console.log('Dados da reserva:', { date, time, sport, people });
    router.back();
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Fazer Reserva</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Data */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>

        {/* Hora */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>{time.toLocaleTimeString().slice(0, 5)}</Text>
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
              {sports.map((s) => (
                <Picker.Item key={s} label={s} value={s.toLowerCase()} />
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

        {/* Botões */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
            <Text style={[styles.buttonText, styles.confirmText]}>
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date/Time Pickers */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            onChange={(event, selectedDate) => {
              setShowTimePicker(false);
              if (selectedDate) setTime(selectedDate);
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    marginRight: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  confirmButton: {
    flex: 1,
    padding: 15,
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmText: {
    color: 'white',
  },
});
