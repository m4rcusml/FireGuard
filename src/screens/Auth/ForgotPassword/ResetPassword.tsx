import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEmailPasswordAuth } from '@realm/react';
import { AuthRoutesType } from '../../../routes/auth.routes';
import { ControlledTextfield } from '../../../components/ControlledInput';
import { ContentCard } from '../../../components/ContentCard';
import Logo from '../../../assets/Logo.svg';
import { StatusBar } from 'expo-status-bar';
import { Background } from '../../../components/Background';
import { useAuth } from '..';

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

  useEffect(() => {
    console.log('Token:', token);
    console.log('Token ID:', tokenId);
  }, [token, tokenId]);

  const navigation = useNavigation<NavigationProp<AuthRoutesType>>();
  const { setIsNewUser } = useAuth();

  const { resetPassword } = useEmailPasswordAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ResetPasswordData) => {
    setLoading(true);
    try {
      await resetPassword({ token, tokenId, password: data.password });
      Alert.alert('Senha redefinida com sucesso!');
      setIsNewUser(false);
      navigation.navigate('authentication', { handleNewUser: () => true });
    } catch (error) {
      Alert.alert('Erro ao redefinir a senha. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Background>
        <View style={styles.logoCard}>
          <Logo style={styles.logoPicture} />
        </View>
        <ContentCard style={{paddingVertical: 30 }}>
          <ScrollView contentContainerStyle={{ gap: 25, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 16, color: '#C61414', textTransform: 'uppercase', fontWeight: 'bold' }}>Redefinir senha</Text>
            <ControlledTextfield
              control={control}
              name='password'
              title='Nova Senha'
              placeholder='Digite sua nova senha'
              error={errors.password?.message}
              isPassword
            />
            <ControlledTextfield
              control={control}
              name='confirmPassword'
              title='Confirme a Nova Senha'
              placeholder='Digite sua nova senha'
              error={errors.confirmPassword?.message}
              isPassword
            />
            <TouchableOpacity
              style={{ backgroundColor: '#C61414', paddingHorizontal: 70, paddingVertical: 10, borderRadius: 30, marginTop: 40 }}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              <Text style={{ fontSize: 16, color: '#ffffff', fontWeight: 'bold' }}>Concluído</Text>
            </TouchableOpacity>
          </ScrollView>
        </ContentCard>
      </Background>
    </>
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
  logoCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPicture: {
    aspectRatio: 1,
    borderRadius: 80,
    width: 210,
  },
});
