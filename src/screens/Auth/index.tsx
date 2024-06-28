import { Image, StyleSheet, View } from 'react-native';
import { Background } from '../../components/Background';
import { useState, createContext, useContext } from 'react';
import { SignUp } from './SignUp';
import { Login } from './LogIn';
import { StatusBar } from 'expo-status-bar';
import Logo from '../../assets/Logo.svg';

const AuthContext = createContext({
  isNewUser: false,
  setIsNewUser: (value: boolean) => {},
});

export function Authentication() {
  const [isNewUser, setIsNewUser] = useState(false);

  function handleIsNewUser() {
    setIsNewUser(prev => !prev);
  }

  return (
    <AuthContext.Provider value={{ isNewUser, setIsNewUser }}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Background>
        <View style={styles.logoCard}>
          <Logo style={styles.logoPicture} />
        </View>
        {isNewUser ? <SignUp handleIsNewUser={handleIsNewUser} /> : <Login handleIsNewUser={handleIsNewUser} />}
      </Background>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  logoCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPicture: {
    aspectRatio: 1,
    borderRadius: 80,
    width: 210,
  },
});

export function useAuth() {
  return useContext(AuthContext);
}
