import { Image, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage, Send, SendProps } from 'react-native-gifted-chat';
import { Background } from '../../components/Background';
import { PaperPlaneTilt } from 'phosphor-react-native';
import Logo from '../../assets/Logo';

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
  )
}

export function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Fala fi',
        createdAt: new Date(2015, 10, 13),
        user: {
          _id: 2,
          name: 'React Native'
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
        onSend={messages => onSend(messages)}
        renderSend={props => <SendComponent {...props} />}
        user={{
          _id: 1,
          name: 'm4rcusml',
        }}
      />
    </Background>
  )
}