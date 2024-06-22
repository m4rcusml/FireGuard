import { ArrowLeft, Eye, PlusCircle } from 'phosphor-react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingButton } from '../../components/SettingButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { EquipementsRoutesType } from '../../routes/home.routes';



export function Equipements() {
  const { top } = useSafeAreaInsets();
  const { navigate } = useNavigation<NavigationProp<EquipementsRoutesType>>();

  return (
    <View style={styles.screenContainer}>
      <View style={[styles.headerContainer, { paddingTop: top + 15, paddingBottom: 60 }]}>
        <View style={styles.headerTopContainer}>
          <Pressable
            children={<ArrowLeft color='white' weight='bold' />}
          />

          <View style={{ width: 24 }} />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 30, alignItems: 'center', gap: 10, }}>
        <SettingButton
          icon={() => (
            <View style={{
              backgroundColor: '#F30A0A',
              borderRadius: 50,
              padding: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <PlusCircle weight='regular' color='#000' size={24} />
            </View>
          )}
          title='Adicionar Equipamento'
          showBorderBottom
          onPress={() => navigate('addequipements')}
        />
        <SettingButton
          icon={() => (
            <Eye weight='regular' color='#000' size={24} />
          )}
          title='Visualizar equipamentos'
          showBorderBottom
        />
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
  addButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F30A0A',
    borderRadius: 35,
    gap: 10,
    maxWidth: 220,
    justifyContent: 'space-around'
  },
  addButtonIconContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    padding: 15,
  },
  addButtonText: {
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase',
    marginLeft: 10,

  },
  modalView: {
    flex: 1,
    backgroundColor: '#FFC700',
    gap: 15,
    paddingTop: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});