import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';

const ZikrScreen = ({ route, navigation }) => {
  const { title, duas: initialDuas } = route.params;
  const [duas, setDuas] = useState(
    initialDuas.map(dua => ({ ...dua, currentCount: 0, completed: false }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const currentDua = duas[currentIndex];

  const incrementCount = () => {
    if (currentDua.completed) return;
    
    const newCount = currentDua.currentCount + 1;
    const completed = newCount >= currentDua.repetitions;
    
    const updatedDuas = [...duas];
    updatedDuas[currentIndex] = { ...currentDua, currentCount: newCount, completed };
    setDuas(updatedDuas);
    
    if (completed && currentIndex < duas.length - 1) {
      Alert.alert(
        '✅ Dua Completed!',
        `You have completed "${currentDua.transliteration || currentDua.arabic.substring(0, 30)}"`,
        [
          { 
            text: 'Next Dua', 
            onPress: () => {
              setCurrentIndex(currentIndex + 1);
            } 
          }
        ]
      );
    } else if (completed && currentIndex === duas.length - 1) {
      setShowCompleteModal(true);
    }
  };

  const resetCurrentDua = () => {
    Alert.alert(
      'Reset Dua',
      'Are you sure you want to reset the count for this Dua?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            const updatedDuas = [...duas];
            updatedDuas[currentIndex] = { ...currentDua, currentCount: 0, completed: false };
            setDuas(updatedDuas);
          }
        }
      ]
    );
  };

  const resetAllDuas = () => {
    Alert.alert(
      'Reset All',
      'Are you sure you want to reset all Duas?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset All', 
          style: 'destructive',
          onPress: () => {
            const resetDuas = duas.map(dua => ({ ...dua, currentCount: 0, completed: false }));
            setDuas(resetDuas);
            setCurrentIndex(0);
          }
        }
      ]
    );
  };

  const progress = (currentDua.currentCount / currentDua.repetitions) * 100;
  const totalProgress = (duas.filter(d => d.completed).length / duas.length) * 100;

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Dua {currentIndex + 1} of {duas.length}
            </Text>
            <View style={styles.progressBarWrapper}>
              <View style={[styles.progressBar, { width: `${totalProgress}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.duaCard}>
          <Text style={styles.arabicText}>{currentDua.arabic}</Text>
          {currentDua.transliteration && (
            <Text style={styles.transliteration}>{currentDua.transliteration}</Text>
          )}
          <Text style={styles.translation}>{currentDua.translation}</Text>
          
          <View style={styles.repetitionInfo}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Repeat</Text>
              <Text style={styles.infoValue}>{currentDua.repetitions}x</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Completed</Text>
              <Text style={styles.infoValue}>
                {currentDua.currentCount} / {currentDua.repetitions}
              </Text>
            </View>
          </View>
          
          <View style={styles.progressBarWrapper}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <TouchableOpacity style={styles.counterButton} onPress={incrementCount}>
            <Text style={styles.counterButtonText}>+1</Text>
          </TouchableOpacity>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.resetButton} onPress={resetCurrentDua}>
              <Text style={styles.resetButtonText}>Reset This</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetAllButton} onPress={resetAllDuas}>
              <Text style={styles.resetButtonText}>Reset All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.completionList}>
          <Text style={styles.completionTitle}>📋 Session Progress</Text>
          {duas.map((dua, idx) => (
            <View key={idx} style={styles.completionItem}>
              <View style={styles.completionLeft}>
                <Text style={styles.completionNumber}>{idx + 1}.</Text>
                <Text 
                  style={[
                    styles.completionText,
                    idx === currentIndex && styles.activeItem,
                    dua.completed && styles.completedItem,
                    (!dua.completed && idx !== currentIndex) && styles.pendingItem,
                  ]}
                  numberOfLines={1}
                >
                  {dua.transliteration || dua.arabic.substring(0, 25)}
                </Text>
              </View>
              {dua.completed && <Text style={styles.checkmark}>✓</Text>}
              {idx === currentIndex && !dua.completed && (
                <Text style={styles.currentBadge}>Current</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={showCompleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCompleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>Masha'Allah!</Text>
            <Text style={styles.modalText}>
              You have completed all Duas for {title}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowCompleteModal(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.modalButtonText}>Return Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: 15,
  },
  progressText: {
    fontSize: 14,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBarWrapper: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#27ae60',
  },
  duaCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  arabicText: {
    fontSize: 34,
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 16,
    color: '#2c3e50',
  },
  transliteration: {
    fontSize: 18,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  translation: {
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e',
    marginBottom: 24,
    lineHeight: 24,
  },
  repetitionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27ae60',
    borderRadius: 4,
  },
  counterButton: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 60,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f39c12',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetAllButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  completionList: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
  },
  completionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  completionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  completionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  completionNumber: {
    width: 30,
    fontSize: 14,
    color: '#7f8c8d',
  },
  completionText: {
    fontSize: 14,
    flex: 1,
  },
  activeItem: {
    color: '#3498db',
    fontWeight: '600',
  },
  completedItem: {
    color: '#27ae60',
    textDecorationLine: 'line-through',
  },
  pendingItem: {
    color: '#95a5a6',
  },
  checkmark: {
    color: '#27ae60',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentBadge: {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  modalEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ZikrScreen;