import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfile } from '../screens/EditProfile';
import { Profile } from '../screens/Profile';

export type ProfileRoutesType = {
    profile: undefined,
    editProfile: undefined,
}

const stackProfile = createNativeStackNavigator<ProfileRoutesType>();

export function ProfileRoutes() {
    return (
        <stackProfile.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTintColor: 'white'
            }}
        >
            <stackProfile.Screen
                name='profile'
                component={Profile} 
                options={{ title: 'Perfil' }}
            />
            <stackProfile.Screen
                name='editProfile'
                component={EditProfile}
                options={{ title: 'Editar Perfil'}}
            />
        </stackProfile.Navigator>
    )
}