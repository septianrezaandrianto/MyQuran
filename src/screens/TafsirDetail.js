import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import useDarkModeStore from '../hooks/useDarkModeStore';
import HeaderDetail from '../components/HeaderDetail';
import {PAGE} from '../constants/constants';
import axios from 'axios';

const SurahDetail = () => {
  const {isEnabled} = useDarkModeStore();

  const route = useRoute();
  const {id} = route.params;
  const navigation = useNavigation();

  const [isLoading, setIsloading] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  const getDetail = async surahId => {
    setIsloading(true);
    try {
      const response = await axios.get(
        `https://equran.id/api/v2/tafsir/${surahId}`,
      );
      setDataDetail(response.data.data);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getDetail(id);
  }, [id]);

  const surahNext = dataDetail?.suratSelanjutnya;
  const surahPrevious = dataDetail?.suratSebelumnya;

  const renderTafsir = ({item}) => (
    <View
      style={[
        styles.ayahCard,
        {
          backgroundColor: isEnabled ? '#3e3e3f' : '#ffffff',
          borderBottomColor: isEnabled ? '#fff' : '#219ebc',
        },
      ]}>
      <Text
        style={[styles.ayahNumber, {color: isEnabled ? '#fff' : '#219ebc'}]}>
        Ayat {item.ayat}
      </Text>
      <Text style={[styles.teks, {color: isEnabled ? '#fff' : '#000'}]}>
        {item.teks}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size="large"
          color={isEnabled ? '#fff' : '#219ebc'}
        />
      </View>
    );
  }

  if (!dataDetail && !isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: isEnabled ? '#fff' : '#000'}}>
          Data tidak ditemukan
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <View
        style={{
          marginTop: -15,
          marginBottom: -50,
        }}>
        {surahPrevious && (
          <View style={styles.previousButtonWrapper}>
            <TouchableOpacity
              style={[
                styles.footerButton,
                {
                  backgroundColor: isEnabled ? '#000' : '#219ebc',
                },
              ]}
              onPress={() =>
                navigation.push(PAGE.TAFSIR_DETAIL, {
                  id: surahPrevious.nomor,
                })
              }>
              <Text style={styles.footerText}>
                Tafsir Sebelumnya: {surahPrevious.nomor}.{' '}
                {surahPrevious.namaLatin} ({surahPrevious.jumlahAyat} ayat)
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{marginTop: surahPrevious ? 40 : 0}}>
        <HeaderDetail surah={dataDetail} title="Tafsir" />

        <FlatList
          key={id}
          data={dataDetail?.tafsir}
          keyExtractor={item => item.ayat.toString()}
          renderItem={renderTafsir}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={[styles.footerWrapper, {bottom: surahPrevious ? 60 : 20}]}>
        {/* Next Surah Button */}
        {surahNext && (
          <TouchableOpacity
            style={[
              styles.footerButton,
              {backgroundColor: isEnabled ? '#000' : '#219ebc'},
              {marginBottom: surahPrevious ? -30 : 10},
            ]}
            onPress={() =>
              navigation.push(PAGE.TAFSIR_DETAIL, {id: surahNext.nomor})
            }>
            <Text style={styles.footerText}>
              Tafsir Selanjutnya: {surahNext.nomor}. {surahNext.namaLatin} (
              {surahNext.jumlahAyat} ayat)
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingBottom: 80,
    paddingTop: 80,
  },
  ayahCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomColor: '#219ebc',
    borderBottomWidth: 1,
  },
  ayahNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teks: {
    fontSize: 12,
    lineHeight: 15,
  },
  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
  },
  footerButton: {
    backgroundColor: '#219ebc',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  previousButtonWrapper: {
    position: 'absolute',
    top: -50,
    left: 25,
    right: 25,
    zIndex: 100,
  },
});

export default SurahDetail;
