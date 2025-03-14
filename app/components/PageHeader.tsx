import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { IconButton } from './IconButton';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  buttons?: React.ReactNode;
}

export function PageHeader({
  title,
  showBackButton = false,
  buttons,
}: PageHeaderProps) {
  return (
    <View style={[styles.header, styles.exploreHeader]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <IconButton
            name="chevron-back"
            onPress={() => router.back()}
            color="#1a73e8"
          />
        )}
        <Text style={[styles.title, styles.exploreTitle]}>{title}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          gap: 16,
          justifyContent: 'flex-end',
        }}
      >
        {buttons}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
