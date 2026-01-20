import React, { useState, useRef } from 'react';
import { Share, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Icon } from '@/components/ui/icon';
import { X, ChevronDown, Check, Share2, Info } from 'lucide-react-native';
import { Loading } from '../components/Loading';

export default function EnrollmentScreen() {
  const params = useLocalSearchParams();
  const spaceName = params.spaceName as string;
  const frequency = params.frequency as string;
  const price = Number(params.price);
  const sports = (params.sports as string).split(',');

  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const [showSportPicker, setShowSportPicker] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState('Nunca joguei');
  const [showExperiencePicker, setShowExperiencePicker] = useState(false);
  const [experienceDetails, setExperienceDetails] = useState('');
  const [selectedShift, setSelectedShift] = useState('Manhã');
  const [showShiftPicker, setShowShiftPicker] = useState(false);

  const EXPERIENCE_LEVELS = [
    'Nunca joguei',
    'Já joguei algumas vezes',
    'Já treinei ou treino a algum tempo',
    'Já treino tem um bom tempo',
  ];

  const SHIFTS = ['Manhã', 'Tarde', 'Noite'];

  const scrollViewRef = useRef<ScrollView>(null);

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

  const handleShare = async () => {
    try {
      const message =
        `🏋️‍♂️ Matrícula solicitada!\n\n` +
        `📍 Local: ${spaceName}\n` +
        `🎾 Esporte: ${selectedSport}\n` +
        `📅 Plano: ${frequency}\n` +
        `⏰ Turno: ${selectedShift}\n` +
        `💪 Experiência: ${experienceLevel}\n` +
        (experienceDetails ? `📝 Detalhes: ${experienceDetails}\n` : '') +
        `💰 Valor mensal: R$ ${price.toFixed(2)}`;

      await Share.share({
        message,
        title: 'Compartilhar Matrícula',
      });

      setShowReceipt(false);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextAreaFocus = () => {
    // Pequeno delay para garantir que o teclado já esteja aberto
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
      // Adicionar um padding extra temporário para garantir que o input fique bem visível
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: 1000, // Valor alto para garantir que role até o final
          animated: true,
        });
      }
    }, 500);
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
              Fazer Matrícula
            </Heading>
            
            <Box className="w-6" />
          </HStack>
        </Box>
      </Box>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          keyboardShouldPersistTaps="handled"
        >
          {/* Informações do Espaço */}
          <Box className="p-5 border-b border-gray-100">
            <VStack space="sm">
              <Heading size="xl" className="text-gray-900">
                {spaceName}
              </Heading>
              <HStack className="justify-between items-center">
                <Text size="md" className="text-gray-600">
                  {frequency}
                </Text>
                <Text size="xl" className="text-blue-600 font-bold">
                  R$ {price.toFixed(2)}/mês
                </Text>
              </HStack>
            </VStack>
          </Box>

          {/* Formulário */}
          <VStack className="p-5" space="lg">
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
                    {selectedSport}
                  </Text>
                  <Icon as={ChevronDown} size="md" className="text-gray-500" />
                </HStack>
              </Pressable>
            </VStack>

            {/* Nível de Experiência */}
            <VStack space="sm">
              <Text size="md" className="text-gray-700 font-medium">
                Nível de Experiência
              </Text>
              <Pressable
                onPress={() => setShowExperiencePicker(true)}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <HStack className="justify-between items-center">
                  <Text size="md" className="text-gray-900">
                    {experienceLevel}
                  </Text>
                  <Icon as={ChevronDown} size="md" className="text-gray-500" />
                </HStack>
              </Pressable>
            </VStack>

            {/* Turno Preferido */}
            <VStack space="sm">
              <Text size="md" className="text-gray-700 font-medium">
                Turno Preferido
              </Text>
              <Pressable
                onPress={() => setShowShiftPicker(true)}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <HStack className="justify-between items-center">
                  <Text size="md" className="text-gray-900">
                    {selectedShift}
                  </Text>
                  <Icon as={ChevronDown} size="md" className="text-gray-500" />
                </HStack>
              </Pressable>
            </VStack>

            {/* Detalhes da Experiência */}
            <VStack space="sm">
              <Text size="md" className="text-gray-700 font-medium">
                Detalhes da Experiência
              </Text>
              <Textarea className="bg-gray-50 border-gray-200">
                <TextareaInput
                  placeholder="Conte um pouco mais sobre sua experiência com o esporte..."
                  value={experienceDetails}
                  onChangeText={setExperienceDetails}
                  onFocus={handleTextAreaFocus}
                  className="text-gray-900 min-h-24"
                />
              </Textarea>
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
              Confirmar Matrícula
            </ButtonText>
          </Button>
        </Box>
      </KeyboardAvoidingView>

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
              {sports.map((sport) => (
                <Pressable
                  key={sport}
                  onPress={() => {
                    setSelectedSport(sport);
                    setShowSportPicker(false);
                  }}
                  className={`p-4 rounded-lg border ${
                    selectedSport === sport
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <HStack className="items-center justify-between">
                    <Text
                      size="md"
                      className={`${
                        selectedSport === sport
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-900'
                      }`}
                    >
                      {sport}
                    </Text>
                    {selectedSport === sport && (
                      <Icon as={Check} size="sm" className="text-blue-600" />
                    )}
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Experience Picker Modal */}
      <Modal isOpen={showExperiencePicker} onClose={() => setShowExperiencePicker(false)} useRNModal={true}>
        <ModalBackdrop />
        <ModalContent className="max-w-md">
          <ModalHeader>
            <Heading size="lg" className="text-gray-900">
              Nível de Experiência
            </Heading>
            <ModalCloseButton>
              <Icon as={X} size="md" className="text-gray-500" />
            </ModalCloseButton>
          </ModalHeader>
          
          <ModalBody>
            <VStack space="xs">
              {EXPERIENCE_LEVELS.map((level) => (
                <Pressable
                  key={level}
                  onPress={() => {
                    setExperienceLevel(level);
                    setShowExperiencePicker(false);
                  }}
                  className={`p-4 rounded-lg border ${
                    experienceLevel === level
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <HStack className="items-center justify-between">
                    <Text
                      size="md"
                      className={`${
                        experienceLevel === level
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-900'
                      }`}
                    >
                      {level}
                    </Text>
                    {experienceLevel === level && (
                      <Icon as={Check} size="sm" className="text-blue-600" />
                    )}
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Shift Picker Modal */}
      <Modal isOpen={showShiftPicker} onClose={() => setShowShiftPicker(false)} useRNModal={true}>
        <ModalBackdrop />
        <ModalContent className="max-w-sm">
          <ModalHeader>
            <Heading size="lg" className="text-gray-900">
              Selecione o Turno
            </Heading>
            <ModalCloseButton>
              <Icon as={X} size="md" className="text-gray-500" />
            </ModalCloseButton>
          </ModalHeader>
          
          <ModalBody>
            <VStack space="xs">
              {SHIFTS.map((shift) => (
                <Pressable
                  key={shift}
                  onPress={() => {
                    setSelectedShift(shift);
                    setShowShiftPicker(false);
                  }}
                  className={`p-4 rounded-lg border ${
                    selectedShift === shift
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <HStack className="items-center justify-between">
                    <Text
                      size="md"
                      className={`${
                        selectedShift === shift
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-900'
                      }`}
                    >
                      {shift}
                    </Text>
                    {selectedShift === shift && (
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
              Matrícula Solicitada!
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

              {/* Contact Message */}
              <Box className="bg-blue-50 p-4 rounded-lg">
                <HStack className="items-start" space="sm">
                  <Icon as={Info} size="md" className="text-blue-600 mt-1" />
                  <Text size="sm" className="text-blue-700 flex-1 leading-5">
                    Um professor entrará em contato em breve para agendar sua primeira aula e passar todas as informações necessárias.
                  </Text>
                </HStack>
              </Box>

              {/* Receipt Details */}
              <VStack space="sm">
                <HStack className="justify-between items-center py-2 border-b border-gray-100">
                  <Text size="md" className="text-gray-600">
                    Local
                  </Text>
                  <Text size="md" className="text-gray-900 font-medium">
                    {spaceName}
                  </Text>
                </HStack>

                <HStack className="justify-between items-center py-2 border-b border-gray-100">
                  <Text size="md" className="text-gray-600">
                    Esporte
                  </Text>
                  <Text size="md" className="text-gray-900 font-medium">
                    {selectedSport}
                  </Text>
                </HStack>

                <HStack className="justify-between items-center py-2 border-b border-gray-100">
                  <Text size="md" className="text-gray-600">
                    Plano
                  </Text>
                  <Text size="md" className="text-gray-900 font-medium">
                    {frequency}
                  </Text>
                </HStack>

                <HStack className="justify-between items-center py-2 border-b border-gray-100">
                  <Text size="md" className="text-gray-600">
                    Turno Preferido
                  </Text>
                  <Text size="md" className="text-gray-900 font-medium">
                    {selectedShift}
                  </Text>
                </HStack>

                <HStack className="justify-between items-center py-2 border-b border-gray-100">
                  <Text size="md" className="text-gray-600">
                    Experiência
                  </Text>
                  <Text size="md" className="text-gray-900 font-medium">
                    {experienceLevel}
                  </Text>
                </HStack>

                <HStack className="justify-between items-center py-2">
                  <Text size="md" className="text-gray-600">
                    Valor Mensal
                  </Text>
                  <Text size="lg" className="text-blue-600 font-bold">
                    R$ {price.toFixed(2)}
                  </Text>
                </HStack>
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
                    Compartilhar
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

      <Loading visible={isLoading} message="Solicitando matrícula..." />
    </Box>
  );
}
