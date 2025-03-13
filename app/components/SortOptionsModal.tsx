import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from './IconButton';
import { BottomSheetModal } from './BottomSheetModal';
import { Ionicons } from '@expo/vector-icons';

type SortOption = 'date' | 'price' | 'sport';

interface SortOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  selectedOption: SortOption;
  onOptionSelect: (option: SortOption) => void;
}

interface SortOptionConfig {
  title: string;
  value: SortOption;
  icon: string;
}

const SORT_OPTIONS: SortOptionConfig[] = [
  {
    title: 'Data',
    value: 'date',
    icon: 'calendar-outline',
  },
  {
    title: 'Preço',
    value: 'price',
    icon: 'cash-outline',
  },
  {
    title: 'Esporte',
    value: 'sport',
    icon: 'basketball-outline',
  },
];

export function SortOptionsModal({
  visible,
  onClose,
  selectedOption,
  onOptionSelect,
}: SortOptionsModalProps) {
  const SortOption = ({ title, value, icon }: SortOptionConfig) => (
    <View style={styles.sortOption}>
      <IconButton
        name={icon as keyof typeof Ionicons.glyphMap}
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
        {SORT_OPTIONS.map((option) => (
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
