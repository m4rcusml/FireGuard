import Realm from 'realm';
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { AuthRoutes } from "../routes/auth.routes";

import { UserSchema } from "./UserSchema";
import { Message } from "./MessageSchema";


export function AppRealmProvider({ children }: { children: React.ReactNode }) {
  const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately,
  };

  return (
    <AppProvider id='application-0-sfqtcfe'>
      <UserProvider fallback={AuthRoutes}>
        <RealmProvider
          schema={[UserSchema, Message]}
          sync={{
            flexible: true,
            onError: (session, error) => {
              console.error(error.message);
            },
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('user'));
                subs.add(realm.objects('Message'));
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