import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import { IconButton } from './IconButton';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: 20 | 30 | 33 | 40 | 45 | 50 | 80;
  header?: boolean;
}

export function BottomSheetModal({
  visible,
  onClose,
  title,
  children,
  height = 80,
  header = true,
}: BottomSheetModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={[styles.modalView, { height: `${height}%` }]}>
          <View style={styles.modalHandleContainer}>
            <View style={styles.modalHandle} />
          </View>

          {header && (
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <IconButton name="close" onPress={onClose} color="#666" />
            </View>
          )}

          <View style={styles.contentContainer}>{children}</View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  modalHandleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
