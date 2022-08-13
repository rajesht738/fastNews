import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/Home';
import Search from '../components/Search';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
   
     <Tab.Navigator>
    <Tab.Screen 
     options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
     name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
  
  )
}

export default TabNavigator