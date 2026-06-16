import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  StatusBar,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useZikr } from '../context/ZikrContext';
import { loadStats, getTodayKey } from '../utils/storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { zikrData, loading, statsSummary } = useZikr();
  const [todayStats, setTodayStats] = useState(null);

  useEffect(() => {
    loadTodayStats();
  }, [statsSummary]);

  const loadTodayStats = async () => {
    const stats = await loadStats();
    const todayKey = getTodayKey();
    if (stats[todayKey]) {
      setTodayStats(stats[todayKey]);
    } else {
      setTodayStats(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading Zikr...</Text>
      </View>
    );
  }

  if (!zikrData) {
    return (
      <View style={styles.center}>
        <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
        <Text style={styles.errorText}>Failed to load data</Text>
      </View>
    );
  }

  const zikrTypes = [
    { key: 'morning', ...zikrData.morning },
    { key: 'afternoon', ...zikrData.afternoon },
    { key: 'beforeSleep', ...zikrData.beforeSleep }
  ];

  const getTodayStatus = (zikrType) => {
    if (!todayStats) return 'pending';
    return todayStats[zikrType]?.completed ? 'completed' : 'pending';
  };

  const getCompletedToday = () => {
    if (!todayStats) return 0;
    let count = 0;
    if (todayStats.morning?.completed) count++;
    if (todayStats.afternoon?.completed) count++;
    if (todayStats.beforeSleep?.completed) count++;
    return count;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      
      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🕌</Text>
        </View>
        <Text style={styles.headerTitle}>Daily Important Zikr</Text>
        <Text style={styles.headerSubtitle}>Remember Allah throughout your day</Text>
      </View>

      {/* Today's Progress Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{getCompletedToday()}</Text>
            <Text style={styles.summaryLabel}>Completed Today</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{statsSummary?.streak || 0}</Text>
            <Text style={styles.summaryLabel}>Day Streak</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{statsSummary?.totalCompletions || 0}</Text>
            <Text style={styles.summaryLabel}>Total Zikr</Text>
          </View>
        </View>
      </View>

      {/* Zikr Cards */}
      <View style={styles.cardsContainer}>
        <Text style={styles.sectionTitle}>Choose Your Zikr</Text>
        <View style={styles.cardsGrid}>
          {zikrTypes.map((item) => {
            const status = getTodayStatus(item.key);
            return (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.card,
                  status === 'completed' && styles.cardCompleted
                ]}
                onPress={() => navigation.navigate('Zikr', { 
                  type: item.key, 
                  title: item.title, 
                  duas: item.duas 
                })}
                activeOpacity={0.8}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardIcon}>{item.icon}</Text>
                  {status === 'completed' && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedBadgeText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>
                  {item.duas?.length || 0} Duas
                </Text>
                {status === 'completed' ? (
                  <View style={styles.statusBadgeComplete}>
                    <Text style={styles.statusBadgeText}>Completed</Text>
                  </View>
                ) : (
                  <View style={styles.statusBadgePending}>
                    <Text style={styles.statusBadgeText}>Start</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Quick Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Today's Reminders</Text>
        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>
          <Text style={styles.tipText}>Morning Zikr - After Fajr prayer</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>
          <Text style={styles.tipText}>Afternoon Zikr - After Asr prayer</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipBullet}>•</Text>
          <Text style={styles.tipText}>Before Sleep Zikr - Before going to bed</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    color: '#7f8c8d',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#2c3e50',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoEmoji: {
    fontSize: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ecf0f1',
    marginTop: 5,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -20,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginTop: 4,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ecf0f1',
  },
  cardsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  cardCompleted: {
    borderColor: '#27ae60',
    backgroundColor: '#f0fdf4',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 32,
  },
  completedBadge: {
    backgroundColor: '#27ae60',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  statusBadgeComplete: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusBadgePending: {
    backgroundColor: '#3498db',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  tipsContainer: {
    backgroundColor: '#e8f4f8',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: '#3498db',
    marginRight: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#34495e',
    flex: 1,
  },
});

export default HomeScreen;