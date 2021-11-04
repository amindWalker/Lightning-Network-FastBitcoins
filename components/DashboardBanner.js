import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

// Local imports
import {COLORS, FONTS, SIZES, images} from '../constants';

const DashboardBanner = () => {
  const [image, setImage] = useState(images.banner);

  const bannerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(image === images.banner ? 0 : 0)
        }
      ]
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(image === images.banner ? images.banner2 : images.banner);
    }, 5000);
    return () => clearInterval(interval);
  }, [image]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bannerContainer, bannerStyle]}>
        <Image source={image} style={styles.banner} />
      </Animated.View>
    </View>
  );
};

export default DashboardBanner;

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    borderRadius: SIZES.large,
    marginVertical: SIZES.padding,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: SIZES.large
  },
  bannerContainer: {
    height: 155,
    width: '100%',
    borderRadius: SIZES.large,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: SIZES.large
  },
  banner: {
    height: '100%',
    width: '110%',
    resizeMode: 'center',
    borderRadius: SIZES.medium
  }
});
