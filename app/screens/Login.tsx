import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, Keyboard, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig'; // Adjust the import path as necessary
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Login component

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            // Add your sign-in logic here using auth
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', response.user);
            alert('Check your email');
        } catch (error: any) {
            console.error('Error signing in:', error);
            alert('Error signing in: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            // Add your sign-in logic here using auth
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up:', response.user);
            alert('Check your email');
        } catch (error: any) {
            console.error('Error signing up:', error);
            alert('Error signing up: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

  return (
    <View style = {styles.container}>
        <KeyboardAvoidingView behavior="padding">
            <Text>Login Screen</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                { loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Button title="Login" onPress={signIn} />
                        <Button title="Create Account" onPress={signUp} />
                    </> 
                    )}
        </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor : '#fff',
    }
});
