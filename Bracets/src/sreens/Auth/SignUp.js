import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight
} from 'react-native';
import CustomBtn from '../../components/UI/CustomBtn';
import { AuthContext } from '../../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: windowHeight + 35,
    backgroundColor: '#F7F6F0',
    paddingTop: 100,
    paddingBottom: 60,
  },
  content: {
    borderWidth: 0,
    // borderColor: 'red',
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 250,
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 16,
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
  nextBtn: {
    borderRadius: 100,
    marginBottom: 14,
    marginLeft: 'auto',
  },
  nextBtnPress: {
    borderRadius: 100,
    marginBottom: 14,
    marginLeft: 'auto',
  }
});

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('test@test.ru');
  const [password, setPassword] = useState('test1234');
  const [isPress, setIsPress] = useState(false);

  const {register} = useContext(AuthContext);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.nextBtnPress : styles.nextBtn,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => navigation.navigate('SignIn')
  };

  const signUp = async () => {
    const result = await register(email, password);

    console.log('result: ', result);

    if (result) navigation.navigate('Main');
  };

  const clearStore = async () => {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared');
  };

  const showStore = async () => {
    console.log(await AsyncStorage.getItem('@loggedIn'));
    console.log(await AsyncStorage.getItem('@users'));
  };

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Text style={styles.title}>Регистрация</Text>

        <Text style={styles.label}>Ваш Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
          style={styles.input}
        />
        <Text style={styles.label}>Ваш пароль</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Пароль"
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={styles.input}
        />

        <TouchableHighlight {...touchProps}>
          <Text>У меня есть аккаунт</Text>
        </TouchableHighlight>

        <CustomBtn
          text="Войти"
          onPress={() => signUp()}
        />

        {/* <TouchableHighlight style={{marginTop: 50}} onPress={() => showStore()}>
          <Text style={{color: 'red'}}>(Debug) Вывести данные в консоль</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{marginTop: 10}} onPress={() => clearStore()}>
          <Text style={{color: 'red'}}>(Debug) Очистить БД</Text>
        </TouchableHighlight> */}
      </View>
    </View>
  )
};

export default SignUp;
