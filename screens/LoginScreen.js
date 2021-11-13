import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Input, Button} from "react-native-elements";

const LoginScreen = (navigation) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={style.container}>
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
            <Button title="sign in" style={style.button} />
            <Button title="register" style={style.button} onPress={()=>navigation.navigate('Register') } />
        </View>
    )
}

export default LoginScreen;
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