import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Local imports
import {COLORS, FONTS, SIZES} from '../constants';

const DashboardBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={{...FONTS.h1, color: COLORS.white}}>Dashboard Banner</Text>
    </View>
  );
};

export default DashboardBanner;

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
