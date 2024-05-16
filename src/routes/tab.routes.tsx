import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsRoutes } from './settings.routes';
import { Gear } from 'phosphor-react-native';

const Tab = createBottomTabNavigator();

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
        }
      }}
    >
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