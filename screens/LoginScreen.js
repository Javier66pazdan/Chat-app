import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from "react-native-elements";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
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
        </View>
    )
}

export default LoginScreen;