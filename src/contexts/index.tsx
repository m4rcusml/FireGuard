import Realm from 'realm';
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { AuthRoutes } from "../routes/auth.routes";

import { UserSchema } from "./UserSchema";
import { Message } from "./MessageSchema";
import { InstructionSchema } from './InstructionsSchema';
import { LoadingScreen } from '../screens/LoadingScreen';
import { ExtinguisherSchema } from './ExtinguisherSchema';
import { EquipementsSchema } from './EquipementsSchema';


export function AppRealmProvider({ children }: { children: React.ReactNode }) {

  return (
    <AppProvider id='application-0-sfqtcfe'>
      <UserProvider fallback={AuthRoutes}>
        <RealmProvider
          fallback={LoadingScreen}
          schema={[UserSchema, Message, InstructionSchema, ExtinguisherSchema, EquipementsSchema]}
          sync={{
            flexible: true,
            onError: (session, error) => {
              console.error(error.message);
            },
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('user'));
                subs.add(realm.objects('Message'));
                subs.add(realm.objects('instruction'));
                subs.add(realm.objects('extinguisher'));
                subs.add(realm.objects('equipements')) 
              },
              rerunOnOpen: true,
            },

          }}
        >
          {children}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  )
}