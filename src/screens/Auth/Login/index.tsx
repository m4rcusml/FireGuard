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
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { AuthRoutesType } from '../../../routes/auth.routes';


const userLoginDataSchema = z.object({
  email: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
  password: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Campo obrigatório'),
})

type userLoginDataType = z.infer<typeof userLoginDataSchema>;

export function Login({ handleIsNewUser }: { handleIsNewUser(): void }) {

  const { control, register, handleSubmit, formState: { errors } } = useForm<userLoginDataType>({
    resolver: zodResolver(userLoginDataSchema)
  });

  const {navigate}= useNavigation<NavigationProp<AuthRoutesType>>();

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
        <TouchableOpacity style={styles.buttonLogin} onPress={() => navigate('signup')} >
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
        <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Image style={styles.image} source={{ uri: Google }} />
          <Image style={styles.image} source={{ uri: Facebook }} />
        </View>
        <Text style={styles.commonText}>Não tem conta?
          <Text style={styles.touchableText} onPress={() => navigate('signup')} > Cadastre-se</Text>
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