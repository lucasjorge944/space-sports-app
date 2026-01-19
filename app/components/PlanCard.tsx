import React, { useCallback, useState } from 'react';
import { Image, Linking } from 'react-native';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/actionsheet';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { Icon, CalendarDaysIcon, ClockIcon, SettingsIcon } from '@/components/ui/icon';
import { Ionicons } from '@expo/vector-icons';
import { Loading } from './Loading';

const MOCK_PLANS = [
  { frequency: '1x na semana', price: 240 },
  { frequency: '2x na semana', price: 360 },
  { frequency: '3x na semana', price: 420 },
  { frequency: 'Ilimitado', price: 480 },
];

interface PlanCardProps {
  data: {
    id: string;
    spaceName: string;
    sport: string;
    schedule: string;
    time: string;
    plan: string;
    price: number;
    image: string;
    instructor: string;
    status: 'active' | 'inactive' | 'pending';
    pendingMessage?: string;
  };
}

export function PlanCard({ data }: PlanCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmStatusModalVisible, setConfirmStatusModalVisible] =
    useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [newPlan, setNewPlan] = useState<null | (typeof MOCK_PLANS)[0]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePlan = useCallback(() => {
    setModalVisible(false);
    setPlanModalVisible(true);
  }, []);

  const handleToggleStatus = useCallback(() => {
    setModalVisible(false);
    setConfirmStatusModalVisible(true);
  }, []);

  const handleSelectNewPlan = useCallback((plan: (typeof MOCK_PLANS)[0]) => {
    setNewPlan(plan);
    setPlanModalVisible(false);
    setConfirmModalVisible(true);
  }, []);

  const handleConfirmPlanChange = useCallback(async () => {
    setConfirmModalVisible(false);
    setIsLoading(true);

    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Implementar lógica de mudança de plano
      console.log('Confirmada troca para:', newPlan);
    } finally {
      setIsLoading(false);
    }
  }, [newPlan]);

  const handleConfirmStatusChange = useCallback(async () => {
    setConfirmStatusModalVisible(false);
    setIsLoading(true);

    try {
      // Simular uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Implementar lógica de ativação/inativação
      console.log(
        'Status alterado para:',
        data.status === 'inactive' ? 'active' : 'inactive'
      );
    } finally {
      setIsLoading(false);
    }
  }, [data.status]);

  const handleWhatsAppContact = () => {
    const whatsappNumber = '5531999325905';
    const message = `Olá! Fiz uma matrícula para ${data.sport} na ${data.spaceName} e ainda não recebi contato.`;

    // Tentar primeiro o deep link do WhatsApp
    const whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;

    // URL alternativa para web/desktop
    const webWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          // Se não suportar o deep link, tenta a URL web
          return Linking.openURL(webWhatsappUrl);
        }
      })
      .catch((err) => {
        console.log('Erro ao abrir WhatsApp:', err);
        // Se falhar, tenta a URL web como fallback
        Linking.openURL(webWhatsappUrl).catch((webErr) => {
          console.log('Erro ao abrir WhatsApp web:', webErr);
        });
      });
  };

  const getStatusBadge = () => {
    const statusConfig = {
      active: { action: 'success' as const, text: 'Ativo' },
      pending: { action: 'warning' as const, text: 'Pendente' },
      inactive: { action: 'muted' as const, text: 'Inativo' }
    };
    return statusConfig[data.status];
  };

  return (
    <>
      <Pressable
        onPress={() => setModalVisible(true)}
        className={`bg-white rounded-xl mb-4 overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform ${
          data.status === 'inactive' ? 'opacity-80' : ''
        }`}
      >
        {/* Image with status badge */}
        <Box className="relative">
          <Image
            source={{ uri: data.image }}
            className={`w-full h-40 ${data.status === 'inactive' ? 'opacity-50' : ''}`}
            style={{ resizeMode: 'cover' }}
          />
          
          {/* Status badge overlay */}
          <Box className="absolute top-3 right-3">
            <Badge 
              action={getStatusBadge().action} 
              variant="solid" 
              className="bg-black/70 border-0"
            >
              <BadgeText className="text-white font-medium text-xs">
                {getStatusBadge().text}
              </BadgeText>
            </Badge>
          </Box>
        </Box>

        <VStack space="sm" className="p-4">
          {/* Header */}
          <VStack space="xs">
            <Heading 
              size="lg" 
              className={`leading-tight ${
                data.status === 'inactive' ? 'text-gray-500' : 'text-gray-900'
              }`}
            >
              {data.spaceName}
            </Heading>
            <Text 
              size="md" 
              className={`font-medium ${
                data.status === 'inactive' ? 'text-gray-400' : 'text-blue-600'
              }`}
            >
              {data.sport}
            </Text>
            <Text 
              size="sm" 
              className={data.status === 'inactive' ? 'text-gray-400' : 'text-blue-500'}
            >
              {data.instructor}
            </Text>
          </VStack>

          {/* Schedule Details */}
          <HStack space="lg" className="py-2">
            <HStack space="xs" className="items-center flex-1">
              <Icon 
                as={CalendarDaysIcon} 
                size="sm" 
                className={data.status === 'inactive' ? 'text-gray-400' : 'text-gray-500'} 
              />
              <Text 
                size="sm" 
                className={data.status === 'inactive' ? 'text-gray-400' : 'text-gray-600'}
              >
                {data.schedule}
              </Text>
            </HStack>
            <HStack space="xs" className="items-center flex-1">
              <Icon 
                as={ClockIcon} 
                size="sm" 
                className={data.status === 'inactive' ? 'text-gray-400' : 'text-gray-500'} 
              />
              <Text 
                size="sm" 
                className={data.status === 'inactive' ? 'text-gray-400' : 'text-gray-600'}
              >
                {data.time}
              </Text>
            </HStack>
          </HStack>

          {/* Plan and Price */}
          <HStack className="justify-between items-center pt-2 border-t border-gray-100">
            <Badge 
              action={data.status === 'inactive' ? 'muted' : 'info'} 
              variant="outline" 
              size="sm"
            >
              <BadgeText className={data.status === 'inactive' ? 'text-gray-400' : 'text-blue-600'}>
                {data.plan}
              </BadgeText>
            </Badge>
            
            <Text 
              size="lg" 
              bold 
              className={data.status === 'inactive' ? 'text-gray-400' : 'text-blue-600'}
            >
              R$ {data.price.toFixed(2)}/mês
            </Text>
          </HStack>
        </VStack>
      </Pressable>

      {/* Main Options Modal */}
      <Actionsheet isOpen={modalVisible} onClose={() => setModalVisible(false)} snapPoints={[25]}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[25%]">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <Box className="w-full">
            {data.status === 'pending' ? (
              <>
                <ActionsheetItem
                  onPress={() => {
                    setModalVisible(false);
                    setShowContactModal(true);
                  }}
                  className="py-4 px-4"
                >
                  <Box className="mr-3">
                    <Ionicons name="alert-circle-outline" size={24} color="#f57c00" />
                  </Box>
                  <ActionsheetItemText className="text-base text-gray-900">
                    Não recebi contato
                  </ActionsheetItemText>
                </ActionsheetItem>

                <ActionsheetItem
                  onPress={() => {
                    setModalVisible(false);
                    setConfirmStatusModalVisible(true);
                  }}
                  className="py-4 px-4"
                >
                  <Box className="mr-3">
                    <Ionicons name="close-circle-outline" size={24} color="#c62828" />
                  </Box>
                  <ActionsheetItemText className="text-base text-red-600">
                    Cancelar matrícula
                  </ActionsheetItemText>
                </ActionsheetItem>
              </>
            ) : (
              <>
                <ActionsheetItem
                  onPress={handleChangePlan}
                  className="py-4 px-4"
                >
                  <Box className="mr-3">
                    <Ionicons name="swap-horizontal" size={24} color="#1a73e8" />
                  </Box>
                  <ActionsheetItemText className="text-base text-gray-900">
                    Trocar de Plano
                  </ActionsheetItemText>
                </ActionsheetItem>

                <ActionsheetItem
                  onPress={handleToggleStatus}
                  className="py-4 px-4"
                >
                  <Box className="mr-3">
                    <Ionicons
                      name={data.status === 'inactive' ? 'play' : 'pause'}
                      size={24}
                      color={data.status === 'inactive' ? '#2e7d32' : '#c62828'}
                    />
                  </Box>
                  <ActionsheetItemText 
                    className={`text-base ${
                      data.status === 'inactive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {data.status === 'inactive' ? 'Ativar Plano' : 'Pausar Plano'}
                  </ActionsheetItemText>
                </ActionsheetItem>
              </>
            )}
          </Box>
        </ActionsheetContent>
      </Actionsheet>

      {/* Plan Selection Modal */}
      <Actionsheet isOpen={planModalVisible} onClose={() => setPlanModalVisible(false)} snapPoints={[60]}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[60%]">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <VStack space="lg" className="w-full px-4 pb-4">
            <Heading size="xl" className="text-center text-gray-900 mt-2">
              Escolha um Plano
            </Heading>

            <ScrollView className="flex-1" contentContainerClassName="pb-4">
              <VStack space="sm">
                {MOCK_PLANS.map((plan, index) => (
                  <Pressable
                    key={plan.frequency}
                    onPress={() => handleSelectNewPlan(plan)}
                    className="flex-row justify-between items-center py-4 px-4 bg-white rounded-lg border border-gray-100 active:bg-gray-50"
                  >
                    <VStack space="xs" className="flex-1">
                      <Heading size="md" className="text-gray-900">
                        {plan.frequency}
                      </Heading>
                      <Text size="sm" className="text-gray-600">
                        Acesso{' '}
                        {plan.frequency === 'Ilimitado'
                          ? 'ilimitado'
                          : `${plan.frequency.split('x')[0]} vez${
                              plan.frequency.startsWith('1') ? '' : 'es'
                            } por semana`}
                      </Text>
                    </VStack>
                    
                    <VStack className="items-end">
                      <Text size="lg" bold className="text-blue-600">
                        R$ {plan.price}
                      </Text>
                      <Text size="sm" className="text-gray-500">
                        /mês
                      </Text>
                    </VStack>
                  </Pressable>
                ))}
              </VStack>
            </ScrollView>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* Plan Change Confirmation Modal */}
      <Actionsheet isOpen={confirmModalVisible} onClose={() => setConfirmModalVisible(false)} snapPoints={[50]}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[50%]">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <VStack space="lg" className="w-full px-6 pb-6">
            {/* Content */}
            <VStack space="md" className="items-center py-4">
              <Box className="items-center justify-center">
                <Ionicons name="alert-circle-outline" size={48} color="#1a73e8" />
              </Box>
              
              <Heading size="xl" className="text-center text-gray-900">
                Confirmar Mudança
              </Heading>
              
              <Text size="md" className="text-center text-gray-600">
                Deseja alterar seu plano atual?
              </Text>

              {/* Plan Comparison */}
              <HStack className="justify-between items-center w-full py-4">
                <VStack className="items-center flex-1">
                  <Text size="sm" className="text-gray-500 mb-1">Plano Atual</Text>
                  <Text size="md" bold className="text-gray-900 mb-1">{data.plan}</Text>
                  <Text size="sm" className="text-blue-600">R$ {data.price.toFixed(2)}/mês</Text>
                </VStack>

                <Box className="px-4">
                  <Ionicons name="arrow-forward" size={24} color="#666" />
                </Box>

                <VStack className="items-center flex-1">
                  <Text size="sm" className="text-gray-500 mb-1">Novo Plano</Text>
                  <Text size="md" bold className="text-gray-900 mb-1">{newPlan?.frequency}</Text>
                  <Text size="sm" className="text-blue-600">R$ {newPlan?.price.toFixed(2)}/mês</Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Buttons */}
            <HStack space="md" className="w-full">
              <Button
                variant="outline"
                action="secondary"
                size="lg"
                onPress={() => setConfirmModalVisible(false)}
                className="flex-1"
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>

              <Button
                variant="solid"
                action="primary"
                size="lg"
                onPress={handleConfirmPlanChange}
                className="flex-1"
              >
                <ButtonText>Confirmar</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* Status Change Confirmation Modal */}
      <Actionsheet isOpen={confirmStatusModalVisible} onClose={() => setConfirmStatusModalVisible(false)} snapPoints={[50]}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[50%]">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <VStack space="lg" className="w-full px-6 pb-6">
            {/* Content */}
            <VStack space="md" className="items-center py-4">
              <Box className="items-center justify-center">
                <Ionicons
                  name="alert-circle-outline"
                  size={48}
                  color={data.status === 'inactive' ? '#2e7d32' : '#c62828'}
                />
              </Box>
              
              <Heading size="xl" className="text-center text-gray-900">
                {data.status === 'inactive' ? 'Ativar Plano' : 'Inativar Plano'}
              </Heading>
              
              <Text size="md" className="text-center text-gray-600 leading-relaxed">
                {data.status === 'inactive'
                  ? 'Que bom que você quer voltar! Deseja reativar este plano?'
                  : 'Que pena... Tem certeza que deseja inativar este plano?'}
              </Text>

              {/* Plan Details */}
              <VStack className="items-center py-4">
                <Text size="lg" bold className="text-gray-900 mb-1">{data.sport}</Text>
                <Text size="md" className="text-gray-600 mb-1">{data.plan}</Text>
                <Text size="md" className="text-blue-600 font-medium">
                  R$ {data.price.toFixed(2)}/mês
                </Text>
              </VStack>
            </VStack>

            {/* Buttons */}
            <HStack space="md" className="w-full">
              <Button
                variant="outline"
                action="secondary"
                size="lg"
                onPress={() => setConfirmStatusModalVisible(false)}
                className="flex-1"
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>

              <Button
                variant="solid"
                action={data.status === 'inactive' ? 'positive' : 'negative'}
                size="lg"
                onPress={handleConfirmStatusChange}
                className="flex-1"
              >
                <ButtonText>{data.status === 'inactive' ? 'Ativar' : 'Inativar'}</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      {/* WhatsApp Contact Modal */}
      <Actionsheet isOpen={showContactModal} onClose={() => setShowContactModal(false)} snapPoints={[45]}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[45%]">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <VStack space="lg" className="w-full px-6 pb-6">
            {/* Content */}
            <VStack space="md" className="items-center py-4">
              <Box className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="logo-whatsapp" size={32} color="#25D366" />
              </Box>
              
              <Heading size="xl" className="text-center text-gray-900">
                Entrar em contato via WhatsApp
              </Heading>
              
              <Text size="md" className="text-center text-gray-600 leading-relaxed px-4">
                Vamos te conectar a um dos professores para verificar o status da sua matrícula.
              </Text>
            </VStack>

            {/* WhatsApp Button */}
            <Button
              variant="solid"
              size="lg"
              onPress={() => {
                handleWhatsAppContact();
                setShowContactModal(false);
              }}
              className="w-full bg-green-600"
            >
              <Ionicons name="logo-whatsapp" size={20} color="#fff" style={{ marginRight: 8 }} />
              <ButtonText className="text-white font-semibold">Abrir WhatsApp</ButtonText>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>

      <Loading visible={isLoading} />
    </>
  );
}

