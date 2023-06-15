import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import { useState } from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
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
  },
  text: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .4)',
    marginBottom: 24,
  },
  item: {
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  loadingBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Item = ({ item, onPress, remove }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <View style={styles.header}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity onPress={() => remove(item)} style={[styles.cross]}>
        <Entypo name="cross" size={24} color="827572" />
      </TouchableOpacity>
    </View>
    <Text style={styles.text}>{item.text}</Text>
    <Text style={styles.date}>{moment(item.date).format('DD.MM.YYYY')} {item.time}</Text>
  </TouchableOpacity>
);

const EventsList = ({ list, loading, touchItem, remove }) => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          touchItem(item);
        }}
        remove={remove}
        backgroundColor={backgroundColor}
        textColor={color}
        key={index}
      />
    );
  };

  return (
    !loading
      ? list?.map((item, index) => renderItem({ item, index }))
      : <View style={styles.loadingBlock}>
        <ActivityIndicator animating={true} color={MD2Colors.orange800} />
      </View>
  );
};

export default EventsList;
