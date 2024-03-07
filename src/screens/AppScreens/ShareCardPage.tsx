import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import SearchBarComponent from '../../components/SearchBarComponent';
import ShareCardComponent from '../../components/ShareCardContactComponent';
import { listUsers } from '../../hooks/GetUserHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import MainButtonComponent from '../../components/MainButtoncomponent';
import ProfileButtonComponent from '../../components/ProfileButtonComponent';

interface ShareProp {
    user_fullname: string,
    user_id: string
}

const ShareCardScreen = () => {
    const [shareList, setShareList] = useState<ShareProp[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
                const jwt_token = (await getLocalItem(Constants.USER_JWT)) ?? '';

                const result = await listUsers({ user_id, jwt_token });
                console.log('result:',result);
                setShareList(result.userResp);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log('Selected User IDs:', selectedUserIds);
    }, [selectedUserIds]); // Log selectedUserIds whenever it changes

    const handleCardPress = (user_id: string) => {
        console.log('clicked')
        if (selectedUserIds.includes(user_id)) {
            setSelectedUserIds(selectedUserIds.filter(id => id !== user_id));
        } else {
            setSelectedUserIds([...selectedUserIds, user_id]);
        }
    };

    return (
        <View style={styles.main_container}>
            <View style={styles.search_bar_container}>
                <SearchBarComponent />
            </View>
            <View style={styles.contact_area}>
                <FlatList
                    contentContainerStyle={styles.flatListStyle}
                    showsVerticalScrollIndicator={true}
                    data={shareList}
                    renderItem={({ item }) => (
                        <ShareCardComponent
                            user_fullname={item.user_fullname}
                            user_id={item.user_id}
                            onCardPress={handleCardPress}
                        />
                    )}
                    keyExtractor={item => item.user_id}
                />
            </View>
            <View style = {styles.profile_button_container}>
            <ProfileButtonComponent title={'Go Back'} danger={true}></ProfileButtonComponent>
            </View>
            <View style = {styles.main_button_container}>
            <MainButtonComponent title={'Share'}></MainButtonComponent>
            </View>
            
            
        </View>
    );
};

const styles = StyleSheet.create({
    main_container: {
        width: '100%',
        flexDirection: 'column',
        height:500,        
    },
    search_bar_container: {
        width: '100%',
    },
    flatListStyle: {
        padding: 10,
        marginTop: 10,
        marginBottom: 80,      
    },
    contact_area: {
        width: '100%',
        paddingHorizontal:10,
    },
    profile_button_container:{
        marginBottom:10,
        height:60,
        paddingHorizontal:20,
    },
    main_button_container:{
        marginBottom:10,
        height:70,
        paddingHorizontal:20,
    }
});

export default ShareCardScreen;







