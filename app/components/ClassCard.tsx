import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Badge, BadgeText, BadgeIcon } from '@/components/ui/badge';
import { Icon, ClockIcon, CheckIcon, CloseIcon } from '@/components/ui/icon';
import { AttendanceListModal } from './AttendanceListModal';
import { Loading } from './Loading';

interface Student {
  id: string;
  name: string;
}

interface ClassCardProps {
  data: {
    id: string;
    spaceName: string;
    sport: string;
    time: string;
    duration: string;
    instructor: string;
    image: string;
    participants: number;
    maxParticipants: number;
  };
  isConfirmed: boolean;
  currentUser: string;
  students: Student[];
  onConfirmationSuccess?: () => void;
}

export function ClassCard({
  data,
  isConfirmed,
  currentUser,
  students,
  onConfirmationSuccess,
}: ClassCardProps) {
  const [studentsModalVisible, setStudentsModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleToggleConfirmation = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onConfirmationSuccess?.();
    } finally {
      setIsLoading(false);
    }
  }, [onConfirmationSuccess]);

  return (
    <>
      <Pressable
        onPress={() => setStudentsModalVisible(true)}
        className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
      >
        {/* Image with overlay badge */}
        <Box className="relative">
        <Image
          source={{ uri: data.image }}
            className="w-full h-40"
            style={{ resizeMode: 'cover' }}
          />
          
          {/* Status badge overlay */}
          <Box className="absolute top-3 right-3">
            <Badge 
              action={isConfirmed ? "success" : "muted"} 
              variant="solid" 
              className="bg-black/70 border-0"
            >
              <BadgeIcon 
                as={isConfirmed ? CheckIcon : ClockIcon} 
                className={`mr-1 ${isConfirmed ? 'text-green-400' : 'text-yellow-400'}`} 
              />
              <BadgeText className="text-white font-medium">
                {isConfirmed ? 'Confirmado' : 'Pendente'}
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
            <Text size="sm" className="text-gray-600">
              Professor: {data.instructor}
            </Text>
          </VStack>

          {/* Details */}
          <HStack space="lg" className="py-2">
            <HStack space="xs" className="items-center">
              <Icon as={ClockIcon} size="sm" className="text-gray-500" />
              <Text size="sm" className="text-gray-600">
                {data.time}
              </Text>
            </HStack>
            <HStack space="xs" className="items-center">
              <Icon as={ClockIcon} size="sm" className="text-gray-500" />
              <Text size="sm" className="text-gray-600">
                {data.duration}
              </Text>
            </HStack>
          </HStack>

          {/* Footer */}
          <HStack className="justify-between items-center pt-2 border-t border-gray-100">
            {/* Participants badge */}
            <Badge action="info" variant="outline" size="md">
              <BadgeIcon as={ClockIcon} className="mr-1" />
              <BadgeText>
                {data.participants}/{data.maxParticipants} alunos
              </BadgeText>
            </Badge>

            {/* Action button */}
            <Pressable
              onPress={handleToggleConfirmation}
              className={`px-4 py-2 rounded-lg ${
                isConfirmed 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-green-50 border border-green-200'
              }`}
            >
              <HStack space="xs" className="items-center">
                <Icon 
                  as={isConfirmed ? CloseIcon : CheckIcon} 
                  size="sm" 
                  className={isConfirmed ? 'text-red-600' : 'text-green-600'} 
                />
                <Text 
                  size="sm" 
                  className={`font-medium ${
                    isConfirmed ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {isConfirmed ? 'Retirar' : 'Confirmar'}
                </Text>
              </HStack>
            </Pressable>
          </HStack>
        </VStack>
      </Pressable>

      <AttendanceListModal
        visible={studentsModalVisible}
        onClose={() => setStudentsModalVisible(false)}
        classData={data}
        students={students}
        currentUser={currentUser}
        isConfirmed={isConfirmed}
        onToggleConfirmation={handleToggleConfirmation}
      />

      <Loading visible={isLoading} />
    </>
  );
}

