import React, { useState } from 'react';
import { Share } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { router, useLocalSearchParams } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Button, ButtonText } from '@/components/ui/button';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Icon } from '@/components/ui/icon';
import { X, Calendar as CalendarIcon, Clock, ChevronDown, Minus, Plus, Check, Share2 } from 'lucide-react-native';
import { Loading } from '../components/Loading';

export default function BookingScreen() {
  const params = useLocalSearchParams();
  const spaceName = params.spaceName as string;
  const hours = Number(params.hours);
  const price = Number(params.price);

  // Mover a criação do array de horários disponíveis para dentro do componente
  const AVAILABLE_HOURS = Array.from({ length: 18 }, (_, i) => {
    const startHour = i + 6; // Começa às 6h
    const endHour = startHour + hours; // Adiciona a duração selecionada
    return {
      label: `${startHour.toString().padStart(2, '0')}:00 às ${endHour
        .toString()
        .padStart(2, '0')}:00`,
      value: `${startHour.toString().padStart(2, '0')}:00`,
      disabled: startHour >= 17 && startHour <= 20,
    };
  }).filter((hour) => {
    // Filtra horários que ultrapassariam as 24h
    const [startHour] = hour.value.split(':').map(Number);
    return startHour + hours <= 24;
  });

  // Definir as opções de esporte fixas
  const SPORTS_OPTIONS = [
    { label: 'Futvolei', value: 'futvolei' },
    { label: 'Volei', value: 'volei' },
    { label: 'Beach Tennis', value: 'beach-tennis' },
  ];

  const [date, setDate] = useState(new Date());
  const [sport, setSport] = useState(SPORTS_OPTIONS[0].value);
  const [people, setPeople] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_HOURS[0].value);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showSportPicker, setShowSportPicker] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const peopleOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simular uma chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowReceipt(true);
  };

  // Função para formatar a data para o formato do calendário
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Função para converter string do calendário para Date
  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleDateSelect = (day: any) => {
    setDate(parseDate(day.dateString));
    setShowCalendar(false);
  };

  // Adicione esta função para calcular o valor por pessoa
  const calculatePricePerPerson = () => {
    return (price / people).toFixed(2);
  };

  const handleShare = async () => {
    try {
      const message =
        `🏐 Reserva confirmada!\n\n` +
        `📍 Local: ${spaceName}\n` +
        `📅 Data: ${date.toLocaleDateString('pt-BR')}\n` +
        `🕒 Horário: ${getTimeInterval(selectedTime.split(':')[0])}\n` +
        `⚽ Esporte: ${
          SPORTS_OPTIONS.find((s) => s.value === sport)?.label
        }\n` +
        `⏱️ Duração: ${hours} hora${hours > 1 ? 's' : ''}\n` +
        `👥 Pessoas: ${people}\n\n` +
        `💰 Valor total: R$ ${price.toFixed(2)}\n` +
        `💵 Valor por pessoa: R$ ${calculatePricePerPerson()}`;

      await Share.share({
        message,
        title: 'Compartilhar Reserva',
      });

      // Fechar o modal de recibo após compartilhar
      setShowReceipt(false);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  // Função auxiliar para obter o intervalo de horário
  const getTimeInterval = (startTime: string) => {
    const startHour = parseInt(startTime);
    const endHour = startHour + hours;
    return `${startHour.toString().padStart(2, '0')}:00 às ${endHour
      .toString()
      .padStart(2, '0')}:00`;
  };

  return (
    <Box className="flex-1 bg-white">
      {/* Header */}
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
              Fazer Reserva
            </Heading>
            
            <Box className="w-6" />
          </HStack>
        </Box>
      </Box>

      <ScrollView className="flex-1">
        {/* Informações do Espaço */}
        <Box className="p-5 border-b border-gray-100">
          <VStack space="sm">
            <Heading size="xl" className="text-gray-900">
              {spaceName}
            </Heading>
            <HStack className="justify-between items-center">
              <Text size="md" className="text-gray-600">
                {hours} hora{hours > 1 ? 's' : ''}
              </Text>
              <Text size="xl" className="text-blue-600 font-bold">
                R$ {price.toFixed(2)}
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Formulário */}
        <VStack className="p-5" space="lg">
          {/* Data */}
          <VStack space="sm">
            <Text size="md" className="text-gray-700 font-medium">
              Data
            </Text>
            <Pressable
              onPress={() => setShowCalendar(true)}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <HStack className="justify-between items-center">
                <Text size="md" className="text-gray-900">
                  {date.toLocaleDateString('pt-BR')}
                </Text>
                <Icon as={CalendarIcon} size="md" className="text-gray-500" />
              </HStack>
            </Pressable>
          </VStack>

          {/* Hora */}
          <VStack space="sm">
            <Text size="md" className="text-gray-700 font-medium">
              Horário
            </Text>
            <Pressable
              onPress={() => setShowTimePicker(true)}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <HStack className="justify-between items-center">
                <Text size="md" className="text-gray-900">
                  {getTimeInterval(selectedTime.split(':')[0])}
                </Text>
                <Icon as={Clock} size="md" className="text-gray-500" />
              </HStack>
            </Pressable>
          </VStack>

          {/* Esporte */}
          <VStack space="sm">
            <Text size="md" className="text-gray-700 font-medium">
              Esporte
            </Text>
            <Pressable
              onPress={() => setShowSportPicker(true)}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <HStack className="justify-between items-center">
                <Text size="md" className="text-gray-900">
                  {SPORTS_OPTIONS.find((s) => s.value === sport)?.label || ''}
                </Text>
                <Icon as={ChevronDown} size="md" className="text-gray-500" />
              </HStack>
            </Pressable>
          </VStack>

          {/* Quantidade de Pessoas */}
          <VStack space="sm">
            <Text size="md" className="text-gray-700 font-medium">
              Quantidade de Pessoas
            </Text>
            <Box className="border border-gray-200 rounded-lg overflow-hidden">
              <HStack className="items-center">
                <Pressable
                  onPress={() => setPeople(Math.max(1, people - 1))}
                  className="p-4 bg-gray-100 items-center justify-center"
                >
                  <Icon as={Minus} size="md" className="text-gray-600" />
                </Pressable>

                <Box className="flex-1 py-4 items-center justify-center">
                  <Text size="lg" className="text-gray-900 font-medium">
                    {people}
                  </Text>
                </Box>

                <Pressable
                  onPress={() => setPeople(Math.min(20, people + 1))}
                  className="p-4 bg-gray-100 items-center justify-center"
                >
                  <Icon as={Plus} size="md" className="text-gray-600" />
                </Pressable>
              </HStack>
            </Box>
            <Text size="sm" className="text-gray-500 italic">
              R$ {calculatePricePerPerson()} por pessoa
            </Text>
          </VStack>
        </VStack>
      </ScrollView>

      {/* Botão de confirmação */}
      <Box className="p-5 border-t border-gray-100">
        <Button
          size="lg"
          action="primary"
          onPress={handleSubmit}
          className="bg-blue-600"
        >
          <ButtonText className="text-white font-medium">
            Confirmar Reserva
          </ButtonText>
        </Button>
      </Box>

      {/* Calendar Modal */}
      <Modal isOpen={showCalendar} onClose={() => setShowCalendar(false)} useRNModal={true}>
        <ModalBackdrop />
        <ModalContent className="max-w-md">
          <ModalHeader>
            <Heading size="lg" className="text-gray-900">
              Selecione a Data
            </Heading>
            <ModalCloseButton>
              <Icon as={X} size="md" className="text-gray-500" />
            </ModalCloseButton>
          </ModalHeader>
          
          <ModalBody>
            <Box className="w-full">
              <Calendar
                current={formatDate(date)}
                minDate={formatDate(new Date())}
                onDayPress={handleDateSelect}
                markedDates={{
                  [formatDate(date)]: {
                    selected: true,
                    selectedColor: '#2563eb',
                  },
                }}
                theme={{
                  todayTextColor: '#2563eb',
                  selectedDayBackgroundColor: '#2563eb',
                  selectedDayTextColor: '#ffffff',
                  arrowColor: '#2563eb',
                  monthTextColor: '#111827',
                  textDayFontWeight: '400',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '500',
                }}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Time Picker Modal */}
      <Modal isOpen={showTimePicker} onClose={() => setShowTimePicker(false)} useRNModal={true}>
        <ModalBackdrop />
        <ModalContent className="max-w-md max-h-[80%]">
          <ModalHeader>
            <Heading size="lg" className="text-gray-900">
              Selecione o Horário
            </Heading>
            <ModalCloseButton>
              <Icon as={X} size="md" className="text-gray-500" />
            </ModalCloseButton>
          </ModalHeader>
          
          <ModalBody>
            <ScrollView className="max-h-80">
              <VStack space="xs">
                {AVAILABLE_HOURS.map((hour) => (
                  <Pressable
                    key={hour.value}
                    onPress={() => {
                      if (!hour.disabled) {
                        setSelectedTime(hour.value);
                        setShowTimePicker(false);
                      }
                    }}
                    disabled={hour.disabled}
                    className={`p-4 rounded-lg border ${
                      selectedTime === hour.value
                        ? 'bg-blue-600 border-blue-600'
                        : hour.disabled
                        ? 'bg-gray-100 border-gray-200'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <Text
                      size="md"
                      className={`text-center ${
                        selectedTime === hour.value
                          ? 'text-white font-medium'
                          : hour.disabled
                          ? 'text-gray-400'
                          : 'text-gray-900'
                      }`}
                    >
                      {hour.label}
                    </Text>
                  </Pressable>
                ))}
              </VStack>
            </ScrollView>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Sport Picker Modal */}
      <Modal isOpen={showSportPicker} onClose={() => setShowSportPicker(false)} useRNModal={true}>
        <ModalBackdrop />
        <ModalContent className="max-w-sm">
          <ModalHeader>
            <Heading size="lg" className="text-gray-900">
              Selecione o Esporte
            </Heading>
            <ModalCloseButton>
              <Icon as={X} size="md" className="text-gray-500" />
            </ModalCloseButton>
          </ModalHeader>
          
          <ModalBody>
            <VStack space="xs">
              {SPORTS_OPTIONS.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    setSport(option.value);
                    setShowSportPicker(false);
                  }}
                  className={`p-4 rounded-lg border ${
                    sport === option.value
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <HStack className="items-center justify-between">
                    <Text
                      size="md"
                      className={`${
                        sport === option.value
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-900'
                      }`}
                    >
                      {option.label}
                    </Text>
                    {sport === option.value && (
                      <Icon as={Check} size="sm" className="text-blue-600" />
                    )}
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Receipt Modal */}
      <Modal 
        isOpen={showReceipt} 
        onClose={() => {
          setShowReceipt(false);
          router.back();
        }}
        size="lg"
        useRNModal={true}
      >
        <ModalBackdrop />
        <ModalContent className="max-w-md max-h-[90%]">
          <ModalHeader>
            <Heading size="xl" className="text-gray-900">
              Reserva Confirmada
            </Heading>
            <ModalCloseButton>
              <Icon as={X} size="md" className="text-gray-500" />
            </ModalCloseButton>
          </ModalHeader>
          
          <ModalBody>
            <VStack space="lg">
              {/* Success Icon */}
              <Box className="items-center py-4">
                <Box className="w-20 h-20 bg-green-500 rounded-full items-center justify-center">
                  <Icon as={Check} size="xl" className="text-white" />
                </Box>
              </Box>

              {/* Receipt Details */}
              <VStack space="md">
                <VStack space="sm">
                  <HStack className="justify-between items-center">
                    <Text size="md" className="text-gray-600">
                      Titular da reserva
                    </Text>
                    <Text size="md" className="text-gray-900 font-medium">
                      Lucas Jorge
                    </Text>
                  </HStack>

                  <HStack className="justify-between items-center">
                    <Text size="md" className="text-gray-600">
                      Local
                    </Text>
                    <Text size="md" className="text-gray-900 font-medium">
                      {spaceName}
                    </Text>
                  </HStack>

                  <HStack className="justify-between items-center">
                    <Text size="md" className="text-gray-600">
                      Data
                    </Text>
                    <Text size="md" className="text-gray-900 font-medium">
                      {date.toLocaleDateString('pt-BR')}
                    </Text>
                  </HStack>

                  <HStack className="justify-between items-center">
                    <Text size="md" className="text-gray-600">
                      Horário
                    </Text>
                    <Text size="md" className="text-gray-900 font-medium">
                      {getTimeInterval(selectedTime.split(':')[0])}
                    </Text>
                  </HStack>

                  <HStack className="justify-between items-center">
                    <Text size="md" className="text-gray-600">
                      Esporte
                    </Text>
                    <Text size="md" className="text-gray-900 font-medium">
                      {SPORTS_OPTIONS.find((s) => s.value === sport)?.label}
                    </Text>
                  </HStack>

                  <HStack className="justify-between items-center">
                    <Text size="md" className="text-gray-600">
                      Duração
                    </Text>
                    <Text size="md" className="text-gray-900 font-medium">
                      {hours} hora{hours > 1 ? 's' : ''}
                    </Text>
                  </HStack>

                  <HStack className="justify-between items-center">
                    <Text size="md" className="text-gray-600">
                      Pessoas
                    </Text>
                    <Text size="md" className="text-gray-900 font-medium">
                      {people}
                    </Text>
                  </HStack>
                </VStack>

                {/* Divider */}
                <Box className="h-px bg-gray-200 my-2" />

                {/* Total */}
                <VStack space="sm">
                  <HStack className="justify-between items-center">
                    <Text size="md" className="text-gray-600">
                      Valor Total
                    </Text>
                    <Text size="lg" className="text-blue-600 font-bold">
                      R$ {price.toFixed(2)}
                    </Text>
                  </HStack>

                  <HStack className="justify-between items-center">
                    <Text size="md" className="text-gray-600">
                      Valor por pessoa
                    </Text>
                    <Text size="md" className="text-gray-900 font-medium">
                      R$ {calculatePricePerPerson()}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <VStack className="w-full" space="sm">
              <Button
                size="lg"
                action="secondary"
                variant="outline"
                onPress={handleShare}
                className="border-green-500"
              >
                <HStack className="items-center" space="xs">
                  <Icon as={Share2} size="sm" className="text-green-600" />
                  <ButtonText className="text-green-600 font-medium">
                    Compartilhar com amigos
                  </ButtonText>
                </HStack>
              </Button>

              <Button
                size="lg"
                action="primary"
                onPress={() => {
                  setShowReceipt(false);
                  router.back();
                }}
                className="bg-blue-600"
              >
                <ButtonText className="text-white font-medium">
                  Concluir
                </ButtonText>
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Loading Modal */}
      <Loading visible={isLoading} message="Confirmando reserva..." />
    </Box>
  );
}
