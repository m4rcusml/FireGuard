import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { AuthRoutes } from "../routes/auth.routes";

export function AppRealmProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider id={'fireguardapp-rpbteup'}>
      <UserProvider fallback={AuthRoutes}>
        <RealmProvider
          sync={{
            flexible: true,
            onError: (session, error) => {
              console.error(error.message);
            }
          }}
        >
          {children}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  )
}