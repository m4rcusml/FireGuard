import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUp } from '../screens/Auth/SignUp';
import { Login } from '../screens/Auth/Login';

export type AuthRoutesType = {
  signup: undefined;
  login: undefined;
}

const Auth = createNativeStackNavigator<AuthRoutesType>();

export function AuthRoutes() {
  return (
    <Auth.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen
        name='login'
        component={Login}
      />
      <Auth.Screen
        name='signup'
        component={SignUp}
      />
    </Auth.Navigator>
  )
}