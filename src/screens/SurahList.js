import axios from 'axios';
import {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import surahListData from '../../assets/api-json/surahlist.json';

const SurahList = () => {
  const [dataList, setDataList] = useState([]);

  //   const getDataList = async () => {
  //     try {
  //       console.log('kepanggil ga nih 2?');
  //       const url = `https://equran.id/api/v2/surat`;
  //       const response = await axios.get(url);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('ERROR FETCHING:', error);
  //     }
  //   };

  const getDataList = async () => {
    setDataList(surahListData);
  };

  useEffect(() => {
    getDataList();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.namaLatin}>
          {item.nomor}. {item.namaLatin}
        </Text>
        <View style={styles.namaArabWrapper}>
          <Text style={styles.namaArab}>{item.nama}</Text>
        </View>
      </View>
      <Text style={styles.arti}>{item.arti}</Text>
      <Text style={styles.jumlahAyat}>
        {item.jumlahAyat} Ayat | {item.tempatTurun}
      </Text>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={dataList}
      keyExtractor={item => item.nomor.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#f1f1f1',
  },
  card: {
    width: '100%',
    alignSelf: 'center',
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2, // Android
    shadowColor: '#000', // iOS
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  namaLatin: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arti: {
    fontSize: 14,
    color: '#666',
  },
  jumlahAyat: {
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
  namaArab: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    textAlignVertical: 'center',
    textAlign: 'right',
    lineHeight: 40,
  },
  namaArabWrapper: {
    justifyContent: 'center',
  },
});

export default SurahList;
