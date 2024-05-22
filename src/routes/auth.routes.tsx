import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUp } from '../screens/Auth/SignUp';
import { Login } from '../screens/Auth/LogIn';
import { Authentication } from '../screens/Auth';
import { NavigationContainer } from '@react-navigation/native';

export type AuthRoutesType = {
  signup: undefined;
  login: undefined;
  authentication: { handleNewUser: () => void };
}

const Auth = createNativeStackNavigator<AuthRoutesType>();

export function AuthRoutes() {
  return (
    <NavigationContainer>
      <Auth.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Auth.Screen
          name='authentication'
          component={Authentication}
        />

      </Auth.Navigator>
    </NavigationContainer>
  )
}