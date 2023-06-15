import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 0,
    color: '#827572',
    borderColor: 'transparent',
    borderWidth: 0.5,
    height: 44,
  },
  btnPress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 0,
    color: '#827572',
    borderColor: 'transparent',
    borderWidth: 0.5,
    height: 44,
  },
  btnContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    marginRight: 5,
  },
});

const CustomTextBtn = ({ text, icon, onPress }) => {
  const [isPress, setIsPress] = React.useState(false);
  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.btnPress : styles.btn,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => onPress()
  };

  return (
    <TouchableHighlight {...touchProps}>
      <View style={styles.btnContent}>
        {icon && <Ionicons style={styles.btnIcon} name={icon} size={24} color="black" />}
        {text && <Text>{text}</Text>}
      </View>
    </TouchableHighlight>
  );
};

export default CustomTextBtn;
