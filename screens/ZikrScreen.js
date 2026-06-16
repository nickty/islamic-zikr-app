import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StatusBar,
} from 'react-native';
import { useZikr } from '../context/ZikrContext';

const ZikrScreen = ({ route, navigation }) => {
  const { type, title, duas: initialDuas } = route.params;
  const { completeZikr } = useZikr();
  const [duas, setDuas] = useState(
    initialDuas.map(dua => ({ ...dua, currentCount: 0, completed: false }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const scrollViewRef = useRef(null);

  const currentDua = duas[currentIndex];

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const incrementCount = () => {
    if (currentDua.completed) return;
    
    const newCount = currentDua.currentCount + 1;
    const completed = newCount >= currentDua.repetitions;
    
    const updatedDuas = [...duas];
    updatedDuas[currentIndex] = { ...currentDua, currentCount: newCount, completed };
    setDuas(updatedDuas);
    
    // Check if this completion made all duas completed
    const allCompleted = updatedDuas.every(d => d.completed);
    
    if (completed && currentIndex < duas.length - 1) {
      // Auto go to next dua after a short delay and scroll to top
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        // Scroll to top after state update
        setTimeout(() => {
          scrollToTop();
        }, 100);
      }, 800);
    } else if (allCompleted) {
      // Save completion when ALL duas are completed
      const completedCount = updatedDuas.filter(d => d.completed).length;
      completeZikr(type, completedCount, duas.length);
      setTimeout(() => {
        setShowCompleteModal(true);
      }, 500);
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
            scrollToTop();
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
            setTimeout(() => {
              scrollToTop();
            }, 100);
          }
        }
      ]
    );
  };

  const progress = (currentDua.currentCount / currentDua.repetitions) * 100;
  const totalProgress = (duas.filter(d => d.completed).length / duas.length) * 100;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      <ScrollView 
        ref={scrollViewRef}
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
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

          <TouchableOpacity 
            style={[styles.counterButton, currentDua.completed && styles.counterButtonCompleted]} 
            onPress={incrementCount}
            disabled={currentDua.completed}
            activeOpacity={0.7}
          >
            <Text style={styles.counterButtonText}>
              {currentDua.completed ? '✓ Completed' : '+1'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.resetButton} onPress={resetCurrentDua}>
              <Text style={styles.resetButtonText}>↺ Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetAllButton} onPress={resetAllDuas}>
              <Text style={styles.resetButtonText}>↻ Reset All</Text>
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
                  {dua.transliteration || dua.arabic.substring(0, 20)}
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
            <Text style={styles.modalSubText}>
              Your progress has been saved! ✓
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
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressText: {
    fontSize: 12,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 6,
  },
  progressBarWrapper: {
    height: 6,
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#27ae60',
  },
  duaCard: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  arabicText: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'System',
    marginBottom: 12,
    color: '#2c3e50',
  },
  transliteration: {
    fontSize: 15,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  translation: {
    fontSize: 14,
    textAlign: 'center',
    color: '#34495e',
    marginBottom: 20,
    lineHeight: 20,
  },
  repetitionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    color: '#95a5a6',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27ae60',
    borderRadius: 3,
  },
  counterButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  counterButtonCompleted: {
    backgroundColor: '#27ae60',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetAllButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  completionList: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 14,
    borderRadius: 16,
  },
  completionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  completionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  completionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  completionNumber: {
    width: 25,
    fontSize: 12,
    color: '#7f8c8d',
  },
  completionText: {
    fontSize: 12,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentBadge: {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
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
    fontSize: 50,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubText: {
    fontSize: 13,
    color: '#27ae60',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ZikrScreen;