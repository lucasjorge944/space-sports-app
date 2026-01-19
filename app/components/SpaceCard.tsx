import { Image } from 'react-native';
import { router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Pressable } from '@/components/ui/pressable';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Icon, StarIcon } from '@/components/ui/icon';

interface SpaceCardProps {
  data: {
    id: string;
    name: string;
    description: string;
    rating: number;
    reviews: number;
    image: string;
    sports: string[];
    price: number;
  };
}

export function SpaceCard({ data }: SpaceCardProps) {
  return (
    <Pressable
      onPress={() => router.push(`/space/${data.id}`)}
      className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
    >
      <Box className="relative">
        <Image
          source={{ uri: data.image }}
          className="w-full h-48"
          style={{ resizeMode: 'cover' }}
        />
        
        {/* Rating badge overlay */}
        <Box className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-md flex-row items-center">
          <Icon as={StarIcon} size="xs" className="text-yellow-400 mr-1" />
          <Text size="sm" className="text-white font-medium">
            {data.rating}
          </Text>
        </Box>
      </Box>

      <VStack space="sm" className="p-4">
        {/* Title and reviews */}
        <VStack space="xs">
          <Heading size="lg" className="text-gray-900 leading-tight">
            {data.name}
          </Heading>
          <Text size="sm" className="text-gray-500">
            {data.reviews} avaliações
          </Text>
        </VStack>

        {/* Description */}
        <Text 
          size="sm" 
          className="text-gray-600 leading-relaxed"
          isTruncated
        >
          {data.description}
        </Text>

        {/* Sports tags */}
        <HStack space="xs" className="flex-wrap">
          {data.sports.slice(0, 3).map((sport) => (
            <Box key={sport} className="bg-blue-50 border border-blue-200 px-2 py-1 rounded-md">
              <Text size="xs" className="text-blue-600 font-medium">
                {sport}
              </Text>
            </Box>
          ))}
          {data.sports.length > 3 && (
            <Box className="bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">
              <Text size="xs" className="text-gray-500">
                +{data.sports.length - 3}
              </Text>
            </Box>
          )}
        </HStack>

        {/* Price */}
        <HStack className="justify-between items-center pt-2 border-t border-gray-100">
          <Text size="xs" className="text-gray-500 uppercase tracking-wide">
            A partir de
          </Text>
          <Text size="lg" bold className="text-blue-600">
            R$ {data.price.toFixed(2)}/h
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}
