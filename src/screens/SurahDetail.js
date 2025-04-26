import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import alfatiha from '../../assets/api-json/alfatiha.json';
import useDarkModeStore from '../hooks/useDarkModeStore';
import HeaderDetail from '../components/HeaderDetail';
import {PAGE} from '../constants/constants';

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

  const surahNext = dataDetail?.suratSelanjutnya;
  const surahPrevious = dataDetail?.suratSebelumnya;

  const renderAyat = ({item}) => (
    <View
      style={[
        styles.ayahCard,
        {
          backgroundColor: isEnabled ? '#3e3e3f' : '#ffffff',
          borderBottomColor: isEnabled ? '#fff' : '#219ebc',
        },
      ]}>
      <View
        style={{
          marginTop: -5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.ayahNumberCircle,
            {borderColor: isEnabled ? '#fff' : '#777'},
          ]}>
          <Text
            style={[
              styles.ayahNumberText,
              {color: isEnabled ? '#fff' : '#777'},
            ]}>
            {item.nomorAyat}
          </Text>
        </View>
        <Text
          style={[
            styles.arabic,
            {color: isEnabled ? '#fff' : '#000', flexShrink: 1},
          ]}
          allowFontScaling={false}>
          {item.teksArab}
        </Text>
      </View>
      <Text style={[styles.latin, {color: isEnabled ? '#fff' : '#555'}]}>
        {item.teksLatin}
      </Text>
      <Text style={[styles.indonesia, {color: isEnabled ? '#fff' : '#000'}]}>
        {item.teksIndonesia}
      </Text>
    </View>
  );

  if (!dataDetail) {
    return <Text style={{padding: 20}}>Loading...</Text>;
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
                navigation.push(PAGE.SURAH_DETAIL, {
                  id: surahPrevious.nomor - 1,
                })
              }>
              <Text style={styles.footerText}>
                Surat Sebelumnya: {surahPrevious.nomor}.{' '}
                {surahPrevious.namaLatin} ({surahPrevious.jumlahAyat} ayat)
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{marginTop: surahPrevious ? 40 : 0}}>
        <HeaderDetail surah={dataDetail} />

        <FlatList
          data={dataDetail.ayat}
          keyExtractor={item => item.nomorAyat.toString()}
          renderItem={renderAyat}
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
              navigation.push('SurahDetail', {id: surahNext.nomor})
            }>
            <Text style={styles.footerText}>
              Surat Selanjutnya: {surahNext.nomor}. {surahNext.namaLatin} (
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
  arabic: {
    fontSize: 22,
    textAlign: 'right',
    marginBottom: 6,
  },
  latin: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  indonesia: {
    fontSize: 14,
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
  ayahNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  ayahNumberText: {
    fontSize: 12,
    color: '#777',
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
