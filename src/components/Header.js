import {Image, Text, View} from 'react-native';
import quranLogo from './../../assets/images/quran-logo.png';

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: '#219ebc',
        paddingBottom: 25,
        marginTop: 15,
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}>
      <View style={{display: 'flex', flexDirection: 'row', marginLeft: 30}}>
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
      </View>
    </View>
  );
};

export default Header;
