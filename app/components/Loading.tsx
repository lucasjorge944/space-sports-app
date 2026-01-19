import React from 'react';
import { Modal } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Spinner } from '@/components/ui/spinner';

interface LoadingProps {
  visible: boolean;
  message?: string;
}

export function Loading({ 
  visible, 
  message = 'Carregando...' 
}: LoadingProps) {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Box className="flex-1 bg-black/50 justify-center items-center">
        <Box className="bg-white rounded-xl p-6 items-center shadow-sm">
          <VStack space="md" className="items-center">
            <Spinner size="large" className="text-blue-600" />
            <Text size="md" className="text-gray-600">
              {message}
            </Text>
          </VStack>
        </Box>
      </Box>
    </Modal>
  );
}
