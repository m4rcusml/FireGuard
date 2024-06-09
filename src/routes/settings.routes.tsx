import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Languages } from '../screens/Settings/options/Languages';
import { Settings as AllSettings } from '../screens/Settings';

import Logo from '../assets/Logo.svg';

export type SettingsRoutesType = {
  allSettings: undefined;
  languages: undefined;
}

const Settings = createNativeStackNavigator<SettingsRoutesType>();

export function SettingsRoutes() {
  return (
    <Settings.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: 'white'
      }}
    >
      <Settings.Screen
        name='allSettings'
        component={AllSettings}
        options={{
          title: 'Configurações',
          headerRight: () => <Logo width={64} style={{ aspectRatio: 1 }} />
        }}
      />
      <Settings.Screen
        name='languages'
        component={Languages}
        options={{ title: 'Idiomas' }}
      />
    </Settings.Navigator>
  )
}