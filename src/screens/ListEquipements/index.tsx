import Realm from 'realm';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { EquipementsRoutesType } from '../../routes/home.routes';
import { useQuery } from '@realm/react';
import { Background } from '../../components/Background';
import { ContentCard } from '../../components/ContentCard';
import { EquipementsSchema } from '../../contexts/EquipementsSchema';
import { SettingButton } from '../../components/SettingButton';
import { Bed, FirstAidKit, IconProps, PlusCircle } from 'phosphor-react-native';
import Hose from '../../assets/hose.svg'
import { SvgProps } from 'react-native-svg';

export function ListEquipments() {
  const route = useRoute<RouteProp<EquipementsRoutesType, 'listEquipments'>>();
  const { name } = route.params;
  const { navigate } = useNavigation<NavigationProp<EquipementsRoutesType>>();

  const equipments = useQuery(EquipementsSchema).filtered('equipement == $0', name);

  type IconType = React.ComponentType<IconProps> | React.FC<SvgProps>;

  function getIconByName(name: string): IconType {
    switch (name) {
      case 'Maca':
        return Bed;
      case 'Mangueira':
        return Hose;
      case 'Kit de primeiros socorros':
        return FirstAidKit;
      default:
        return PlusCircle;
    }
  }

  return (
    <Background usePaddingTop solidColor='#FFC700'>
      <ContentCard style={{ gap: 20 }}>
        <FlatList
          data={equipments}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => {
            const IconComponent = getIconByName(item.equipement);
            return (
              <SettingButton
                icon={() =>
                  IconComponent === Hose ? (
                    <IconComponent width={24} height={24} />
                  ) : (
                    <IconComponent weight='regular' color='#000' size={24} />
                  )
                }
                title={item.name}
                showBorderBottom
                onPress={() => navigate('equipmentDetails', { id: item._id.toString() })}
              />
            );
          }}
          ListEmptyComponent={
            <View>
              <Text style={{ color: '#626262', fontSize: 14, textAlign: 'center' }} >Nenhum item foi adicionado ainda</Text>
            </View>
          }
        />
      </ContentCard>
    </Background >
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
