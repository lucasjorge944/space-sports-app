import React from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: {
    name: keyof typeof Ionicons.glyphMap;
    color: string;
  };
  confirmButtonStyle?: 'danger' | 'primary' | 'success';
}

export function ConfirmationModal({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Voltar',
  icon = { name: 'alert-circle-outline', color: '#dc3545' },
  confirmButtonStyle = 'danger',
}: ConfirmationModalProps) {
  const getButtonAction = () => {
    switch (confirmButtonStyle) {
      case 'primary':
        return 'primary';
      case 'success':
        return 'positive';
      case 'danger':
        return 'negative';
      default:
        return 'primary';
    }
  };

  return (
    <Actionsheet isOpen={visible} onClose={onClose} snapPoints={[35]}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="max-h-[35%]">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <VStack space="lg" className="w-full px-6 pb-6">
          {/* Content */}
          <VStack space="md" className="items-center py-4">
            <Box className="items-center justify-center">
        <Ionicons name={icon.name} size={48} color={icon.color} />
            </Box>
            
            <Heading size="xl" className="text-center text-gray-900">
              {title}
            </Heading>
            
            <Text size="md" className="text-center text-gray-600 leading-relaxed">
              {message}
            </Text>
          </VStack>

          {/* Buttons */}
          <HStack space="md" className="w-full">
            <Button
              variant="outline"
              action="secondary"
              size="lg"
          onPress={onClose}
              className="flex-1"
            >
              <ButtonText>{cancelText}</ButtonText>
            </Button>

            <Button
              variant="solid"
              action={getButtonAction()}
              size="lg"
          onPress={onConfirm}
              className="flex-1"
            >
              <ButtonText>{confirmText}</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}

