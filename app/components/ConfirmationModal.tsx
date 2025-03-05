import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: {
    name: keyof typeof Ionicons.glyphMap;
    color: string;
  };
  confirmButtonStyle?: 'danger' | 'primary' | 'success';
}

export function ConfirmationModal({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Voltar',
  icon = { name: 'alert-circle-outline', color: '#dc3545' },
  confirmButtonStyle = 'danger',
}: ConfirmationModalProps) {
  const getConfirmButtonColor = () => {
    switch (confirmButtonStyle) {
      case 'primary':
        return '#1a73e8';
      case 'success':
        return '#2e7d32';
      case 'danger':
        return '#dc3545';
      default:
        return '#1a73e8';
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Ionicons name={icon.name} size={48} color={icon.color} />
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{message}</Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonCancel]}
              onPress={onClose}
            >
              <Text style={styles.buttonTextCancel}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: getConfirmButtonColor() },
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonTextConfirm}>{confirmText}</Text>
            </TouchableOpacity>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 0,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    width: '100%',
  },
  modalContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f5f5f5',
  },
  buttonTextCancel: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextConfirm: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
