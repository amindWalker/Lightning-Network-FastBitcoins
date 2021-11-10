import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

// Local imports
import Toast from './Toast';
import {COLORS, icons, SIZES} from '../constants';
import DataContext from '../context/dataContext';
import {SINGUP_URL} from '../config';

const HomeBody = () => {
  const {
    isLoading,
    setEmail,
    email,
    setToastMessage,
    setIsLoading,
    setKeySession
  } = useContext(DataContext);

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

  return (
    <View style={styles.body}>
      <View style={styles.inputContainer}>
        <Toast />
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
    </View>
  );
};

export default HomeBody;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
    borderBottomColor: COLORS.yellow,
    borderBottomWidth: 1,
    color: COLORS.black
  },
  input: {
    flex: 1,
    color: COLORS.black,
    padding: 10,
    fontSize: 16
  },
  inputIcon: {
    width: 20,
    height: 20,
    opacity: 0.25
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 75,
    borderRadius: SIZES.base,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonDisabled: {
    backgroundColor: COLORS.lightyellow,
    height: 75,
    borderRadius: SIZES.base,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20
  }
});
