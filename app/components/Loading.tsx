import React from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';

interface LoadingProps {
  visible: boolean;
  message?: string;
}

export function Loading({ visible, message = 'Carregando...' }: LoadingProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#1a73e8" />
            <Text style={styles.loadingText}>{message}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 280,
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});
