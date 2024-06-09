import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Notifications as AllNotifications } from '../screens/Notifications';

import { Languages } from '../screens/Settings/options/Languages';
import { InApp } from '../screens/Notifications/more/InApp';

import Logo from '../assets/Logo.svg';

export type NotificationsRoutesType = {
  allNotifications: undefined;
  inApp: undefined;
}

const Notifications = createNativeStackNavigator<NotificationsRoutesType>();

export function NotificationsRoutes() {
  return (
    <Notifications.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: 'white'
      }}
    >
      <Notifications.Screen
        name='allNotifications'
        component={AllNotifications}
        options={{
          title: 'Notificações',
          headerRight: () => <Logo width={64} style={{ aspectRatio: 1 }} />
        }}
      />
      <Notifications.Screen
        name='inApp'
        component={InApp}
        options={{ title: 'Notificações no app' }}
      />
    </Notifications.Navigator>
  )
}