import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Gear, House } from 'phosphor-react-native';

import { Home } from '../screens/Home';
import { SettingsRoutes } from './settings.routes';
import { Pressable } from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarButton = (props: BottomTabBarButtonProps) => {
  return (
    <Pressable onPress={props.onPress}>
      {}
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
        component={Home}
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
    </Tab.Navigator>
  )
}