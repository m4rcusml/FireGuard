import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useQuery, useRealm } from '@realm/react';
import { ArrowLeft, FireExtinguisher, FireSimple, Plus, PlusCircle, ShareNetwork } from 'phosphor-react-native';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { InstructionSchema } from '../../contexts/InstructionsSchema';
import { SettingButton } from '../../components/SettingButton';
import { ExtinguishersRoutesType, FirstAidInstructionsRoutesType } from '../../routes/home.routes';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ExtinguisherInput } from '../../components/ControlledInput/ExtinguisherInput';
import { ContentCard } from '../../components/ContentCard';
import { ExtinguisherSchema } from '../../contexts/ExtinguisherSchema';


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

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ExtinguisherInfoType>({
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

  function createExtinguisher(data: ExtinguisherInfoType) {
    const formattedFabDate = parseDate(data.fabDate);
    const formattedRefillDate = parseDate(data.refillDate);

    realm.write(() => {
      realm.create('extinguisher', {
        name: data.extinguisherName,
        serieNumber: parseInt(data.serieNumber),
        type: data.type,
        capacity: parseInt(data.capacity),
        fabDate: formattedFabDate,
        refillDate: formattedRefillDate,
        localization: data.localization,
      });
    })

    reset({
      extinguisherName: '',
      serieNumber: '',
      type: '',
      capacity: '',
      fabDate: '',
      refillDate: '',
      localization: '',
    });

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
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit(createExtinguisher)} style={{ backgroundColor: 'green', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} >Adicionar</Text>
              </TouchableOpacity>
            </View>
          </ContentCard>
        </ScrollView>
      </View>
    </Modal>
  );

}

export function Extinguishers() {
  const { top } = useSafeAreaInsets();
  const { goBack, navigate } = useNavigation<NavigationProp<ExtinguishersRoutesType>>();
  const [showModal, setShowModal] = useState(false);

  const Instructions = useQuery<ExtinguisherSchema>('extinguisher').sorted('_id');

  return (
    <View style={styles.screenContainer}>
      <View style={[styles.headerContainer, { paddingTop: top + 15, paddingBottom: 60 }]}>
        <View style={styles.headerTopContainer}>
          <Pressable
            onPress={() => goBack()}
            children={<ArrowLeft color='white' weight='bold' />}
          />

          <View style={{ width: 24 }} />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <FlatList
          data={Instructions}
          keyExtractor={item => item._id.toHexString()}
          renderItem={({ item, index }) => (
            <SettingButton
              icon={() => (
                <View style={{
                  borderWidth: 4,
                  borderColor: '#e1a818',
                  borderRadius: 50,
                  padding: 4,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <FireExtinguisher weight='fill' color='#000' size={24} />
                </View>
              )}
              title={item.name}
              showBorderBottom={index !== Instructions.length - 1}
              onPress={() => navigate('details', { extinguisher: item._id.toHexString() })}
            />
          )}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.addButtonContainer}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.addButtonText}>Adicionar extintor</Text>
        <View style={styles.addButtonIconContainer}>
          <Plus size={20} weight='bold' color='white' />
        </View>
      </TouchableOpacity>
      <ModalAddExtinguisher modalVisible={showModal} setModalVisible={setShowModal} />
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