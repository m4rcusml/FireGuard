import { Image, StyleSheet, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { ContentCard } from '../../components/ContentCard';
import { SettingButton } from '../../components/SettingButton';
import { PersonSimple, Translate } from 'phosphor-react-native';

export function Settings() {
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
        <SettingButton title='Acessibilidade' icon={() => <PersonSimple />} showBorderBottom />
        <SettingButton title='Línguas' icon={() => <Translate />} showBorderBottom />
        <SettingButton title='Ajuda' showBorderBottom />
        <SettingButton title='Sair' />
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
    color: 'white',
    fontSize: 20,
    flex: 1,
  }
});