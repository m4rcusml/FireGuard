import { SafeAreaView } from 'react-native-safe-area-context';
import { Background as TopCard } from '../../components/Background';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Logo from '../../assets/Logo.svg';
import { FireExtinguisher, FirstAidKit, ShieldStar, WifiHigh } from 'phosphor-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRoutesType } from '../../routes/home.routes';
import { useObject, useQuery, useRealm, useUser } from '@realm/react';
import { UserSchema } from '../../contexts/UserSchema';

export function Home() {
  const { navigate } = useNavigation<NavigationProp<HomeRoutesType>>();
  const realm = useRealm();
  const user = useUser();
  console.log(user.id);

  
  const userProfile = useQuery(UserSchema).filtered('userId == $0', user.id);
  console.log(userProfile[0]);

  return (
    <SafeAreaView style={styles.container}>
      <TopCard style={styles.topCard} cleanStyle>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Logo
            width={90}
            style={{ aspectRatio: 1 }}
          />

          <View style={styles.profileCard}>
            <Image
              width={38}
              source={{ uri: userProfile[0]?.imageProfile}}
              style={{ aspectRatio: 1, borderRadius: 64 }}
            />
            <Text style={styles.profileName} numberOfLines={2}>
              Bem vindo(a), <Text style={{ color: 'black', fontWeight: '500' }}>{userProfile[0]?.name}</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.topCardAlert}>
          Você será notificado em casos de emergência
        </Text>
      </TopCard>

      <TouchableOpacity activeOpacity={0.6} style={styles.firstAidInstructionsButton} onPress={() => navigate('firstAidInstructions')}>
        <FirstAidKit color='red' weight='fill' size={40} />
        <Text style={[styles.generalText, { color: 'red', fontWeight: 600, fontSize: 20, flex: 1 }]}>
          Instruções de primeiros socorros
        </Text>
      </TouchableOpacity>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.action} activeOpacity={0.4} onPress={() => navigate('sensors')}>
          <WifiHigh color='white' size={32} />
          <Text style={styles.actionName}>Visualizar sensores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} activeOpacity={0.4}>
          <FireExtinguisher color='white' size={32} />
          <Text style={styles.actionName}>Visualizar extintor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} activeOpacity={0.4}>
          <ShieldStar color='white' size={32} />
          <Text style={styles.actionName}>Equipamento de segurança</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 20
  },
  generalText: {
    // fontFamily: ''
  },
  topCard: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
  },
  profileCard: {
    marginRight: 10,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
    flex: 1,
    gap: 5,
  },
  profileName: {
    color: '#A5A5A5',
    fontSize: 14,
    flex: 1
  },
  topCardAlert: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 18
  },
  firstAidInstructionsButton: {
    backgroundColor: '#BABAC24D',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  actionsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10
  },
  action: {
    flex: 1,
    gap: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#FFC700',
  },
  actionName: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  }
});