import {StatusBar, View} from 'react-native';
import Header from './Header';
import {useState} from 'react';
import useDarkModeStore from '../hooks/useDarkModeStore';

const Layout = ({children}) => {
  const {isEnabled, toggleSwitch} = useDarkModeStore();
  return (
    <View style={{flex: 1, backgroundColor: isEnabled ? '#000' : '#219ebc'}}>
      <StatusBar barStyle={'light-content'} translucent={false} />
      <Header isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
      <View
        style={{
          backgroundColor: isEnabled ? '#121212' : '#f1f1f1',
          flex: 1,
        }}>
        {children}
      </View>
    </View>
  );
};

export default Layout;
