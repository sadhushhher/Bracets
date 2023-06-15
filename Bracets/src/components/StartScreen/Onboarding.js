import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableHighlight,
  Alert,
  FlatList,
  Animated,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import Svg, { Circle, G } from 'react-native-svg';
import StartScreenOnboardingItem from './OnboardingItem';
import TokenStorage from '../../utils/TokenStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    // width: windowWidth - 64,
    height: windowHeight,
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtn: {
    borderRadius: 100,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 32,
  },
  nextBtnPress: {
    borderRadius: 100,
    backgroundColor: '#FBF7F4',
    padding: 20,
    marginBottom: 32,
  }
});

const StartScreenOnboarding = () => {
  const [isPress, setIsPress] = React.useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);
  const navigation = useNavigation();
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const slidesRef = React.useRef(null);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.nextBtnPress : styles.nextBtn,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => nextPage()
  };

  const slides = [
    {
      id: 0,
      title: 'Добро пожаловать!',
      text: "С этим приложением легко отслеживать процесс ношения брекетов, следить за графиком активации и многое другое.",
      image: require('../../assets/waving-hand.png'),
    },
    {
      id: 1,
      title: 'Смотри что в календаре',
      text: 'Добавляй визиты, события и фотографии через календарь. Там же их можно просматривать, редактировать и удалять',
      image: require('../../assets/calendar.png'),
    },
    {
      id: 2,
      title: 'Улыбнись, тебе идут брекеты',
      text: 'Альбом создан чтобы хранить фотографии твоих зубов в хронологическом порядке.',
      image: require('../../assets/braces.png'),
    },
    {
      id: 3,
      title: 'Заходи в настройки',
      text: 'Установи дату начала ножения брекетов и информацию о своей клинике. Благодаря этому приложение сможет считать твои дни до важных событий.',
      image: require('../../assets/gear.png'),
    },
  ];

  const viewableItemsChanged = React.useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = React.useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const nextPage = () => {
    if (currentIndex < slides.length -1)
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    else
      navigation.navigate('SignIn');
  }

  const storeData = async () => {
    setIsFirstLaunch(true);
    try {
      const tokenStorage = new TokenStorage('isFirstLaunch');
      const isFirst = await tokenStorage.getItem();
      if (isFirst === 'true') {
        navigation.navigate('SignIn');
        return;
      }
      if (isFirst === 'false' || isFirst === null) {
        setIsFirstLaunch(false);
        tokenStorage.setItem('true');
      }
      console.log('await tokenStorage: ', await tokenStorage.getItem());
    } catch (error) {
      Alert.alert('Ошибка', 'Не стработал сохранение состояния приложения', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  useEffect(() => {
    storeData();
  }, []);

  return (
    <View style={styles.container}>
      {!isFirstLaunch && (
        <>
          <FlatList
            data={slides}
            renderItem={({ item }) => <StartScreenOnboardingItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )
            }
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
          <View style={styles.btn}>
            {/* <Svg width={size} height={size} style={styles.svgIcon}>
              <G rotation="-90" origin={center}>
                <Circle
                  stroke="#fff"
                  cx={center}
                  cy={center}
                  strokeWidth={strokeWidth}
                />
                <Circle
                  stroke="#fefefe"
                  cx={center}
                  cy={center}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (circumference * 25) / 100}
                />
              </G>
            </Svg> */}
            <TouchableHighlight {...touchProps}>
              <AntDesign name="arrowright" size={32} color="black" />
            </TouchableHighlight>
          </View>
        </>
      )}
    </View>
  );
};

export default StartScreenOnboarding;
