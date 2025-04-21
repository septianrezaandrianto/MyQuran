import {StatusBar, View} from 'react-native';
import Header from './Header';

const Layout = ({children}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#219ebc'}}>
      <StatusBar barStyle={'light-content'} translucent={false} />
      <Header />
      <View style={{backgroundColor: '#fff', flex: 1}}>{children}</View>
    </View>
  );
};

export default Layout;
