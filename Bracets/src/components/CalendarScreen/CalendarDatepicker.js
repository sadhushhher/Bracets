// import DatePicker from '../react-native-modern-datepicker/src';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Text } from 'react-native';
import {
  Calendar,
  LocaleConfig
} from 'react-native-calendars';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: "Сегодня"
};
LocaleConfig.defaultLocale = 'ru';


const CalendarDatepicker = ({ currentDates, markedDates, touchDay }) => {
  const [currentDay, setCurrentDate] = useState('01-01-2023');

  useEffect(() => {
    setCurrentDate(moment().format('YYYY-MM-DD'));
  }, []);

  // markedDates
  return (
    <>
      <Calendar
        minDate={currentDay}
        markedDates={markedDates}
        disableTouchEvent={true}
        firstDay={1}
        onDayPress={day => touchDay(day)}
      />
    </>
    // (selectedDate && currentDate) && <DatePicker
    //   options={{
    //     backgroundColor: '#F7F6F0',
    //     textHeaderColor: '#090C08',
    //     textDefaultColor: '#090C08',
    //     selectedTextColor: '#fff',
    //     mainColor: '#F4722B',
    //     textSecondaryColor: '#D6C7A1',
    //     borderColor: 'rgba(122, 146, 165, 0.1)',
    //   }}
    //   mode="calendar"
    //   current={currentDate}
    //   selected={selectedDate}
    //   minuteInterval={30}
    //   style={{ borderRadius: 10 }}
    //   onSelectedChange={date => setSelectedDate(date)}
    // />
  );
};

export default CalendarDatepicker;
