import Realm from 'realm';
import { Image, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage, Send, SendProps } from 'react-native-gifted-chat';
import { Background } from '../../components/Background';
import { PaperPlaneTilt } from 'phosphor-react-native';
import Logo from '../../assets/Logo';
import { useRealm, useUser } from '@realm/react';
import { UserSchema } from '../../contexts/UserSchema';
import { Message } from '../../contexts/MessageSchema';

const SendComponent = (props: SendProps<IMessage>) => {
  return (
    <Send {...props}>
      <View style={{ flexDirection: 'row' }}>
        <PaperPlaneTilt
          style={{ marginBottom: 10, marginRight: 10 }}
          size={25}
          color='orange'
        />
      </View>
    </Send>
  );
}

export function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const realm = useRealm();
  const user = useUser();
  const userProfile = realm.objects<UserSchema>('user').filtered('userId == $0', user.id);

  useEffect(() => {
    if (!user) return;
    const messageQuery = realm.objects<Message>('Message').filtered('user.userId == $0', user.id).sorted('createdAt', true);

    const formattedMessages = messageQuery.map(msg => ({
      _id: msg._id.toHexString(),
      text: msg.text,
      createdAt: new Date(msg.createdAt ?? Date.now()),
      user: {
        _id: msg.user.userId,
        name: msg.user.name,
        avatar: msg.user.imageProfile,
      },
    }));
    setMessages(formattedMessages);
  }, [realm, user]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    newMessages.forEach(message => {
      realm.write(() => {
        realm.create('Message', {
          _id: new Realm.BSON.ObjectId(),
          text: message.text,
          user: { userId: user.id, name: 'Unknown' }, // Modifique conforme a necessidade para obter o nome
          createdAt: new Date(),
        });
      });
    });
  }, [realm, user]);

  return (
    <Background solidColor='white' usePaddingTop>
      <Image
        source={{ uri: Logo }}
        style={{
          transform: [{ translateX: -160 }, { translateY: -160 }],
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 320,
          opacity: 0.2,
          aspectRatio: 1,
        }}
      />
      <GiftedChat
        alwaysShowSend
        messages={messages}
        placeholder='Escreva alguma coisa'
        onSend={onSend}
        renderSend={props => <SendComponent {...props} />}
        user={{
          _id: user?.id,  // Certifique-se de que o usuário está definido
          name: userProfile[0].name,
        }}
      />
    </Background>
  );
}
