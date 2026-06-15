import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useZikr } from '../context/ZikrContext';
import { loadStats, getTodayKey } from '../utils/storage';

const StatsScreen = () => {
  const { statsSummary, refreshStats, loading, allStats } = useZikr();
  const [refreshing, setRefreshing] = useState(false);
  const [localStats, setLocalStats] = useState(null);

  useEffect(() => {
    loadStatsData();
  }, [statsSummary, allStats]);

  const loadStatsData = async () => {
    const stats = await loadStats();
    setLocalStats(stats);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshStats();
    await loadStatsData();
    setRefreshing(false);
  }, [refreshStats]);

  if (loading) {
    return (
      <View style={styles.center}>
        <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading stats...</Text>
      </View>
    );
  }

  const todayKey = getTodayKey();
  const todayStats = localStats?.[todayKey];
  
  // Get last 7 days
  const recentDays = localStats ? Object.keys(localStats).sort().reverse().slice(0, 7) : [];

  const getZikrStatus = (zikrType) => {
    if (!todayStats) return 'pending';
    return todayStats[zikrType]?.completed ? 'completed' : 'pending';
  };

  const formatDate = (dateKey) => {
    const [year, month, day] = dateKey.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#3498db']} />
      }
    >
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 My Progress</Text>
        <Text style={styles.headerSubtitle}>Track your daily Zikr</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statValue}>{statsSummary?.streak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>✅</Text>
          <Text style={styles.statValue}>{statsSummary?.totalCompletions || 0}</Text>
          <Text style={styles.statLabel}>Total Zikr</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📅</Text>
          <Text style={styles.statValue}>{statsSummary?.totalDays || 0}</Text>
          <Text style={styles.statLabel}>Active Days</Text>
        </View>
      </View>

      {/* Today's Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Zikr Status</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusItem, getZikrStatus('morning') === 'completed' && styles.statusCompleted]}>
            <Text style={styles.statusIcon}>🌅</Text>
            <Text style={styles.statusText}>Morning Zikr</Text>
            {getZikrStatus('morning') === 'completed' ? (
              <View style={styles.statusBadgeComplete}>
                <Text style={styles.statusBadgeText}>✓ Completed</Text>
              </View>
            ) : (
              <View style={styles.statusBadgePending}>
                <Text style={styles.statusBadgeText}>⏳ Pending</Text>
              </View>
            )}
          </View>
          
          <View style={[styles.statusItem, getZikrStatus('afternoon') === 'completed' && styles.statusCompleted]}>
            <Text style={styles.statusIcon}>☀️</Text>
            <Text style={styles.statusText}>Afternoon Zikr</Text>
            {getZikrStatus('afternoon') === 'completed' ? (
              <View style={styles.statusBadgeComplete}>
                <Text style={styles.statusBadgeText}>✓ Completed</Text>
              </View>
            ) : (
              <View style={styles.statusBadgePending}>
                <Text style={styles.statusBadgeText}>⏳ Pending</Text>
              </View>
            )}
          </View>
          
          <View style={[styles.statusItem, getZikrStatus('beforeSleep') === 'completed' && styles.statusCompleted]}>
            <Text style={styles.statusIcon}>🌙</Text>
            <Text style={styles.statusText}>Before Sleep Zikr</Text>
            {getZikrStatus('beforeSleep') === 'completed' ? (
              <View style={styles.statusBadgeComplete}>
                <Text style={styles.statusBadgeText}>✓ Completed</Text>
              </View>
            ) : (
              <View style={styles.statusBadgePending}>
                <Text style={styles.statusBadgeText}>⏳ Pending</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentDays.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No activity yet. Start your Zikr journey!</Text>
            <Text style={styles.emptySubText}>Complete a Zikr session to see your progress here.</Text>
          </View>
        ) : (
          recentDays.map((date) => {
            const dayStats = localStats[date];
            const completedCount = [
              dayStats.morning.completed,
              dayStats.afternoon.completed,
              dayStats.beforeSleep.completed
            ].filter(Boolean).length;
            
            const isToday = date === todayKey;
            
            return (
              <View key={date} style={[styles.activityItem, isToday && styles.todayActivity]}>
                <View style={styles.activityLeft}>
                  <Text style={[styles.activityDate, isToday && styles.todayText]}>
                    {isToday ? 'Today' : formatDate(date)}
                  </Text>
                  <Text style={styles.activityCount}>
                    {completedCount}/3 Zikr completed
                  </Text>
                </View>
                <View style={styles.activityIcons}>
                  <Text style={dayStats.morning.completed ? styles.completedIcon : styles.pendingIcon}>
                    {dayStats.morning.completed ? '✅' : '🌅'}
                  </Text>
                  <Text style={dayStats.afternoon.completed ? styles.completedIcon : styles.pendingIcon}>
                    {dayStats.afternoon.completed ? '✅' : '☀️'}
                  </Text>
                  <Text style={dayStats.beforeSleep.completed ? styles.completedIcon : styles.pendingIcon}>
                    {dayStats.beforeSleep.completed ? '✅' : '🌙'}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Tips for Consistency</Text>
        <Text style={styles.tipText}>• Morning Zikr after Fajr prayer</Text>
        <Text style={styles.tipText}>• Afternoon Zikr after Asr prayer</Text>
        <Text style={styles.tipText}>• Before Sleep Zikr right before bed</Text>
        <Text style={styles.tipText}>• Complete all duas to save your progress</Text>
        <Text style={styles.tipText}>• Pull down to refresh stats</Text>
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
  header: {
    backgroundColor: '#2c3e50',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ecf0f1',
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginTop: -20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 100,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  statusContainer: {
    gap: 12,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  statusCompleted: {
    backgroundColor: '#d4edda',
    borderColor: '#27ae60',
  },
  statusIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statusText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  statusBadgeComplete: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgePending: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  todayActivity: {
    backgroundColor: '#e8f4f8',
    marginHorizontal: -8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  activityLeft: {
    flex: 1,
  },
  activityDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  todayText: {
    color: '#3498db',
  },
  activityCount: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  activityIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  completedIcon: {
    fontSize: 20,
  },
  pendingIcon: {
    fontSize: 20,
    opacity: 0.3,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#95a5a6',
    fontSize: 14,
    textAlign: 'center',
  },
  emptySubText: {
    color: '#bdc3c7',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  tipsSection: {
    backgroundColor: '#e8f4f8',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default StatsScreen;