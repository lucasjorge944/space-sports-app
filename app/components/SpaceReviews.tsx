import React, { useState } from 'react';
import { Image } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Icon } from '@/components/ui/icon';
import { Star } from 'lucide-react-native';

interface ReviewUser {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  userAvatar: string;
}

interface SpaceReviewsProps {
  rating: number;
  reviews: ReviewUser[];
}

export function SpaceReviews({ rating, reviews }: SpaceReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const handleSubmitReview = () => {
    // Aqui você pode implementar a lógica para enviar a avaliação
    console.log({ rating: userRating, comment: userComment });
    setUserRating(0);
    setUserComment('');
    setShowReviewForm(false);
  };

  const renderStars = (currentRating: number, size: 'sm' | 'md' | 'lg' = 'md', interactive = false) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Pressable
        key={star}
        onPress={interactive ? () => setUserRating(star) : undefined}
        disabled={!interactive}
      >
        <Icon
          as={Star}
          size={size}
          className={star <= currentRating ? 'text-yellow-500' : 'text-gray-300'}
          fill={star <= currentRating ? '#eab308' : 'transparent'}
        />
      </Pressable>
    ));
  };

  return (
    <VStack space="lg">
      {/* Título da seção */}
      <Heading size="lg" className="text-gray-900">
        Avaliações
      </Heading>

      {/* Resumo das avaliações */}
      <Box className="items-center py-6 bg-gray-50 rounded-xl">
        <VStack className="items-center" space="sm">
          <Text size="4xl" className="text-gray-900 font-bold">
            {rating.toFixed(1)}
          </Text>
          
          <HStack space="xs">
            {renderStars(rating, 'md')}
          </HStack>
          
          <Text size="sm" className="text-gray-600">
            {reviews.length} avaliação{reviews.length !== 1 ? 'ões' : ''}
          </Text>
        </VStack>
      </Box>

      {/* Botão ou formulário de avaliação */}
      {!showReviewForm ? (
        <Button
          action="primary"
          onPress={() => setShowReviewForm(true)}
          className="bg-blue-600"
        >
          <ButtonText className="text-white font-medium">
            Avaliar Espaço
          </ButtonText>
        </Button>
      ) : (
        <Box className="bg-white border border-gray-200 rounded-xl p-4">
          <VStack space="md">
            <Heading size="md" className="text-gray-900">
              Sua Avaliação
            </Heading>
            
            {/* Seletor de estrelas */}
            <VStack space="sm">
              <Text size="sm" className="text-gray-600 font-medium">
                Classificação
              </Text>
              <HStack className="justify-center" space="xs">
                {renderStars(userRating, 'lg', true)}
              </HStack>
            </VStack>

            {/* Campo de comentário */}
            <VStack space="sm">
              <Text size="sm" className="text-gray-600 font-medium">
                Comentário
              </Text>
              <Textarea className="bg-gray-50 border-gray-200">
                <TextareaInput
                  placeholder="Conte sua experiência neste espaço..."
                  value={userComment}
                  onChangeText={setUserComment}
                  className="text-gray-900 min-h-24"
                />
              </Textarea>
            </VStack>

            {/* Botões de ação */}
            <HStack space="sm">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowReviewForm(false);
                  setUserRating(0);
                  setUserComment('');
                }}
                className="flex-1"
              >
                <ButtonText className="text-gray-600">
                  Cancelar
                </ButtonText>
              </Button>
              
              <Button
                action="primary"
                onPress={handleSubmitReview}
                disabled={userRating === 0 || !userComment.trim()}
                className="flex-1 bg-blue-600"
              >
                <ButtonText className="text-white font-medium">
                  Enviar
                </ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Lista de avaliações */}
      <VStack space="md">
        {reviews.map((review) => (
          <Box
            key={review.id}
            className="bg-white border border-gray-200 rounded-xl p-4"
          >
            <VStack space="sm">
              {/* Header da avaliação */}
              <HStack className="items-center justify-between">
                <HStack className="items-center flex-1" space="sm">
                  <Image
                    source={{ uri: review.userAvatar }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                  />
                  
                  <VStack className="flex-1">
                    <Text size="md" className="text-gray-900 font-medium">
                      {review.userName}
                    </Text>
                    <HStack space="xs">
                      {renderStars(review.rating, 'sm')}
                    </HStack>
                  </VStack>
                </HStack>
                
                <Text size="xs" className="text-gray-500">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </Text>
              </HStack>

              {/* Comentário */}
              <Text size="md" className="text-gray-700 leading-5">
                {review.comment}
              </Text>
            </VStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}

