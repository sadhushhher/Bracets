import React, { useEffect } from 'react';
import {
  Modal,
  TouchableHighlight,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#F7F6F0',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#827572',
    height: 44,
  },
  btnPress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#827572',
    height: 44,
  },
  image: {
    position: 'relative',
    top: '40%',
    width: '100%',
    height: '100%',
  },
  popupHeader: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

const AlbumPopup = ({ open, photo, close }) => {
  const [isPress, setIsPress] = React.useState(false);
  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.btnPress : styles.btn,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => close()
  };

  const getHeight = (photo) => {
    console.log('photo: ', photo);
    console.log('windowWidth: ', windowWidth);
    console.log('windowHeight: ', windowHeight);
    console.log(windowWidth / photo.width * 100);
    console.log(photo.height * (windowHeight / photo.height));

    return photo.height * (windowWidth / photo.height);
  };

  return (
    <Modal animationType="slide" visible={open}>
      <View style={styles.modal}>
        <View style={styles.popupHeader}>
          <TouchableHighlight {...touchProps}>
            <Ionicons style={styles.btnIcon} name={'close'} size={24} color="black" />
          </TouchableHighlight>
        </View>
        {photo && <Image
          source={{ uri: photo.uri }}
          style={{...styles.image, width: windowWidth, height: getHeight(photo)}}
        />}
      </View>
    </Modal>
  );
};

export default AlbumPopup;
