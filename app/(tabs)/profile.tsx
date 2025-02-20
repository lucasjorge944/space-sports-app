import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const handleLogout = () => {
    // TODO: Implement Firebase logout
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#666" />
        </View>
        <Text style={styles.name}>Usuário</Text>
        <Text style={styles.phone}>(11) 99999-9999</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#1a73e8" />
          <Text style={styles.menuText}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="card-outline" size={24} color="#1a73e8" />
          <Text style={styles.menuText}>Métodos de Pagamento</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#1a73e8" />
          <Text style={styles.menuText}>Configurações</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  logoutButton: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#e53935',
    fontSize: 16,
    fontWeight: 'bold',
  },
});