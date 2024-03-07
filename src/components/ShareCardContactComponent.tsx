import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../utils/colorPallete';
import ContactListComponent from './ContactListComponent';
import Selected from '../assets/images/selected.svg';

type ShareCardProps = {
    user_fullname: string,
    user_id: string,
    onCardPress: (user_id: string) => void, // Callback function to handle card press
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
        <View style={[styles.main_container, { backgroundColor: ticked ? colors['secondary-grey'] : 'transparent' }]}>
            <TouchableOpacity onPress={toggleTick}>
                <View style={[styles.circle, { backgroundColor: ticked ? colors['secondary-grey'] : 'transparent' }]}>
                    {ticked && <Selected width={18} height={18} />}
                </View>
            </TouchableOpacity>
            <View style={styles.contact_container}>
                <ContactListComponent contactName={user_fullname} />
            </View>
        </View>
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
    circle: {
        borderRadius: 50,
        borderColor: colors['primary-text'],
        borderWidth: 3,
        height: 40,
        width: 40,
        marginRight: 30,
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'center',
    },
    contact_container: {
        flex: 1,
        marginTop: 9,
    },
});

export default ShareCardComponent;





