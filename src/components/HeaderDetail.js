import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useDarkModeStore from '../hooks/useDarkModeStore';
import Icon from 'react-native-vector-icons/Entypo';
import {PAGE} from '../constants/constants';
import usePage from '../hooks/usePage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useRef, useState} from 'react';

const HeaderDetail = ({surah, title}) => {
  const {isEnabled} = useDarkModeStore();
  const {page} = usePage();

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const [playTime, setPlayTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isPlaying, setIsPlaying] = useState(false);

  const playMurotal = async () => {
    const path = surah?.audioFull['05'];

    if (!path) {
      Alert.alert('Audio tidak ditemukan');
      return;
    }

    if (isPlaying) {
      console.log('Stopping audio');
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setIsPlaying(false);
    } else {
      console.log('Starting audio');
      try {
        const msg = await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.setVolume(1.0);
        setIsPlaying(true);

        audioRecorderPlayer.addPlayBackListener(e => {
          const current = e.current_position;
          const total = e.duration;
          console.log('Current Position:', current, 'Total Duration:', total);

          if (current && total && !isNaN(current) && !isNaN(total)) {
            setPlayTime(audioRecorderPlayer.mmssss(Math.floor(current)));
            setDuration(audioRecorderPlayer.mmssss(Math.floor(total)));

            if (current >= total) {
              console.log('Finished playing');
              audioRecorderPlayer.stopPlayer();
              audioRecorderPlayer.removePlayBackListener();
              setIsPlaying(false);
            }
          }
        });
      } catch (err) {
        console.error('Error playing audio:', err);
      }
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={[
            styles.headerText,
            {
              color: isEnabled ? '#fff' : '#000',
              textAlign: 'center',
            },
          ]}>
          {title} {surah.nomor}: {surah.nama} ({surah.namaLatin})
        </Text>
        {page === PAGE.SURAH_DETAIL && (
          <TouchableOpacity
            onPress={playMurotal}
            style={{
              position: 'absolute',
              right: 50,
              bottom: 5,
            }}>
            <Icon
              name="sound"
              style={{
                color: isEnabled
                  ? isPlaying
                    ? '#ff0943'
                    : '#fff'
                  : isPlaying
                  ? '#ff0943'
                  : '#219ebc',
                fontSize: 18,
                fontFamily: 'bold',
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={[styles.subHeaderText, {color: isEnabled ? '#fff' : '#555'}]}>
        Jumlah Ayat: {surah.jumlahAyat}
      </Text>
      {/* {isPlaying && (
        <Text style={{textAlign: 'center', color: isEnabled ? '#fff' : '#000'}}>
          {playTime} / {duration}
        </Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  subHeaderText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});

export default HeaderDetail;
