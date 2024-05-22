import { StatusBar } from 'expo-status-bar';
import { AppRealmProvider } from './src/contexts';
import { Routes } from './src/routes';

export default function App() {
  return (
    <AppRealmProvider>
      <StatusBar style='inverted' />
      <Routes />
    </AppRealmProvider>
  );
}