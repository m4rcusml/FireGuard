import { useEffect, useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

import { Background } from '../../components/Background';
import { ControlledTextfield } from '../../components/ControlledInput';
import { useQuery, useRealm, useUser } from '@realm/react';
import { UpdateMode } from 'realm';
import { useNavigation } from '@react-navigation/native';

import { Camera } from 'phosphor-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { UserSchema } from '../../contexts/UserSchema';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { ContentCard } from '../../components/ContentCard';

const userUpdate = z.object({
  username: z.string({ required_error: 'Campo obrigatório' }).min(1, 'Preencha este campo'),
});

type userUpdateType = z.infer<typeof userUpdate>;

export function EditProfile() {
  const realm = useRealm();
  const user = useUser();

  const { goBack } = useNavigation();

  const userProfile = useQuery(UserSchema).filtered('userId == $0', user.id);

  const [profilePic, setProfilePic] = useState(userProfile[0].imageProfile || '');

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<userUpdateType>({
    resolver: zodResolver(userUpdate),
    defaultValues: {
      username: '', 
    }
  });

  async function handleEditProfilePic() {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const newBase64Image = 'data:image/jpeg;base64,' + result.assets[0].base64;
      setProfilePic(newBase64Image);

    }
  }

  useEffect(() => {
    if (userProfile[0]) {
      setValue('username', userProfile[0].name);
    }
  }, [userProfile, setValue]);

  function handleSave(data: userUpdateType) {

    if (userProfile[0]) {
      realm.write(() => {
        userProfile[0].name = data.username;
        userProfile[0].imageProfile = profilePic;


      });
      goBack();
    } else {
      console.log('Usuário não encontrado');
    }


  }

  return (
    <Background usePaddingTop>
      <ContentCard style={{ gap: 35, alignItems: 'center', paddingTop: 30 }}>
        <TouchableOpacity onPress={handleEditProfilePic} style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#C61414', borderRadius: 72, width: 146, height: 146 }} >
          <Image
            source={{ uri: profilePic }}
            width={144}
            height={144}
            borderRadius={144}
          />
          <Camera color="#ccc" size={64} style={{ position: 'absolute' }} />
        </TouchableOpacity>

        <ControlledTextfield
          control={control}
          name='username'
          title='Nome'
          placeholder='Digite seu novo nome'
          error={errors.username?.message}
        />

        <TouchableOpacity onPress={handleSubmit(handleSave)} style={{ backgroundColor: '#C61414', paddingHorizontal: 40, paddingVertical: 10, borderRadius: 20, }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }} >SALVAR</Text>
        </TouchableOpacity>
      </ContentCard>
    </Background>
  )
}