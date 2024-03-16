import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../utils/colorPallete';
import SharePersonIcon from '..//assets/images/shareContactIcon.svg';
interface ViewSharedButtonProps {
  children?: ReactNode;
  title: string;
  number: string;
  onPressing: () => any;
  highlighted?: boolean;
}
const ViewSharedButton: React.FC<ViewSharedButtonProps> = ({
  children,
  title,
  number,
  onPressing,
  highlighted = false,
}) => {
  return (
    <TouchableOpacity onPress={() => onPressing()} style={styles.mainContainer}>
        <View style={styles.lightBlueContainer}></View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.contactNumberContainer}>
            <SharePersonIcon width={45} height={45} />
            <Text style={styles.contactText}>{number} contacts</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  lightBlueContainer: {
    backgroundColor: colors['primary-accent'],
    width: '7%',
  },
  contentContainer: {
    // flex:1,
    padding: 20,
  },
  contactNumberContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  contactText: {
    flex: 1,
    fontSize: 28,
    padding: 5,
  },
  titleText: {
    fontSize: 32,
    color: 'black',
  },
});
export default ViewSharedButton;
