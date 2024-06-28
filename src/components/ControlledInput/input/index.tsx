import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import { Eye, EyeClosed, EyeSlash } from 'phosphor-react-native';

export function Input({ isPassword = false, placeholder, ...rest }: TextInputProps & { isPassword?: boolean, placeholder?: string }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={isPassword && !isPasswordVisible}
        placeholderTextColor={'#A5A5A5'}
        placeholder={placeholder}
        {...rest}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? <Eye size={24} color="#181818" /> : <EyeSlash size={24} color="#181818" />}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    color: 'black',
    flex: 1,
    fontSize: 14,
    padding: 10,
    paddingHorizontal: 20,
  },
});
