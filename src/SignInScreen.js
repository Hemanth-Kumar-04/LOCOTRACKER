import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signIn } from './auth';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Sign In Error:', error.message);
    }
  };

  return (
    <View>
      <Text>Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

export default SignInScreen;
