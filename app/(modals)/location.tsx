import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { Input, InputField } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Icon } from '@/components/ui/icon';
import { X, Search, MapPin } from 'lucide-react-native';

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
    <Box className="flex-1 bg-white">
      {/* Header minimalista */}
      <Box className="bg-white border-b border-gray-100">
        <Box className="pt-4 pb-4 px-5">
          <HStack className="items-center justify-between">
            <Pressable 
              onPress={() => router.back()}
              className="p-2 -ml-2"
            >
              <Icon as={X} size="lg" className="text-gray-600" />
            </Pressable>
            
            <Heading size="lg" className="text-gray-900">
              Configurar localização
            </Heading>
            
            <Box className="w-6" />
          </HStack>
        </Box>
      </Box>

      {/* Conteúdo */}
      <VStack className="flex-1 p-5" space="lg">
        {/* Campo de busca */}
        <VStack space="sm">
          <Text size="sm" className="text-gray-600 font-medium">
            Digite o CEP para buscar o endereço
          </Text>
          <Input className="bg-gray-50 border-gray-200">
            <Icon as={Search} size="sm" className="text-gray-400 ml-3" />
            <InputField
              placeholder="00000-000"
              value={searchQuery}
              onChangeText={(text) => {
                const numbers = text.replace(/[^\d]/g, '');
                setSearchQuery(numbers);
                if (numbers.length === 8) {
                  searchAddress(numbers);
                }
              }}
              keyboardType="numeric"
              maxLength={8}
              className="text-gray-900"
            />
          </Input>
        </VStack>

        {/* Estado de loading */}
        {loading && (
          <Box className="flex-1 justify-center items-center">
            <VStack className="items-center" space="md">
              <Spinner size="large" className="text-blue-600" />
              <Text size="md" className="text-gray-600">
                Buscando endereço...
              </Text>
            </VStack>
          </Box>
        )}

        {/* Mensagem de erro */}
        {error && !loading && (
          <Box className="bg-red-50 border border-red-200 rounded-lg p-4">
            <Text size="md" className="text-red-700 text-center">
              {error}
            </Text>
          </Box>
        )}

        {/* Lista de endereços */}
        {!loading && addresses.length > 0 && (
          <VStack space="sm">
            <Text size="sm" className="text-gray-600 font-medium">
              Endereço encontrado
            </Text>
            <FlatList
              data={addresses}
              keyExtractor={(item) => item.cep}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleAddressSelect(item)}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2"
                >
                  <HStack className="items-start" space="sm">
                    <Icon as={MapPin} size="sm" className="text-blue-600 mt-1" />
                    <VStack className="flex-1" space="xs">
                      <Text size="md" className="text-gray-900 font-medium">
                        {item.logradouro}
                      </Text>
                      <Text size="sm" className="text-gray-600">
                        {`${item.bairro}, ${item.localidade} - ${item.uf}`}
                      </Text>
                      <Text size="xs" className="text-gray-500">
                        CEP: {item.cep}
                      </Text>
                    </VStack>
                  </HStack>
                </Pressable>
              )}
            />
          </VStack>
        )}
      </VStack>
    </Box>
  );
}

