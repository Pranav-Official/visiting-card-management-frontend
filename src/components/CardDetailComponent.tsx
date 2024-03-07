import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../utils/colorPallete';
import CardDetailsShimmer from './Shimmers/CardDetailsShimmer';

interface CardDetail {
  children: ReactNode;
  card_detail: string;
  onPress?: () => any;
  onLongPress?: () => any;
  isLoading: boolean;
}

const CardDetailComponent: React.FC<CardDetail> = ({
  children,
  card_detail,
  onPress,
  onLongPress,
  isLoading
}) => {
  return (
    <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
      <View style={styles.component}>
        <View style={styles.iconBox}>{children}</View>
        {isLoading?(<CardDetailsShimmer/>):(<Text style={styles.text}>{card_detail}</Text>)}
        
      </View>
    </TouchableOpacity>
  );
};
//
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors['secondary-light'],
  },
  component: {
    flexDirection: 'row',
    gap: 25,
    paddingBottom: 15,
    alignItems: 'center',
  },
  iconBox: {
    padding: 15,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors['secondary-grey'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: colors['primary-text'],
  },
});

export default CardDetailComponent;
