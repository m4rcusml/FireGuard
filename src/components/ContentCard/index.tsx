import { StyleSheet, View, ViewStyle } from 'react-native';

export function ContentCard({ children, style, cleanedPadding = false }: { children?: React.ReactNode, style?: ViewStyle, cleanedPadding?: boolean }) {
  return (
    <View style={[styles.container, !cleanedPadding && styles.padding, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 25
  }
});