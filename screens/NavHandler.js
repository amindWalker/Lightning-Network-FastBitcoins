import React, {useContext, useEffect} from 'react';
import * as Keychain from 'react-native-keychain';

// Local imports
import Dashboard from './Dashboard';
import Home from './Home';
import DataContext from '../context/dataContext';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

function NavHandler({navigation}) {
  const Stack = createStackNavigator();
  const {isAuthenticated, setIsAuthenticated} = useContext(DataContext);

  // Check if user is authenticated with keychain storage
  useEffect(() => {
    const getKey = async () => {
      try {
        const key = await Keychain.getGenericPassword();
        if (key) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getKey();

    if (isAuthenticated) {
      navigation.navigate('Dashboard');
    } else {
      setIsAuthenticated(false);
      navigation.navigate('Home');
    }
  }, [isAuthenticated]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
        animated
        showHideTransition="slide"
      />
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </>
  );
}

export default NavHandler;
