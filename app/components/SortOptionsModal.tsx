import React from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/actionsheet';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
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
  const SortOption = ({ title, value, icon }: SortOptionConfig) => {
    const isSelected = selectedOption === value;
    
    return (
      <Pressable
        onPress={() => {
          onOptionSelect(value);
          onClose();
        }}
        className="items-center justify-center p-4 rounded-xl active:bg-gray-100 min-h-[80px]"
        style={{
          backgroundColor: isSelected ? '#e3f2fd' : '#f8f9fa',
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? '#1976d2' : '#e0e0e0',
        }}
      >
        <Box className="items-center justify-center mb-2">
          <Ionicons 
            name={icon} 
            size={24} 
            color={isSelected ? '#1976d2' : '#666'} 
          />
        </Box>
        <Text
          size="sm"
          className={`text-center ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
          numberOfLines={2}
      >
        {title}
      </Text>
      </Pressable>
  );
  };

  return (
    <Actionsheet isOpen={visible} onClose={onClose} snapPoints={[50]}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="max-h-[50%]">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <VStack space="lg" className="w-full px-2 pb-4">
          {/* Header */}
          <Heading size="lg" className="text-center text-gray-900 mt-2">
            Ordenar por
          </Heading>

          {/* Options Grid */}
          <VStack space="md" className="w-full">
            {/* Create rows of 3 items */}
            {Array.from({ length: Math.ceil(options.length / 3) }, (_, rowIndex) => (
              <HStack key={rowIndex} space="md" className="justify-between w-full">
                {options.slice(rowIndex * 3, (rowIndex + 1) * 3).map((option) => (
                  <Box key={option.value} className="flex-1">
                    <SortOption {...option} />
                  </Box>
            ))}
                {/* Fill empty slots to maintain grid alignment */}
                {options.slice(rowIndex * 3, (rowIndex + 1) * 3).length < 3 &&
                  Array.from({ 
                    length: 3 - options.slice(rowIndex * 3, (rowIndex + 1) * 3).length 
                  }).map((_, emptyIndex) => (
                    <Box key={`empty-${emptyIndex}`} className="flex-1" />
                  ))
                }
              </HStack>
        ))}
          </VStack>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}

