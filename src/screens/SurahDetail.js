import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import alfatiha from '../../assets/api-json/alfatiha.json';
import HeaderDetail from '../components/HeaderDetail';
import useDarkModeStore from '../hooks/useDarkModeStore';

const SurahDetail = () => {
  const route = useRoute();
  const {id} = route.params;
  const navigation = useNavigation();

  const {isEnabled} = useDarkModeStore();

  const [dataDetail, setDataDetail] = useState(null);

  const getDetail = () => {
    setDataDetail(alfatiha);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const renderAyat = ({item}) => (
    <View
      style={[
        styles.ayatCard,
        {
          backgroundColor: isEnabled ? '#3e3e3f' : '#ffffff',
          borderBottomColor: isEnabled ? '#fff' : '#219ebc',
        },
      ]}>
      <Text style={[styles.arab, {color: isEnabled ? '#fff' : '#000'}]}>
        {item.teksArab}
      </Text>
      <Text style={[styles.latin, {color: isEnabled ? '#fff' : '#000'}]}>
        {item.teksLatin}
      </Text>
      <Text style={[styles.indo, {color: isEnabled ? '#fff' : '#000'}]}>
        {item.teksIndonesia}
      </Text>
    </View>
  );

  if (!dataDetail) {
    return <Text style={{padding: 20}}>Loading...</Text>;
  }

  const suratNext = dataDetail?.suratSelanjutnya;

  return (
    <View style={styles.container}>
      {/* <HeaderDetail /> */}
      <FlatList
        data={dataDetail.ayat}
        keyExtractor={item => item.nomorAyat.toString()}
        renderItem={renderAyat}
        // contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
      />

      {suratNext && (
        <View style={styles.footerWrapper}>
          <TouchableOpacity
            style={[
              styles.footerButton,
              {backgroundColor: isEnabled ? '#000' : '#219ebc'},
            ]}
            onPress={() =>
              navigation.push('SurahDetail', {id: suratNext.nomor})
            }>
            <Text style={styles.footerText}>
              Surat Selanjutnya: {suratNext.nomor}. {suratNext.namaLatin} (
              {suratNext.jumlahAyat} ayat)
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 100,
  },
  ayatCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderBottomColor: '#219ebc',
    borderBottomWidth: 1,
  },
  arab: {
    fontSize: 26,
    textAlign: 'right',
    marginBottom: 6,
  },
  latin: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  indo: {
    fontSize: 14,
    color: '#333',
  },
  footerWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  footerButton: {
    backgroundColor: '#219ebc',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SurahDetail;
