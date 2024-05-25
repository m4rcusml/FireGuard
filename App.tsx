import { AppRealmProvider } from './src/contexts';
import { Routes } from './src/routes';

export default function App() {
  return (
    <AppRealmProvider>
      <Routes />
    </AppRealmProvider>
  );
}