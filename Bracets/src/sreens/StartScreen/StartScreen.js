import React from 'react';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
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

import StartScreenOnboarding from '../../components/StartScreen/Onboarding';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#CCC1BE',
  },
  container: {
    padding: 16,
    paddingTop: 200,
    paddingBottom: 64,
    flex: 1,
  },
});

const StartScreen = () => {
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

  if (fontsLoaded) {
    return (
      <View style={styles.main}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <ScrollView>
          <StartScreenOnboarding />
        </ScrollView>
      </View>
    );
  }
};

export default StartScreen;
