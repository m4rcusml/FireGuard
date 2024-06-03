import Realm from 'realm';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { Bubble, BubbleProps, GiftedChat, IMessage, Send, SendProps } from 'react-native-gifted-chat';
import { Background } from '../../components/Background';
import { PaperPlaneTilt } from 'phosphor-react-native';
import Logo from '../../assets/Logo';
import { useQuery, useRealm, useUser } from '@realm/react';
import { UserSchema } from '../../contexts/UserSchema';
import { Message } from '../../contexts/MessageSchema';

const SendComponent = (props: SendProps<IMessage>) => {
  return (
    <Send {...props}>
      <View style={{ flexDirection: 'row' }}>
        <PaperPlaneTilt
          style={{ marginBottom: 10, marginRight: 10 }}
          size={25}
          color='#fd5050'
        />
      </View>
    </Send>
  );
}

export function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const realm = useRealm();
  const user = useUser();
  const userProfile = useQuery<UserSchema>('user').filtered('userId == $0', user.id);
  const messageQuery = useQuery<Message>('Message').sorted('createdAt', true);

  useEffect(() => {
    if (!user) return;
    const formattedMessages = messageQuery.map((msg: Message) => ({
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
  }, [realm, messageQuery.length]);

  const renderCustomBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        renderMessageText={messageProps => {
          const isCurrentUser = messageProps.currentMessage?.user?._id === user?.id;
          const currentMessage = messageProps.currentMessage;
          const nextMessage = messageProps.nextMessage;
          const previousMessage = messageProps.previousMessage;
  
          // Verifica se a próxima mensagem é do mesmo usuário
          const isNextMessageFromSameUser = nextMessage?.user?._id === currentMessage?.user?._id;
  
          // Verifica se a mensagem anterior não é do mesmo usuário
          const isPreviousMessageFromDifferentUser = previousMessage?.user?._id !== currentMessage?.user?._id;
  
          return (
            <View style={[styles.customMessageContainer, { backgroundColor: isCurrentUser ? '#fd5050' : '#e3e3e3' }]}>
              {!isCurrentUser && isPreviousMessageFromDifferentUser && (
                <Text style={styles.usernameText}>{currentMessage?.user.name}</Text>
              )}
              <Text style={{ color: isCurrentUser ? '#ffffff' : '#000000', marginVertical: 3 }}>
                {currentMessage?.text}
              </Text>
            </View>
          );
        }}
        wrapperStyle={{
          right: {
            backgroundColor: '#fd5050'
          },
          left: {
            backgroundColor: '#e3e3e3'
          }
        }}
      />
    );
  }
  


  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    newMessages.forEach((message: IMessage) => {
      realm.write(() => {
        realm.create('Message', {
          text: message.text,
          user: userProfile[0],
          createdAt: new Date(),
        });
      });
    });
  }, [realm, user]);

  return (
    <Background solidColor='white' style={{ paddingTop: 0 }}>
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
          _id: user?.id,
          name: userProfile[0]?.name,
        }}
        renderBubble={renderCustomBubble}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  customMessageContainer: {
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
    minWidth: 100,
  },
  usernameText: {
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 2,
  },
});
