//Main Button Component
import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../utils/colorPallete';

interface MainButtonProps {
  children?: ReactNode;
  title: string;
  onPressing?: () => any;
  highlighted?: boolean;
}

const MainButtonComponent: React.FC<MainButtonProps> = ({
  children,
  title,
  onPressing,
  highlighted = false,
}) => {
  const styles = StyleSheet.create({
    iconTextContainer: {
      flexDirection: 'row',
    },
    mainButton: {
      alignItems: 'center',
      backgroundColor: colors['primary-accent'],
      maxHeight: 50,
      height: 50,
      // width: '100%',
      flex: 1,
      padding: 5,
      paddingEnd: 10,
      borderRadius: 8,
      fontWeight: '700',
      justifyContent: 'center',
      borderWidth: highlighted ? 1 : 0,
    },
    mainButtonTitle: {
      fontWeight: 'bold',
      color: colors['primary-text'],
      alignSelf: 'center',
      fontSize: 20,
    },
  });

  return (
    <TouchableOpacity style={styles.mainButton} onPress={onPressing}>
      <View style={styles.iconTextContainer}>
        {children}
        <Text style={styles.mainButtonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MainButtonComponent;
