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
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Badge, BadgeText, BadgeIcon } from '@/components/ui/badge';
import { Pressable } from '@/components/ui/pressable';
import { Icon, CheckIcon, CloseIcon } from '@/components/ui/icon';
interface Student {
  id: string;
  name: string;
}

interface AttendanceListModalProps {
  visible: boolean;
  onClose: () => void;
  classData: {
    id: string;
    sport: string;
    time: string;
    instructor: string;
    maxParticipants: number;
  } | null;
  students: Student[];
  currentUser: string;
  isConfirmed: boolean;
  onToggleConfirmation: () => void;
}

export function AttendanceListModal({
  visible,
  onClose,
  classData,
  students,
  currentUser,
  isConfirmed,
  onToggleConfirmation,
}: AttendanceListModalProps) {
  if (!classData) return null;

  return (
    <Actionsheet isOpen={visible} onClose={onClose} snapPoints={[80]}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <VStack space="xs" className="w-full px-3 pb-4">
          {/* Header */}
          <Heading size="lg" className="text-center text-gray-900 mt-1 mb-2">
            Lista de Presença
          </Heading>

          {/* Class Info */}
          <VStack space="xs" className="bg-gray-50 p-3 rounded-lg mb-2">
            <Heading size="md" className="text-gray-900">
              {classData.sport}
            </Heading>
            <Text size="sm" className="text-gray-600">
              {classData.time} • {classData.instructor}
            </Text>
            
            {/* Action Button */}
            <Pressable
              onPress={onToggleConfirmation}
              className={`px-3 py-2 rounded-lg flex-row items-center justify-center mt-2 ${
                isConfirmed 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-green-50 border border-green-200'
              }`}
            >
              <Icon 
                as={isConfirmed ? CloseIcon : CheckIcon} 
                size="xs" 
                className={`mr-1 ${isConfirmed ? 'text-red-600' : 'text-green-600'}`} 
              />
              <Text 
                size="sm" 
                className={`font-medium ${
                  isConfirmed ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {isConfirmed ? 'Retirar Presença' : 'Confirmar Presença'}
              </Text>
            </Pressable>
          </VStack>

          {/* Students List Header */}
          <Heading size="sm" className="text-gray-900 mb-1">
            Participantes ({students.length}/{classData.maxParticipants})
          </Heading>
          
          {/* Students List */}
          <Box className="flex-1 min-h-[300px]">
            <VStack space="xs">
              {Array.from({ length: classData.maxParticipants }).map((_, index) => {
                const student = students[index];
                const isCurrentUser = student?.name === currentUser;

                return (
                  <HStack 
                    key={index} 
                    className="items-center py-2 px-3 bg-white rounded-md border border-gray-100"
                  >
                    {/* Number */}
                    <Box className="w-6 h-6 bg-blue-100 rounded-full items-center justify-center mr-2">
                      <Text size="xs" className="text-blue-600 font-bold">
                        {index + 1}
                      </Text>
                    </Box>

                    {/* Student Info */}
                    <HStack className="flex-1 items-center justify-between">
                      <Text 
                        size="sm" 
                        className={`${
                          !student 
                            ? 'text-gray-400' 
                            : isCurrentUser 
                              ? 'text-blue-600 font-semibold' 
                              : 'text-gray-900'
                        }`}
                      >
                        {student?.name || '-'}
                      </Text>
                      
                      {isCurrentUser && (
                        <Badge action="info" variant="solid" size="sm">
                          <BadgeText className="text-gray-900 text-xs">
                            Você
                          </BadgeText>
                        </Badge>
                      )}
                    </HStack>
                  </HStack>
                );
              })}
            </VStack>
          </Box>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}

