import {StyleSheet, Text, View} from 'react-native';
import useDarkModeStore from '../hooks/useDarkModeStore';

const HeaderDetail = ({surah, title}) => {
  const {isEnabled} = useDarkModeStore();
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, {color: isEnabled ? '#fff' : '#000'}]}>
        {title} {surah.nomor}: {surah.nama} ({surah.namaLatin})
      </Text>
      <Text
        style={[styles.subHeaderText, , {color: isEnabled ? '#fff' : '#555'}]}>
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
