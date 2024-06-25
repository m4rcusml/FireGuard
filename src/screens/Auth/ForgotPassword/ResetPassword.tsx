import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEmailPasswordAuth } from '@realm/react';
import { AuthRoutesType } from '../../../routes/auth.routes';

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'A confirmação de senha deve ter no mínimo 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export function ResetPassword() {
  const { control, handleSubmit, formState: { errors } } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const route = useRoute<RouteProp<AuthRoutesType, 'resetpassword'>>();
  const { token, tokenId } = route.params;

  const { navigate } = useNavigation<NavigationProp<AuthRoutesType>>();

  const { resetPassword } = useEmailPasswordAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ResetPasswordData) => {
    setLoading(true);
    try {
      await resetPassword({ token, tokenId, password: data.password });
      Alert.alert('Senha redefinida com sucesso!');
      navigate('login');
    } catch (error) {
      Alert.alert('Erro ao redefinir a senha. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirme a Nova Senha"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
      <Button title="Redefinir Senha" onPress={handleSubmit(onSubmit)} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});
