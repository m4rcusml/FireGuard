import { Image, StyleSheet, Text, View } from 'react-native';
import { Background } from '../../../components/Background';
import { ContentCard } from '../../../components/ContentCard';

export function SignUp() {


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
        <Text>Banana</Text>
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