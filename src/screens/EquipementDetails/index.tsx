import Realm from 'realm';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { EquipementsRoutesType } from '../../routes/home.routes';
import { useQuery, useRealm } from '@realm/react';
import { useState, useEffect } from 'react';
import { ContentCard } from '../../components/ContentCard';
import { EquipementsSchema } from '../../contexts/EquipementsSchema';
import { Background } from '../../components/Background';
import { DotsThreeVertical } from 'phosphor-react-native';
import { ExtinguisherInput } from '../../components/ControlledInput/ExtinguisherInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

const equipementInfoSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  qnt: z.string().regex(/^\d*$/, 'Apenas números são permitidos').min(1, 'Campo obrigatório'),
  type: z.string().min(1, 'Campo obrigatório'),
  fabDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve estar no formato DD/MM/AAAA').min(1, 'Campo obrigatório'),
  weight: z.string().regex(/^\d*$/, 'Apenas números são permitidos').min(1, 'Campo obrigatório'),
  local: z.string().min(1, 'Campo obrigatório')
});

type EquipementInfoType = z.infer<typeof equipementInfoSchema>;

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalAddEquipement({ modalVisible, setModalVisible }: ModalProps) {

  const realm = useRealm();
  const route = useRoute<RouteProp<EquipementsRoutesType, 'equipmentDetails'>>();
  const { id } = route.params;

  const equipement = useQuery(EquipementsSchema).filtered('_id == $0', new Realm.BSON.ObjectId(id))

  function parseDate(dateStr: string) {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    throw new Error('Data inválida');
  }

  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<EquipementInfoType>({
    resolver: zodResolver(equipementInfoSchema),
    defaultValues: {
      name: '',
      qnt: '',
      type: '',
      fabDate: '',
      weight: '',
      local: '',
    }
  });

  useEffect(() => {
    if (equipement[0]) {
      setValue('name', equipement[0].name);
      setValue('qnt', equipement[0].qnt.toString());
      setValue('type', equipement[0].type);
      setValue('fabDate', equipement[0].fabDate.toLocaleDateString());
      setValue('weight', equipement[0].weight.toString());
      setValue('local', equipement[0].local);
    }
  }, [equipement]);

  function editEquipements(data: EquipementInfoType) {
    const formattedFabDate = parseDate(data.fabDate);

    if (equipement[0]) {
      realm.write(() => {
        equipement[0].name = data.name;
        equipement[0].qnt = parseInt(data.qnt);
        equipement[0].type = data.type;
        equipement[0].fabDate = formattedFabDate;
        equipement[0].weight = parseInt(data.weight);
        equipement[0].local = data.local;
      });
    }

    reset({
      name: '',
      qnt: '',
      type: '',
      fabDate: '',
      weight: '',
      local: '',
    });

    setModalVisible(false);
  }

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Editar</Text>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ContentCard style={{ gap: 10 }}>
            <ExtinguisherInput
              control={control}
              name='name'
              title='Nome do equipamento'
              placeholder='Digite o nome do equipamento'
              error={errors.name?.message}
            />
            <ExtinguisherInput
              control={control}
              name='qnt'
              title='Quantidade'
              placeholder='Digite a quantidade'
              error={errors.qnt?.message}
            />
            <ExtinguisherInput
              control={control}
              name='type'
              title='Tipo'
              placeholder='Digite o tipo'
              error={errors.type?.message}
            />
            <ExtinguisherInput
              control={control}
              name='fabDate'
              title='Data de Fabricação'
              placeholder='Digite a data de fabricação'
              error={errors.fabDate?.message}
            />
            <ExtinguisherInput
              control={control}
              name='weight'
              title='Peso'
              placeholder='Digite o peso'
              error={errors.weight?.message}
            />
            <ExtinguisherInput
              control={control}
              name='local'
              title='Localização'
              placeholder='Digite a localização'
              error={errors.local?.message}
            />
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', marginTop: 5 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit(editEquipements)} style={{ backgroundColor: 'green', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}  >Confirmar</Text>
              </TouchableOpacity>
            </View>
          </ContentCard>
        </ScrollView>
      </View>
    </Modal>
  );
}

export function EquipmentDetails() {
  const route = useRoute<RouteProp<EquipementsRoutesType, 'equipmentDetails'>>();
  const { id } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { goBack } = useNavigation();

  const realm = useRealm();
  const equipment = useQuery(EquipementsSchema).filtered('_id == $0', new Realm.BSON.ObjectId(id))[0];

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const editItem = () => {
    setMenuVisible(false);
    setShowModal(true);
  };

  async function deleteEquipment() {
    await realm.write(() => {
      realm.delete(equipment);
    });
    goBack();
  }

  const deleteItem = () => {
    setMenuVisible(false);
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir este item?",
      [
        { text: "Cancelar", onPress: () => console.log("Cancelado"), style: "cancel" },
        {
          text: "Excluir", onPress: async () => {
            try {
              deleteEquipment();
            } catch (error) {
              console.error("Erro ao excluir o item: ", error);
            }
          }, style: "destructive"
        }
      ]
    );
  };

  return (
    <Background usePaddingTop solidColor='#FFC700'>
      <ContentCard style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
          <View style={{ width: 30 }}></View>
          <Text style={{ color: 'black', fontWeight: '500', fontSize: 18 }}>{equipment.name}</Text>
          <View>
            <TouchableOpacity onPress={toggleMenu}>
              <DotsThreeVertical weight='bold' color='#A5A5A5' size={30} />
            </TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={menuVisible}
              onRequestClose={toggleMenu}
            >
              <TouchableOpacity style={styles.modalOverlay} onPress={toggleMenu}>
                <View style={styles.modalMenu} onStartShouldSetResponder={() => true}>
                  <TouchableOpacity style={styles.modalItem} onPress={editItem}>
                    <Text style={styles.modalText}>Editar</Text>
                  </TouchableOpacity>
                  <View style={{ height: 1, backgroundColor: '#A5A5A5' }}></View>
                  <TouchableOpacity style={styles.modalItem} onPress={deleteItem}>
                    <Text style={styles.modalText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        </View>
        <View style={{ paddingTop: 40 }}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nome</Text>
            <Text style={styles.detailValue}>{equipment.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tipo</Text>
            <Text style={styles.detailValue}>{equipment.type}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantidade</Text>
            <Text style={styles.detailValue}>{equipment.qnt}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Data de Fabricação</Text>
            <Text style={styles.detailValue}>{new Date(equipment.fabDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Peso</Text>
            <Text style={styles.detailValue}>{equipment.weight}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Localização</Text>
            <Text style={styles.detailValue}>{equipment.local}</Text>
          </View>
        </View>
      </ContentCard>
      <ModalAddEquipement modalVisible={showModal} setModalVisible={setShowModal} />
    </Background>
  );
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopColor: '#BABAC2',
    borderTopWidth: 1,
    justifyContent: 'space-between',
  },
  detailLabel: {
    width: 150,
    fontSize: 16,
    color: '#333',
    textTransform: 'uppercase',
  },
  detailValue: {
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#e60e0e',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 20,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
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
    maxWidth: '80%'
  },
});
