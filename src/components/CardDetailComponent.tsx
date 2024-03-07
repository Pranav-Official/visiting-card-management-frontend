import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../utils/colorPallete';

interface CardDetail {
  children: ReactNode;
  card_detail: string;
}

const CardDetailComponent: React.FC<CardDetail> = ({
  children,
  card_detail,
}) => {
  return (
    <View>
      <View style={styles.component}>
        <View style={styles.iconBox}>{children}</View>
        <Text style={styles.text}>{card_detail}</Text>
      </View>
    </View>
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
