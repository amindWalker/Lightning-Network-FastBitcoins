import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// Local imports
import {COLORS, FONTS, SIZES} from '../constants';
import DataContext from '../context/dataContext';

const DashboardHeader = () => {
  const {logout, setToastMessage} = useContext(DataContext);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.helloText}>Hello!</Text>
        <Text style={styles.welcomeText}>Bitcoiner, welcome back!</Text>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout();
            console.log('User logged out');
            setTimeout(() => {
              setToastMessage('');
            }, 3000);
          }}>
          <Text style={{color: COLORS.red}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: SIZES.padding * 2.5
  },
  helloText: {
    ...FONTS.h1,
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  welcomeText: {
    ...FONTS.body2,
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  logoutContainer: {
    alignItems: 'flex-end'
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: SIZES.padding / 4,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 1
  }
});
