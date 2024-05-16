import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabRoutes } from './tab.routes';

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
    </Stack.Navigator>
  )
}