import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Tag } from './Tag';
import { BottomSheetModal } from './BottomSheetModal';
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
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      height={80}
      title="Lista de Presença"
    >
      <View style={styles.classInfo}>
        <Text style={styles.classInfoTitle}>{classData.sport}</Text>
        <Text style={styles.classInfoDetails}>
          {classData.time} • {classData.instructor}
        </Text>
        <View style={{ alignSelf: 'flex-start', marginTop: 16 }}>
          <Tag
            label={isConfirmed ? 'Retirar Presença' : 'Confirmar Presença'}
            variant="action"
            icon={
              isConfirmed ? 'close-circle-outline' : 'checkmark-circle-outline'
            }
            isActive={isConfirmed}
            onPress={onToggleConfirmation}
          />
        </View>
      </View>
      <ScrollView style={styles.studentsListContainer}>
        {Array.from({ length: classData.maxParticipants }).map((_, index) => {
          const student = students[index];
          const isCurrentUser = student?.name === currentUser;

          return (
            <View key={index} style={styles.studentItem}>
              <View style={styles.studentNumberContainer}>
                <Text style={styles.studentNumber}>{index + 1}</Text>
              </View>
              <View style={styles.studentNameContainer}>
                <Text
                  style={[
                    styles.studentName,
                    !student && styles.emptySlot,
                    isCurrentUser && styles.currentUserName,
                  ]}
                >
                  {student?.name || '-'}
                </Text>
                {isCurrentUser && (
                  <Text style={styles.currentUserTag}>Você</Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    width: '100%',
  },
  modalHandleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  classInfo: {
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  classInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  classInfoDetails: {
    fontSize: 14,
    color: '#666',
  },
  studentsListContainer: {
    flex: 1,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  studentNumberContainer: {
    width: 40,
    alignItems: 'center',
  },
  studentNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a73e8',
  },
  studentNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  studentName: {
    fontSize: 16,
    color: '#333',
  },
  emptySlot: {
    color: '#999',
  },
  currentUserName: {
    color: '#1a73e8',
    fontWeight: '700',
  },
  currentUserTag: {
    fontSize: 12,
    color: '#1a73e8',
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
});
