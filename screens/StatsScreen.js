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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Zikr Status</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusItem, getZikrStatus('morning') === 'completed' && styles.statusCompleted]}>
            <Text style={styles.statusIcon}>🌅</Text>
            <Text style={styles.statusText}>Morning</Text>
            {getZikrStatus('morning') === 'completed' ? (
              <View style={styles.statusBadgeComplete}>
                <Text style={styles.statusBadgeText}>✓ Done</Text>
              </View>
            ) : (
              <View style={styles.statusBadgePending}>
                <Text style={styles.statusBadgeText}>⏳ Pending</Text>
              </View>
            )}
          </View>
          
          <View style={[styles.statusItem, getZikrStatus('afternoon') === 'completed' && styles.statusCompleted]}>
            <Text style={styles.statusIcon}>☀️</Text>
            <Text style={styles.statusText}>Afternoon</Text>
            {getZikrStatus('afternoon') === 'completed' ? (
              <View style={styles.statusBadgeComplete}>
                <Text style={styles.statusBadgeText}>✓ Done</Text>
              </View>
            ) : (
              <View style={styles.statusBadgePending}>
                <Text style={styles.statusBadgeText}>⏳ Pending</Text>
              </View>
            )}
          </View>
          
          <View style={[styles.statusItem, getZikrStatus('beforeSleep') === 'completed' && styles.statusCompleted]}>
            <Text style={styles.statusIcon}>🌙</Text>
            <Text style={styles.statusText}>Before Sleep</Text>
            {getZikrStatus('beforeSleep') === 'completed' ? (
              <View style={styles.statusBadgeComplete}>
                <Text style={styles.statusBadgeText}>✓ Done</Text>
              </View>
            ) : (
              <View style={styles.statusBadgePending}>
                <Text style={styles.statusBadgeText}>⏳ Pending</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentDays.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No activity yet. Start your Zikr journey!</Text>
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
                    {completedCount}/3 completed
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#ecf0f1',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    marginTop: -16,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 90,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginTop: 2,
  },
  section: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  statusContainer: {
    gap: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  statusCompleted: {
    backgroundColor: '#d4edda',
    borderColor: '#27ae60',
  },
  statusIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  statusText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
  },
  statusBadgeComplete: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16,
  },
  statusBadgePending: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  todayActivity: {
    backgroundColor: '#e8f4f8',
    marginHorizontal: -8,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  activityLeft: {
    flex: 1,
  },
  activityDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2c3e50',
  },
  todayText: {
    color: '#3498db',
  },
  activityCount: {
    fontSize: 11,
    color: '#7f8c8d',
    marginTop: 1,
  },
  activityIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  completedIcon: {
    fontSize: 18,
  },
  pendingIcon: {
    fontSize: 18,
    opacity: 0.3,
  },
  emptyState: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: '#95a5a6',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default StatsScreen;