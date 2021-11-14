import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {auth, signOut} from "../firebase";
import {AntDesign} from '@expo/vector-icons';
import {Avatar} from "react-native-elements";
import {TouchableOpacity} from "react-native-gesture-handler";

const ChatScreen = ({navigation}) => {

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
        <View>
            <Text>Chat Screen</Text>
        </View>
    )
}

export default ChatScreen;