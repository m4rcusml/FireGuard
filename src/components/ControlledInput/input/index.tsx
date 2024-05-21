import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';


export function Input({isPassword = false, placeholder , ...rest }: TextInputProps & {isPassword?: boolean, placeholder?: string}) {
  return (
    <View style={Sytles.container}>
      <TextInput
      style={Sytles.input}
      secureTextEntry={isPassword} 
      placeholderTextColor={'#A5A5A5'}
      placeholder={placeholder}
      {...rest} />
    </View>
  )
}


const Sytles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 5,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 40,
    },
    input: {
        color: 'black',
        flex: 1,
        fontSize: 14,
        padding: 10,
        paddingHorizontal: 20,
    }

});