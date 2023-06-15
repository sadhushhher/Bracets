import { registerRootComponent } from 'expo';
import App from './App';

const isAndroid = require('react-native').Platform.OS === 'android'
const isHermesEnabled = !!global.HermesInternal 

if (isHermesEnabled || isAndroid) {

  require('@formatjs/intl-getcanonicallocales/polyfill')
  require('@formatjs/intl-locale/polyfill')

  require('@formatjs/intl-pluralrules/polyfill')
  require('@formatjs/intl-pluralrules/locale-data/ru.js') 

  require('@formatjs/intl-displaynames/polyfill')
  require('@formatjs/intl-displaynames/locale-data/ru.js') 

  require('@formatjs/intl-listformat/polyfill')
  require('@formatjs/intl-listformat/locale-data/ru.js') 

  require('@formatjs/intl-numberformat/polyfill')
  require('@formatjs/intl-numberformat/locale-data/ru.js') 

  require('@formatjs/intl-relativetimeformat/polyfill')
  require('@formatjs/intl-relativetimeformat/locale-data/ru.js')

  require('@formatjs/intl-datetimeformat/polyfill')
  require('@formatjs/intl-datetimeformat/locale-data/ru.js') 

  require('@formatjs/intl-datetimeformat/add-golden-tz.js')

  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
     Intl.DateTimeFormat.__setDefaultTimeZone(
       require("expo-localization").timezone
     );
  }
} 

registerRootComponent(App);
