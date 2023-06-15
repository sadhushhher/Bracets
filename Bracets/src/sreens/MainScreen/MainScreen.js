import React, { useContext, useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../navigation/AuthProvider';
import HomeScreen from '../HomeScreen/HomeScreen';
import CalendarScreen from '../CalendarScreen/CalendarScreen';
import AlbumScreen from '../AlbumScreen/AlbumScreen';
import SettingsScreen from '../SettingsScreen/SettingsScreen';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    height: windowHeight + 35,
  },
  title: {
    fontSize: 20,
  },
  text: {},
});

const MainScreen = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = async () => {
    if (initializing) setInitializing(false);

    let value = await AsyncStorage.getItem('@loggedIn');

    console.log('value: ', value);

    if (value !== 'true')
      navigation.navigate('SignIn');
  };

  useEffect(() => {
    onAuthStateChanged();
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <View style={styles.root}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          unmountOnBlur: true,
          headerShown: false,
          tabBarStyle:{
            boxShadow: false,
            border: false,
            backgroundColor: '#F7F6F0',
            height: 60,
          },
          tabBarItemStyle:{
            display: 'flex',
            margin:5,
            borderRadius:10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Главная') {
              iconName = focused
                ? 'md-home-outline'
                : 'md-home-outline';
            } else if (route.name === 'Календарь') {
              iconName = focused ? 'md-calendar-outline' : 'md-calendar-outline';
            } else if (route.name === 'Альбом') {
              iconName = focused ? 'md-image-outline' : 'md-image-outline';
            } else if (route.name === 'Настройки') {
              iconName = focused ? 'md-settings-outline' : 'md-settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#24282C',
          tabBarInactiveTintColor: 'gray',
        })}

      >
        <Tab.Screen
          name="Главная"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Календарь"
          component={CalendarScreen}
        />
        <Tab.Screen
          name="Альбом"
          component={AlbumScreen}
        />
        <Tab.Screen
          name="Настройки"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainScreen;
