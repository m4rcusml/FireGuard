import { Image, StyleSheet, View } from 'react-native';
import { Background } from '../../components/Background';
import Logo from '../../assets/Logo';
import { useState } from 'react';
import { SignUp } from './SignUp';
import { Login } from './Login';
import { StatusBar } from 'expo-status-bar';


export function Authentication() {

    const [isNewUser, setIsNewUser] = useState(false);

    function handleIsNewUser() {
        setIsNewUser(prev => !prev);
    }

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={'transparent'}
            />
            <Background >
                <View style={styles.logoCard}>
                    <Image
                        source={{ uri: Logo }}
                        style={styles.logoPicture}
                    />
                </View>

                {isNewUser ? <SignUp handleIsNewUser={handleIsNewUser} /> : <Login handleIsNewUser={handleIsNewUser} />}
            </Background>
        </>
    )
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