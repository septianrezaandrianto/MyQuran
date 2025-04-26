import {Image, Switch, Text, TouchableOpacity, View} from 'react-native';
import quranLogo from './../../assets/images/quran-logo.png';
import usePage from '../hooks/usePage';
import {useNavigation} from '@react-navigation/native';
import {memo, useCallback} from 'react';
import {PAGE} from '../constants/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = memo(({isEnabled, toggleSwitch}) => {
  const {page, setPage, surahNumber} = usePage();
  const navigation = useNavigation();

  const goToSurah = useCallback(
    targetPage => {
      if (page !== targetPage) {
        setPage(targetPage);
        navigation.navigate(targetPage, {id: surahNumber});
      }
    },
    [navigation, setPage, surahNumber, page],
  );
  return (
    <View
      style={{
        backgroundColor: isEnabled ? '#000' : '#219ebc',
        paddingBottom: 15,
        marginTop: 15,
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}>
      <View style={{display: 'flex', flexDirection: 'row', marginLeft: 20}}>
        {page !== PAGE.SURAH_LIST && (
          <TouchableOpacity
            onPress={() => {
              setPage(PAGE.SURAH_LIST), navigation.navigate(PAGE.SURAH_LIST);
            }}>
            <Icon
              style={{
                color: '#fff',
                fontSize: 28,
                fontFamily: 'bold',
                marginRight: 5,
                marginTop: 15,
              }}
              name="arrow-back"
            />
          </TouchableOpacity>
        )}

        <Text
          style={{
            color: '#fff',
            fontSize: 24,
            fontWeight: 'bold',
            elevation: 3,
            marginTop: 12,
            marginLeft: page === PAGE.SURAH_LIST ? 140 : 110,
          }}>
          MyQur'an
        </Text>
        <View
          style={{
            marginLeft: 30,
            marginTop: 17,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            style={{
              color: isEnabled ? '#fff' : '#219ebc',
              fontSize: 20,
              fontFamily: 'bold',
            }}
            name="light-mode"
          />
          <Switch
            trackColor={{false: '#d3d3d3', true: '#d3d3d3'}}
            thumbColor={isEnabled ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{
              transform: [{scaleX: 0.9}, {scaleY: 0.9}],
            }}
          />
          <Icon
            style={{
              color: isEnabled ? '#000' : '#000',
              fontSize: 20,
              fontFamily: 'bold',
              marginLeft: -2,
              marginTop: -2,
            }}
            name="dark-mode"
          />
        </View>
      </View>

      {page !== PAGE.SURAH_LIST && (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: -15,
          }}>
          <TouchableOpacity
            onPress={() => {
              goToSurah(PAGE.SURAH_DETAIL);
            }}
            style={{
              paddingHorizontal: 90,
              borderBottomColor:
                page === PAGE.SURAH_DETAIL
                  ? isEnabled
                    ? '#fff'
                    : '#3e3e3f'
                  : 'transparent',
              borderBottomWidth: page === PAGE.SURAH_DETAIL ? 2.5 : 0,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
              Surat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              goToSurah(PAGE.TAFSIR_DETAIL);
            }}
            style={{
              paddingLeft: 80,
              paddingRight: 72,
              borderBottomColor:
                page === PAGE.TAFSIR_DETAIL
                  ? isEnabled
                    ? '#fff'
                    : '#3e3e3f'
                  : 'transparent',
              borderBottomWidth: page === PAGE.TAFSIR_DETAIL ? 2.5 : 0,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
              Tafsir
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

export default Header;
