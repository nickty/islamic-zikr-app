import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { useZikr } from '../context/ZikrContext';

const AdminDashboard = () => {
  const { zikrData, updateZikr, refreshData } = useZikr();
  const [selectedType, setSelectedType] = useState('morning');
  const [editingDua, setEditingDua] = useState(null);

  if (!zikrData) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const currentData = zikrData[selectedType];
  const [form, setForm] = useState({
    arabic: '',
    transliteration: '',
    translation: '',
    repetitions: '1',
  });

  const addOrUpdateDua = () => {
    if (!form.arabic || !form.translation) {
      Alert.alert('Error', 'Arabic and Translation are required');
      return;
    }

    const newDua = {
      id: editingDua ? editingDua.id : Date.now().toString(),
      arabic: form.arabic,
      transliteration: form.transliteration || form.arabic,
      translation: form.translation,
      repetitions: parseInt(form.repetitions) || 1,
    };

    let updatedDuas;
    if (editingDua) {
      updatedDuas = currentData.duas.map((d) =>
        d.id === editingDua.id ? newDua : d
      );
    } else {
      updatedDuas = [...currentData.duas, newDua];
    }

    updateZikr(selectedType, { ...currentData, duas: updatedDuas });
    resetForm();
    Alert.alert('Success', `Dua ${editingDua ? 'updated' : 'added'} successfully`);
  };

  const deleteDua = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this Dua?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedDuas = currentData.duas.filter((d) => d.id !== id);
            updateZikr(selectedType, { ...currentData, duas: updatedDuas });
            if (editingDua?.id === id) resetForm();
            Alert.alert('Success', 'Dua deleted successfully');
          },
        },
      ]
    );
  };

  const editDua = (dua) => {
    setEditingDua(dua);
    setForm({
      arabic: dua.arabic,
      transliteration: dua.transliteration || '',
      translation: dua.translation,
      repetitions: dua.repetitions.toString(),
    });
  };

  const resetForm = () => {
    setForm({ arabic: '', transliteration: '', translation: '', repetitions: '1' });
    setEditingDua(null);
  };

  const updateZikrInfo = (field, value) => {
    updateZikr(selectedType, { ...currentData, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📝 Admin Dashboard</Text>

      <View style={styles.typeSelector}>
        {['morning', 'afternoon', 'beforeSleep'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.typeButton, selectedType === type && styles.typeButtonActive]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={[styles.typeButtonText, selectedType === type && styles.typeButtonTextActive]}>
              {zikrData[type].icon} {zikrData[type].title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Edit Zikr Info</Text>
        <TextInput
          style={styles.input}
          value={currentData.title}
          onChangeText={(text) => updateZikrInfo('title', text)}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          value={currentData.icon}
          onChangeText={(text) => updateZikrInfo('icon', text)}
          placeholder="Icon (emoji)"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {editingDua ? '✏️ Edit Dua' : '➕ Add New Dua'}
        </Text>
        <TextInput
          style={[styles.input, styles.arabicInput]}
          value={form.arabic}
          onChangeText={(text) => setForm({ ...form, arabic: text })}
          placeholder="Arabic Text *"
          textAlign="right"
        />
        <TextInput
          style={styles.input}
          value={form.transliteration}
          onChangeText={(text) => setForm({ ...form, transliteration: text })}
          placeholder="Transliteration (optional)"
        />
        <TextInput
          style={styles.input}
          value={form.translation}
          onChangeText={(text) => setForm({ ...form, translation: text })}
          placeholder="Translation *"
          multiline
        />
        <TextInput
          style={styles.input}
          value={form.repetitions}
          onChangeText={(text) => setForm({ ...form, repetitions: text })}
          placeholder="Repetitions"
          keyboardType="numeric"
        />
        
        <View style={styles.formButtons}>
          <TouchableOpacity style={styles.addButton} onPress={addOrUpdateDua}>
            <Text style={styles.buttonText}>{editingDua ? 'Update' : 'Add'} Dua</Text>
          </TouchableOpacity>
          {editingDua && (
            <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
              <Text style={styles.buttonText}>Cancel Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          📖 Current Duas ({currentData.duas.length})
        </Text>
        <FlatList
          data={currentData.duas}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.duaItem}>
              <View style={styles.duaInfo}>
                <Text style={styles.duaNumber}>{index + 1}.</Text>
                <View style={styles.duaContent}>
                  <Text style={styles.duaArabic} numberOfLines={1}>
                    {item.arabic}
                  </Text>
                  <Text style={styles.duaTranslation} numberOfLines={1}>
                    {item.translation} ({item.repetitions}x)
                  </Text>
                </View>
              </View>
              <View style={styles.duaActions}>
                <TouchableOpacity onPress={() => editDua(item)} style={styles.actionButton}>
                  <Text style={styles.actionText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteDua(item.id)} style={styles.actionButton}>
                  <Text style={styles.actionText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No duas added yet. Add your first dua above!</Text>
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#2c3e50',
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#3498db',
  },
  typeButtonText: {
    fontSize: 12,
    color: '#2c3e50',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  arabicInput: {
    fontSize: 20,
    textAlign: 'right',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  duaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  duaInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  duaNumber: {
    width: 30,
    fontSize: 14,
    color: '#7f8c8d',
  },
  duaContent: {
    flex: 1,
  },
  duaArabic: {
    fontSize: 14,
    color: '#2c3e50',
  },
  duaTranslation: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  duaActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  actionText: {
    fontSize: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#95a5a6',
    paddingVertical: 20,
  },
});

export default AdminDashboard;