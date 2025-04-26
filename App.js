import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SurahList from './src/screens/SurahList';
import SurahDetail from './src/screens/SurahDetail';
import Layout from './src/components/Layout';
import TafsirDetail from './src/screens/TafsirDetail';
import {PAGE} from './src/constants/constants';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={PAGE.SURAH_LIST}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={PAGE.SURAH_LIST} component={SurahList} />
        <Stack.Screen name={PAGE.SURAH_DETAIL} component={SurahDetail} />
        <Stack.Screen name={PAGE.TAFSIR_DETAIL} component={TafsirDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
