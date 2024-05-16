import { LinearGradient } from 'expo-linear-gradient';
import { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Background({ children, style, usePaddingTop =  false }: {
  children?: React.ReactNode;
  usePaddingTop?: boolean;
  style?: ViewStyle;
}) {
  const { top } = useSafeAreaInsets();
  
  return (
    <LinearGradient
      style={[
        { flex: 1, paddingTop: usePaddingTop ? (top + 80) : top },
        style
      ]}
      colors={['#F30A0A', '#8D0606']}
    >
      {children}
    </LinearGradient>
  )
}