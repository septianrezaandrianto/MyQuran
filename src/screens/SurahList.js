import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useDarkModeStore from '../hooks/useDarkModeStore';
import {useNavigation} from '@react-navigation/native';
import usePage from '../hooks/usePage';
import Layout from '../components/Layout';

const SurahList = () => {
  const navigation = useNavigation();

  const {setPage, setSurahNumber} = usePage();
  const {isEnabled} = useDarkModeStore();

  const [isLoading, setIsloading] = useState(false);
  const [dataList, setDataList] = useState([]);

  const getDataList = async () => {
    setIsloading(true);
    try {
      const url = `https://equran.id/api/v2/surat`;
      const response = await axios.get(url);
      setDataList(response.data.data);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SurahDetail', {id: item.nomor});
        setPage('SurahDetail');
        setSurahNumber(item.nomor);
      }}>
      <View
        style={[
          styles.card,
          {backgroundColor: isEnabled ? '#3e3e3f' : '#ffffff'},
        ]}>
        <View style={styles.headerRow}>
          <Text style={[styles.name, {color: isEnabled ? '#fff' : '#000'}]}>
            {item.nomor}. {item.namaLatin}
          </Text>
          <View style={styles.arabicNameWrapper}>
            <Text
              style={[styles.arabicName, {color: isEnabled ? '#fff' : '#000'}]}>
              {item.nama}
            </Text>
          </View>
        </View>
        <Text style={[styles.meaning, {color: isEnabled ? '#fff' : '#000'}]}>
          {item.arti}
        </Text>
        <Text style={[styles.ayahTotal, {color: isEnabled ? '#fff' : '#000'}]}>
          {item.jumlahAyat} Ayat | {item.tempatTurun}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <FlatList
        contentContainerStyle={styles.container}
        data={dataList}
        keyExtractor={item => item.nomor.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  card: {
    width: '100%',
    alignSelf: 'center',
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderEndEndRadius: 8,
    borderStartStartRadius: 8,
    elevation: 2, // Android
    shadowColor: '#000', // iOS
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  meaning: {
    fontSize: 14,
    color: '#666',
  },
  ayahTotal: {
    fontSize: 12,
    color: '#888',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -5,
    marginBottom: 0,
  },
  arabicName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlignVertical: 'center',
    textAlign: 'right',
    lineHeight: 40,
  },
  arabicNameWrapper: {
    justifyContent: 'center',
  },
});

export default SurahList;
