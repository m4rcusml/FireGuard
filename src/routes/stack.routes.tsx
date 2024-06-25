import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabRoutes } from './tab.routes';
import { ResetPassword } from '../screens/Auth/ForgotPassword/ResetPassword';

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='main'
        component={TabRoutes}
      />
      <Stack.Screen name="resetpassword" component={ResetPassword} />

    </Stack.Navigator>
  )
}