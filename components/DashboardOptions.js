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

const DashboardOptions = () => {
  const optionsData = [
    {
      id: 1,
      icon: icons.reload,
      color: COLORS.purple,
      backgroundColor: COLORS.lightpurple,
      description: 'Refresh'
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

  const [options, setOptions] = useState(optionsData);

  const Header = () => (
    <View style={{marginBottom: SIZES.padding * 2}}>
      <Text style={{...FONTS.h3}}>How can I help you?</Text>
    </View>
  );
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log(item.description)}>
      <View
        style={{
          height: 50,
          width: 50,
          marginBottom: 5,
          borderRadius: 20,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Image
          source={item.icon}
          resizeMode="contain"
          style={{
            height: 20,
            width: 20,
            tintColor: item.color
          }}
        />
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
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
    color: COLORS.black
  }
});
