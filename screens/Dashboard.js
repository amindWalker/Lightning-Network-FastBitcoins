import React, {useContext} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';

// Local imports
import DashboardBanner from '../components/DashboardBanner';
import DashboardHeader from '../components/DashboardHeader';
import DashboardOptions from '../components/DashboardOptions';
import {COLORS, SIZES} from '../constants';

const Dashboard = () => {
  const DashboardView = () => {
    const HeaderComponent = () => (
      <View>
        <DashboardHeader />
        <DashboardBanner />
        <DashboardOptions />
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
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <DashboardView />
    </SafeAreaView>
  );
};

export default Dashboard;
