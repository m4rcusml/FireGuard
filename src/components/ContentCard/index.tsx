import { StyleSheet, View } from 'react-native';

export function ContentCard({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.container}>
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
    padding: 20
  }
});