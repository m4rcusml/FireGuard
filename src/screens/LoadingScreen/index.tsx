import { ActivityIndicator, View } from 'react-native';

export function LoadingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#FF0000" />
        </View>
    )
}