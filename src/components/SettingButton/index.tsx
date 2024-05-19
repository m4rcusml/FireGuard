import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  onPress?(): void;
  icon?(): React.ReactNode;
  right?(): React.ReactNode;
  showBorderBottom?: boolean;
  showOpacityEffect?: boolean;
}

export function SettingButton({ title, icon, right, showBorderBottom = false, onPress, showOpacityEffect = true }: Props) {
  return (
    <TouchableOpacity activeOpacity={showOpacityEffect ? 0.4 : 1} style={styles.container} onPress={onPress}>
      {icon && icon()}
      <Text style={{ fontSize: 16 }}>
        {title}
      </Text>
      {right && right()}
      
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