import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SettingsRoutesType } from '../../../../routes/settings.routes';

import { Background } from '../../../../components/Background';
import { ContentCard } from '../../../../components/ContentCard';
import { SettingButton } from '../../../../components/SettingButton';
import { MySwitch } from '../..';

export function InApp() {
  const { navigate } = useNavigation<NavigationProp<SettingsRoutesType>>();

  return (
    <Background style={{ gap: 35 }} usePaddingTop>
      <ContentCard>
        <SettingButton
          title='Som'
          showBorderBottom
          showOpacityEffect={false}
          right={() => <MySwitch startActivated />}
        />
        <SettingButton
          title='Mostrar prévia'
          showOpacityEffect={false}
          right={() => <MySwitch startActivated />}
        />
      </ContentCard>
    </Background>
  )
}