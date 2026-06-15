import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ZikrProvider } from './context/ZikrContext';
import HomeScreen from './screens/HomeScreen';
import ZikrScreen from './screens/ZikrScreen';
import StatsScreen from './screens/StatsScreen';

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
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#3498db',
            tabBarInactiveTintColor: '#7f8c8d',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 1,
              borderTopColor: '#ecf0f1',
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
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
              if (route.name === 'Home') {
                emoji = focused ? '🏠' : '🏠';
              } else if (route.name === 'Stats') {
                emoji = focused ? '📊' : '📊';
              }
              return <Text style={{ fontSize: size, color }}>{emoji}</Text>;
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeStack} 
            options={{ 
              headerShown: false,
            }} 
          />
          <Tab.Screen 
            name="Stats" 
            component={StatsScreen} 
            options={{
              title: 'My Progress'
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ZikrProvider>
  );
}