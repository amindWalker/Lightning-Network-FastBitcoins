import React, {useContext, useState} from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';

// Local imports
import {COLORS, SIZES, images} from '../constants';

const banners = [
  {
    id: 1,
    image: images.banner
  },
  {
    id: 2,
    image: images.banner2
  }
];

const DashboardBanner = () => {
  const [slide, setSlide] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSlide(slide => (slide + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slide]);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.bannerContainer}>
        <AnimatedImage
          entering={FadeInRight.delay(100).springify()}
          exiting={FadeOutLeft.springify()}
          source={banners[slide].image}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </Animated.View>
      <View style={styles.dotWrapper}>
        <FlatList
          horizontal
          data={banners}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View
              style={[
                styles.dot,
                banners[slide].id === item.id && styles.activeDot
              ]}
            />
          )}
        />
      </View>
    </View>
  );
};

export default DashboardBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.yellow,
    height: SIZES.base * 30,
    width: '100%',
    marginTop: SIZES.base * 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerContainer: {
    height: 155,
    width: '115%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: SIZES.large,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: SIZES.large,
    borderRadius: SIZES.medium
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: SIZES.medium
  },
  dotWrapper: {
    width: '100%',
    height: SIZES.base * 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.base * 2
  },
  dot: {
    width: SIZES.medium,
    height: SIZES.medium,
    borderRadius: SIZES.base,
    marginHorizontal: SIZES.base,
    backgroundColor: COLORS.gray,
    opacity: 0.75
  },
  activeDot: {
    backgroundColor: COLORS.lightGray,
    opacity: 1
  }
});
