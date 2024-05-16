import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/contexts';
import { Routes } from './src/routes';

export default function App() {
  return (
    <AppProvider>
      <Routes />
      <StatusBar style='inverted' />
    </AppProvider>
  );
}