import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { IconButton } from '../components/IconButton';

export default function LocationModal() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          name="close-outline"
          onPress={() => router.back()}
          color="#666"
        />
        <Text style={styles.headerTitle}>Configurar localização</Text>
        <View style={{ width: 24 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
