import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useDarkModeStore from '../hooks/useDarkModeStore';
import Icon from 'react-native-vector-icons/Entypo';
import Sound from 'react-native-sound';
import {PAGE} from '../constants/constants';
import usePage from '../hooks/usePage';

const HeaderDetail = ({surah, title}) => {
  console.log('surah', surah);
  const {isEnabled} = useDarkModeStore();
  const {page} = usePage();

  const playMurotal = () => {
    const url = surah?.audioFull['05'];
    console.log('URL:', url);

    let audio = new Sound(surah?.audioFull['05'], null, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      console.log(
        'duration in seconds' +
          audio.getDuration() +
          ' number of channels: ' +
          audio.getNumberOfChannels(),
      );
      audio.play(success => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('PLayback failed due to audio recording errors');
        }
      });
    });

    audio.setVolume(0.5);

    // Position the sound to the full right in a stereo field
    audio.setPan(1);

    // Loop indefinitely until stop() is called
    audio.setNumberOfLoops(-1);

    // Get properties of the player instance
    console.log('volume: ' + audio.getVolume());
    console.log('pan: ' + audio.getPan());
    console.log('loops: ' + audio.getNumberOfLoops());

    // Seek to a specific point in seconds
    audio.setCurrentTime(2.5);

    // Get the current playback point in seconds
    audio.getCurrentTime(seconds => console.log('at ' + seconds));

    // Pause the sound
    audio.pause();

    // Stop the sound and rewind to the beginning
    audio.stop(() => {
      // Note: If you want to play a sound after stopping and rewinding it,
      // it is important to call play() in a callback.
      audio.play();
    });

    // Release the audio player resource
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
                color: isEnabled ? '#fff' : '#219ebc',
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
