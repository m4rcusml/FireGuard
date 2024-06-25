import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Logo from '../../../assets/Logo.svg';
import { Background } from '../../../components/Background';
import { ContentCard } from '../../../components/ContentCard';
import { ControlledTextfield } from '../../../components/ControlledInput';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEmailPasswordAuth } from '@realm/react';

const userResetPasswordSchema = z.object({
  email: z.string({ required_error: 'Campo obrigatório' }).email('E-mail inválido').min(1, 'Campo obrigatório'),
})

type userResetPasswordType = z.infer<typeof userResetPasswordSchema>;

export function ForgotPassword() {
  const { control, handleSubmit, formState: { errors } } = useForm<userResetPasswordType>({
    resolver: zodResolver(userResetPasswordSchema)
  });

  const { sendResetPasswordEmail, result } = useEmailPasswordAuth();

  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ email }: userResetPasswordType) => {
    setLoading(true);
    try {
      await sendResetPasswordEmail({ email });
    } catch (error) {
      Alert.alert('Erro ao enviar email de redefinição de senha. Tente novamente.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (result.success) {
      Alert.alert('Email de redefinição de senha enviado com sucesso!');
      setLoading(false);
    } else if (result.error) {
      if (result.error.message === 'Error: user not found') {
        Alert.alert('Ops...Ocorreu um Erro: Usuário não encontrado');
      } else {
        Alert.alert('Ocorreu um erro', result.error.message);
      }
      setLoading(false);
    }
  }, [result]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
      />
      <Background>
        <View style={styles.logoCard}>
          <Logo
            style={styles.logoPicture}
          />
        </View>
        <ContentCard style={{ paddingHorizontal: 30, alignItems: 'center', paddingVertical: 60, gap: 15 }} >
          <Text style={{ fontSize: 16, color: '#C61414', textTransform: 'uppercase', fontWeight: 'bold' }} >Esqueceu a senha</Text>
          <ControlledTextfield
            control={control}
            name='email'
            title='E-mail'
            placeholder='Digite seu E-mail'
            error={errors.email?.message}
          />
          <TouchableOpacity
            style={{ backgroundColor: '#C61414', paddingHorizontal: 70, paddingVertical: 10, borderRadius: 30, marginTop: 25, }}
            onPress={handleSubmit(resetPassword)}
            disabled={loading}
          >
            <Text style={{ fontSize: 16, color: '#ffffff', fontWeight: 'bold' }}>
              {loading ? 'Enviando...' : 'Enviar código'}
            </Text>
          </TouchableOpacity>
        </ContentCard>
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
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
