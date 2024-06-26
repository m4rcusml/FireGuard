import Realm from 'realm';
import { StyleSheet, Text, View } from 'react-native';
import { Background } from '../../components/Background';
import { ContentCard } from '../../components/ContentCard';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FirstAidInstructionsRoutesType } from '../../routes/home.routes';
import { useQuery } from '@realm/react';
import { InstructionSchema } from '../../contexts/InstructionsSchema';

export function InstructionDetails() {
  const route = useRoute<RouteProp<FirstAidInstructionsRoutesType, 'details'>>();
  const { instruction } = route.params;

  const instructionSearch = useQuery(InstructionSchema).filtered('_id == $0', new Realm.BSON.ObjectId(instruction) )

  return (
    <Background usePaddingTop solidColor='#ddd'>
      <ContentCard style={{ gap: 20 }}>
        <View style={[styles.content, { alignSelf: 'center' }]}>
          <Text style={[styles.text, { color: 'red', fontWeight: '500', fontSize: 18 }]}>{instructionSearch[0].title}</Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.text]}>
            {instructionSearch[0].subscription}
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