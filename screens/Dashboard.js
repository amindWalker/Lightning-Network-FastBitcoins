import React, {useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

// Local imports
import {COLORS, SIZES, FONTS, icons} from '../constants';
import DataContext from '../context/dataContext';

const Dashboard = () => {
  const {logout, setToastMessage} = useContext(DataContext);

  const featuresData = [
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

  const [features, setFeatures] = React.useState(featuresData);

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h1}}>Hello!</Text>
          <Text style={{...FONTS.body2, color: COLORS.gray}}>
            Bitcoiner, welcome back!
          </Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.lightRed,
              color: COLORS.red,
              borderRadius: 10,
              paddingHorizontal: SIZES.padding / 2,
              paddingVertical: SIZES.padding / 4
            }}
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
  }

  function renderBanner() {
    return (
      <View
        style={{
          height: 120,
          borderRadius: 20,
          overflow: 'hidden',
          marginVertical: SIZES.padding,
          backgroundColor: COLORS.primary,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text style={{...FONTS.h1, color: COLORS.white}}>Dashboard Banner</Text>
      </View>
    );
  }

  function renderOptions() {
    const Header = () => (
      <View style={{marginBottom: SIZES.padding * 2}}>
        <Text style={{...FONTS.h3}}>How can I help you?</Text>
      </View>
    );

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginBottom: SIZES.padding * 2,
          width: 60,
          alignItems: 'center'
        }}
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
        <Text style={{textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4}}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={features}
        numColumns={4}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        style={{marginTop: SIZES.padding * 2}}
      />
    );
  }

  function renderDashboard() {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderBanner()}
        {renderOptions()}
      </View>
    );

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{marginBottom: 80}}></View>}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderDashboard()}
    </SafeAreaView>
  );
};

export default Dashboard;
