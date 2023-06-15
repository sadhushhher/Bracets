import React, { useEffect, useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/ru';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mt60: {
    marginTop: 60,
  },
  mt24: {
    marginTop: 24,
  },
  mb24: {
    marginBottom: 24,
  },
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
  homeHeader: {},
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
  },
  title2: {
    color: 'rgba(0, 0, 0, .4)',
    marginBottom: 8,
  },
  title3: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .4)',
    marginBottom: 24,
  },
  dflex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  days: {
    fontWeight: '900',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#827572',
  },
  daysText: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 6,
    marginLeft: 5,
    marginRight: 5,
  },
  date: {
    display: 'flex',
    alignItems: 'flex-start',
    flexGrow: 0,
  },
  dateBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // width: windowWidth - 48,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 24,
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dateText: {
    fontSize: 16,
    borderRadius: 10,
  },
  date1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 10,
    borderColor: '#CCC1BE',
    borderWidth: 0.5,
    padding: 24,
    paddingBottom: 28,
    marginBottom: 16,
  },
  date1Day: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#827572',
  },
  date1Month: {
    fontSize: 18,
    marginLeft: 5,
    marginBottom: 5,
    marginRight: 15,
    color: '#827572',
  },
  date1Time: {
    fontSize: 20,
    marginBottom: 5,
    paddingLeft: 15,
    borderLeftWidth: 0.5,
    borderLeftColor: '#CCC1BE',
    color: '#827572',
  },
  navigate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, .3)',
    borderBottomWidth: 0.3,
    paddingBottom: 16,
    marginBottom: 16,
  },
  navigateAdressBlock: {},
  navigateAdressName: {
    fontSize: 18,
    marginBottom: 6,
  },
  navigateAdress: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .4)',
  },
  navigateIcon: {
    borderColor: '#827572',
    borderWidth: 2,
    borderRadius: 100,
    padding: 16,
  },
  doctorTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  doctorInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doctorContacts: {
    display: 'flex',
    flexDirection: 'row',
  },
  doctorIcon: {
    marginRight: 16,
    color: '#827572',
    borderColor: '#827572',
  },
  btn: {
    backgroundColor: 'transparent',
  },
  btnPress: {
    backgroundColor: 'transparent',
  },
  recomends: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 100,
  },
  recomendsCard: {
    width: windowWidth - 96,
    height: 150,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 10,
    marginRight: 8,
    padding: 20,
  },
  recomendsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  recomendsText: {
    fontSize: 13,
    fontWeight: '300',
  },
});

const HomeScreen = () => {
  moment().locale('ru');

  const [left, setLeft] = useState();
  const [isPress, setIsPress] = useState(false);
  const navigation = useNavigation();
  const [recomendations, setRecomendations] = useState([
    {
      name: 'Важно',
      description: 'Если брекет отклеился, необходимо его сохранить и немедленно договориьться о приеме с лечащим врачом. Это касается и изменения положения зафиксировованного ортононтического кольца.'
    },
    {
      name: 'Важно',
      description: 'Не следует беспокоиться, если в первые 3-7 дней после установки брекет-системы будет некоторый дискомфорт или болевые ощущения в области зубов, а также травмирование щек и губ. Для облегчения привыкания к брекетам в этот период их заклеивают мягким воском.'
    },
    {
      name: 'Важно',
      description: 'Раз в месяц посещайте гигиениста-стоматолога для профессиональной гигиены и фторирования эмали лаками.'
    },
    {
      name: 'нельзя жевать, кусать и грызть',
      description: 'Мучное крахмалистое, хлебцы, печенье трудно вычистить с элементов брекет-системы'
    },
    {
      name: 'нельзя жевать, кусать и грызть',
      description: 'Сухарики и орехи, твердые карамельки могут повредить дугу'
    },
    {
      name: 'нельзя жевать, кусать и грызть',
      description: 'Сахаросодержащие сладости приводят к усиленному размножению микробов и грибков'
    },
    {
      name: 'нельзя жевать, кусать и грызть',
      description: 'Мороженое и лед исключить из-за того, что металлические детали воспреимчивы к перепадам температуры'
    },
    {
      name: 'нельзя жевать, кусать и грызть',
      description: 'Жевательные резинки и тянучки застревают в элементах конструкции'
    },
    {
      name: 'нельзя жевать, кусать и грызть',
      description: 'Старайтесь не откусывать передними зубами жесткие фрукты. Твердые овощи и фрукты разрежьте на меленькие кусочки и ешьте. Это касается также жесткого мяса и любых продуктов, требующих откусывания. Рекомендуем носить с собой складной ножик'
    },
    {
      name: 'нельзя жевать, кусать и грызть',
      description: 'Если есть слишком холодные или горячие блюда, разница температур может привести к отклеиванию брекетов и ухудшению свойств ортодонтической проволоки'
    },
    {
      name: 'нельзя жевать, кусать и грызть',
      description: 'При лечении пластиковыми брекетами ограничить крепкий кофе, чай, потому что замочки брекета могут окраситься'
    },
  ]);
  const [visitDate, setVisitDate] = useState();
  const [visitTime, setVisitTime] = useState();
  const [info, setInfo] = useState();
  const [events, setEvents] = useState();
  const [diffDates, setDiffDates] = useState();
  const [diffToCurrDates, setDiffToCurrDates] = useState();
  const [diffToCurrDatesYears, setDiffToCurrDatesYears] = useState();
  const [diffToCurrDatesMonth, setDiffToCurrDatesMonth] = useState();
  const [diffToCurrDatesRestDays, setDiffToCurrDatesRestDays] = useState();
  const [diffDatesYears, setDiffDatesYears] = useState();
  const [diffDatesMonth, setDiffDatesMonth] = useState();
  const [diffDatesRestDays, setDiffDatesRestDays] = useState();

  useEffect(() => {
    (async () => {
      const result = JSON.parse(await AsyncStorage.getItem('@settings'));
      const resultEvents = JSON.parse(await AsyncStorage.getItem('@eventsList'));
      const recomends = JSON.parse(await AsyncStorage.getItem('@recomends'));

      console.log('@settings: ', result);
      console.log('@eventsList: ', resultEvents);
      console.log('@recomends: ', recomends);

      const startDateArr = result.startFormattedDate.split('.');
      const startDate = moment(
        new Date(startDateArr[2], startDateArr[1] - 1, startDateArr[0] - 1)
      );
      console.log('startDateArr: ', startDateArr[2], startDateArr[1] - 1, startDateArr[0] - 1);
      const endDateArr = result.formattedEndDate.split('.')
      const endDate = moment(
        new Date(endDateArr[2], endDateArr[1] - 1, endDateArr[0] - 1)
      );
      console.log('endDateArr: ', endDateArr);

      setRecomendations(recomends);
      setDiffToCurrDates(moment().diff(startDate, 'days'));
      setDiffDates(endDate.diff(startDate, 'days'));
      setInfo(result);
      setEvents(resultEvents);
      setVisitDate(moment(resultEvents[0].date).format('DD MMMM').split(' '));
      setVisitTime(resultEvents[0].time);
    })();
  }, []);

  useEffect(() => {
    if (diffToCurrDates && diffDates)
      getDates();
    else return;
  }, [diffToCurrDates, diffDates]);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.btnPress : styles.btn,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => onPressDate()
  };
  const pointTouchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.doctorIcon : styles.doctorIcon,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => onPressPoint()
  };
  const phoneTouchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.doctorIcon : styles.doctorIcon,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => onPressPhone()
  };
  const emailTouchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.doctorIcon : styles.doctorIcon,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => onPressEmail()
  };

  const onPressDate = () => {
    setLeft(left - 1);
  };
  const onPressPoint = () => {
    Linking.openURL(`https://www.google.com/maps/place/${info?.address}`);
  };
  const onPressPhone = () => {
    Linking.openURL(`tel:${info?.phone}`);
  };
  const onPressEmail = () => {
    Linking.openURL(`mailto:${info?.email}?subject=SendMail&body=Description`);
  };

  const wordDeclension = (number, word1, word2, word3) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20)
      return word1;

    n %= 10;
    if (n === 1)
      return word2;

    if (n >= 2 && n <= 4)
      return word3;

    return word1;
  };

  const wordDeclensionDays = (number) => {
    return wordDeclension(number, 'дней', 'день', 'дня');
  };

  const wordDeclensionMonth = (number) => {
    return wordDeclension(number, 'месяцев', 'месяц', 'месяца');
  };


  const wordDeclensionYear = (number) => {
    return wordDeclension(number, 'лет', 'год', 'года');
  };

  const getDates = () => {
    const diffToCurrDatesYears = Math.floor(diffToCurrDates / 365);
    const diffDatesYears = Math.floor(diffDates / 365);
    const diffToCurrDatesRest = diffToCurrDates - (diffToCurrDatesYears * 365);
    const diffDatesRest = diffDates - (diffDatesYears * 365);
    const diffToCurrDatesMonth = Math.floor(diffToCurrDatesRest / 30.5);
    const diffDatesMonth = Math.floor(diffDatesRest / 30.5);
    const diffToCurrDatesRestDays = Math.floor(
      diffToCurrDatesRest - (diffToCurrDatesMonth * 30.5)
    );
    const diffDatesRestDays = Math.floor(
      diffDatesRest - (diffDatesMonth * 30.5)
    );

    console.log('diffToCurrDatesRestDays: ', diffToCurrDatesRestDays);
    console.log('diffDatesRestDays: ', diffDatesRestDays);
    console.log('diffToCurrDatesMonth: ', diffToCurrDatesMonth);
    console.log('diffDatesMonth: ', diffDatesMonth);
    console.log('diffToCurrDatesRest: ', diffToCurrDatesRest);
    console.log('diffDatesRest: ', diffDatesRest);
    console.log('diffDatesYears: ', diffDatesYears);
    console.log('diffToCurrDatesYears: ', diffToCurrDatesYears);
    console.log('diffToCurrDates: ', diffToCurrDates);
    console.log('diffDates: ', diffDates);

    console.log(`${diffToCurrDatesYears}`);
    console.log(`
      ${diffToCurrDatesYears} ${wordDeclensionYear(diffToCurrDatesYears)} 
      ${diffToCurrDatesMonth} ${wordDeclensionMonth(diffToCurrDatesMonth)} 
      ${diffToCurrDatesRestDays} ${wordDeclensionDays(diffToCurrDatesRestDays)} 
    `);
    console.log(`
      ${diffDatesYears} ${wordDeclensionYear(diffDatesYears)} -
      ${diffDatesMonth} ${wordDeclensionMonth(diffDatesMonth)} 
      ${diffDatesRestDays} ${wordDeclensionDays(diffDatesRestDays)} 
    `);

    setDiffToCurrDatesYears(diffToCurrDatesYears);
    setDiffToCurrDatesMonth(diffToCurrDatesMonth);
    setDiffToCurrDatesRestDays(diffToCurrDatesRestDays);
    setDiffDatesYears(diffDatesYears);
    setDiffDatesMonth(diffDatesMonth);
    setDiffDatesRestDays(diffDatesRestDays);
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.title}>Ты в брекетах уже:</Text>
          <View style={styles.dflex}>
            {diffToCurrDatesYears
              ? <>
                  <Text style={styles.days}>
                    {diffToCurrDatesYears}
                  </Text>
                  <Text style={styles.daysText}>{wordDeclensionYear(diffToCurrDatesYears)}</Text>
                </>
              : null}
            {diffToCurrDatesMonth
              ? <>
                  <Text style={styles.days}>
                    {diffToCurrDatesMonth}
                  </Text>
                  <Text style={styles.daysText}>{wordDeclensionMonth(diffToCurrDatesMonth)}</Text>
                </>
              : null}
            <Text style={styles.days}>
              {diffDatesRestDays}
            </Text>
            <Text style={styles.daysText}>{wordDeclensionDays(diffDatesRestDays)}</Text>
          </View>
          <Text style={styles.title}>Осталось до снятия:</Text>
          <View style={styles.dflex}>
            {diffDatesYears
              ? <>
                  <Text style={styles.days}>
                    {diffDatesYears}
                  </Text>
                  <Text style={styles.daysText}>{wordDeclensionYear(diffDatesYears)}</Text>
                </>
              : null}
            {diffDatesMonth
              ? <>
                  <Text style={styles.days}>
                    {diffDatesMonth}
                  </Text>
                  <Text style={styles.daysText}>{wordDeclensionMonth(diffDatesMonth)}</Text>
                </> : null}
            <Text style={styles.days}>
              {diffDatesRestDays}
            </Text>
            <Text style={styles.daysText}>{wordDeclensionDays(diffDatesRestDays)}</Text>
          </View>
        </View>

        <View style={styles.homeHeader}>
          <Text style={styles.title}>Следующий визит</Text>
          <Text style={styles.text}>Поставь напоминание чтобы не забыть</Text>
        </View>

        {left && 
          <View style={styles.date}>
            <TouchableHighlight {...touchProps}>
              <View style={styles.dateBlock}>
                <Text style={styles.dateText}>
                  через {left} дня
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        }

        <View>
          <Text style={styles.title2}>
            Вы записаны на прием:
          </Text>
          <View style={styles.date1}>
            {visitDate
              ? <Text style={styles.date1Day}>{visitDate[0]}</Text>
              : <Text style={styles.date1Day}>-</Text>
            }
            <Text style={styles.date1Month}>{visitDate?.[1]}</Text>
            <Text style={styles.date1Time}>{visitTime}</Text>
          </View>
        </View>

        <View style={styles.navigate}>
          <View style={styles.navigateAdressBlock}>
            <Text style={styles.navigateAdressName}>{info?.clinic}</Text>
            <Text style={styles.navigateAdress}>{info?.address}</Text>
          </View>
          <TouchableHighlight {...pointTouchProps} style={styles.navigateIcon}>
            <MaterialCommunityIcons name="navigation-variant-outline" size={24} color="#827572" />
          </TouchableHighlight>
        </View>

        <View style={styles.doctorBlock}>
          <Text style={styles.doctorTitle}>Врач-ортодонт</Text>

          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>
              {info?.doctorName}
            </Text>
            <View style={styles.doctorContacts}>
              <TouchableHighlight {...phoneTouchProps}>
                <MaterialCommunityIcons name="phone-outline" size={24} color="#827572" />
              </TouchableHighlight>
              <TouchableHighlight {...emailTouchProps}>
                <MaterialCommunityIcons name="email-outline" size={24} color="#827572" />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={styles.flex}>
          <Text style={[styles.title3, styles.mt60, styles.mb24]}>Рекомендации</Text>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} onHideUnderlay>
            <View style={styles.recomends}>
              {recomendations
                ? recomendations.map((el, i) => (
                  <View style={styles.recomendsCard} key={i}>
                    <ScrollView onHideUnderlay>
                      <Text style={styles.recomendsTitle}>{el.name}</Text>
                      <Text style={styles.recomendsText}>{el.description}</Text>
                    </ScrollView>
                  </View>
                )) : null}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
