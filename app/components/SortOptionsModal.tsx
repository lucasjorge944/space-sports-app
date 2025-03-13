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
        numberOfLines={1}
      >
        {title}
      </Text>
    </View>
  );

  // Divide options into rows of 3
  const rows = options.reduce((acc, curr, i) => {
    const rowIndex = Math.floor(i / 3);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(curr);
    return acc;
  }, [] as SortOptionConfig[][]);

  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      title="Ordenar por"
      height={50}
    >
      <View style={styles.optionsContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.optionsRow}>
            {row.map((option) => (
              <SortOption key={option.value} {...option} />
            ))}
            {/* Add empty views to maintain grid alignment if row is not complete */}
            {row.length < 3 &&
              Array(3 - row.length)
                .fill(null)
                .map((_, i) => (
                  <View key={`empty-${i}`} style={styles.emptySlot} />
                ))}
          </View>
        ))}
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    paddingVertical: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sortOption: {
    alignItems: 'center',
    width: '30%', // Slightly less than 33.33% to account for spacing
  },
  emptySlot: {
    width: '30%', // Same width as sortOption
  },
  sortOptionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  sortOptionTextSelected: {
    color: '#1a73e8',
    fontWeight: '500',
  },
});
