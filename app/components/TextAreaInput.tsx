import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TextAreaInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  numberOfLines?: number;
}

export function TextAreaInput({
  label,
  value,
  onChangeText,
  placeholder,
  onFocus,
  numberOfLines = 4,
}: TextAreaInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textArea}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        onFocus={onFocus}
      />
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
});
