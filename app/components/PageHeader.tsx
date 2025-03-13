import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { IconButton } from './IconButton';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export function PageHeader({
  title,
  showBackButton = false,
  rightIcon,
  onRightIconPress,
}: PageHeaderProps) {
  return (
    <View style={[styles.header, styles.exploreHeader]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <IconButton name="close" onPress={() => router.back()} color="#666" />
        )}
        <Text style={[styles.title, styles.exploreTitle]}>{title}</Text>
      </View>

      {rightIcon ? (
        <IconButton
          name={rightIcon}
          onPress={onRightIconPress}
          color="#1a73e8"
        />
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exploreHeader: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  exploreTitle: {
    fontSize: 32,
    color: '#1a73e8',
  },
});
