import { StyleSheet, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { ContentCard } from '../../components/ContentCard';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FirstAidInstructionsRoutesType } from '../../routes/home.routes';

export function InstructionDetails() {
  const route = useRoute<RouteProp<FirstAidInstructionsRoutesType, 'details'>>();
  const { instruction } = route.params;
  
  return (
    <Background usePaddingTop solidColor='#ddd'>
      <ContentCard style={{ gap: 20 }}>
        <View style={[styles.content, { alignSelf: 'center' }]}>
          <Text style={[styles.text, { color: 'red', fontWeight: '500', fontSize: 18 }]}>{instruction}</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={[styles.text]}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur consequatur amet ullam necessitatibus culpa,
            commodi aut optio ab doloribus pariatur quis quo ad provident facere facilis non recusandae dolorem expedita.
          </Text>
        </View>
      </ContentCard>
    </Background>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#ddd',
    padding: 14,
    borderRadius: 15
  },
  text: {
    fontSize: 16,
    textAlign: 'justify'
  }
});