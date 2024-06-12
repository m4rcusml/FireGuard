import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ArrowLeft, FireExtinguisher, FireSimple } from 'phosphor-react-native';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FirstAidInstructionsRoutesType } from '../../routes/home.routes';
import { SettingButton } from '../../components/SettingButton';
import { useQuery } from '@realm/react';
import { InstructionSchema } from '../../contexts/InstructionsSchema';

export function FirstAidInstructions() {
  const { goBack, navigate } = useNavigation<NavigationProp<FirstAidInstructionsRoutesType>>();
  const { top } = useSafeAreaInsets();

  const Instructions = useQuery<InstructionSchema>('instruction').sorted('_id');
  console.log(Instructions);

  return (
    <View style={styles.screenContainer}>
      <View style={[styles.headerContainer, { paddingTop: top + 15 }]}>
        <View style={styles.headerTopContainer}>
          <Pressable
            onPress={() => goBack()}
            children={<ArrowLeft color='red' weight='bold' />}
          />

          <Text style={styles.headerTitle}>Instruções de primeiros socorros</Text>

          <View style={{ width: 24 }} />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={Instructions}
          keyExtractor={item => item._id.toHexString()}
          renderItem={({ item, index }) => (
            <SettingButton
              title={item.title}
              showBorderBottom={index !== Instructions.length - 1}
              onPress={() => navigate('details', { instruction: item._id.toHexString() })}
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    gap: 30
  },
  headerContainer: {
    backgroundColor: '#ddd',
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
    fontSize: 20,
    color: 'red',
    flex: 1,
  },
});