import Realm from 'realm';
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { AuthRoutes } from "../routes/auth.routes";

import { User } from "./UserSchema";
import { Message } from "./MessageSchema";


export function AppRealmProvider({ children }: { children: React.ReactNode }) {
  const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately,
  };

  return (
    <AppProvider id='application-0-sfqtcfe'>
      <UserProvider fallback={AuthRoutes}>
        <RealmProvider
          schema={[User, Message]}
          sync={{
            flexible: true,
            onError: (session, error) => {
              console.error(error.message);
            },
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(User));
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