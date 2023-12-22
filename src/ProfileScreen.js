// src/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { getAuth, updateProfile } from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateProfileData } from './database';

const ProfileScreen = ({ userId }) => {
  const auth = getAuth();
  const [displayName, setDisplayName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || '');
      setProfilePhoto(user.photoURL || null);
    }
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL: profilePhoto });
      updateProfileData(userId, { displayName, profilePhoto });
    } catch (error) {
      console.error('Update Profile Error:', error.message);
    }
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setProfilePhoto(response.uri);
      }
    });
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      {profilePhoto && <Image source={{ uri: profilePhoto }} style={{ width: 100, height: 100 }} />}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <TextInput
        placeholder="Display Name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

export default ProfileScreen;
