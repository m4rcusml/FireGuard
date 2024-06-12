import Realm from 'realm';
import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Background } from '../../components/Background';
import { ContentCard } from '../../components/ContentCard';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ExtinguishersRoutesType, FirstAidInstructionsRoutesType } from '../../routes/home.routes';
import { useQuery, useRealm } from '@realm/react';
import { ExtinguisherSchema } from '../../contexts/ExtinguisherSchema';
import { DotsSixVertical, DotsThreeVertical } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { ExtinguisherInput } from '../../components/ControlledInput/ExtinguisherInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';

interface Extinguisher {
  name: string;
  serieNumber: number;
  type: string;
  capacity: number;
  fabDate: Date;
  refillDate: Date;
  localization: string;
  [key: string]: any;
}

interface ExtinguisherDetailsComponentProps {
  extinguisher: Extinguisher;
}

function formatDate(date: Date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const extinguisherInfoSchema = z.object({
  extinguisherName: z.string().min(1, 'Campo obrigatório'),
  serieNumber: z.string().regex(/^\d*$/, 'Apenas números são permitidos').min(1, 'Campo obrigatório'),
  type: z.string().min(1, 'Campo obrigatório'),
  capacity: z.string().regex(/^\d*$/, 'Apenas números são permitidos').min(1, 'Campo obrigatório'),
  fabDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve estar no formato DD/MM/AAAA').min(1, 'Campo obrigatório'),
  refillDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve estar no formato DD/MM/AAAA').min(1, 'Campo obrigatório'),
  localization: z.string().min(1, 'Campo obrigatório')
});

type ExtinguisherInfoType = z.infer<typeof extinguisherInfoSchema>;

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalAddExtinguisher({ modalVisible, setModalVisible }: ModalProps) {

  const route = useRoute<RouteProp<ExtinguishersRoutesType, 'details'>>();
  const { extinguisher } = route.params;
  const { goBack } = useNavigation();
  const [initialized, setInitialized] = useState(false);

  const extinguisherSearch = useQuery(ExtinguisherSchema).filtered('_id == $0', new Realm.BSON.ObjectId(extinguisher))

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

  const realm = useRealm();

  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<ExtinguisherInfoType>({
    resolver: zodResolver(extinguisherInfoSchema),
    defaultValues: {
      extinguisherName: '',
      serieNumber: '',
      type: '',
      capacity: '',
      fabDate: '',
      refillDate: '',
      localization: '',
    }
  });

  useEffect(() => {
    if (extinguisherSearch[0] && !initialized) {
      setValue('extinguisherName', extinguisherSearch[0].name);
      setValue('serieNumber', extinguisherSearch[0].serieNumber.toString());
      setValue('type', extinguisherSearch[0].type);
      setValue('capacity', extinguisherSearch[0].capacity.toString());
      setValue('fabDate', extinguisherSearch[0].fabDate.toLocaleDateString());
      setValue('refillDate', extinguisherSearch[0].refillDate.toLocaleDateString());
      setValue('localization', extinguisherSearch[0].localization);
      setInitialized(true);
    }
  }, [extinguisherSearch]);

  function editExtinguisher(data: ExtinguisherInfoType) {

    const formattedFabDate = parseDate(data.fabDate);
    const formattedRefillDate = parseDate(data.refillDate);

    if (extinguisherSearch[0]) {
      realm.write(() => {
        extinguisherSearch[0].name = data.extinguisherName;
        extinguisherSearch[0].serieNumber = parseInt(data.serieNumber);
        extinguisherSearch[0].type = data.type;
        extinguisherSearch[0].capacity = parseInt(data.capacity);
        extinguisherSearch[0].fabDate = formattedFabDate;
        extinguisherSearch[0].refillDate = formattedRefillDate;
        extinguisherSearch[0].localization = data.localization;
      });
      goBack();
    } else {
      console.log('Extintor não encontrado');
    }
    setModalVisible(false);
    console.log('criado')
  }

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      transparent={true}
      animationType="slide"

    >
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Adicionar Extintor</Text>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ContentCard
            style={{ gap: 10, }}
          >
            <ExtinguisherInput
              control={control}
              name='extinguisherName'
              title='Nome do extintor'
              placeholder='Digite o nome do extintor'
              error={errors.extinguisherName?.message}
            />
            <ExtinguisherInput
              control={control}
              name='serieNumber'
              title='Número de Série do extintor'
              placeholder='Digite o número de série do extintor'
              error={errors.serieNumber?.message}
            />
            <ExtinguisherInput
              control={control}
              name='type'
              title='Tipo do extintor'
              placeholder='Digite o tipo do extintor'
              error={errors.type?.message}
            />
            <ExtinguisherInput
              control={control}
              name='capacity'
              title='Capacidade do extintor'
              placeholder='Digite a capacidade do extintor'
              error={errors.capacity?.message}
            />
            <ExtinguisherInput
              control={control}
              name='fabDate'
              title='Data de Fabricação'
              placeholder='Digite a data de fabricação do extintor'
              error={errors.fabDate?.message}
            />
            <ExtinguisherInput
              control={control}
              name='refillDate'
              title='Data de Recarga'
              placeholder='Digite a data de recarga do extintor'
              error={errors.refillDate?.message}
            />
            <ExtinguisherInput
              control={control}
              name='localization'
              title='Localização'
              placeholder='Digite a localização do extintor'
              error={errors.localization?.message}
            />
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', marginTop: 5 }}>
              <TouchableOpacity style={{ backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, }}>
                <Text onPress={() => setModalVisible(false)} style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'green', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} onPress={handleSubmit(editExtinguisher)} >Alterar</Text>
              </TouchableOpacity>
            </View>
          </ContentCard>
        </ScrollView>
      </View>
    </Modal>
  );

}


function ExtinguisherDetailsComponent(extinguisher: ExtinguisherDetailsComponentProps) {
  return (
    <View style={{ paddingTop: 40 }}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Número de Série</Text>
        <Text style={styles.detailValue}>{extinguisher.extinguisher?.serieNumber}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Tipo</Text>
        <Text style={styles.detailValue}>{extinguisher.extinguisher?.type}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Capacidade</Text>
        <Text style={styles.detailValue}>{extinguisher.extinguisher?.capacity}L</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Data de Fabricação</Text>
        <Text style={styles.detailValue}>{formatDate(extinguisher.extinguisher?.fabDate)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Data de Recarga</Text>
        <Text style={styles.detailValue}>{formatDate(extinguisher.extinguisher?.refillDate)}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Local</Text>
        <Text style={styles.detailValue}>{extinguisher.extinguisher?.localization}</Text>
      </View>
    </View>

  );

}

export function EntinguisherDetails() {

  const route = useRoute<RouteProp<ExtinguishersRoutesType, 'details'>>();
  const { extinguisher } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { goBack } = useNavigation();

  const realm = useRealm();

  const extinguisherSearch = useQuery(ExtinguisherSchema).filtered('_id == $0', new Realm.BSON.ObjectId(extinguisher))

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const editItem = () => {
    setMenuVisible(false);
    setShowModal(true);
  };

  async function deleteExtinguisherSearch() {
    await realm.write(() => {
      realm.delete(extinguisherSearch)
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
              deleteExtinguisherSearch();
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
          <Text style={{ color: 'black', fontWeight: '500', fontSize: 18 }}>{extinguisherSearch[0].name}</Text>
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

        <ExtinguisherDetailsComponent extinguisher={extinguisherSearch[0]} />
      </ContentCard>
      <ModalAddExtinguisher modalVisible={showModal} setModalVisible={setShowModal} />
    </Background>
  );
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
  },
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
  list: {
    marginHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,

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
    textTransform: 'uppercase'
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