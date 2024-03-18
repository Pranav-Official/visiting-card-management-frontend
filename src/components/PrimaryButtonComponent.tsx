//Primary Button Component
import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../utils/colorPallete';

type PrimaryButtonProps = {
  children?: ReactNode;
  title: string;
  onPressing?: () => void;
  isHighlighted?: boolean;
  textColor?: string;
  backgroundColor?: string;
};

const PrimaryButtonComponent = ({
  children,
  title,
  onPressing,
  isHighlighted = false,
  textColor = colors['primary-text'],
  backgroundColor = colors['primary-accent'],
}: PrimaryButtonProps) => {
  const styles = StyleSheet.create({
    iconTextContainer: {
      flexDirection: 'row',
    },
    primaryButton: {
      alignItems: 'center',
      backgroundColor: backgroundColor,
      maxHeight: 50,
      height: 50,
      flex: 1,
      padding: 5,
      paddingEnd: 10,
      borderRadius: 8,
      fontWeight: '700',
      justifyContent: 'center',
      borderWidth: isHighlighted ? 1 : 0,
      borderColor: colors['primary-text'],
    },
    primaryButtonTitle: {
      alignSelf: 'center',
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: '700',
      color: textColor,
    },
  });

  return (
    <TouchableOpacity
      style={styles.primaryButton}
      onPress={onPressing}
      testID="ButtonContainer"
    >
      <View style={styles.iconTextContainer}>
        {children}
        <Text style={styles.primaryButtonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButtonComponent;
