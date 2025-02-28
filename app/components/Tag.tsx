import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TagProps {
  label: string;
  variant?: 'default' | 'students' | 'participants';
  icon?: keyof typeof Ionicons.glyphMap;
  participantsRatio?: number;
}

export function Tag({
  label,
  variant = 'default',
  icon,
  participantsRatio,
}: TagProps) {
  const getParticipantsColor = () => {
    if (!participantsRatio) return '#666';
    if (participantsRatio === 1) return '#d32f2f';
    if (participantsRatio >= 0.7) return '#f57c00';
    return '#2e7d32';
  };

  const getParticipantsBackground = () => {
    if (!participantsRatio) return '#f5f5f5';
    if (participantsRatio === 1) return '#ffcdd2';
    if (participantsRatio >= 0.7) return '#ffe0b2';
    return '#c8e6c9';
  };

  const getStyles = () => {
    switch (variant) {
      case 'participants':
        return {
          container: { backgroundColor: getParticipantsBackground() },
          text: { color: getParticipantsColor() },
          icon: getParticipantsColor(),
        };
      case 'students':
        return {
          container: styles.studentsTag,
          text: styles.studentsText,
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
  studentsTag: {
    backgroundColor: '#f5f5f5',
  },
  studentsText: {
    color: '#666',
  },
  icon: {
    marginRight: 4,
  },
});
