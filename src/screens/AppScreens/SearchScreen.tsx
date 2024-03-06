import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import colors from '../../utils/colorPallete';
import SearchBarComponent from '../../components/SearchBarComponent';
import TopBackButton from '../../components/BackButton';
import SearchListComponent from '../../components/SearchListComponet';

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View
        style={{
          position: 'absolute',
          paddingTop: 40,
          paddingBottom: 20,
          backgroundColor: colors['secondary-grey'],
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        <TopBackButton color={colors['primary-text']} />
      </View>
      <View style={{ marginTop: 35, marginLeft: 50 }}>
        <SearchBarComponent editable={true} />
      </View>
      <View style={{ marginTop: 30, marginLeft: 40 }}>
        <SearchListComponent
          contactName={'Makoto Shinkai'}
          matchIndex={0}
          matchType={'z'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    paddingTop: 0,
    backgroundColor: colors['secondary-light'],
    height: '100%',
    overflow: 'scroll',
  },
});

export default SearchScreen;
