import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from './IconButton';
import { BottomSheetModal } from './BottomSheetModal';
import { Ionicons } from '@expo/vector-icons';

export interface SortOptionConfig {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface SortOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  options: SortOptionConfig[];
}

export function SortOptionsModal({
  visible,
  onClose,
  selectedOption,
  onOptionSelect,
  options,
}: SortOptionsModalProps) {
  const SortOption = ({ title, value, icon }: SortOptionConfig) => (
    <View style={styles.sortOption}>
      <IconButton
        name={icon}
        size="large"
        selected={selectedOption === value}
        onPress={() => {
          onOptionSelect(value);
          onClose();
        }}
      />
      <Text
        style={[
          styles.sortOptionText,
          selectedOption === value && styles.sortOptionTextSelected,
        ]}
      >
        {title}
      </Text>
    </View>
  );

  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      title="Ordenar por"
      height={33}
    >
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <SortOption key={option.value} {...option} />
        ))}
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  sortOption: {
    alignItems: 'center',
    gap: 8,
  },
  sortOptionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sortOptionTextSelected: {
    color: '#1a73e8',
    fontWeight: '500',
  },
});
