import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { IconButton } from '../components/IconButton';
import { CustomTextInput } from '../components/CustomTextInput';
import { useState } from 'react';

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function LocationModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchAddress = async (cep: string) => {
    if (cep.length !== 8) return;

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado');
        setAddresses([]);
      } else {
        setAddresses([data]);
      }
    } catch (err) {
      setError('Erro ao buscar endereço');
      setAddresses([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleAddressSelect = (address: Address) => {
    const fullAddress = `${address.logradouro}, ${address.bairro}, ${address.localidade} - ${address.uf}`;
    // Here you can handle the selected address (e.g., save it to your app's state)
    router.back();
  };

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
      <View style={styles.content}>
        <CustomTextInput
          placeholder="Digite o CEP (somente números)"
          value={searchQuery}
          onChangeText={(text) => {
            const numbers = text.replace(/[^\d]/g, '');
            setSearchQuery(numbers);
            if (numbers.length === 8) {
              searchAddress(numbers);
            }
          }}
          icon="search-outline"
          inputProps={{
            keyboardType: 'numeric',
            maxLength: 8,
          }}
        />

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#1a73e8" />
          </View>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {!loading && (
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.cep}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.addressItem}
                onPress={() => handleAddressSelect(item)}
              >
                <Text style={styles.addressText}>{item.logradouro}</Text>
                <Text style={styles.addressDetails}>
                  {`${item.bairro}, ${item.localidade} - ${item.uf}`}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
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
  content: {
    padding: 20,
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  addressItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  addressDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
