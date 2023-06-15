import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  ToastAndroid
} from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';

import CustomBtn from '../../components/UI/CustomBtn';
import AlbumList from '../../components/AlbumScreen/AlbumList';
import AlbumPopup from '../../components/AlbumScreen/AlbumPopup';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    height: windowHeight + 35,
    backgroundColor: '#F7F6F0',
    paddingTop: 100,
    paddingBottom: 60,
  },
  scrollView: {
    paddingHorizontal: 24,
    paddingBottom: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .4)',
    marginBottom: 24,
  },
  albumHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
});

const AlbumScreen = () => {
  const [hasGalleryPermissionStatus, setHasGalleryPermissionStatus] = React.useState(null);
  const [photos, setPhotos] = React.useState([]);
  const [selectedPhoto, setSelectedPhoto] = React.useState(null);
  const [openImage, setOpenImage] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissionStatus(galleryStatus.status === 'granted');
      getMediaLibraryAssetsFromAlbum("Bracets").then((assets) => {
        setPhotos(assets);
      });
    })();
  }, []);

  async function getMediaLibraryAssetsFromAlbum(albumName) {
    const albums = await MediaLibrary.getAlbumsAsync();
    const album = albums.find((a) => a.title === albumName);
  
    if (!album) {
      throw new Error(`Album "${albumName}" not found!`);
    }
  
    const options = {
      album: album.id,
    };
  
    const { assets } = await MediaLibrary.getAssetsAsync(options);

    assets.forEach(el => {
      el.date = moment(new Date(el.modificationTime)).format('DD.MM.YYYY');
    });

    console.log('assets: ', assets);
    return assets;
  }
  
  const removePhoto = async (photo) => {
    console.log('Удалить', photo);
    try {
      await MediaLibrary.deleteAssetsAsync([photo.id]); // Удаляем желаемые файлы
      console.log("Фото удалено");
      getMediaLibraryAssetsFromAlbum("Bracets")
        .then((assets) => {
          console.log('assets: ', assets);
          setPhotos(assets || []);
        })
        .catch(err => setPhotos([]));
      ToastAndroid.show('Фото удалено', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Ошибка при удалении фото ' + error, ToastAndroid.SHORT);
      console.log("Ошибка при удалении фото: ", error);
    }  
  };

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (perm.status != 'granted') return;
      
      try {
        const asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
        const album = await MediaLibrary.getAlbumAsync('Bracets');

        if (album == null) {
          await MediaLibrary.createAlbumAsync('Bracets', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }      

        console.log('album: ', album);

        getMediaLibraryAssetsFromAlbum("Bracets").then((assets) => {
          setPhotos(assets);
        });

        ToastAndroid.show('Фото добавлено', ToastAndroid.SHORT);
      } catch (error) {
        console.error('error: ', error);
      }
    }
  };

  if (hasGalleryPermissionStatus === false) {
    return <Text>Нет доступа к внутренней памяти</Text>
  }

  const onPressImage = (photo) => {
    setSelectedPhoto(photo);
    setOpenImage(true);
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Альбом</Text>
        <Text style={styles.text}>
          Добавляй фото и следи за прогрессом
        </Text>

        <View style={styles.albumHeader}>
          <CustomBtn
            text="Добавить фото"
            icon="camera-outline"
            onPress={() => handleChoosePhoto()}
          />
        </View>

        <AlbumList
          photos={photos}
          onPressImage={(photo) => onPressImage(photo)}
          removeItem={removePhoto}
        />
        <AlbumPopup
          open={openImage}
          photo={selectedPhoto}
          close={() => setOpenImage(false)}
        />
      </ScrollView>
    </View>
  );
};

export default AlbumScreen;
