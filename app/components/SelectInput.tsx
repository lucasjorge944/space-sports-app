import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SelectInputProps {
  label: string;
  value: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
}

export function SelectInput({
  label,
  value,
  onPress,
  icon,
  iconRight = 'chevron-down',
}: SelectInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.selectButton} onPress={onPress}>
        <View style={styles.valueContainer}>
          {icon && (
            <Ionicons name={icon} size={20} color="#666" style={styles.icon} />
          )}
          <Text style={styles.selectButtonText}>{value}</Text>
        </View>
        {iconRight && <Ionicons name={iconRight} size={20} color="#666" />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  selectButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
