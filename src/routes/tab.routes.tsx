import { Image, Pressable } from 'react-native';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Bell, ChatsCircle, Gear, House, UserCircle } from 'phosphor-react-native';

import { SettingsRoutes } from './settings.routes';
import { HomeRoutes } from './home.routes';
import { Profile } from '../screens/Profile';
import Logo from '../assets/Logo';
import { NotificationsRoutes } from './notifications.routes';
import { Chat } from '../screens/Chat';

const Tab = createBottomTabNavigator();

const TabBarButton = (props: BottomTabBarButtonProps) => {
  // isso aqui é aquele botão personalizado do figma, ainda to fazendo, pfv ignore
  return (
    <Pressable onPress={props.onPress}>
      { }
    </Pressable>
  )
}

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#F30A0A',
          borderColor: '#F30A0A',
          height: 55
        },
        // tabBarButton: props => <TabBarButton {...props} />
      }}
    >
      <Tab.Screen
        name='home'
        component={HomeRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <House color={color} size={size} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />
      <Tab.Screen
        name='settings'
        component={SettingsRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Gear color={color} size={size} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />
      <Tab.Screen
        name='chat'
        component={Chat}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <ChatsCircle color={color} size={size} weight={focused ? 'fill' : 'regular'} />
          ),
          headerShown: true,
          headerTransparent: true,
          headerTintColor: 'white'
        }}
      />
      <Tab.Screen
        name='notifications'
        component={NotificationsRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Bell color={color} size={size} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />
      <Tab.Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <UserCircle color={color} size={size} weight={focused ? 'fill' : 'regular'} />
          )
        }}
      />
    </Tab.Navigator>
  )
}