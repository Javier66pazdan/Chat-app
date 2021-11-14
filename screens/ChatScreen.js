import React, { useLayoutEffect, useState, useCallback, useEffect} from 'react';
import { View, Text } from 'react-native';
import { auth, signOut, db, collection, addDoc } from "../firebase";
import {AntDesign} from '@expo/vector-icons';
import {Avatar} from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0]
        const messg = await addDoc(collection(db, 'chats'),{
            _id,
            createdAt,
            text,
            user
        })
        console.log(messg.text);
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View>
                    <Avatar style={{marginLeft: 20}}
                        rounded
                        source={{
                            // uri: auth?.currentUser?.photoURL
                            uri: "https://i.imgur.com/9pNffkj.png"
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 30
                }} onPress={signOutOfChat}>
                <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
            )
        })
    }, [])

    const signOutOfChat = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
    )
}

export default ChatScreen;