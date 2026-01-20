import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

interface Schedule {
  weekdays: string;
  weekends: string;
}

interface SpaceScheduleProps {
  schedule: Schedule;
  title?: string;
}

export function SpaceSchedule({
  schedule,
  title = 'Horário de Funcionamento',
}: SpaceScheduleProps) {
  return (
    <VStack space="md">
      <Heading size="lg" className="text-gray-900">
        {title}
      </Heading>
      
      <VStack space="sm">
        <HStack className="justify-between items-center py-2">
          <Text size="md" className="text-gray-600">
            Segunda à Sexta
          </Text>
          <Text size="md" className="text-gray-900 font-medium">
            {schedule.weekdays}
          </Text>
        </HStack>
        
        <HStack className="justify-between items-center py-2">
          <Text size="md" className="text-gray-600">
            Sábado e Domingo
          </Text>
          <Text size="md" className="text-gray-900 font-medium">
            {schedule.weekends}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}

