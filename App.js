import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// Local imports
import NavHandler from './screens/NavHandler';
import AppState from './context/AppState';

function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <AppState>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="NavHandler" component={NavHandler} />
        </Stack.Navigator>
      </AppState>
    </NavigationContainer>
  );
}

export default App;
