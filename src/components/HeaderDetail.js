import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useDarkModeStore from '../hooks/useDarkModeStore';
import Icon from 'react-native-vector-icons/Entypo';
import Sound from 'react-native-sound';

const HeaderDetail = ({surah, title}) => {
  console.log('surah', surah);
  const {isEnabled} = useDarkModeStore();

  const playMurotal = () => {
    const url = surah?.audioFull['05'];
    console.log('URL:', url);

    let audio = new Sound(surah?.audioFull['05'], null, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log(
        'duration in seconds: ' +
          audio.getDuration() +
          'number of channels: ' +
          audio.getNumberOfChannels(),
      );
    });

    audio.setVolume(1);
    audio.release();
  };

  return (
    <View style={styles.headerContainer}>
      {/* Baris pertama: Teks tengah + icon kanan */}
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
        <TouchableOpacity
          onPress={playMurotal}
          style={{
            position: 'absolute',
            right: 60,
            bottom: 10,
          }}>
          <Icon
            name="sound"
            style={{
              color: isEnabled ? '#fff' : '#219ebc',
              fontSize: 18,
              fontFamily: 'bold',
            }}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={[styles.subHeaderText, {color: isEnabled ? '#fff' : '#555'}]}>
        Jumlah Ayat: {surah.jumlahAyat}
      </Text>
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
