import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../utils/colorPallete';

interface BottomSheetProps {
  visibility: boolean;
  visibilitySetter: (visibility: boolean) => void;
  children: React.ReactNode;
}

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  visibility,
  visibilitySetter,
  children,
}) => {
  return (
    <Modal
      isVisible={visibility}
      animationIn={'slideInUp'}
      onBackButtonPress={() => visibilitySetter(false)}
      onBackdropPress={() => visibilitySetter(false)}
      style={styles.view}
    >
      <View style={styles.bottomSheet}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheet: {
    width: '100%',
    height: '85%',
    paddingTop: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors['secondary-light'],
  },
});
export default BottomSheetComponent;
