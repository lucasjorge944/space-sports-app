import React from 'react';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { CheckCircle } from 'lucide-react-native';

interface SpaceAmenitiesProps {
  amenities: string[];
  title?: string;
}

export function SpaceAmenities({
  amenities,
  title = 'Comodidades',
}: SpaceAmenitiesProps) {
  return (
    <VStack space="md">
      <Heading size="lg" className="text-gray-900">
        {title}
      </Heading>
      
      <Box className="flex-row flex-wrap">
        {amenities.map((amenity, index) => (
          <Box key={amenity} className="w-1/2 mb-3">
            <HStack className="items-center" space="xs">
              <Icon as={CheckCircle} size="sm" className="text-blue-600" />
              <Text size="md" className="text-gray-700 flex-1">
                {amenity}
              </Text>
            </HStack>
          </Box>
        ))}
      </Box>
    </VStack>
  );
}

