import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUp } from '../screens/Auth/SignUp';
import { Login } from '../screens/Auth/LogIn';
import { Authentication } from '../screens/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { ForgotPassword } from '../screens/Auth/ForgotPassword';
import { ResetPassword } from '../screens/Auth/ForgotPassword/ResetPassword';

export type AuthRoutesType = {
  signup: undefined;
  login: undefined;
  authentication: { handleNewUser: () => void };
  forgotpassword: undefined;
  resetpassword: { token: string; tokenId: string };
}

const linking = {
  prefixes: ['https://fireguard.com', 'fireguard://'],
  config: {
    screens: {
      resetpassword: 'resetPassword/:token/:tokenId',
    },
  },
};

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
        <Auth.Screen
          name='forgotpassword'
          component={ForgotPassword}
        />
        <Auth.Screen
          name='resetpassword'
          component={ResetPassword}
        />

      </Auth.Navigator>
    </NavigationContainer>
  )
}