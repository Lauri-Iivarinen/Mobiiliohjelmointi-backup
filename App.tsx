import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ExchangeRate from './components/ExhcangeRate';
import GhFetch from './components/GhFetch';
import MapExample from './components/MapExample';
import ReseptiFetch from './components/ReseptiFetch';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Calculator from './components/Calculator';
import Home from './components/Home';
import ShoppingList from './components/ShoppingList';
import Testing from './components/Testing';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import CalcHistory from './components/CalcHistory';

//Project used in class + tasks given in class

export default function App() {

  const Tab = createBottomTabNavigator()
  const Stack = createNativeStackNavigator()

  return (
    <View>

    <MapExample></MapExample>

    {/*
    <NavigationContainer>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Tasklist') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Home}></Tab.Screen>
        <Tab.Screen name="Tasklist" component={Testing}></Tab.Screen>
      </Tab.Navigator>
      
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator}></Stack.Screen>
        <Stack.Screen name="CalcHistory" component={CalcHistory}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
