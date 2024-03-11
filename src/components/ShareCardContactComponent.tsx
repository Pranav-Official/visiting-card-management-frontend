import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../utils/colorPallete';
import ContactListComponent from './ContactListComponent';
import RadioButton from './RadioButton';

type ShareCardProps = {
  user_fullname: string;
  user_id: string;
  onCardPress: (user_id: string) => void; // Callback function to handle card press
};

const ShareCardComponent = ({
  user_fullname,
  user_id,
  onCardPress,
}: ShareCardProps) => {
  const [ticked, setTicked] = useState(false);

  const toggleTick = () => {
    setTicked(!ticked);
    onCardPress(user_id); // Invoke the callback with the user ID
  };

  return (
    <TouchableOpacity onPress={toggleTick}>
      <View
        style={[
          styles.main_container,
          {
            backgroundColor: ticked ? colors['secondary-grey'] : 'transparent',
          },
        ]}
      >
        <RadioButton selected={ticked} />
        <View style={styles.contact_container}>
          <ContactListComponent
            contactName={user_fullname}
            onPress={() => {
              toggleTick();
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 50,
    height: 68,
    justifyContent: 'center',
  },

  contact_container: {
    flex: 1,
    marginTop: 9,
    paddingLeft: 30,
  },
});

export default ShareCardComponent;
