import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@zikr_data';

const defaultZikrData = {
  morning: {
    title: 'Morning Zikr',
    icon: '🌅',
    duas: [
      { 
        id: '1', 
        arabic: 'سُبْحَانَ اللَّهِ', 
        transliteration: 'SubhanAllah', 
        translation: 'Glory be to Allah', 
        repetitions: 33 
      },
      { 
        id: '2', 
        arabic: 'الْحَمْدُ لِلَّهِ', 
        transliteration: 'Alhamdulillah', 
        translation: 'Praise be to Allah', 
        repetitions: 33 
      },
      { 
        id: '3', 
        arabic: 'اللَّهُ أَكْبَرُ', 
        transliteration: 'Allahu Akbar', 
        translation: 'Allah is the Greatest', 
        repetitions: 34 
      },
    ]
  },
  afternoon: {
    title: 'Afternoon Zikr',
    icon: '☀️',
    duas: [
      { 
        id: '4', 
        arabic: 'أَسْتَغْفِرُ اللَّهَ', 
        transliteration: 'Astaghfirullah', 
        translation: 'I seek forgiveness from Allah', 
        repetitions: 3 
      },
      { 
        id: '5', 
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', 
        transliteration: 'La ilaha illallah', 
        translation: 'There is no god but Allah', 
        repetitions: 1 
      },
    ]
  },
  beforeSleep: {
    title: 'Before Sleep Zikr',
    icon: '🌙',
    duas: [
      { 
        id: '6', 
        arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', 
        transliteration: 'Bismikallahumma amootu wa ahya', 
        translation: 'With Your name, O Allah, I die and live', 
        repetitions: 1 
      },
      { 
        id: '7', 
        arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ', 
        transliteration: 'Allahumma qini adhabaka yawma tab\'athu ibadaka', 
        translation: 'O Allah, protect me from Your punishment on the day You resurrect Your servants', 
        repetitions: 3 
      },
    ]
  }
};

export const loadZikrData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    await saveZikrData(defaultZikrData);
    return defaultZikrData;
  } catch (e) {
    console.error('Error loading data:', e);
    return defaultZikrData;
  }
};

export const saveZikrData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error('Error saving data:', e);
    return false;
  }
};