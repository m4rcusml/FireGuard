import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Sensors } from '../screens/Sensors';
import { FirstAidInstructions } from '../screens/FirstAidInstructions';
import { InstructionDetails } from '../screens/InstructionDetails';
import { Extinguishers } from '../screens/Extinguishers';
import { EntinguisherDetails } from '../screens/ExtinguisherDetails';
import { Equipements } from '../screens/Equipements';
import { AddEquipements } from '../screens/AddEquipement';
import { ViewEquipments } from '../screens/ViewEquipements';
import { ListEquipments } from '../screens/ListEquipements';
import { EquipmentDetails } from '../screens/EquipementDetails';


export type HomeRoutesType = {
  initial: undefined;
  sensors: undefined;
  firstAidInstructions: undefined;
  viewExtinguisher: undefined;
  viewEquipements: undefined;
}

export type FirstAidInstructionsRoutesType = {
  list: undefined;
  details: {
    instruction: string;
  }
}

export type ExtinguishersRoutesType = {
  list: undefined;
  details: {
    extinguisher: string;
  }
}

export type EquipementsRoutesType = {
  equipements: undefined;
  addequipements: undefined;
  viewEquipments: undefined;
  listEquipments: { name: string };
  equipmentDetails: { id: string };
};

const HomeStack = createNativeStackNavigator<HomeRoutesType>();

const FirstAidStack = createNativeStackNavigator<FirstAidInstructionsRoutesType>();

const ExtinguishersStack = createNativeStackNavigator<ExtinguishersRoutesType>();

const EquipementStack = createNativeStackNavigator<EquipementsRoutesType>()


function ExtinguishersRoutes() {
  return (
    <ExtinguishersStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: 'white'
      }}
    >
      <ExtinguishersStack.Screen
        name='list'
        component={Extinguishers}
        options={{ title: 'Visualizar extintores' }}
      />
      <ExtinguishersStack.Screen
        name='details'
        component={EntinguisherDetails}
        options={{ title: 'Visualizar informações do extintor' }}
      />
    </ExtinguishersStack.Navigator>
  )
}

function EquipementsRoutes() {
  return (
    <EquipementStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: 'white'
      }}
    >
      <EquipementStack.Screen
        name='equipements'
        component={Equipements}
        options={{ title: 'Equipamentos de segurança ' }}
      />
      <EquipementStack.Screen
        name='addequipements'
        component={AddEquipements}
        options={{
          title: 'Adicionar equipamento',
          headerTitleAlign: 'center',
        }}
      />
      <EquipementStack.Screen
        name='viewEquipments'
        component={ViewEquipments}
        options={{ title: 'Visualizar Equipamentos', headerTitleAlign: 'center' }} 
      />
      <EquipementStack.Screen
        name='listEquipments'
        component={ListEquipments} 
        options={({ route }) => ({ title: `${route.params.name}`, headerTitleAlign: 'center' })} 
      />
      <EquipementStack.Screen
        name='equipmentDetails'
        component={EquipmentDetails}
        options={{ title: 'Detalhes do Equipamento', headerTitleAlign: 'center' }} 
      />
    </EquipementStack.Navigator>
  )
}



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
      <HomeStack.Screen
        name='viewExtinguisher'
        component={ExtinguishersRoutes}
      />
      <HomeStack.Screen
        name='viewEquipements'
        component={EquipementsRoutes}
      />
    </HomeStack.Navigator>
  )
}