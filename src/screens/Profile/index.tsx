import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { IdentificationCard, MagnifyingGlass, Password } from 'phosphor-react-native';
import { SettingButton } from '../../components/SettingButton';
import { ContentCard } from '../../components/ContentCard';
import { Background } from '../../components/Background';
import Logo from '../../assets/Logo.svg';
import { ProfileRoutesType } from '../../routes/profile.routes';

export function Profile() {
  const { navigate } = useNavigation<NavigationProp<ProfileRoutesType>>();

  return (
    <Background style={{ gap: 35 }}>
      <View style={styles.header}>
        <Logo width={64} style={{ aspectRatio: 1}} />
      </View>

      <View style={styles.searchBar}>
        <MagnifyingGlass color='#aaa' size={20} />
        <TextInput
          placeholder='Pesquisar'
          placeholderTextColor='#aaa'
          style={{ color: 'white' }}
        />
      </View>

      <ContentCard>
        <SettingButton
          title='Informações do usuário'
          showBorderBottom
          icon={() => <IdentificationCard />}
          onPress={() => navigate('editProfile')}
        />
        <SettingButton
          title='Senha'
          showBorderBottom
          icon={() => <Password />}
        />
      </ContentCard>
    </Background>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16
  },
  headerTitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20
  },
  searchBar: {
    backgroundColor: '#0007',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 30,
    gap: 10
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