import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

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
  const isExploreScreen = title === 'Explorar';

  return (
    <View
      style={[
        styles.header,
        isExploreScreen ? styles.exploreHeader : styles.modalHeader,
      ]}
    >
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            isExploreScreen ? styles.exploreTitle : styles.modalTitle,
          ]}
        >
          {title}
        </Text>
      </View>

      {rightIcon ? (
        <TouchableOpacity style={styles.rightButton} onPress={onRightIconPress}>
          <Ionicons name={rightIcon} size={24} color="#1a73e8" />
        </TouchableOpacity>
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
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    marginRight: 8,
  },
  exploreHeader: {
    padding: 20,
    paddingTop: 60,
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
  },
  exploreTitle: {
    fontSize: 32,
    color: '#1a73e8',
  },
  modalTitle: {
    fontSize: 18,
    color: '#333',
  },
  rightButton: {
    padding: 8,
  },
});
