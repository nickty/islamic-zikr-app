import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ZikrProvider } from './context/ZikrContext';
import HomeScreen from './screens/HomeScreen';
import ZikrScreen from './screens/ZikrScreen';
import AdminDashboard from './screens/AdminDashboard';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Zikr" 
        component={ZikrScreen} 
        options={{ 
          headerTitle: 'Zikr Session',
          headerStyle: {
            backgroundColor: '#2c3e50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ZikrProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#3498db',
            tabBarInactiveTintColor: '#7f8c8d',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 1,
              borderTopColor: '#ecf0f1',
            },
            headerStyle: {
              backgroundColor: '#2c3e50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarIcon: ({ focused, color, size }) => {
              let emoji;
              if (route.name === 'Zikr') {
                emoji = focused ? '📿' : '📿';
              } else if (route.name === 'Admin') {
                emoji = focused ? '⚙️' : '⚙️';
              }
              return <Text style={{ fontSize: size, color }}>{emoji}</Text>;
            },
          })}
        >
          <Tab.Screen 
            name="Zikr" 
            component={HomeStack} 
            options={{ 
              headerShown: false,
              title: 'Home'
            }} 
          />
          <Tab.Screen 
            name="Admin" 
            component={AdminDashboard} 
            options={{
              title: 'Admin'
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ZikrProvider>
  );
}