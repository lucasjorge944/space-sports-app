import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tag } from './Tag';
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
      <TouchableOpacity
        style={styles.card}
        onPress={() => setStudentsModalVisible(true)}
      >
        <Image
          source={{ uri: data.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{data.spaceName}</Text>
          <Text style={styles.sport}>{data.sport}</Text>
          <Text style={styles.instructor}>Professor: {data.instructor}</Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{data.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="hourglass-outline" size={16} color="#666" />
              <Text style={styles.detailText}>{data.duration}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Tag
              label={`${data.participants}/${data.maxParticipants} alunos`}
              variant="ratio"
              icon="people-outline"
              ratio={data.participants / data.maxParticipants}
            />
            <Tag
              label={isConfirmed ? 'Retirar Presença' : 'Confirmar Presença'}
              variant="action"
              icon={
                isConfirmed
                  ? 'close-circle-outline'
                  : 'checkmark-circle-outline'
              }
              isActive={isConfirmed}
              onPress={handleToggleConfirmation}
            />
          </View>
        </View>
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sport: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  instructor: {
    fontSize: 14,
    color: '#1a73e8',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
});
