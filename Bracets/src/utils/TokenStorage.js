import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenStorage {
  constructor(key) {
    this.key = key;
  }

  async getItem() {
    if (!this.key.length) return console.error('Ключ не найден');
    return await AsyncStorage.getItem(`@${this.key}`);
  }

  async setItem(value) {
    if (!this.key.length) return console.error('Ключ не найден');
    await AsyncStorage.setItem(`@${this.key}`, value);
  }
}

export default TokenStorage;
