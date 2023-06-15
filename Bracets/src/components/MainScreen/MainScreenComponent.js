import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    height: windowHeight + 35,
    backgroundColor: '#F7F6F0',
    paddingTop: 50,
    paddingHorizontal: 24,
  }
});

const MainScreenComponent = () => {
  return (
    <View style={styles.root}>
      <Text>Привет</Text>
    </View>
  );
};

export default MainScreenComponent;
