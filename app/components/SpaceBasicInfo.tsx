import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Star, MapPin } from 'lucide-react-native';

interface SpaceBasicInfoProps {
  name: string;
  rating: number;
  reviews: number;
  address: string;
  distance: string;
  description: string;
  sports: string[];
}

export function SpaceBasicInfo({
  name,
  rating,
  reviews,
  address,
  distance,
  description,
  sports,
}: SpaceBasicInfoProps) {
  return (
    <VStack space="md">
      {/* Título e avaliação */}
      <HStack className="justify-between items-start">
        <Heading size="xl" className="text-gray-900 flex-1 mr-4">
          {name}
        </Heading>
        <HStack className="items-center" space="xs">
          <Icon as={Star} size="sm" className="text-yellow-500" />
          <Text size="md" className="text-gray-900 font-semibold">
            {rating}
          </Text>
          <Text size="sm" className="text-gray-500">
            ({reviews})
          </Text>
        </HStack>
      </HStack>

      {/* Localização */}
      <HStack className="items-center" space="xs">
        <Icon as={MapPin} size="sm" className="text-gray-500" />
        <Text size="sm" className="text-gray-600 flex-1">
          {address}
        </Text>
        <Text size="sm" className="text-gray-500">
          • {distance}
        </Text>
      </HStack>

      {/* Descrição */}
      <Text size="md" className="text-gray-700 leading-6">
        {description}
      </Text>

      {/* Tags de esportes */}
      <HStack className="flex-wrap" space="xs">
        {sports.map((sport) => (
          <Badge key={sport} action="info" className="bg-blue-50 border-blue-200">
            <BadgeText className="text-blue-700 font-medium">
              {sport}
            </BadgeText>
          </Badge>
        ))}
      </HStack>
    </VStack>
  );
}

