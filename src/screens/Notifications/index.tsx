import { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SettingsRoutesType } from '../../routes/settings.routes';

import { Background } from '../../components/Background';
import { ContentCard } from '../../components/ContentCard';
import { SettingButton } from '../../components/SettingButton';
import { CaretRight } from 'phosphor-react-native';
import { NotificationsRoutesType } from '../../routes/notifications.routes';

export const MySwitch = ({ startActivated = false, onPress }: { startActivated?: boolean, onPress?(): void }) => {
  const [isActive, setIsActive] = useState(startActivated);

  function handleValue() {
    setIsActive(prev => !prev);
    onPress && onPress();
  }

  return (
    <Switch
      value={isActive}
      onValueChange={handleValue}
      style={{ height: 25, flex: 1 }}
      thumbColor={'#ddd'}
      trackColor={{ false: '#999', true: '#0c0' }}
    />
  )
}

export function Notifications() {
  const { navigate } = useNavigation<NavigationProp<NotificationsRoutesType>>();

  return (
    <Background style={{ gap: 35 }} usePaddingTop>
      <ContentCard>
        <Text style={styles.sectionTitle}>Notificações de mensagem</Text>

        <SettingButton
          title='Mostrar notificações'
          showBorderBottom
          showOpacityEffect={false}
          right={() => <MySwitch startActivated />}
        />

        <SettingButton
          title='Som'
          showOpacityEffect={false}
          right={() => <MySwitch startActivated />}
        />


        <Text style={styles.sectionTitle}>Notificações de mensagem</Text>
        
        <SettingButton
          title='Mostrar notificações'
          showBorderBottom
          showOpacityEffect={false}
          right={() => <MySwitch startActivated />}
        />
        
        <SettingButton
          title='Som'
          showOpacityEffect={false}
          right={() => <MySwitch startActivated />}
        />


        <Text style={styles.sectionTitle}>Outros</Text>

        <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.4} onPress={() => navigate('inApp')}>
          <View style={styles.topButton}>
            <Text style={styles.title}>Notificações no app</Text>
            <Text style={styles.subtitle}>Som, vibrar</Text>
          </View>
          <CaretRight color='#666' />
        </TouchableOpacity>

        <SettingButton
          title='Mostrar prévia'
          showOpacityEffect={false}
          right={() => <MySwitch />}
        />
      </ContentCard>
    </Background>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#666',
    marginTop: 20
  },
  buttonContainer: {
    gap: 5,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10
  },
  hr: {
    backgroundColor: '#0006',
    alignSelf: 'stretch',
    height: 0.6,
  },
  topButton: {
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