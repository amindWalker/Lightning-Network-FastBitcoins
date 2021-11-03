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
        <Text style={{...FONTS.h1}}>Hello!</Text>
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
    flexDirection: 'row',
    marginVertical: SIZES.padding * 2
  },
  welcomeText: {
    ...FONTS.body2,
    color: COLORS.gray
  },
  logoutContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightRed,
    color: COLORS.red,
    borderRadius: 10,
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: SIZES.padding / 4
  }
});
