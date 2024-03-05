import React from 'react';
import colors from '../../utils/colorPallete';
import { StyleSheet, Text, View } from 'react-native';
import ShareCardComponent from '../../components/ShareCardContactComponent';

const HomeScreen = () => {
  return (
    <View >
      <ShareCardComponent contactName={'Vijay'} card_id={'C001'} >
        
      </ShareCardComponent>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors['secondary-light'],
//     color: colors['primary-text'],
//     flex: 1,
//   },
//   text: {
//     color: colors['primary-text'],
//     fontSize: 40,
//   },
// });

export default HomeScreen;