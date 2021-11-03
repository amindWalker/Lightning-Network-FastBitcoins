import React, {useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';

// Local imports
import {COLORS} from '../constants';
import DataContext from '../context/dataContext';

const Toast = () => {
  const {toastMessage} = useContext(DataContext);
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
  return (
    <Animated.View style={[styles.toast, toastStyle]}>
      <Text style={styles.toastText}>{toastMessage}</Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
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
  }
});
