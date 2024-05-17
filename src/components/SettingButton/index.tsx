import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  icon?(): React.ReactNode;
  showBorderBottom?: boolean;
}

export function SettingButton({ title, icon, showBorderBottom = false }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.4} style={styles.container}>
      {icon && icon()}
      <Text style={{ fontSize: 16 }}>
        {title}
      </Text>
      {showBorderBottom && <View style={styles.borderBottom} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    gap: 10
  },
  borderBottom: {
    backgroundColor: 'black',
    position: 'absolute',
    height: 0.8,
    left: 0,
    right: 0,
    bottom: 0
  }
});