import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {images} from '../constants';

const HomeHeader = () => {
  return (
    <View style={styles.header}>
      <Image source={images.logo} style={styles.logo} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    resizeMode: 'contain'
  }
});
