import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TagProps {
  label: string;
  variant?: 'default' | 'neutral' | 'ratio';
  icon?: keyof typeof Ionicons.glyphMap;
  ratio?: number;
}

export function Tag({ label, variant = 'default', icon, ratio }: TagProps) {
  const getRatioColor = () => {
    if (!ratio) return '#666';
    if (ratio === 1) return '#d32f2f';
    if (ratio >= 0.7) return '#f57c00';
    return '#2e7d32';
  };

  const getRatioBackground = () => {
    if (!ratio) return '#f5f5f5';
    if (ratio === 1) return '#ffcdd2';
    if (ratio >= 0.7) return '#ffe0b2';
    return '#c8e6c9';
  };

  const getStyles = () => {
    switch (variant) {
      case 'ratio':
        return {
          container: { backgroundColor: getRatioBackground() },
          text: { color: getRatioColor() },
          icon: getRatioColor(),
        };
      case 'neutral':
        return {
          container: styles.neutralTag,
          text: styles.neutralText,
          icon: '#666',
        };
      default:
        return {
          container: styles.tag,
          text: styles.text,
          icon: '#1a73e8',
        };
    }
  };

  const variantStyles = getStyles();

  return (
    <View style={[styles.tag, variantStyles.container]}>
      {icon && (
        <Ionicons
          name={icon}
          size={14}
          color={variantStyles.icon}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, variantStyles.text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
  neutralTag: {
    backgroundColor: '#f5f5f5',
  },
  neutralText: {
    color: '#666',
  },
  icon: {
    marginRight: 4,
  },
});
