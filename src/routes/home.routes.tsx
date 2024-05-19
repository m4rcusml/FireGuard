import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Sensors } from '../screens/Sensors';
import { FirstAidInstructions } from '../screens/FirstAidInstructions';
import { InstructionDetails } from '../screens/InstructionDetails';

export type HomeRoutesType = {
  initial: undefined;
  sensors: undefined;
  firstAidInstructions: undefined;
}

export type FirstAidInstructionsRoutesType = {
  list: undefined;
  details: {
    instruction: string;
  }
}

const HomeStack = createNativeStackNavigator<HomeRoutesType>();

const FirstAidStack = createNativeStackNavigator<FirstAidInstructionsRoutesType>();

function FirstAidInstructionsRoutes() {
  return (
    <FirstAidStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: 'red'
      }}
    >
      <FirstAidStack.Screen
        name='list'
        component={FirstAidInstructions}
        options={{ headerShown: false }}
      />
      <FirstAidStack.Screen
        name='details'
        component={InstructionDetails}
        options={{ title: 'Detalhes da instrução' }}
      />
    </FirstAidStack.Navigator>
  )
}

export function HomeRoutes() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name='initial'
        component={Home}
      />
      <HomeStack.Screen
        name='sensors'
        component={Sensors}
      />
      <HomeStack.Screen
        name='firstAidInstructions'
        component={FirstAidInstructionsRoutes}
      />
    </HomeStack.Navigator>
  )
}