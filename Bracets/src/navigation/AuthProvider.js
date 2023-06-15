import React, { createContext, useState } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

const ValidateEmail = (input) => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

const ShowAlert = (title, text) => {
  Alert.alert(title, text, [
    {
      text: 'Ок',
      onPress: () => console.log('Ок'),
      style: 'cancel',
    },
    // {text: 'Ок', onPress: () => console.log('OK Pressed')},
  ]);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register: async (email, password) => {
          try {
            // await auth().signInWithEmailAndPassword(email, password);
            if (!ValidateEmail(email)) {
              ShowAlert('Не валидный Email', 'Введите валидный Email');
              return;
            }

            let value = await AsyncStorage.getItem('@users');

            if (value === null) {
              await AsyncStorage.setItem(
                '@users',
                JSON.stringify([{ id: uuid.v4(), email, password }])
              );
            }
            if (value !== null) {
              await AsyncStorage.setItem(
                '@users',
                JSON.stringify([...value, { id: uuid.v4(), email, password }])
              );
            }

            await AsyncStorage.setItem('@loggedIn', 'true');

            value = await AsyncStorage.getItem('@users');

            console.log('register: ', value);
            return await AsyncStorage.getItem('@loggedIn') === 'true';;
          } catch (error) {
            console.error('Error register: ', error);
            ShowAlert('Ошибка регистрации', '');
          }
        },
        login: async (email, password) => {
          console.log('login: ', email, password);
          try {
            // await auth().createUserWithEmailAndPassword(email, password);
            if (!ValidateEmail(email)) {
              ShowAlert('Не валидный Email', 'Введите валидный Email');
              return;
            }

            let value = await AsyncStorage.getItem('@users');

            if (!value) {
              ShowAlert('Неверный логин или пароль', '');
              return;
            }

            const result = JSON.parse(value).find(el =>
              el.email === email && el.password === password
            );

            if (result) await AsyncStorage.setItem('@loggedIn', 'true');
            else {
              ShowAlert('Неверный логин или пароль', '');
              return;
            }

            value = await AsyncStorage.getItem('@users');

            console.log('login: ', value);
            return await AsyncStorage.getItem('@loggedIn') === 'true';
          } catch (error) {
            console.error('Error login: ', error);
            ShowAlert('Неверный логин или пароль', '');
          }
        },
        logout: async () => {
          console.log('logout');
          try {
            // await auth().signOut()
            await AsyncStorage.setItem('@loggedIn', 'false');
          } catch (error) {
            console.error('Error logout: ', error);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};
