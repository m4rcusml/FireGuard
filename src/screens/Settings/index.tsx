import { Image, StyleSheet, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { ContentCard } from '../../components/ContentCard';
import { SettingButton } from '../../components/SettingButton';
import { PersonArmsSpread, Question, SignOut, Translate } from 'phosphor-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SettingsRoutesType } from '../../routes/settings.routes';

export function Settings() {
  const { navigate } = useNavigation<NavigationProp<SettingsRoutesType>>();
  
  return (
    <Background style={{ gap: 35 }} usePaddingTop>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://github.com/m4rcusml.png' }}
          style={styles.profilePicture}
        />
        <Text style={styles.profileName}>
          {'Brigadista qualquer'}
        </Text>
      </View>
      
      <ContentCard>
        <SettingButton
          title='Acessibilidade'
          showBorderBottom
          icon={() => <PersonArmsSpread />}
        />
        <SettingButton
          title='Idiomas'
          showBorderBottom
          icon={() => <Translate />}
          onPress={() => navigate('languages')}
        />
        <SettingButton
          title='Ajuda'
          showBorderBottom
          icon={() => <Question />}
        />
        <SettingButton
          title='Sair'
          icon={() => <SignOut />}
        />
      </ContentCard>
    </Background>
  )
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    marginHorizontal: '10%',
    gap: 20
  },
  profilePicture: {
    aspectRatio: 1,
    borderRadius: 80,
    width: 80,
  },
  profileName: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    fontWeight: '500',
    color: 'white',
    fontSize: 20,
    flex: 1,
  }
});