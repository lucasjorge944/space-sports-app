import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from './CustomButton';
import { TextAreaInput } from './TextAreaInput';

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

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Avaliações</Text>
      <View style={styles.reviewsSummary}>
        <View style={styles.ratingBig}>
          <Text style={styles.ratingNumber}>{rating}</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= rating ? 'star' : 'star-outline'}
                size={20}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.totalReviews}>{reviews.length} avaliações</Text>
        </View>
      </View>

      {!showReviewForm ? (
        <CustomButton
          title="Avaliar Espaço"
          variant="primary"
          onPress={() => setShowReviewForm(true)}
          style={styles.addReviewButton}
        />
      ) : (
        <View style={styles.reviewForm}>
          <Text style={styles.reviewFormTitle}>Sua Avaliação</Text>
          <View style={styles.ratingInput}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                <Ionicons
                  name={star <= userRating ? 'star' : 'star-outline'}
                  size={32}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextAreaInput
            label="Comentário"
            value={userComment}
            onChangeText={setUserComment}
            placeholder="Conte sua experiência neste espaço..."
            numberOfLines={4}
          />
          <View style={styles.reviewFormButtons}>
            <CustomButton
              title="Cancelar"
              variant="outline"
              onPress={() => {
                setShowReviewForm(false);
                setUserRating(0);
                setUserComment('');
              }}
            />
            <CustomButton
              title="Enviar Avaliação"
              variant="primary"
              size="small"
              onPress={handleSubmitReview}
              style={{ flex: 1 }}
              disabled={userRating === 0 || !userComment.trim()}
            />
          </View>
        </View>
      )}

      <View style={styles.reviewsList}>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image
                source={{ uri: review.userAvatar }}
                style={styles.reviewerAvatar}
              />
              <View style={styles.reviewerInfo}>
                <Text style={styles.reviewerName}>{review.userName}</Text>
                <View style={styles.reviewRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= review.rating ? 'star' : 'star-outline'}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewDate}>
                {new Date(review.date).toLocaleDateString('pt-BR')}
              </Text>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  reviewsSummary: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingBig: {
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 8,
  },
  totalReviews: {
    fontSize: 14,
    color: '#666',
  },
  addReviewButton: {
    marginBottom: 20,
  },
  reviewForm: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  reviewFormTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
  },
  ratingInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  reviewFormButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  reviewsList: {
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
