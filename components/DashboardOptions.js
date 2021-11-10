import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';

// Local imports
import {COLORS, FONTS, icons, SIZES} from '../constants';

const optionsData = [
  {
    id: 1,
    icon: icons.user,
    color: COLORS.purple,
    backgroundColor: COLORS.lightpurple,
    description: 'Profile'
  },
  {
    id: 2,
    icon: icons.send,
    color: COLORS.yellow,
    backgroundColor: COLORS.lightyellow,
    description: 'Transfer'
  },
  {
    id: 3,
    icon: icons.internet,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    description: 'Internet'
  },
  {
    id: 4,
    icon: icons.wallet,
    color: COLORS.red,
    backgroundColor: COLORS.lightRed,
    description: 'Wallet'
  }
];
const DashboardOptions = () => {
  const [options, setOptions] = useState(optionsData);

  const Header = () => (
    <View style={{marginBottom: SIZES.padding * 2}}>
      <Text style={{...FONTS.h3}}>How can I help you?</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.itemContainer}
      onPress={() => console.log(item.description)}>
      <View>
        <View
          style={{
            height: 50,
            width: 50,
            marginBottom: 5,
            borderRadius: SIZES.radius,
            backgroundColor: item.backgroundColor,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 6,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                height: SIZES.icon,
                width: SIZES.icon,
                tintColor: item.color
              }}
            />
          </View>
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ListHeaderComponent={Header}
      data={options}
      numColumns={4}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItem}
      style={{marginTop: SIZES.padding * 2}}
    />
  );
};

export default DashboardOptions;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: SIZES.padding * 2,
    width: 60,
    alignItems: 'center'
  },
  itemDescription: {
    textAlign: 'center',
    flexWrap: 'wrap',
    ...FONTS.body4,
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  }
});
