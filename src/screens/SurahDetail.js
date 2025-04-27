import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
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
import Layout from '../components/Layout';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

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
        `https://equran.id/api/v2/surat/${surahId}`,
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

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const [playTime, setPlayTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentlyPlayingAyah, setCurrentlyPlayingAyah] = useState(null);

  const playMurotal = async path => {
    console.log('path', path);
    if (!path) {
      Alert.alert('Audio tidak ditemukan');
      return;
    }

    if (isPlaying) {
      console.log('Stopping audio');
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setIsPlaying(false);
      setCurrentlyPlayingAyah(null);
    } else {
      console.log('Starting audio');
      try {
        const msg = await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.setVolume(1.0);
        setIsPlaying(true);

        audioRecorderPlayer.addPlayBackListener(e => {
          const current = e.current_position;
          const total = e.duration;

          if (current && total && !isNaN(current) && !isNaN(total)) {
            setPlayTime(audioRecorderPlayer.mmssss(Math.floor(current)));
            setDuration(audioRecorderPlayer.mmssss(Math.floor(total)));

            if (current >= total) {
              console.log('Finished playing');
              audioRecorderPlayer.stopPlayer();
              audioRecorderPlayer.removePlayBackListener();
              setIsPlaying(false);
              setCurrentlyPlayingAyah(null);
            }
          }
        });

        setCurrentlyPlayingAyah(path);
      } catch (err) {
        console.error('Error playing audio:', err);
      }
    }
  };

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
        <TouchableOpacity
          onPress={() => {
            playMurotal(item?.audio['05']);
          }}
          style={[
            styles.arabic,
            {
              color: isEnabled
                ? currentlyPlayingAyah === item?.audio['05']
                  ? '#219ebc'
                  : '#fff'
                : currentlyPlayingAyah === item?.audio['05']
                ? '#219ebc'
                : '#000',
              flexShrink: 1,
            },
          ]}>
          <Text
            style={[
              styles.arabic,
              {
                color: isEnabled
                  ? currentlyPlayingAyah === item?.audio['05'] && isPlaying
                    ? '#219ebc'
                    : '#fff'
                  : currentlyPlayingAyah === item?.audio['05'] && isPlaying
                  ? '#219ebc'
                  : '#000',
                flexShrink: 1,
              },
            ]}
            allowFontScaling={false}>
            {item.teksArab}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.latin, {color: isEnabled ? '#fff' : '#555'}]}>
        {item.teksLatin}
      </Text>
      <Text style={[styles.indonesia, {color: isEnabled ? '#fff' : '#000'}]}>
        {item.teksIndonesia}
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
    <Layout>
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
                    backgroundColor: isEnabled ? '#555' : '#219ebc',
                  },
                ]}
                onPress={() =>
                  navigation.push(PAGE.SURAH_DETAIL, {
                    id: surahPrevious.nomor,
                  })
                }>
                <Text style={styles.footerText}>
                  Sebelumnya: {surahPrevious.nomor}. {surahPrevious.namaLatin} (
                  {surahPrevious.jumlahAyat} ayat)
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{marginTop: surahPrevious ? 40 : 0}}>
          <HeaderDetail surah={dataDetail} title="Surat" />

          <FlatList
            key={id}
            data={dataDetail?.ayat}
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
                {backgroundColor: isEnabled ? '#555' : '#219ebc'},
                {marginBottom: surahPrevious ? -30 : 10},
              ]}
              onPress={() =>
                navigation.push(PAGE.SURAH_DETAIL, {id: surahNext.nomor})
              }>
              <Text style={styles.footerText}>
                Selanjutnya: {surahNext.nomor}. {surahNext.namaLatin} (
                {surahNext.jumlahAyat} ayat)
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Layout>
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
    left: 5,
    right: 5,
    zIndex: 100,
  },
});

export default SurahDetail;
