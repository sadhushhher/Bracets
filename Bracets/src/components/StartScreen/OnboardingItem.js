import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  Image,
} from 'react-native';
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold_Italic,
} from '@expo-google-fonts/open-sans';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// const bg = require('../../assets/bg.png');

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 16,
    width: windowWidth,
    height: windowHeight + 32,
  },
  content: {
    position: 'absolute',
    right: 0,
    width: windowWidth,
    padding: 32,
    bottom: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: windowWidth - 20,
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 24,
    color: '#151515',
    fontFamily: 'OpenSans_800ExtraBold',
  },
  text: {
    width: windowWidth - 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#151515',
    fontFamily: 'OpenSans_300Light',
    marginBottom: 100,
  },
});

const StartScreenOnboardingItem = ({ item }) => {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
  });
  const [page, setPage] = React.useState(0);
  const nextPage = () => {
    setPage(1);
  };
  const prevPage = () => {
    setPage(0);
  };


  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={item.image} style={{ width: 250, resizeMode: 'contain', }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  }
};

export default StartScreenOnboardingItem;
