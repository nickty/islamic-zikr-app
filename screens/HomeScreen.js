import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useZikr } from '../context/ZikrContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { zikrData, loading } = useZikr();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading Zikr...</Text>
      </View>
    );
  }

  if (!zikrData) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load data</Text>
      </View>
    );
  }

  const zikrTypes = [
    { key: 'morning', ...zikrData.morning },
    { key: 'afternoon', ...zikrData.afternoon },
    { key: 'beforeSleep', ...zikrData.beforeSleep }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📿 Islamic Zikr</Text>
        <Text style={styles.headerSubtitle}>Remember Allah</Text>
      </View>
      
      <FlatList
        data={zikrTypes}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Zikr', { 
              type: item.key, 
              title: item.title, 
              duas: item.duas 
            })}
            activeOpacity={0.8}
          >
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardSubtitle}>
                📖 {item.duas?.length || 0} Duas
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2c3e50',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    marginTop: 8,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
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
});

export default HomeScreen;