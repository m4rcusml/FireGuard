import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Background } from '../../../../components/Background';
import { ContentCard } from '../../../../components/ContentCard';
import { CaretRight } from 'phosphor-react-native';

export function Languages() {
  return (
    <Background usePaddingTop>
      <ContentCard>
        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.4}>
          <View style={styles.hr} />

          <View style={styles.topButton}>
            <Text style={styles.title}>Idioma do app</Text>
            <View style={styles.topButton}>
              <Text style={styles.subtitle}>Português (Brasil)</Text>
              <CaretRight color='#666' size={16} />
            </View>
          </View>
          <Text style={styles.subtitle}>Selecione seu idioma para o app</Text>

          <View style={styles.hr} />
        </TouchableOpacity>
      </ContentCard>
    </Background>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 5,
  },
  hr: {
    backgroundColor: '#0006',
    alignSelf: 'stretch',
    height: 0.6,
  },
  topButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: '500',
    fontSize: 16
  },
  subtitle: {
    color: '#666',
  }
});