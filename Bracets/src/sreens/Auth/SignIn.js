import { useState, useContext, useEffect } from 'react';
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
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight + 35,
  },
});

const SignIn = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('test@test.ru');
  const [password, setPassword] = useState('test1234');
  const [isPress, setIsPress] = useState(false);

  const {login} = useContext(AuthContext);
  
  useEffect(() => {
    setLoading(true);
    (async () => {
      const loggedIn = await AsyncStorage.getItem('@loggedIn') === 'true';

      if (loggedIn) navigation.navigate('Main');

      setLoading(false);
    })();
  }, []);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#FBF7F4',
    style: isPress ? styles.nextBtnPress : styles.nextBtn,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => navigation.navigate('SignUp')
  };

  const signIn = async () => {
    const result = await login(email, password);

    if (result) navigation.navigate('Main');
  };

  if (!loading)
    return (
      <View style={styles.root}>
        <View style={styles.content}>
          <Text style={styles.title}>Вход</Text>

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
            <Text>У меня нет аккаунта</Text>
          </TouchableHighlight>

          <CustomBtn
            text="Войти"
            onPress={() => signIn()}
          />
        </View>
      </View>
    );
  else 
  return (
    <View style={styles.loading}>
      <Text style={styles.label}>Проверка авторизации...</Text>
    </View>
  )
};

export default SignIn;
