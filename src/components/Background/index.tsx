import { LinearGradient } from 'expo-linear-gradient';
import { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Background({ children, style, solidColor, usePaddingTop = false, cleanStyle = false }: {
  children?: React.ReactNode;
  usePaddingTop?: boolean;
  cleanStyle?: boolean;
  style?: ViewStyle;
  solidColor?: string;
}) {
  const { top } = useSafeAreaInsets();

  return (
    <LinearGradient
      style={
        cleanStyle 
        ? style
        : [
        { flex: 1, paddingTop: usePaddingTop ? (top + 80) : top },
        style
      ]}
      colors={!solidColor ? ['#F30A0A', '#8D0606'] : [solidColor, solidColor]}
    >
      {children}
    </LinearGradient>
  )
}