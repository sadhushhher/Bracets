import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TokenStorage from './src/utils/TokenStorage';
// "expo-dev-client": "~2.0.1",
// import 'expo-dev-client';

import { AuthProvider } from './src/navigation/AuthProvider';
import StartScreen from './src/sreens/StartScreen/StartScreen';
import MainScreen from './src/sreens/MainScreen/MainScreen';
import SignIn from './src/sreens/Auth/SignIn';
import SignUp from './src/sreens/Auth/SignUp';

export default function App() {
  // React.useEffect(() => {
  //   // const tokenStorage = new TokenStorage('isFirstLaunch');
  //   // tokenStorage.setItem('false');
  // }, [])
  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="SignIn"
            options={{ headerShown: false }}
            component={SignIn}
          />

          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUp}
          />
          
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={StartScreen}
          />

            <Stack.Screen
              name="Main"
              options={{ headerShown: false }}
              component={MainScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
