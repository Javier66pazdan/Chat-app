import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from "react-native-elements";
import {auth, onAuthStateChanged, signInWithEmailAndPassword} from "../firebase";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                navigation.replace('Chat');
            } else {
                // User is signed out
                // ...
            }
        });
        return unsubscribed;
    }, []);

    return (
        <View style={styles.container}>
            <Input
            placeholder="Enter your email"
            label="Email"
            leftIcon={{type: 'material', name: 'email'}}
            value={email}
            onChangeText={text => setEmail(text)}
            />

            <Input
                placeholder="Enter your password"
                label="Password"
                leftIcon={{type: 'material', name: 'lock'}}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title="sign in" onPress={signIn} style={styles.button} />
            <Button title="register" style={styles.button} onPress={()=>navigation.navigate('Register')} />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    }
})

export default LoginScreen;