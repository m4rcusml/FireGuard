import { StyleSheet, Text, TextInputProps, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Input } from './input';

type ControlledInputProps = TextInputProps & {
  title?: string;
  name: string;
  error?: string;
  control?: any,
  placeholder: string;
  isPassword?: boolean;
}

export function ControlledTextfield({ name, control, placeholder, title, error, isPassword = false, ...rest }: ControlledInputProps) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={{ height: error ? 105 : 85, gap: 10, alignItems: 'flex-start' }}>
          <Text
            style={styles.typografy}
            children={title || name}
          />
          <Input
            placeholder={placeholder}
            onChangeText={onChange}
            autoCorrect={false}
            value={value}
            isPassword={isPassword}
            {...rest}
          />
          {error && <Text style={styles.textError} children={error} />}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  typografy: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#C61414',
  },
  textError: {
    fontSize: 16,
    color: '#C61414',
  }

});