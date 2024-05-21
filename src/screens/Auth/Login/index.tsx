import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Background } from '../../../components/Background';
import { ContentCard } from '../../../components/ContentCard';
import Logo from '../../../assets/Logo';
import { ControlledTextfield } from '../../../components/ControlledInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Facebook from '../../../assets/Facebook';
import Google from '../../../assets/Google';


const userLoginDataSchema = z.object({
  email: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
  password: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
})

type userLoginDataType = z.infer<typeof userLoginDataSchema>;

export function Login() {

  const { control, register, handleSubmit, formState: { errors } } = useForm<userLoginDataType>({
    resolver: zodResolver(userLoginDataSchema)
  });

  return (
    <Background>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: Logo }}
          style={styles.profilePicture}
        />
      </View>

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
        <TouchableOpacity style={styles.buttonLogin}  >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} >Entrar</Text>
        </TouchableOpacity>
        <Text style={{ color: '#C61414', fontSize: 12 }}>Esqueceu a senha?
          <Text style={{ color: '#FFC700' }}> Clique aqui</Text>
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          <View style={{ height: 1, flex: 1, backgroundColor: '#C61414' }}></View>
          <Text>ou</Text>
          <View style={{ height: 1, flex: 1, backgroundColor: '#C61414' }}></View>
        </View>
        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Image width={24} height={24} source={{ uri: Google }} />
          <Image width={24} height={24} source={{ uri: Facebook }} />
        </View>
        <Text style={{ color: '#C61414', fontSize: 12 }}>Não tem conta?
          <Text style={{ color: '#FFC700' }}> Cadastre-se</Text>
        </Text>
      </ContentCard>
    </Background>
  )
}

const styles = StyleSheet.create({
  profileCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    aspectRatio: 1,
    borderRadius: 80,
    width: 210,
  },
  profileName: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    fontWeight: '500',
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  buttonLogin: {
    paddingHorizontal: 70,
    paddingVertical: 10,
    backgroundColor: '#C61414',
    borderRadius: 30,
  },


});