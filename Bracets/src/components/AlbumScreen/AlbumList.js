import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableHighlight,
  Pressable,
  ToastAndroid,
  Text
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 20,
  },
  photos: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  photo: {
    width: windowWidth / 2 - 32,
    height: windowWidth / 2 - 32,
    marginRight: 8,
    marginBottom: 8,
    overflow: 'hidden',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    color: 'white',
    paddingTop: 10,
    marginLeft: 'auto',
  },
  text: {
    color: 'gray',
    paddingTop: 10,
  },
  relative: {
    position: 'relative',
  },
  btn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
    padding: 5,
    // backgroundColor: 'transparent',
  },
  btnPress: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
    padding: 5,
    // backgroundColor: 'transparent',
  },
  dflex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const AlbumList = ({ photos, onPressImage, removeItem }) => {
  const [isPress, setIsPress] = useState(false);
  const [dates, setDates] = useState([]);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.btnPress : styles.btn,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
  };

  useEffect(() => {
    const result = photos.reduce((acc, item) => {
      if (acc.includes(item.date)) {
        return acc; // если значение уже есть, то просто возвращаем аккумулятор
      }
      return [...acc, item.date]; // добавляем к аккумулятору и возвращаем новый аккумулятор
    }, []);
    setDates(result);
    console.log('result: ', result);
  }, [photos]);

  return (
    <View>
      {dates.map(date => (
        <View key={date}>
          <Text style={styles.title}>{date}</Text>
          <View style={styles.photos}>
            {photos
              .filter(photo => photo.date === date)
              .map((photo, i) => (
                <TouchableHighlight
                  {...touchProps}
                  onPress={() => onPressImage(photo)}
                  style={styles.photo}
                  key={i}
                >
                  <View style={styles.relative}>
                    <Image
                      source={{ uri: photo.uri }}
                      style={styles.image}
                    />

                    <TouchableHighlight {...touchProps} onPress={() => removeItem(photo)}>
                      <Feather name="trash-2" size={15} color="white" />
                      {/* <Text style={styles.removeBtn}>Удалить</Text> */}
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              ))}
          </View>
        </View>))}
    </View>
  );
};

export default AlbumList;
