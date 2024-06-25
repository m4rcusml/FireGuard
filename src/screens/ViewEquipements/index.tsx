import Realm from 'realm';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bed, FirstAid, FirstAidKit, PlusCircle } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { EquipementsRoutesType } from '../../routes/home.routes';
import { SettingButton } from '../../components/SettingButton';
import Hose from '../../assets/hose.svg'

export function ViewEquipments() {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation<NavigationProp<EquipementsRoutesType>>();

  return (
    <View style={styles.screenContainer}>
      <View style={[styles.headerContainer, { paddingTop: top + 15, paddingBottom: 60 }]}>
        <Text style={styles.headerTitle}>Visualizar Equipamentos</Text>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 30, alignItems: 'center', gap: 10 }}>
        <SettingButton
          icon={() => (
            <Bed weight='regular' color='#000' size={24} />
          )}
          title='Macas'
          showBorderBottom
          onPress={() => navigate('listEquipments', { name: 'Maca' })}
        />
        <SettingButton
          icon={() => (
            <Hose color='#000' width={28} height={28} />
          )}
          title='Mangueiras'
          showBorderBottom
          onPress={() => navigate('listEquipments', { name: 'Mangueira' })}
        />
        <SettingButton
          icon={() => (
            <FirstAidKit weight='regular' color='#000' size={24} />
          )}
          title='Kits de Primeiros Socorros'
          showBorderBottom
          onPress={() => navigate('listEquipments', { name: 'Kit de primeiros socorros' })}
        />
      </View>
    </View>
  );
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
    elevation: 5,
  },
  headerTitle: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: '#F30A0A',
    borderRadius: 50,
    padding: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
