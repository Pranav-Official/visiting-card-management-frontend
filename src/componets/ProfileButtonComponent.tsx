import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../utils/colorPallete';

interface ProfileButtonProps {
  children: ReactNode;
  title: string;
  proButtonBgColor: string;
  proButtonTextColor: string;
  onPressing: () => any;
}

const ProfileButtonComponent: React.FC<ProfileButtonProps> = ({
  children,
  title,
  proButtonBgColor,
  proButtonTextColor,
  onPressing,
}) => {
  const handlePress = () => {
    onPressing();
  };
  return (
    <TouchableOpacity
      style={[styles.profileButton, { backgroundColor: proButtonBgColor }]}
      onPress={handlePress}
    >
      <View style={styles.iconTextContainer}>
        {children}
        <Text
          style={[styles.profileButtonTitle, { color: proButtonTextColor }]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconTextContainer: {
    flexDirection: 'row',
  },
  profileButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderBlockColor: colors['primary-text'],
    height: 50,
    paddingEnd: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonTitle: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
  },
});

export default ProfileButtonComponent;
