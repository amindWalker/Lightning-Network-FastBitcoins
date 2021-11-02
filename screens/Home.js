import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Linking
} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import * as Keychain from 'react-native-keychain';

// Local imports
import {COLORS, SIZES, icons, images} from '../constants';
import {SINGUP_URL, LOGIN_URL} from '../config';
import DataContext from '../context/dataContext';

function Home() {
  // AppContext states
  const {
    email,
    isAuthenticated,
    isLoading,
    keySession,
    toastMessage,
    setEmail,
    setIsAuthenticated,
    setIsLoading,
    setKeySession,
    setToastMessage
  } = useContext(DataContext);

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

  // POST request to login using email
  const login = () => {
    console.log('LOGIN Button clicked -->', SINGUP_URL);
    if (!email || !email.includes('@')) {
      setToastMessage('Please enter a valid email');
      setTimeout(() => {
        setToastMessage('');
      }, 3000);
    } else {
      fetch(`${SINGUP_URL}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: email,
          platform: Platform.OS === 'android' ? '2' : '3'
        })
      })
        .then(response => response.json())
        .then(responseJSON => {
          if (responseJSON.session_key) {
            setIsLoading(true);
            setKeySession(responseJSON.session_key);
            setToastMessage('check your email and \ncomplete the process');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const toastStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(toastMessage ? 1 : 0),
      transform: [
        {
          translateY: withSpring(toastMessage ? -50 : 0)
        }
      ]
    };
  });

  const renderToast = () => {
    return (
      <Animated.View style={[styles.toast, toastStyle]}>
        <Text style={styles.toastText}>{toastMessage}</Text>
      </Animated.View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.facebook.com/FastBitcoins.BTC');
          }}>
          <Image source={icons.facebook} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://instagram.com/fastbitcoins');
          }}>
          <Image source={icons.instagram} style={styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://twitter.com/fastbitcoins');
          }}>
          <Image source={icons.twitter} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={styles.header}>
        <Image source={images.logo} style={styles.logo} />
      </View>
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          {renderToast()}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.lightGrey}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <Image source={icons.send} style={styles.inputIcon} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={isLoading ? styles.buttonDisabled : styles.button}
            onPress={() => login()}
            disabled={isLoading}>
            <Text style={styles.buttonText}>
              {isLoading ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                'LOGIN'
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {renderFooter()}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    resizeMode: 'contain'
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20
  },
  input: {
    borderBottomColor: COLORS.yellow,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 16
  },
  inputIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 20,
    opacity: 0.25
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 75,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10
  },
  buttonDisabled: {
    backgroundColor: COLORS.lightyellow,
    height: 75,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20
  },
  toast: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.lightGreen,
    padding: 10,
    borderRadius: 10
  },
  toastText: {
    color: COLORS.secondary,
    fontSize: 20,
    textAlign: 'center'
  },
  footer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerIcon: {
    marginHorizontal: 30,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    opacity: 0.5
  }
});

export default Home;
