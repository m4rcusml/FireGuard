import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from './stack.routes';
import { StatusBar } from 'expo-status-bar';
import { UserSchema } from '../contexts/UserSchema';
import { useQuery, useUser } from '@realm/react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();

  const userProfile = useQuery(UserSchema).filtered('userId == $0', user.id);

  useEffect(() => {
    if (userProfile) {
      setIsLoading(false);
    }
  }, [userProfile]);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  }

  return (
    <NavigationContainer >
      <StatusBar style='dark' />
      <StackRoutes />
    </NavigationContainer>
  );
}
