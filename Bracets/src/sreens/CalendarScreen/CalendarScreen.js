import { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  View,
  Modal,
  TextInput,
} from 'react-native';
import moment from 'moment';
import CustomBtn from '../../components/UI/CustomBtn';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CalendarDatepicker from '../../components/CalendarScreen/CalendarDatepicker';
import EventsList from '../../components/CalendarScreen/EventsList';
import AxiosApi from '../../config/api.config';
import { RingLoader } from 'react-spinners';
import { MaskedTextInput } from "react-native-mask-text";

const windowHeight = Dimensions.get('window').height;

const CalendarScreen = () => {
  const [loading, setLoading] = useState(true); 
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [eventsList, setEventsList] = useState([]);
  const [currentDates, setCurrentDates] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [editTime, setEditTime] = useState('');
  const [currId, setCurrId] = useState();

  useEffect(() => {
    setLoading(true);
    const date = moment(new Date()).format('YYYY-MM-DD');
    setSelectedDate(date);
    setCurrentDate(date);

    (async () => {
      const resultEvents = await AsyncStorage.getItem('@eventsList');
      const result = await AsyncStorage.getItem('@markedDates');

      setEventsList(JSON.parse(resultEvents || '[]'));
      setMarkedDates(JSON.parse(result || '{}'));
      setLoading(false);
    })();
  }, []);

  const touchDay = (day) => {
    setName('');
    setDescription('');
    // const copyMarkedDates = JSON.parse(JSON.stringify(markedDates));
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    // copyMarkedDates[day.dateString] = { marked: true, dotColor: `#${randomColor}` };
    // setMarkedDates(copyMarkedDates);
    setSelectedDate(day);
    setModalVisible(!modalVisible);
  };

  const showEditTouchDay = (item) => {
    console.log('showEditTouchDay', item);
    setModalVisible(true);
    setCurrId(item.id);
    setName(item.title);
    setDescription(item.text);
    setEditTime(item.time);
    // setTime(item.time);
  };

  const hideEditTouchDay = () => {
    setModalVisible(false);
    setCurrId('');
    setName('');
    setDescription('');
    setTime('');
    setEditTime('');
  };

  const saveEditTouchDay = () => {
    const copyEventsList = JSON.parse(JSON.stringify(eventsList));

    copyEventsList.forEach(el => {
      if (el.id === currId) {
        el.title = name;
        el.text = description;
        el.time = time || editTime;
      }
    })
    setEventsList([...copyEventsList]);
    hideEditTouchDay();
  };

  const saveTouchDay = async () => {
    if (currId) {
      saveEditTouchDay();
      return;
    }

    const copyMarkedDates = JSON.parse(JSON.stringify(markedDates));
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    copyMarkedDates[selectedDate.dateString] =
      { marked: true, dotColor: `#${randomColor}` };

    setModalVisible(!modalVisible);
    console.log('----', {
      id: uuid.v4(),
      title: name,
      text: description,
      date: new Date(selectedDate.dateString),
    });
    console.log('selectedDate.dateString: ', selectedDate);
    console.log('eventsList: ', eventsList);
    setEventsList([
      {
        id: uuid.v4(),
        title: name,
        text: description,
        date: new Date(selectedDate.dateString),
      },
      ...eventsList
    ]);
    setMarkedDates(copyMarkedDates);

    await AsyncStorage.setItem('@eventsList', JSON.stringify([
      {
        id: uuid.v4(),
        title: name,
        text: description,
        date: new Date(selectedDate.dateString),
        time: time,
      },
      ...eventsList
    ]));
    await AsyncStorage.setItem('@markedDates', JSON.stringify(copyMarkedDates));
    hideEditTouchDay();
  };

  const removeItem = async (item) => {
    const copyMarkedDates = JSON.parse(JSON.stringify(markedDates));
    delete copyMarkedDates[moment(item.date).format('YYYY-MM-DD')];

    console.log('copyMarkedDates: ', copyMarkedDates);

    setEventsList(eventsList.filter(el => el.id !== item.id));
    setMarkedDates(copyMarkedDates);
    await AsyncStorage.setItem('@eventsList', JSON.stringify(eventsList.filter(el => el.id !== item.id)));
    await AsyncStorage.setItem('@markedDates', JSON.stringify(copyMarkedDates));
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Календарь</Text>
        <Text style={styles.text}>Добавляй информацию о своем ношении брекетов</Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
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
                  value={name}
                  onChangeText={(val) => setName(val)}
                  style={styles.input}
                />
                <Text style={styles.label}>Время приема {currId ? editTime : ''}</Text>
                <MaskedTextInput
                  mask="99:99"
                  placeholder="ЧЧ:ММ"
                  value={time}
                  onChangeText={(val) => {
                    setTime(val);
                  }}
                  style={styles.input}
                />
                <Text style={styles.label}>Описание</Text>
                <TextInput
                  placeholder="Описание"
                  multiline={true}
                  value={description}
                  onChangeText={(val) => setDescription(val)}
                  style={styles.input}
                />

                <View style={styles.modalFooter}>
                  <CustomBtn
                    text="Сохранить"
                    onPress={() => saveTouchDay()}
                  />
                  <Text>    </Text>
                  <CustomBtn
                    text="Закрыть"
                    onPress={() => setModalVisible(!modalVisible)}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <CalendarDatepicker
          currentDates={currentDates}
          markedDates={markedDates}
          touchDay={touchDay}
        />

        <Text style={styles.subtitle}>Визиты и события</Text>

        {loading || eventsList?.length
          ?
            <EventsList
              remove={removeItem}
              touchItem={showEditTouchDay}
              loading={loading}
              list={eventsList}
            />
          :
            <View>
              <Text style={styles.label}>Нет данных для отображения</Text>
            </View>}
      </ScrollView>
    </View>
  );
};

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
  subtitle: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 16,
    marginTop: 30,
  },
  text: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .4)',
    marginBottom: 24,
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '300',
    marginBottom: 6,
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
});

export default CalendarScreen;
