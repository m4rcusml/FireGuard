import { ArrowLeft, PlusCircle } from 'phosphor-react-native';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SettingButton } from '../../components/SettingButton';
import { useRealm } from '@realm/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { ContentCard } from '../../components/ContentCard';
import { ExtinguisherInput } from '../../components/ControlledInput/ExtinguisherInput'; // Reutilizando o input dos extintores
import { useState, useEffect } from 'react';

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
  defaultName: string;
}

function ModalAddEquipement({ modalVisible, setModalVisible, defaultName }: ModalProps) {
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

  function createEquipement(data: EquipementInfoType) {
    const formattedFabDate = parseDate(data.fabDate);

    realm.write(() => {
      realm.create('equipements', {
        equipement: defaultName,
        name: data.name,
        qnt: parseInt(data.qnt),
        type: data.type,
        fabDate: formattedFabDate,
        weight: parseInt(data.weight),
        local: data.local,
      });
    });

    reset({
      name: defaultName,
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
        <Text style={styles.modalTitle}>Adicionar {defaultName}</Text>
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
              <TouchableOpacity onPress={handleSubmit(createEquipement)} style={{ backgroundColor: 'green', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}  >Adicionar</Text>
              </TouchableOpacity>
            </View>
          </ContentCard>
        </ScrollView>
      </View>
    </Modal>
  );
}

export function AddEquipements() {
  const { top } = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [defaultName, setDefaultName] = useState('');

  const openModalWithDefaultName = (name: string) => {
    setDefaultName(name);
    setShowModal(true);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={[styles.headerContainer, { paddingTop: top + 15, paddingBottom: 80 }]}></View>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
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
          title='Maca'
          showBorderBottom
          onPress={() => openModalWithDefaultName('Maca')}
        />
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
          title='Mangueira'
          showBorderBottom
          onPress={() => openModalWithDefaultName('Mangueira')}
        />
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
          title='Kit de primeiros socorros'
          showBorderBottom
          onPress={() => openModalWithDefaultName('Kit de primeiros socorros')}
        />
      </View>
      <ModalAddEquipement modalVisible={showModal} setModalVisible={setShowModal} defaultName={defaultName} />
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
    elevation: 5
  },
  headerTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
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
    maxWidth: '80%'
  },
});
