import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Settings as AllSettings } from '../screens/Settings';
import { Image } from 'react-native';
import Logo from '../assets/Logo';

const Settings = createNativeStackNavigator();

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
          headerRight: () => <Image source={{ uri: Logo }} width={64} style={{ aspectRatio: 1 }} />
        }}
      />
    </Settings.Navigator>
  )
}