import {Image, Switch, Text, TouchableOpacity, View} from 'react-native';
import quranLogo from './../../assets/images/quran-logo.png';
import usePage from '../hooks/usePage';
import {useNavigation} from '@react-navigation/native';
import {memo, useCallback, useRef, useState} from 'react';
import {PAGE} from '../constants/constants';

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
      <View style={{display: 'flex', flexDirection: 'row', marginLeft: 30}}>
        {page !== PAGE.SURAH_LIST && (
          <TouchableOpacity
            onPress={() => {
              setPage(PAGE.SURAH_LIST), navigation.navigate(PAGE.SURAH_LIST);
            }}>
            <Text
              style={{
                color: 'blue',
                fontSize: 36,
                fontFamily: 'bold',
                marginRight: 5,
              }}>
              ←
            </Text>
          </TouchableOpacity>
        )}
        <Image
          source={quranLogo}
          style={{
            width: 38,
            height: 38,
            marginRight: 10,
          }}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            elevation: 3,
            marginTop: 12,
          }}>
          MyQur'an
        </Text>
        <View
          style={{
            marginLeft: page !== PAGE.SURAH_LIST ? 150 : 190,
            marginTop: 15,
          }}>
          <Switch
            trackColor={{false: '#121212', true: '#f1f1f1'}}
            thumbColor={isEnabled ? '#219ebc' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
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
