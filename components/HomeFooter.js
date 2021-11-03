import React from 'react';
import {View, Linking, TouchableOpacity, Image, StyleSheet} from 'react-native';

// Local imports
import {icons} from '../constants';

const HomeFooter = () => {
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

export default HomeFooter;

const styles = StyleSheet.create({
  footer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerIcon: {
    marginHorizontal: 30,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    opacity: 0.5
  }
});
