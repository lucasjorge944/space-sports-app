import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconButtonSize = 'normal' | 'large';

interface IconButtonProps {
  name: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  color?: string;
  size?: IconButtonSize;
  selected?: boolean;
}

const BUTTON_SIZES = {
  normal: {
    button: 44,
    icon: 26,
  },
  large: {
    button: 56,
    icon: 24,
  },
};

export function IconButton({
  name,
  onPress,
  color = '#666',
  size = 'normal',
  selected = false,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: BUTTON_SIZES[size].button,
          height: BUTTON_SIZES[size].button,
        },
        selected && styles.selectedButton,
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={name}
        size={BUTTON_SIZES[size].icon}
        color={selected ? '#fff' : color}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#f5f5f5',
  },
  selectedButton: {
    backgroundColor: '#1a73e8',
  },
});
