import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';

interface PIXProps {
  keys: Array<{ key: string; owner: string }>;
}

export default function PIX({ keys }: PIXProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await Clipboard.setStringAsync(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <VStack space="lg" className="py-4">
      {keys.map((key, index) => (
        <Box
          key={index}
          className="bg-background-50 rounded-lg p-4 border border-background-200"
        >
          <VStack space="md">
            {/* Owner Section */}
            <VStack space="xs">
              <Text className="text-typography-500 text-xs font-normal">
                Proprietário
              </Text>
              <Text className="text-typography-900 text-base font-semibold">
                {key.owner}
              </Text>
            </VStack>

            {/* QR Code Section */}
            <VStack space="sm" className="items-center">
              <Text className="text-typography-700 text-sm font-medium mb-2">
                Escaneie o QR Code
              </Text>
              <Box className="bg-white p-4 rounded-lg border border-background-200">
                <QRCode
                  value={key.key}
                  size={200}
                  color="#000000"
                  backgroundColor="#FFFFFF"
                />
              </Box>
            </VStack>

            {/* Chave PIX Section */}
            <VStack space="xs">
              <Text className="text-typography-700 text-sm font-medium">
                Chave PIX
              </Text>
              <HStack
                className="bg-white rounded-lg border border-background-200 p-3 items-center justify-between"
                space="sm"
              >
                <Text
                  className="text-typography-900 text-sm flex-1"
                  numberOfLines={1}
                >
                  {key.key}
                </Text>
                <Pressable
                  onPress={() => copyToClipboard(key.key, index)}
                  className="ml-2 p-2 rounded-lg bg-primary-50 active:bg-primary-100"
                >
                  {copiedIndex === index ? (
                    <Ionicons name="checkmark" size={20} color="#1a73e8" />
                  ) : (
                    <Ionicons name="copy-outline" size={20} color="#1a73e8" />
                  )}
                </Pressable>
              </HStack>
              {copiedIndex === index && (
                <Text className="text-primary-600 text-xs">Chave copiada!</Text>
              )}
            </VStack>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
}
