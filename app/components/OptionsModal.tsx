import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from './BottomSheetModal';

export interface OptionModalType {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  variant?: 'default' | 'danger';
  showSeparator?: boolean;
}

interface OptionsModalProps {
  visible: boolean;
  onClose: () => void;
  options: OptionModalType[];
  onSelectOption: (option: OptionModalType) => void;
}

export function OptionsModal({
  visible,
  onClose,
  options,
  onSelectOption,
}: OptionsModalProps) {
  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      title="Ordenar por"
      height={20}
      header={false}
    >
      {options.map((option, index) => (
        <React.Fragment key={option.label}>
          {option.showSeparator && <View style={styles.separator} />}
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              onClose();
              onSelectOption(option);
            }}
          >
            <Ionicons
              name={option.icon}
              size={24}
              color={option.variant === 'danger' ? '#dc3545' : '#333'}
            />
            <Text
              style={[
                styles.modalOptionText,
                option.variant === 'danger' && styles.dangerText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </BottomSheetModal>
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
    padding: 16,
    paddingBottom: 32,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  dangerText: {
    color: '#dc3545',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
