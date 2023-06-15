import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  async get(url, query) {
    const value = await AsyncStorage.getItem(url)

    return value;
  }
  async put(url, query) {
    let value = await AsyncStorage.getItem(url);

    if (value !== null) {
      await AsyncStorage.setItem(
        url,
        JSON.stringify([query])
      );
    }
    if (value) {
      await AsyncStorage.setItem(
        url,
        JSON.stringify([...value, query])
      );
    }

    value = await AsyncStorage.getItem(url);

    return value;
  }
};

export default ApiService;
