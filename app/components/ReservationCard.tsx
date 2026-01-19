import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Badge, BadgeText, BadgeIcon } from '@/components/ui/badge';
import { Icon, CalendarDaysIcon, ClockIcon } from '@/components/ui/icon';
import { OptionModalType, OptionsModal } from './OptionsModal';
import { ConfirmationModal } from './ConfirmationModal';
import { Loading } from './Loading';

interface ReservationCardProps {
  data: {
    id: string;
    spaceName: string;
    sport: string;
    date: string;
    time: string;
    duration: string;
    price: number;
    image: string;
    holder: string;
    people: number;
    pricePerPerson: number;
  };
  onCancelSuccess?: () => void;
  onChangeSuccess?: () => void;
}

export function ReservationCard({
  data,
  onCancelSuccess,
  onChangeSuccess,
}: ReservationCardProps) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangeReservation = useCallback(() => {
    // Implementar lógica de alteração
    setModalVisible(false);
    onChangeSuccess?.();
  }, [onChangeSuccess]);

  const handleCancelReservation = useCallback(() => {
    setModalVisible(false);
    setConfirmModalVisible(true);
  }, []);

  const handleConfirmCancel = useCallback(async () => {
    setConfirmModalVisible(false);
    setIsLoading(true);

    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Implementar lógica de cancelamento aqui
      onCancelSuccess?.();
    } finally {
      setIsLoading(false);
    }
  }, [onCancelSuccess]);

  const handleSelectOption = useCallback(
    (option: OptionModalType) => {
      if (option.label === 'Alterar') {
        handleChangeReservation();
      } else if (option.label === 'Cancelar') {
        handleCancelReservation();
      }
    },
    [handleChangeReservation, handleCancelReservation]
  );

  const reservationOptions = [
    {
      icon: 'calendar-outline',
      label: 'Alterar',
    },
    {
      icon: 'close-circle-outline',
      label: 'Cancelar',
      variant: 'danger',
      showSeparator: true,
    },
  ] as OptionModalType[];

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
      >
        {/* Image with status overlay */}
        <Box className="relative">
          <Image
            source={{ uri: data.image }}
            className="w-full h-40"
            style={{ resizeMode: 'cover' }}
          />
          
          {/* Status badge */}
          <Box className="absolute top-3 right-3">
            <Badge action="success" variant="solid" className="bg-black/70 border-0">
              <BadgeText className="text-white font-medium text-xs">
                Confirmado
              </BadgeText>
            </Badge>
          </Box>
        </Box>

        <VStack space="sm" className="p-4">
          {/* Header */}
          <VStack space="xs">
            <Heading size="lg" className="text-gray-900 leading-tight">
              {data.spaceName}
            </Heading>
            <Text size="md" className="text-blue-600 font-medium">
              {data.sport}
            </Text>
          </VStack>

          {/* Date and Time */}
          <HStack space="lg" className="py-2">
            <HStack space="xs" className="items-center flex-1">
              <Icon as={CalendarDaysIcon} size="sm" className="text-gray-500" />
              <Text size="sm" className="text-gray-600">
                {data.date}
              </Text>
            </HStack>
            <HStack space="xs" className="items-center flex-1">
              <Icon as={ClockIcon} size="sm" className="text-gray-500" />
              <Text size="sm" className="text-gray-600">
                {data.time}
              </Text>
            </HStack>
          </HStack>

          {/* Duration and People */}
          <HStack space="lg" className="pb-2">
            <HStack space="xs" className="items-center flex-1">
              <Icon as={ClockIcon} size="sm" className="text-gray-500" />
              <Text size="sm" className="text-gray-600">
                {data.duration}
              </Text>
            </HStack>
            <HStack space="xs" className="items-center flex-1">
              <Icon as={ClockIcon} size="sm" className="text-gray-500" />
              <Text size="sm" className="text-gray-600">
                {data.people} pessoas
              </Text>
            </HStack>
          </HStack>

          {/* Price Section */}
          <HStack className="justify-between items-center pt-2 border-t border-gray-100">
            <Badge action="muted" variant="outline" size="sm">
              <BadgeText className="text-gray-600">
                R$ {data.pricePerPerson.toFixed(2)}/pessoa
              </BadgeText>
            </Badge>
            
            <Badge action="info" variant="solid" size="md">
              <BadgeText className="text-gray-900 font-semibold">
                R$ {data.price.toFixed(2)}
              </BadgeText>
            </Badge>
          </HStack>
        </VStack>
      </Pressable>

      <OptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={reservationOptions}
        onSelectOption={handleSelectOption}
      />

      <ConfirmationModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={handleConfirmCancel}
        title="Cancelar Reserva"
        message="Tem certeza que deseja cancelar esta reserva?"
        confirmText="Confirmar"
        cancelText="Voltar"
        icon={{ name: 'alert-circle-outline', color: '#dc3545' }}
        confirmButtonStyle="danger"
      />

      <Loading visible={isLoading} />
    </>
  );
}

