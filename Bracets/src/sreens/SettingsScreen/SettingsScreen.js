import { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Text,
  View,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaskedTextInput } from "react-native-mask-text";
import uuid from 'react-native-uuid';
// import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';

import CustomBtn from '../../components/UI/CustomBtn';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mt24: {
    marginTop: 24,
  },
  mb24: {
    marginBottom: 24,
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
  },
  title2: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .4)',
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '300',
    marginBottom: 6,
  },
  albumHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    marginBottom: 16,
  },
  recomends: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  recomendsCardAdd: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth - 96,
    height: 150,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 10,
    marginRight: 8,
    padding: 20,
    marginBottom: 20,
  },
  recomendsCardAddBtn: {
    fontSize: 100,
    color: '#ecf1f4',
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
    marginBottom: 20,
  },
  cross: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  recomendsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    marginRight: 25,
  },
  recomendsText: {
    fontSize: 13,
    fontWeight: '300',
  },
  btn: {
    backgroundColor: 'transparent',
  },
  btnPress: {
    backgroundColor: 'transparent',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    shadowColor: 'rgba(0,0,0,.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    color: '#'
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
  },
});

const SettingsScreen = () => {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [currId, setCurrId] = useState();
  const [recomendName, setRecomendName] = useState('');
  const [recomendText, setRecomendText] = useState('');
  const [showAddRecomend, setShowAddRecomend] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [startDate, setStartDate] = useState();
  const [startFormattedDate, setStartFormattedDate] = useState();
  const [endDate, setEndDate] = useState();
  const [formattedEndDate, setFormattedEndDate] = useState();
  const [doctorName, setDoctorName] = useState();
  const [clinic, setClinic] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [notes, setNotes] = useState();
  const [isPress, setIsPress] = useState();
  const [recomendations, setRecomendations] = useState([]);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.btnPress : styles.btn,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => onPressRecommend()
  };

  useEffect(() => {
    (async () => {
      const recomends = JSON.parse(await AsyncStorage.getItem('@recomends'));
      const result = JSON.parse(await AsyncStorage.getItem('@settings'));

      console.log('@recomends: ', recomends);
      console.log('@settings: ', result);

      setRecomendations(recomends);
      setStartFormattedDate(result.startFormattedDate);
      setFormattedEndDate(result.formattedEndDate);
      setDoctorName(result.doctorName);
      setClinic(result.clinic);
      setAddress(result.address);
      setPhone(result.phone);
      setEmail(result.email);
      setNotes(result.notes);
    })();
  }, []);

  const onPressRecommend = () => {
    setShowAddRecomend(true);
  };

  const closeAddRecomend = () => {
    setShowAddRecomend(false);
    setCurrId(null);
    setCurrId('');
    setRecomendName('');
    setRecomendText('');
  };

  const addRecomend = async () => {
    if (currId) {
      saveEditRecomend();
      return;
    }

    let recomends = JSON.parse(await AsyncStorage.getItem('@recomends') || '[]');

    recomends = [
      ...recomends,
      {
        id: uuid.v4(),
        name: recomendName,
        description: recomendText,
      }
    ];

    setRecomendations(recomends);
    await AsyncStorage.setItem('@recomends', JSON.stringify(recomends));

    closeAddRecomend();
  };

  const saveEditRecomend = async () => {
    let recomends = JSON.parse(await AsyncStorage.getItem('@recomends') || '[]');

    recomends = recomends.map(el => {
      if (el.id === currId) {
        el.name = recomendName;
        el.description = recomendText;
      }
      return el;
    });

    setRecomendations(recomends);
    await AsyncStorage.setItem('@recomends', JSON.stringify(recomends));

    closeAddRecomend();
  };

  const openEditRecomends = (item) => {
    setCurrId(item.id);
    setRecomendName(item.name);
    setRecomendText(item.description);
    setShowAddRecomend(true);
  };

  const removeRecomends = async (id) => {
    let recomends = JSON.parse(await AsyncStorage.getItem('@recomends') || '[]');
    recomends = recomends.filter(el => el.id !== id);

    console.log('recomends: ', recomends);

    setRecomendations(recomends);
    await AsyncStorage.setItem('@recomends', JSON.stringify(recomends));
  };

  const saveSettings = async () => {
    await AsyncStorage.setItem('@settings', JSON.stringify({
      startFormattedDate,
      formattedEndDate,
      doctorName,
      clinic,
      address,
      phone,
      email,
      notes,
    }));
    ToastAndroid.show('Успешно сохранено!', ToastAndroid.SHORT);
  };

  const exitApp = async () => {
    await logout();
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.root}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddRecomend}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          closeAddRecomend();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {currId
              ? <Text style={styles.title}>Редактирование</Text>
              : null}
            <View>
              <Text style={styles.label}>Название</Text>
              <TextInput
                placeholder="Название"
                value={recomendName}
                onChangeText={(val) => setRecomendName(val)}
                style={styles.input}
              />
              <Text style={styles.label}>Описание</Text>
              <TextInput
                placeholder="Описание"
                multiline={true}
                value={recomendText}
                onChangeText={(val) => setRecomendText(val)}
                style={styles.input}
              />

              <View style={styles.modalFooter}>
                <CustomBtn
                  text="Сохранить"
                  onPress={() => addRecomend()}
                />
                <Text>    </Text>
                <CustomBtn
                  text="Закрыть"
                  onPress={() => closeAddRecomend()}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Настройки</Text>
        <Text style={styles.subtitle}>
          Эта информация важна для корректной работы приложения
        </Text>

        <Text style={styles.title2}>Рекомендации</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} onHideUnderlay>
          <TouchableHighlight {...touchProps}>
            <View style={styles.recomendsCardAdd}>
              <Text style={styles.recomendsCardAddBtn}>+</Text>
            </View>
          </TouchableHighlight>
          {recomendations
            ? <View style={styles.recomends}>
                {recomendations
                  ? recomendations.map((el, i) => (
                    <TouchableOpacity onPress={() => openEditRecomends(el)} key={i}>
                      <View style={styles.recomendsCard} key={i}>
                        <TouchableOpacity
                          onPress={() => removeRecomends(el.id)}
                          style={[styles.cross]}
                        >
                          <Entypo name="cross" size={24} color="827572" />
                        </TouchableOpacity>
                        <ScrollView onHideUnderlay>
                          <Text style={styles.recomendsTitle}>{el.name}</Text>
                          <Text style={styles.recomendsText}>{el.description}</Text>
                        </ScrollView>
                      </View>
                    </TouchableOpacity>
                  )) : null}
              </View>
            : null}
        </ScrollView>

        <View style={styles.flex}>
          <Text style={styles.label}>Дата установки брекетов:</Text>
          <MaskedTextInput
            mask="99.99.9999"
            placeholder="ДД.ММ.ГГГГ"
            value={startFormattedDate}
            onChangeText={(text, rawText) => {
              setStartFormattedDate(text);
              setStartDate(rawText);
            }}
            style={styles.input}
          />
        </View>
        <View style={styles.flex}>
          <Text style={styles.label}>Дата снятия брекетов:</Text>
          <MaskedTextInput
            mask="99.99.9999"
            placeholder="ДД.ММ.ГГГГ"
            value={formattedEndDate}
            onChangeText={(text, rawText) => {
              setFormattedEndDate(text);
              setEndDate(rawText);
            }}
            style={styles.input}
          />
        </View>
        <View style={styles.flex}>
          <Text style={[styles.title2, styles.mt24, styles.mb24]}>Информация о враче</Text>

          <Text style={styles.label}>ФИО врача</Text>
          <TextInput
            placeholder="ФИО врача"
            value={doctorName}
            onChangeText={(text) => setDoctorName(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Клиника</Text>
          <TextInput
            placeholder="Клиника"
            value={clinic}
            onChangeText={(text) => setClinic(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Адрес</Text>
          <TextInput
            placeholder="Адрес"
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Телефон</Text>
          <TextInput
            placeholder="Телефон"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Электронная почта</Text>
          <TextInput
            placeholder="Электронная почта"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />

          <Text style={styles.label}>Заметки</Text>
          <TextInput
            placeholder="Заметки"
            value={notes}
            onChangeText={(text) => setNotes(text)}
            style={styles.input}
          />

          <CustomBtn
            text="Сохранить"
            onPress={() => saveSettings()}
          />
        </View>
        <Text style={styles.subtitle}></Text>
        <Text style={styles.subtitle}></Text>

        <CustomBtn
          text="Выйти из аккаунта"
          onPress={() => exitApp()}
        />
        <Text style={styles.subtitle}></Text>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
