import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
});
