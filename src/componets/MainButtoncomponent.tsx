//Common Button Component-
import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../utils/colorPallete';

interface MainButtonProps {
  children: ReactNode;
  title: string;
  onPressing: () => any;
}

const MainButtonComponent: React.FC<MainButtonProps> = ({
  children,
  title,
  onPressing,
}) => {
  const handlePress = () => {
    onPressing();
  };

  return (
    <TouchableOpacity style={styles.mainButton} onPress={handlePress}>
      <View style={styles.iconTextContainer}>
        {children}
        <Text style={styles.mainButtonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconTextContainer: {
    flexDirection: 'row',
  },
  mainButton: {
    alignItems: 'center',
    backgroundColor: colors['primary-accent'],
    height: '6%',
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  mainButtonTitle: {
    fontWeight: 'bold',
    color: colors['primary-text'],
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default MainButtonComponent;
