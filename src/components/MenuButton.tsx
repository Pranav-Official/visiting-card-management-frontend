// import React, { useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
// import colors from '../utils/colorPallete';

// const TopMenuButton = () => {
//   const navigation = useNavigation();
//   const menuRef = useRef(null);
//   const onPress = () => {
//     navigation.goBack();
//   };
//   const navigateToEdit=()=>{
//     navigation.navigate('SetContactNameScreen' as never)
//   }

//   return (
//     <MenuProvider style={styles.menuContainer}>

//         <Menu  ref={menuRef}>
//           <MenuTrigger>
//             <MaterialIcons
//               name="more-vert"
//               color={'black'}
//               size={34}
//               style={styles.icon}
//             />

//           </MenuTrigger>
//           <MenuOptions style={styles.menuOptions}>
//             <MenuOption onSelect= {navigateToEdit}>
//             <Text style={styles.menuText}>Change Contact name</Text>
//             </MenuOption>
//           </MenuOptions>
//         </Menu>
//     </MenuProvider>
//   );
// };

// const styles = StyleSheet.create({
//   menuContainer:{
//   marginLeft: 310,
//   },
//   icon: {
//     color: colors['secondary-light'],
//     alignSelf:'flex-end',
//     marginRight:10,
//   },
//   menuOptions:{
//   backgroundColor:'grey',

//   },
//   menuText:{
//     fontWeight:'bold',

//   }

// });

// export default TopMenuButton;
// import React, { useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {
//   MenuProvider,
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';
// import colors from '../utils/colorPallete';

// const TopMenuButton = ({ menuOptions }) => {
//   const navigation = useNavigation();
//   const menuRef = useRef(null);

//   const onPress = () => {
//     navigation.goBack();
//   };
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   return (
//     <MenuProvider
//       style={styles.menuContainer}
//     >
//       <Menu
//         ref={menuRef}
//         opened={isMenuOpen}
//         onBackdropPress={() => setMenuOpen(false)}
//         name="changeMenu"
//       >
//         <MenuTrigger onPress={() => setMenuOpen(true)}>
//           <MaterialIcons
//             name="more-vert"
//             color={'black'}
//             size={34} // Adjust icon size as needed
//             style={styles.icon}
//           />
//         </MenuTrigger>
//         <MenuOptions style={styles.menuOptions}>
//           {menuOptions.map((option, index) => (
//             <MenuOption
//               key={index}
//               onSelect={option.onSelect}
//               style={styles.menuOption}
//             >
//               <Text style={styles.menuText}>{option.text}</Text>
//             </MenuOption>
//           ))}
//         </MenuOptions>
//       </Menu>
//     </MenuProvider>
//   );
// };

// const styles = StyleSheet.create({
//   menuContainer: {
//    marginLeft: 310,
//   },
//   icon: {
//     color: colors['secondary-light'],
//     marginRight: 10,
//   },
//   menuOptions: {
//     backgroundColor: '#FFFFFF',

//     borderRadius: 10,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // for Android
//   },
//   menuOption: {
//     borderBottomWidth: 8,
//     borderBottomColor: '#CCCCCC',
//   },
//   menuText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default TopMenuButton;
// import React, { useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {
//   MenuProvider,
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';
// import colors from '../utils/colorPallete';

// const TopMenuButton = ({ menuOptions }) => {
//   const navigation = useNavigation();
//   const menuRef = useRef(null);

//   const onPress = () => {
//     navigation.goBack();
//   };
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   return (
//     <MenuProvider style={styles.container}>
//       <View style={styles.menuContainer}>
//         <Menu
//           ref={menuRef}
//           opened={isMenuOpen}
//           onBackdropPress={() => setMenuOpen(false)}
//           name="changeMenu"
//         >
//           <MenuTrigger onPress={() => setMenuOpen(true)}>
//             <MaterialIcons
//               name="more-vert"
//               color={'black'}
//               size={34} // Adjust icon size as needed
//               style={styles.icon}
//             />
//           </MenuTrigger>
//           <MenuOptions style={styles.menuOptions}>
//             {menuOptions.map((option, index) => (
//               <MenuOption
//                 key={index}
//                 onSelect={option.onSelect}
//                 style={styles.menuOption}
//               >
//                 <Text style={styles.menuText}>{option.text}</Text>
//               </MenuOption>
//             ))}
//           </MenuOptions>
//         </Menu>
//       </View>
//     </MenuProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     backgroundColor: 'aqua',
//     height: 500,
//   },
//   menuContainer: {
//     position: 'absolute',
//     left: 320,
//   },
//   icon: {
//     color: colors['secondary-light'],
//     marginRight: 10,
//   },
//   menuOptions: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     shadowColor: '#000000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // for Android
//   },
//   menuOption: {
//     borderBottomWidth: 8,
//     borderBottomColor: '#CCCCCC',
//   },
//   menuText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default TopMenuButton;
// import React, { useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { StyleSheet, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import colors from '../utils/colorPallete';

// const TopMenuButton = () => {
//   const navigation = useNavigation();
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const navigateToEdit = () => {
//     navigation.navigate('SetContactNameScreen');
//     toggleModal();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleModal}>
//         <MaterialIcons
//           name="more-vert"
//           color={'black'}
//           size={34}
//           style={styles.icon}
//         />
//       </TouchableOpacity>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={toggleModal}
//       >
//         <TouchableWithoutFeedback onPress={toggleModal}>
//           <View style={styles.modalOverlay} />
//         </TouchableWithoutFeedback>
//         <View style={styles.modalContainer}>
//           <TouchableOpacity style={styles.modalButton} onPress={navigateToEdit}>
//             <Text style={styles.modalButtonText}>Change Contact Name</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   icon: {
//     color: colors['secondary-light'],
//     marginRight: 10,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   modalButton: {
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   modalButtonText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   closeButton: {
//     backgroundColor: '#FFFFFF',
//     padding: 15,
//     borderRadius: 10,
//   },
//   closeButtonText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: 'red',
//   },
// });

// export default TopMenuButton;
// import React, { useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import colors from '../utils/colorPallete';
// import Modal from 'react-native-modal';

// const TopMenuButton = () => {
//   const navigation = useNavigation();
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const navigateToEdit = () => {
//     navigation.navigate('SetContactNameScreen');
//     toggleModal();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleModal}>
//         <MaterialIcons
//           name="more-vert"
//           color={'black'}
//           size={34}
//           style={styles.icon}
//         />
//       </TouchableOpacity>
//       <Modal
//         isVisible={isModalVisible}
//         animationIn="slideInLeft"
//         animationOut="slideOutRight"
//         backdropOpacity={0.5}
//         onBackdropPress={toggleModal}
//         style={styles.modal}
//       >
//         <TouchableWithoutFeedback onPress={navigateToEdit}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>Change Contact Name</Text>
//           </View>
//         </TouchableWithoutFeedback>
//         <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
//           <Text style={styles.closeButtonText}>Close</Text>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   icon: {
//     color: colors['secondary-light'],
//   },
//   modal: {
//     justifyContent: 'flex-end',
//     margin: 0,
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   modalText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   closeButton: {
//     backgroundColor: '#FFFFFF',
//     padding: 15,
//     alignItems: 'center',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   closeButtonText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: 'red',
//   },
// });

// export default TopMenuButton;
// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import colors from '../utils/colorPallete';
// import Modal from 'react-native-modal';

// const TopMenuButton = () => {
//   const navigation = useNavigation();
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const navigateToEdit = () => {
//     navigation.navigate('SetContactNameScreen');
//     toggleModal();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleModal}>
//         <MaterialIcons
//           name="more-vert"
//           color={'black'}
//           size={34}
//           style={styles.icon}
//         />
//       </TouchableOpacity>
//       <Modal
//         isVisible={isModalVisible}
//         animationIn="fadeIn"
//         animationOut="fadeOut"
//         backdropOpacity={0}
//         onBackdropPress={toggleModal}
//         style={styles.modal}
//       >
//         <TouchableWithoutFeedback onPress={navigateToEdit}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>Change Contact Name</Text>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   icon: {
//     color: colors['secondary-light'],
//     zIndex: 1, // Ensure the icon is above the modal
//   },
//   modal: {
//     position: 'absolute',
//    // Adjust this value to position the modal closer or further from the icon
//     left: 200, // Adjust this value to position the modal closer or further from the icon
//     right: 0,

//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 0,
//   },
//   modalContent: {
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     elevation: 5, // Add elevation to give a shadow effect
//   },
//   modalText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default TopMenuButton;
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
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,

    elevation: 5, // Add elevation to give a shadow effect
  },
  optionButton: {
    marginBottom: 10,
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default TopMenuButton;
