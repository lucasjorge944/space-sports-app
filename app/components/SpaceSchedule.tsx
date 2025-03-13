import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Schedule {
  weekdays: string;
  weekends: string;
}

interface SpaceScheduleProps {
  schedule: Schedule;
  title?: string;
}

export function SpaceSchedule({
  schedule,
  title = 'Horário de Funcionamento',
}: SpaceScheduleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.scheduleItem}>
        <Text style={styles.scheduleDay}>Segunda à Sexta</Text>
        <Text style={styles.scheduleTime}>{schedule.weekdays}</Text>
      </View>
      <View style={styles.scheduleItem}>
        <Text style={styles.scheduleDay}>Sábado e Domingo</Text>
        <Text style={styles.scheduleTime}>{schedule.weekends}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scheduleDay: {
    fontSize: 14,
    color: '#666',
  },
  scheduleTime: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
