import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Background } from '../../../components/Background';
import { ContentCard } from '../../../components/ContentCard';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ControlledTextfield } from '../../../components/ControlledInput';

const userSignupDataSchema = z.object({
  email: z.string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório')
    .email('Email inválido')
    .toLowerCase(),
  password: z.string({ required_error: 'Campo obrigatório' })
    .min(8, 'O mínimo é 8 caracteres'),
  password_confirm: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Confirme sua senha')
})
  .refine(fields => fields.password === fields.password_confirm, {
    path: ['password_confirm'],
    message: 'As senhas devem ser iguais'
  });

type userSignDataType = z.infer<typeof userSignupDataSchema>;

export function SignUp({ handleIsNewUser }: { handleIsNewUser(): void }) {

  const { control, handleSubmit, formState: { errors } } = useForm<userSignDataType>({
    resolver: zodResolver(userSignupDataSchema)
  });


  return (
      <ContentCard style={{ paddingHorizontal: 30, paddingVertical: 35, gap: 25, alignItems: 'center', }}>
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
          placeholder='**************'
          error={errors.password?.message}
        />
        <TouchableOpacity style={styles.buttonLogin} >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} >Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.commonText}>Esqueceu a senha?
          <Text style={styles.touchableText}> Clique aqui</Text>
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <View style={styles.divisor} />
          <Text>ou</Text>
          <View style={styles.divisor} />
        </View>
        <Text style={styles.commonText}>Não tem conta?
          <Text style={styles.touchableText} > Cadastre-se</Text>
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
    fontSize: 12,
  },
  touchableText: {
    color: '#FFC700',
  },
  image: {
    width: 24,
    height: 24,

  },


});