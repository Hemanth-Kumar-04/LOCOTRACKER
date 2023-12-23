import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './src/SignInScreen';
import SignUpScreen from './src/SignUpScreen';
import MapViewComponent from './src/MapViewComponent';
import ProfileScreen from './src/ProfileScreen';
import { isUserAuthenticated, onAuthStateChangedListener } from './src/auth';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="MapView" component={() => <MapViewComponent userId={user.uid} />} />
            <Stack.Screen name="Profile" component={() => <ProfileScreen userId={user.uid} />} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
