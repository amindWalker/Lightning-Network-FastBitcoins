import React, {useContext, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  RefreshControl,
  ScrollView
} from 'react-native';
import * as Keychain from 'react-native-keychain';

// Local imports
import {COLORS} from '../constants';
import {LOGIN_URL} from '../config';
import DataContext from '../context/dataContext';
import HomeHeader from '../components/HomeHeader';
import HomeBody from '../components/HomeBody';
import HomeFooter from '../components/HomeFooter';

function Home() {
  const [refreshing, setRefreshing] = useState(false);
  // AppContext states
  const {isAuthenticated, keySession, setIsAuthenticated} =
    useContext(DataContext);

  // GET request to check if user has secret_key
  useEffect(() => {
    if (!isAuthenticated && keySession) {
      fetch(`${LOGIN_URL}/${keySession}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(responseJSON => {
          if (!responseJSON.session_secret) {
            // If user does not have secret_key setInterval to check every 10s
            const interval = setInterval(() => {
              console.log('Waiting user to complete the process...');
              fetch(`${LOGIN_URL}/${keySession}`, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              })
                .then(response => response.json())
                .then(responseJSON => {
                  if (responseJSON.session_secret) {
                    console.log('User logged successfully');
                    setIsAuthenticated(true);
                    // Save session to keychain
                    async function saveKey() {
                      try {
                        await Keychain.setGenericPassword(
                          responseJSON.session_key,
                          responseJSON.session_secret
                        );
                        console.log('Encrypted key saved');
                      } catch (error) {
                        console.log('Keychain saving error', error);
                      }
                    }
                    saveKey();
                    clearInterval(interval);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            }, 10000);
          }
        });
    }
  }, [keySession]);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <HomeHeader />
        <HomeBody />
        <HomeFooter />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  }
});

export default Home;
