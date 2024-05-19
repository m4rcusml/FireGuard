import { StyleSheet, View, ViewStyle } from 'react-native';

export function ContentCard({ children, style }: { children?: React.ReactNode, style?: ViewStyle }) {
  return (
    <View style={[styles.container, style]}>
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
    paddingHorizontal: 20,
    paddingVertical: 25
  }
});