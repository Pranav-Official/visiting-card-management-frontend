
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../utils/colorPallete';
import Modal from 'react-native-modal';

const TopMenuButton = ({ options }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionClick = (option) => {
    if (option.onSelect) {
      option.onSelect();
    }
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <MaterialIcons
          name="more-vert"
          color={'black'}
          size={34}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleOptionClick(option)}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: colors['secondary-light'],
    zIndex: 1, // Ensure the icon is above the modal
  },
  modal: {
    position: 'absolute',
    top:10,
    left: 200, // Adjust this value to position the modal closer or further from the icon
    right: 10,
    justifyContent: 'center',
    //alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors['accent-white'],
    padding: 10,
    borderRadius: 10,

    elevation: 5, // Add elevation to give a shadow effect
  },
  optionButton: {
    marginBottom: 10,
  },
  optionText: {
    
    color:colors['primary-text'],
    fontSize: 20,
  },
});

export default TopMenuButton;
