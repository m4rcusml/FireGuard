import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from './stack.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  return (
    <NavigationContainer>
      {/* <AuthRoutes /> */}
      <StackRoutes />
    </NavigationContainer>
  )
}