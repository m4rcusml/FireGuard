  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
  import { Authentication } from '../screens/Auth';
  import { ForgotPassword } from '../screens/Auth/ForgotPassword';
  import { ResetPassword } from '../screens/Auth/ForgotPassword/ResetPassword';

  export type AuthRoutesType = {
    signup: undefined;
    login: undefined;
    authentication: { handleNewUser: () => void };
    forgotpassword: undefined;
    resetpassword: { token: string; tokenId: string };
  }

  const Auth = createNativeStackNavigator<AuthRoutesType>();

  const linking: LinkingOptions<AuthRoutesType> = {
    prefixes: ['https://', 'fireguard://', 'com.fireguard://'],
    config: {
      screens: {
        authentication: 'authentication',
        forgotpassword: 'forgotpassword',
        resetpassword: 'resetPassword/:token/:tokenId',
      },
    },
  };

  export function AuthRoutes() {
    return (
      <NavigationContainer linking={linking}>
        <Auth.Navigator screenOptions={{ headerShown: false }}>
          <Auth.Screen name='authentication' component={Authentication} />
          <Auth.Screen name='forgotpassword' component={ForgotPassword} />
          <Auth.Screen name='resetpassword' component={ResetPassword} />
        </Auth.Navigator>
      </NavigationContainer>
    );
  }
