import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Background } from '../../../components/Background';
import { ContentCard } from '../../../components/ContentCard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ControlledTextfield } from '../../../components/ControlledInput';
import { useCallback, useEffect, useState } from 'react';
import { useEmailPasswordAuth, useQuery, useRealm } from '@realm/react';

const userSignupDataSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
  email: z.string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório')
    .email('Email inválido')
    .toLowerCase(),
  password: z.string({ required_error: 'Campo obrigatório' })
    .min(8, 'O mínimo é 8 caracteres'),
  passwordConfirm: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Confirme sua senha')
})
  .refine(fields => fields.password === fields.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'As senhas devem ser iguais',
  });

type userSignDataType = z.infer<typeof userSignupDataSchema>;

export function SignUp({ handleIsNewUser }: { handleIsNewUser(): void }) {
  const { register, result } = useEmailPasswordAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<userSignDataType>({
    resolver: zodResolver(userSignupDataSchema)
  });

  const [hasCreated, setHasCreated] = useState(false);

  function handleSignUp(data: userSignDataType) {
    register(data);
    setHasCreated(true);
  }


  useEffect(() => {
    if (!result.pending) {
      if (result.success && hasCreated) {
        Alert.alert('Conta criada!', 'Sua conta foi criada com sucesso, volte e faça login.');
      }
    }
  }, [result]);


  return (
    <ContentCard style={{ paddingHorizontal: 30, paddingVertical: 35, gap: 25, alignItems: 'center', }}>
      <ControlledTextfield
        control={control}
        name='name'
        title='Nome'
        placeholder='Digite seu nome'
        error={errors.name?.message}
      />
      <ControlledTextfield
        control={control}
        name='email'
        title='E-mail'
        placeholder='Digite seu E-mail'
        error={errors.email?.message}
      />
      <ControlledTextfield
        control={control}
        name='password'
        title='Senha'
        isPassword={true}
        placeholder='**************'
        error={errors.password?.message}
      />
      <ControlledTextfield
        control={control}
        name='passwordConfirm'
        title='Confirmar senha'
        isPassword={true}
        placeholder='**************'
        error={errors.passwordConfirm?.message}
      />
      <TouchableOpacity style={styles.buttonLogin} onPress={handleSubmit(handleSignUp)}  >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Cadastrar</Text>
      </TouchableOpacity>
      <Text style={styles.commonText} onPress={handleIsNewUser} >Já tem uma conta?
        <Text style={styles.touchableText} > Entrar</Text>
      </Text>
    </ContentCard>
  )
}

const styles = StyleSheet.create({
  buttonLogin: {
    paddingHorizontal: 70,
    paddingVertical: 10,
    backgroundColor: '#C61414',
    borderRadius: 30,
  },
  divisor: {
    backgroundColor: '#C61414',
    height: 1,
    flex: 1,
  },
  commonText: {
    color: '#C61414',
    fontSize: 14,
  },
  touchableText: {
    color: '#FFC700',
  },
  image: {
    width: 24,
    height: 24,

  },


});