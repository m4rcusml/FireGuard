import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Sensor = ({ isActive = false, name }: { isActive?: boolean, name: string }) => {
  return (
    <View style={styles.sensorItem}>
      <Text children={name} />
      <View style={[styles.sensorState, { backgroundColor: isActive ? '#0c0' : 'red'}]} />
    </View>
  )
}

export function Sensors() {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  
  return (
    <View style={styles.screenContainer}>
      <View style={[styles.headerContainer, { paddingTop: top + 15 }]}>
        <View style={styles.headerTopContainer}>
          <Pressable
            onPress={() => goBack()}
            children={<ArrowLeft color='white' weight='bold' />}
          />

          <Text style={styles.headerTitle}>Monitoramento dos sensores</Text>
          
          <View  style={{ width: 24 }}/>
        </View>

        <Text style={styles.headerSubtitle}>Visualize os sensores</Text>
      </View>

      <View style={styles.sensorsList}>
        <Sensor name='S1' />
        <Sensor name='S2' />
        <Sensor name='S3' isActive />
        <Sensor name='S4' isActive />
        <Sensor name='S5' isActive />
        <Sensor name='S6' />
        <Sensor name='S7' isActive />
        <Sensor name='S8' isActive />
        <Sensor name='S9' />
        <Sensor name='S10' isActive />
        <Sensor name='S11' isActive />
        <Sensor name='S12' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#FFC700',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 18,
    paddingBottom: 20,
    gap: 15,
    elevation: 5
  },
  headerTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  headerTitle: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  headerSubtitle: {
    alignSelf: 'center',
    color: 'white',
  },
  sensorsList: {
    backgroundColor: '#0002',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 'auto',
    width: '80%',
    minHeight: '45%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sensorItem: {
    flex: 1,
    height: 90,
    flexBasis: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  sensorState: {
    width: 24,
    height: 24,
    borderRadius: 24,
  }
});