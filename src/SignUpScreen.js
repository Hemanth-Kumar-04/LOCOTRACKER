import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUser } from './auth';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUser(email, password);
    } catch (error) {
      console.error('Sign Up Error:', error.message);
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Already have an account? Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
};

export default SignUpScreen;
